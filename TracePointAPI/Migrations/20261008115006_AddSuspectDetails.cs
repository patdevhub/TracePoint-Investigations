using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TracePointAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddSuspectDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Suspects",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Height",
                table: "Suspects",
                type: "decimal(6,2)",
                precision: 6,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Race",
                table: "Suspects",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Suspects",
                keyColumn: "SuspectID",
                keyValue: 1,
                columns: new[] { "Age", "Height", "Race" },
                values: new object[] { null, null, "Not specified" });

            migrationBuilder.UpdateData(
                table: "Suspects",
                keyColumn: "SuspectID",
                keyValue: 2,
                columns: new[] { "Age", "Height", "Race" },
                values: new object[] { null, null, "Not specified" });

            migrationBuilder.UpdateData(
                table: "Suspects",
                keyColumn: "SuspectID",
                keyValue: 3,
                columns: new[] { "Age", "Height", "Race" },
                values: new object[] { null, null, "Not specified" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Suspects");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "Suspects");

            migrationBuilder.DropColumn(
                name: "Race",
                table: "Suspects");
        }
    }
}
