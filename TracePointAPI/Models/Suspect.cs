
namespace TracePointAPI.Models
{
    public class Suspect
    {
        public int SuspectID { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Occupation { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int? Age { get; set; }

        public decimal? Height { get; set; }

        public string? Race { get; set; }
    }
}
