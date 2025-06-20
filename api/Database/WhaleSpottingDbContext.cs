
using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Models.DatabaseModels;

namespace WhaleSpottingBackend.Database;

class WhaleSpottingDbContext : DbContext
{
    public DbSet<ExampleModel> ExampleModel { get; set; }
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
