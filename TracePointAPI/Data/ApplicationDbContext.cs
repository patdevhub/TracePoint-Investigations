
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Models;

namespace TracePointAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // ==========================================
    // DATABASE TABLES
    // ==========================================

    public DbSet<Case> Cases { get; set; }

    public DbSet<Suspect> Suspects { get; set; }

    public DbSet<Evidence> Evidence { get; set; }

    public DbSet<Investigation> Investigations { get; set; }

    public DbSet<EvidenceAttachment> EvidenceAttachments { get; set; }

    // ==========================================
    // DATABASE CONFIGURATION
    // ==========================================

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure decimal precision for suspect height.
        modelBuilder.Entity<Suspect>()
            .Property(s => s.Height)
            .HasPrecision(6, 2);

        // Configure the primary key for evidence attachments.
        modelBuilder.Entity<EvidenceAttachment>()
            .HasKey(e => e.EvidenceAttachmentID);

        // Associate each evidence attachment with an existing case.
        modelBuilder.Entity<EvidenceAttachment>()
            .HasOne<Case>()
            .WithMany()
            .HasForeignKey(e => e.CaseID)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure evidence attachment properties.
        modelBuilder.Entity<EvidenceAttachment>()
            .Property(e => e.Title)
            .IsRequired()
            .HasMaxLength(200);

        modelBuilder.Entity<EvidenceAttachment>()
            .Property(e => e.OriginalFileName)
            .IsRequired()
            .HasMaxLength(255);

        modelBuilder.Entity<EvidenceAttachment>()
            .Property(e => e.StorageKey)
            .IsRequired()
            .HasMaxLength(255);

        modelBuilder.Entity<EvidenceAttachment>()
            .Property(e => e.ContentType)
            .IsRequired()
            .HasMaxLength(150);

        modelBuilder.Entity<EvidenceAttachment>()
            .Property(e => e.Sha256Hash)
            .IsRequired()
            .HasMaxLength(64);

        // ==========================================
        // SEED CASE DATA
        // ==========================================

        modelBuilder.Entity<Case>().HasData(
            new Case
            {
                CaseID = 1,
                CaseName = "The Missing Prototype",
                Description = "A technology prototype has disappeared from a secure research laboratory.",
                Status = "OPEN"
            }
        );

        // ==========================================
        // SEED SUSPECT DATA
        // ==========================================

        modelBuilder.Entity<Suspect>().HasData(
            new Suspect
            {
                SuspectID = 1,
                Name = "Alex Morgan",
                Occupation = "Software Developer",
                Race = "Not specified",
                Description = "Alex developed the software used by the prototype and had access to the laboratory."
            },

            new Suspect
            {
                SuspectID = 2,
                Name = "Jamie Smith",
                Occupation = "Security Officer",
                Race = "Not specified",
                Description = "Jamie was responsible for security at the building on the night of the incident."
            },

            new Suspect
            {
                SuspectID = 3,
                Name = "Taylor Williams",
                Occupation = "Research Assistant",
                Race = "Not specified",
                Description = "Taylor worked with the research team and had access to the laboratory during working hours."
            }
        );

        // ==========================================
        // SEED EVIDENCE DATA
        // ==========================================

        modelBuilder.Entity<Evidence>().HasData(
            new Evidence
            {
                EvidenceID = 1,
                Title = "Security Access Log",
                Location = "Security Office",
                Description = "Jamie Smith's access card was used to enter the research laboratory at 23:41."
            },

            new Evidence
            {
                EvidenceID = 2,
                Title = "CCTV Report",
                Location = "Research Laboratory",
                Description = "CCTV footage shows a person entering the laboratory at approximately 23:43. The person's face cannot be clearly identified."
            },

            new Evidence
            {
                EvidenceID = 3,
                Title = "Fingerprint Report",
                Location = "Research Laboratory",
                Description = "A partial fingerprint was found on the prototype storage cabinet. The fingerprint belongs to a person who regularly works in the laboratory."
            },

            new Evidence
            {
                EvidenceID = 4,
                Title = "Email Message",
                Location = "Archive Room",
                Description = "An email sent shortly before the incident states: 'The prototype must be moved before tomorrow's demonstration.'"
            },

            new Evidence
            {
                EvidenceID = 5,
                Title = "Photograph",
                Location = "Research Laboratory",
                Description = "A photograph taken after the incident shows that the prototype cabinet was open and the laboratory lights were switched off."
            }
        );
    }
}
