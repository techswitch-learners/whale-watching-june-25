using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WhaleSpottingBackend.Migrations
{
    /// <inheritdoc />
    public partial class InsertSightingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "SightingReports",
                columns: new[] { "Id", "DateOfSighting", "Description", "Latitude", "Longitude", "RejectedReason", "SpeciesId", "Status", "UserId" },
                values: new object[,]
                {
                    { 1, new DateOnly(2022, 6, 13), "Whales sighting 1", 3.710616f, 34534536f, null, 1, "pending", 1 },
                    { 2, new DateOnly(2000, 6, 10), "Whales sighting 2", 3.710616f, 34534536f, null, 1, "pending", 4 },
                    { 3, new DateOnly(2022, 6, 16), "Whales sighting 3", 3.710616f, 34534536f, null, 3, "pending", 3 },
                    { 4, new DateOnly(2025, 6, 18), "Whales sighting 4", 3.710616f, 34534536f, null, 2, "approved", 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SightingReports",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SightingReports",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "SightingReports",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "SightingReports",
                keyColumn: "Id",
                keyValue: 4);
        }
    }
}
