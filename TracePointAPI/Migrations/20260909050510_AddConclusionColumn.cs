using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TracePointAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddConclusionColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Conclusion",
                table: "Investigations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Conclusion",
                table: "Investigations");
        }
    }
}
