
namespace TracePointAPI.Models
{
    public class EvidenceAttachment
    {
        public int EvidenceAttachmentID { get; set; }

        public int CaseID { get; set; }

        public int? SuspectID { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string OriginalFileName { get; set; } = string.Empty;

        public string StorageKey { get; set; } = string.Empty;

        public string ContentType { get; set; } = string.Empty;

        public long FileSize { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

        public string Sha256Hash { get; set; } = string.Empty;
    }
}
