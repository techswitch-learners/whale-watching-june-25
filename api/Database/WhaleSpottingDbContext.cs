
using Microsoft.EntityFrameworkCore;
using WhaleSpottingBackend.Models.DatabaseModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;




namespace WhaleSpottingBackend.Database;

class WhaleSpottingDbContext : IdentityDbContext<UserModel>
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
