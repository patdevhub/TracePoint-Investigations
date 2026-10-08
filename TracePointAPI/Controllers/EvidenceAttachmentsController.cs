
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EvidenceAttachmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly string _storageDirectory;

    private const long MaxFileSize = 10 * 1024 * 1024;

    private static readonly Dictionary<string, string> AllowedTypes =
        new(StringComparer.OrdinalIgnoreCase)
        {
            [".pdf"] = "application/pdf",
            [".docx"] =
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            [".txt"] = "text/plain"
        };

    public EvidenceAttachmentsController(
        ApplicationDbContext context,
        IWebHostEnvironment environment)
    {
        _context = context;

        _storageDirectory = Path.Combine(
            environment.ContentRootPath,
            "PrivateEvidence"
        );
    }

    // ==========================================
    // GET ALL UPLOADED EVIDENCE
    // ==========================================

    // GET: api/EvidenceAttachments
    [HttpGet]
    public async Task<IActionResult> GetAttachments()
    {
        var attachments = await _context.EvidenceAttachments
            .AsNoTracking()
            .OrderByDescending(e => e.UploadedAt)
            .Select(e => new
            {
                e.EvidenceAttachmentID,
                e.CaseID,
                e.SuspectID,
                e.Title,
                e.Description,
                e.OriginalFileName,
                e.ContentType,
                e.FileSize,
                e.UploadedAt,
                e.Sha256Hash
            })
            .ToListAsync();

        return Ok(attachments);
    }

    // ==========================================
    // UPLOAD NEW EVIDENCE
    // ==========================================

    // POST: api/EvidenceAttachments/upload
    [HttpPost("upload")]
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(11 * 1024 * 1024)]
    public async Task<IActionResult> UploadEvidence(
        [FromForm] int caseID,
        [FromForm] string? title,
        [FromForm] string? description,
        [FromForm] IFormFile? file)
    {
        if (caseID <= 0)
        {
            return BadRequest("A valid case ID is required.");
        }

        if (string.IsNullOrWhiteSpace(title) ||
            title.Length > 200)
        {
            return BadRequest(
                "An evidence title of up to 200 characters is required."
            );
        }

        if (file == null || file.Length == 0)
        {
            return BadRequest("Please select a file.");
        }

        if (file.Length > MaxFileSize)
        {
            return BadRequest(
                "The maximum allowed file size is 10 MB."
            );
        }

        var extension = Path.GetExtension(file.FileName);

        if (!AllowedTypes.TryGetValue(
            extension,
            out var contentType))
        {
            return BadRequest(
                "Only PDF, DOCX and TXT documents are allowed."
            );
        }

        var caseExists = await _context.Cases
            .AnyAsync(c => c.CaseID == caseID);

        if (!caseExists)
        {
            return BadRequest("The selected case does not exist.");
        }

        var originalName = Path.GetFileName(
            file.FileName.Replace('\\', '/')
        );

        if (originalName.Length > 255)
        {
            return BadRequest("The filename is too long.");
        }

        // Generate a unique server-side filename.
        var storageKey =
            Guid.NewGuid().ToString("N") +
            extension.ToLowerInvariant();

        Directory.CreateDirectory(_storageDirectory);

        var filePath = Path.Combine(
            _storageDirectory,
            storageKey
        );

        try
        {
            // Save the uploaded document.
            await using (var stream = new FileStream(
                filePath,
                FileMode.CreateNew,
                FileAccess.Write,
                FileShare.None))
            {
                await file.CopyToAsync(stream);
            }

            // Generate a file-integrity hash.
            string hash;

            await using (var stream =
                System.IO.File.OpenRead(filePath))
            {
                var hashBytes =
                    await SHA256.HashDataAsync(stream);

                hash = Convert.ToHexString(hashBytes);
            }

            // Save the evidence metadata in SQL Server.
            var attachment = new EvidenceAttachment
            {
                CaseID = caseID,
                Title = title.Trim(),
                Description = description?.Trim() ?? "",
                OriginalFileName = originalName,
                StorageKey = storageKey,
                ContentType = contentType,
                FileSize = file.Length,
                UploadedAt = DateTime.UtcNow,
                Sha256Hash = hash
            };

            _context.EvidenceAttachments.Add(attachment);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(DownloadEvidence),
                new { id = attachment.EvidenceAttachmentID },
                new
                {
                    attachment.EvidenceAttachmentID,
                    attachment.CaseID,
                    attachment.Title,
                    attachment.OriginalFileName,
                    attachment.FileSize,
                    attachment.UploadedAt,
                    attachment.Sha256Hash,
                    Message = "Evidence uploaded successfully."
                }
            );
        }
        catch
        {
            // Remove an orphaned file if saving fails.
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            throw;
        }
    }

    // ==========================================
    // DOWNLOAD STORED EVIDENCE
    // ==========================================

    // GET: api/EvidenceAttachments/{id}/download
    [HttpGet("{id:int}/download")]
    public async Task<IActionResult> DownloadEvidence(int id)
    {
        var attachment = await _context.EvidenceAttachments
            .AsNoTracking()
            .FirstOrDefaultAsync(
                e => e.EvidenceAttachmentID == id
            );

        if (attachment == null)
        {
            return NotFound("Evidence record not found.");
        }

        var filePath = Path.Combine(
            _storageDirectory,
            attachment.StorageKey
        );

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound(
                "The evidence file could not be located."
            );
        }

        var stream = System.IO.File.OpenRead(filePath);

        return File(
            stream,
            attachment.ContentType,
            attachment.OriginalFileName
        );
    }
}
