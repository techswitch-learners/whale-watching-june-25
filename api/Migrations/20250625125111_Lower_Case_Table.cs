using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WhaleSpottingBackend.Migrations
{
    /// <inheritdoc />
    public partial class Lower_Case_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(name: "PK_WhaleSpecies", table: "WhaleSpecies");

            migrationBuilder.RenameTable(name: "WhaleSpecies", newName: "whalespecies");

            migrationBuilder.AddPrimaryKey(
                name: "PK_whalespecies",
                table: "whalespecies",
                column: "id"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(name: "PK_whalespecies", table: "whalespecies");

            migrationBuilder.RenameTable(name: "whalespecies", newName: "WhaleSpecies");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WhaleSpecies",
                table: "WhaleSpecies",
                column: "id"
            );
        }
    }
}
