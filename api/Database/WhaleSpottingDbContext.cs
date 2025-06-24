
using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Models.DatabaseModels;
using WhaleSpottingBackend;

namespace WhaleSpottingBackend.Database;

public class WhaleSpottingDbContext : DbContext
{
    public DbSet<ExampleModel> ExampleModel { get; set; }

    public DbSet<UploadedImages> UploadedImages { get; set; }
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
