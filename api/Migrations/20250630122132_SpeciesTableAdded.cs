using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WhaleSpottingBackend.Migrations
{
    /// <inheritdoc />
    public partial class SpeciesTableAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WhaleSpecies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SpeciesGroup = table.Column<string>(type: "text", nullable: true),
                    Species = table.Column<string>(type: "text", nullable: true),
                    LatinName = table.Column<string>(type: "text", nullable: true),
                    Habitat = table.Column<string>(type: "text", nullable: true),
                    MaxLengthMeters = table.Column<double>(type: "double precision", nullable: false),
                    MaxWeightTons = table.Column<double>(type: "double precision", nullable: false),
                    ConservationStatus = table.Column<string>(type: "text", nullable: true),
                    MaxAge = table.Column<int>(type: "integer", nullable: false),
                    Food = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WhaleSpecies", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WhaleSpecies");
        }
    }
}
