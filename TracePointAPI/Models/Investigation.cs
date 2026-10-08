namespace TracePointAPI.Models
{
    public class Investigation
    {
        public int InvestigationID { get; set; }

        public int CaseID { get; set; }

        public int SuspectID { get; set; }

        public string Conclusion { get; set; }

        public DateTime DateStarted { get; set; }
    }
}
