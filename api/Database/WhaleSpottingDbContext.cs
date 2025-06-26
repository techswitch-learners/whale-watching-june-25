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
}
