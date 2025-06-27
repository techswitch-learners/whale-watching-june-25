using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhaleSpottingBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSightingReportTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddForeignKey(
                name: "FK_SightingReports_AspNetUsers_UserId",
                table: "SightingReports",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SightingReports_AspNetUsers_UserId",
                table: "SightingReports");

            migrationBuilder.DropIndex(
                name: "IX_SightingReports_UserId",
                table: "SightingReports");

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
