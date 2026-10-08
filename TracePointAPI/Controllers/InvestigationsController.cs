
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvestigationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public InvestigationsController(
        ApplicationDbContext context,
        IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // GET: api/Investigations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Investigation>>> GetInvestigations()
    {
        var investigations = await _context.Investigations
            .AsNoTracking()
            .ToListAsync();

        return Ok(investigations);
    }

    // GET: api/Investigations/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Investigation>> GetInvestigation(int id)
    {
        var investigation = await _context.Investigations
            .AsNoTracking()
            .FirstOrDefaultAsync(i => i.InvestigationID == id);

        if (investigation == null)
        {
            return NotFound();
        }

        return Ok(investigation);
    }

    // POST: api/Investigations
    [HttpPost]
    public async Task<ActionResult<Investigation>> CreateInvestigation(
        Investigation investigation)
    {
        investigation.DateStarted = DateTime.UtcNow;

        _context.Investigations.Add(investigation);

        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetInvestigation),
            new { id = investigation.InvestigationID },
            investigation
        );
    }

    // GET: api/Investigations/submitted
    [HttpGet("submitted")]
    public async Task<IActionResult> GetSubmittedInvestigations()
    {
        var connectionString =
            _configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            return StatusCode(500, "Database connection is not configured.");
        }

        using var connection = new SqlConnection(connectionString);

        var sql = """
            SELECT
                i.InvestigationID,
                s.Name AS SuspectName,
                i.Conclusion,
                i.DateStarted
            FROM Investigations i
            INNER JOIN Suspects s
                ON i.SuspectID = s.SuspectID
            ORDER BY i.DateStarted DESC
            """;

        var investigations = await connection.QueryAsync(sql);

        return Ok(investigations);
    }
}
