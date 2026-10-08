using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TracePointAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Cases",
                columns: new[] { "CaseID", "CaseName", "Description", "Status" },
                values: new object[] { 1, "The Missing Prototype", "A technology prototype has disappeared from a secure research laboratory.", "OPEN" });

            migrationBuilder.InsertData(
                table: "Evidence",
                columns: new[] { "EvidenceID", "Description", "Location", "Title" },
                values: new object[,]
                {
                    { 1, "Jamie Smith's access card was used to enter the research laboratory at 23:41.", "Security Office", "Security Access Log" },
                    { 2, "CCTV footage shows a person entering the laboratory at approximately 23:43. The person's face cannot be clearly identified.", "Research Laboratory", "CCTV Report" },
                    { 3, "A partial fingerprint was found on the prototype storage cabinet. The fingerprint belongs to a person who regularly works in the laboratory.", "Research Laboratory", "Fingerprint Report" },
                    { 4, "An email sent shortly before the incident states: 'The prototype must be moved before tomorrow's demonstration.'", "Archive Room", "Email Message" },
                    { 5, "A photograph taken after the incident shows that the prototype cabinet was open and the laboratory lights were switched off.", "Research Laboratory", "Photograph" }
                });

            migrationBuilder.InsertData(
                table: "Suspects",
                columns: new[] { "SuspectID", "Description", "Name", "Occupation" },
                values: new object[,]
                {
                    { 1, "Alex developed the software used by the prototype and had access to the laboratory.", "Alex Morgan", "Software Developer" },
                    { 2, "Jamie was responsible for security at the building on the night of the incident.", "Jamie Smith", "Security Officer" },
                    { 3, "Taylor worked with the research team and had access to the laboratory during working hours.", "Taylor Williams", "Research Assistant" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Cases",
                keyColumn: "CaseID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Evidence",
                keyColumn: "EvidenceID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Evidence",
                keyColumn: "EvidenceID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Evidence",
                keyColumn: "EvidenceID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Evidence",
                keyColumn: "EvidenceID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Evidence",
                keyColumn: "EvidenceID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Suspects",
                keyColumn: "SuspectID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Suspects",
                keyColumn: "SuspectID",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Suspects",
                keyColumn: "SuspectID",
                keyValue: 3);
        }
    }
}
