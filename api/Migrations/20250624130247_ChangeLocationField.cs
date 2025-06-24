using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhaleSpottingBackend.Migrations
{
    /// <inheritdoc />
    public partial class ChangeLocationField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "SightingReports");

            migrationBuilder.AddColumn<float>(
                name: "Latitude",
                table: "SightingReports",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "Longitude",
                table: "SightingReports",
                type: "real",
                nullable: false,
                defaultValue: 0f);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "SightingReports");

            migrationBuilder.DropColumn(
                name: "Longitude",
                table: "SightingReports");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "SightingReports",
                type: "text",
                nullable: true);
        }
    }
}
