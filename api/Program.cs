using Microsoft.AspNetCore.Identity;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Repositories;
using WhaleSpottingBackend.Models.Database;

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
builder.Services.AddScoped<ISightingReportsRepo, SightingReportsRepo>();
builder.Services.AddScoped<ISightingReportsService, SightingReportsService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();

builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = false)
        .AddRoles<IdentityRole>()
        .AddEntityFrameworkStores<WhaleSpottingDbContext>();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider;
    await RoleSeeder.CreateRoles(context);
    await RoleSeeder.CreateFirstAdminUser(context);
};

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

app.MapIdentityApi<User>();

app.Run();