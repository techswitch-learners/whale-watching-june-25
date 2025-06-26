using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Repositories;

var builder = WebApplication.CreateBuilder(args);

const string CORS_POLICY_NAME = "_myfaceCorsPolicy";


// Add services to the container.
builder.Services.AddDbContext<WhaleSpottingDbContext>();
builder.Services.AddControllers();
builder.Services.AddScoped<ISightingReportsRepo, SightingReportsRepo>();
builder.Services.AddScoped<ISightingReportsService, SightingReportsService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
