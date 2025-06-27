using Microsoft.AspNetCore.Identity;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models.Database;

public static class SightingSeeder
{
    public static async Task SeedSightings(IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<WhaleSpottingDbContext>();
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
        var userEmail = "whalefan@ocean.com";
        var userPassword = "IloveWhales2!";
        var user = await userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            var newUser = new User
            {
                UserName = "WhaleFan",
                Email = userEmail,
                EmailConfirmed = true
            };
            await userManager.CreateAsync(newUser, userPassword);
            user = await userManager.FindByEmailAsync(userEmail);
            if (user != null)
            {


                if (!context.Set<SightingReport>().Any())
                {
                    List<SightingReport> sightings = [
                    new SightingReport { Id = 1, Description = "Whales sighting 1", DateOfSighting = new DateOnly(2022, 06, 13), SpeciesId = 1, Longitude = 34534534, Latitude = 3.710616f, User = user, UserId = user.Id, Status = "pending", RejectedReason = null },
                    new SightingReport { Id = 3, Description = "Whales sighting 3", DateOfSighting = new DateOnly(2022, 06, 16), SpeciesId = 3, Longitude = 34534534, Latitude = 3.710616f, User = user, UserId = user.Id, Status = "pending", RejectedReason = null },
                    new SightingReport { Id = 4, Description = "Whales sighting 4", DateOfSighting = new DateOnly(2025, 06, 18), SpeciesId = 2, Longitude = 34534534, Latitude = 3.710616f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
                    new SightingReport { Id = 2, Description = "Whales sighting 2", DateOfSighting = new DateOnly(2000, 06, 10), SpeciesId = 1, Longitude = 34534534, Latitude = 3.710616f, User = user, UserId = user.Id, Status = "pending", RejectedReason = null }];
                    await context.Set<SightingReport>().AddRangeAsync(sightings);
                }
            }
            await context.SaveChangesAsync();
        }
    }
}
