using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhaleSpottingBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddSpeciesToSightingReportTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SpeciesId",
                table: "SightingReports",
                newName: "WhaleSpeciesId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "SightingReports",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "IX_SightingReports_UserId",
                table: "SightingReports",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SightingReports_WhaleSpeciesId",
                table: "SightingReports",
                column: "WhaleSpeciesId");

            migrationBuilder.AddForeignKey(
                name: "FK_SightingReports_AspNetUsers_UserId",
                table: "SightingReports",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SightingReports_WhaleSpecies_WhaleSpeciesId",
                table: "SightingReports",
                column: "WhaleSpeciesId",
                principalTable: "WhaleSpecies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SightingReports_AspNetUsers_UserId",
                table: "SightingReports");

            migrationBuilder.DropForeignKey(
                name: "FK_SightingReports_WhaleSpecies_WhaleSpeciesId",
                table: "SightingReports");

            migrationBuilder.DropIndex(
                name: "IX_SightingReports_UserId",
                table: "SightingReports");

            migrationBuilder.DropIndex(
                name: "IX_SightingReports_WhaleSpeciesId",
                table: "SightingReports");

            migrationBuilder.RenameColumn(
                name: "WhaleSpeciesId",
                table: "SightingReports",
                newName: "SpeciesId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "SightingReports",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
