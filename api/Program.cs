using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Helpers;
using WhaleSpottingBackend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<WhaleSpottingDbContext>();
builder.Services.AddControllers();
builder.Services.AddScoped<IWhaleSpeciesRepository, WhaleSpeciesRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<WhaleSpottingDbContext>();

    if (!context.WhaleSpecies.Any())
    {
        var csvFilePath = "../api/Database/Data/SpeciesData.csv";
        var Whales = WhaleSpeciesReader.ReadWhalesFromCsv(csvFilePath);
        context.WhaleSpecies.AddRange(Whales);
        context.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
