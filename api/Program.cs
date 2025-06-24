using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<WhaleSpottingDbContext>();
builder.Services.AddControllers();
builder.Services.AddScoped<ISightingReportsRepo, SightingReportsRepo>();
builder.Services.AddScoped<ISightingReportsService, SightingReportsService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
