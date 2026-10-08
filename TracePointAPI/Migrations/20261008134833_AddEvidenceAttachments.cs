using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TracePointAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddEvidenceAttachments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EvidenceAttachments",
                columns: table => new
                {
                    EvidenceAttachmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CaseID = table.Column<int>(type: "int", nullable: false),
                    SuspectID = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OriginalFileName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    StorageKey = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    UploadedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Sha256Hash = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EvidenceAttachments", x => x.EvidenceAttachmentID);
                    table.ForeignKey(
                        name: "FK_EvidenceAttachments_Cases_CaseID",
                        column: x => x.CaseID,
                        principalTable: "Cases",
                        principalColumn: "CaseID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EvidenceAttachments_CaseID",
                table: "EvidenceAttachments",
                column: "CaseID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EvidenceAttachments");
        }
    }
}
