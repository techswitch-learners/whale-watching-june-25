using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Helpers;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Repositories;
using WhaleSpottingBackend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.AddDefaultPolicy(
           policy =>
           {
               policy.WithOrigins("http://localhost:5173")
                   .AllowAnyMethod()
                   .AllowCredentials()
                   .AllowAnyHeader();
           });
    }
});

// Add services to the container.
builder.Services.AddDbContext<WhaleSpottingDbContext>();
builder.Services.AddControllers();
builder.Services.AddScoped<IWhaleSpeciesRepository, WhaleSpeciesRepository>();
builder.Services.AddScoped<ISightingReportsRepo, SightingReportsRepo>();
builder.Services.AddScoped<ISightingReportsService, SightingReportsService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder
    .Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = false)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<WhaleSpottingDbContext>()
    .Services.Configure<IdentityOptions>(options =>
    {
        options.Password.RequireDigit = true;
        options.Password.RequiredLength = 6;
        options.Password.RequireNonAlphanumeric = true;
        options.Password.RequireUppercase = true;
        options.Password.RequireLowercase = true;
    });

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var serviceProvider = serviceScope.ServiceProvider;
    var dbContext = serviceProvider.GetRequiredService<WhaleSpottingDbContext>();

    if (!dbContext.WhaleSpecies.Any())
    {
        var csvFilePath = "../api/Database/Data/SpeciesData.csv";
        var Whales = WhaleSpeciesReader.ReadWhalesFromCsv(csvFilePath);
        dbContext.WhaleSpecies.AddRange(Whales);
        dbContext.SaveChanges();
    }
    await RoleSeeder.CreateRoles(serviceProvider);
    await RoleSeeder.CreateFirstAdminUser(serviceProvider);
    await SightingSeeder.SeedSightings(serviceProvider);
}
;

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

//app.MapIdentityApi<User>();

app.Run();

