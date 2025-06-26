using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Models.Database;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WhaleSpottingBackend.Database;

public class WhaleSpottingDbContext : IdentityDbContext<User>
{
    public DbSet<SightingReport> SightingReports { get; set; }
    private IConfiguration _configuration;
    public WhaleSpottingDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration["ConnectionStrings:WhaleSpottingDb"]);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<SightingReport>().HasData(
            new SightingReport {Id= 1, Description = "Whales sighting 1", DateOfSighting = new DateOnly(2022, 06, 13), SpeciesId = 1, Longitude = 34534534, Latitude = 3.710616f, UserId = 1, Status = "pending", RejectedReason = null},
            new SightingReport {Id = 2, Description = "Whales sighting 2", DateOfSighting = new DateOnly(2000, 06, 10), SpeciesId = 1, Longitude = 34534534, Latitude = 3.710616f, UserId = 4, Status = "pending", RejectedReason = null},
            new SightingReport {Id = 3, Description = "Whales sighting 3", DateOfSighting = new DateOnly(2022, 06, 16), SpeciesId = 3, Longitude = 34534534, Latitude = 3.710616f, UserId = 3, Status = "pending", RejectedReason = null},
            new SightingReport {Id = 4, Description = "Whales sighting 4", DateOfSighting = new DateOnly(2025, 06, 18), SpeciesId = 2, Longitude = 34534534, Latitude = 3.710616f, UserId = 2, Status = "approved", RejectedReason = null}
        );
    }
}
