using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WhaleSpottingBackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WhaleSpecies",
                columns: table => new
                {
                    id = table
                        .Column<int>(type: "integer", nullable: false)
                        .Annotation(
                            "Npgsql:ValueGenerationStrategy",
                            NpgsqlValueGenerationStrategy.IdentityByDefaultColumn
                        ),
                    Species_Group = table.Column<string>(type: "text", nullable: true),
                    Species = table.Column<string>(type: "text", nullable: true),
                    Latin_Name = table.Column<string>(type: "text", nullable: true),
                    Habitat = table.Column<string>(type: "text", nullable: true),
                    Max_Length_Meters = table.Column<double>(
                        type: "double precision",
                        nullable: false
                    ),
                    Max_Weight_Tons = table.Column<double>(
                        type: "double precision",
                        nullable: false
                    ),
                    Conservation_Status = table.Column<string>(type: "text", nullable: true),
                    Max_Age = table.Column<int>(type: "integer", nullable: false),
                    Food = table.Column<string>(type: "text", nullable: true),
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WhaleSpecies", x => x.id);
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "WhaleSpecies");
        }
    }
}
