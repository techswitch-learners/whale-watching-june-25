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
                    new SightingReport { Id = 1, Description = "Whales sighting 1", DateOfSighting = new DateOnly(2022, 06, 13), WhaleSpeciesId = 1, Longitude = 34534534, Latitude = 3.710616f, User = user, UserId = user.Id, Status = "pending", RejectedReason = null },
                    new SightingReport { Id = 3, Description = "Whales sighting 3", DateOfSighting = new DateOnly(2022, 06, 16), WhaleSpeciesId = 3, Longitude = 34534534, Latitude = 3.710616f, User = user, UserId = user.Id, Status = "pending", RejectedReason = null },
                    new SightingReport { Id = 4, Description = "Whales sighting 4", DateOfSighting = new DateOnly(2025, 06, 18), WhaleSpeciesId = 2, Longitude = 34534534, Latitude = 3.710616f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
                    new SightingReport { Id = 2, Description = "Whales sighting 2", DateOfSighting = new DateOnly(2000, 06, 10), WhaleSpeciesId = 1, Longitude = 34534534, Latitude = 3.710616f, User = user, UserId = user.Id, Status = "pending", RejectedReason = null },
                    new SightingReport { Id = 5, Description = "Whales sighting", DateOfSighting = new DateOnly(2022, 06, 13), WhaleSpeciesId = 1, Longitude = -1.373673f, Latitude = 56.926194f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
                    new SightingReport { Id = 6, Description = "Whales sighting", DateOfSighting = new DateOnly(2022, 06, 16), WhaleSpeciesId = 3, Longitude = -126.214893f, Latitude = 39.075674f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
                    new SightingReport { Id = 7, Description = "Whales sighting", DateOfSighting = new DateOnly(2025, 06, 18), WhaleSpeciesId = 2, Longitude = -120.228351f, Latitude = 32.908168f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
                    new SightingReport { Id = 8, Description = "Whales sighting", DateOfSighting = new DateOnly(2000, 06, 10), WhaleSpeciesId = 1, Longitude = 7.991454f, Latitude = 57.633323f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
		            new SightingReport { Id = 9, Description = "Whales sighting", DateOfSighting = new DateOnly(2022, 06, 13), WhaleSpeciesId = 1, Longitude = -15.377552f, Latitude = 63.598154f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
                    new SightingReport { Id = 10, Description = "Whales sighting", DateOfSighting = new DateOnly(2022, 06, 16), WhaleSpeciesId = 3, Longitude = 134.805609f, Latitude = 30.719323f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
                    new SightingReport { Id = 11, Description = "Whales sighting", DateOfSighting = new DateOnly(2025, 06, 18), WhaleSpeciesId = 2, Longitude = 170.018185f, Latitude = 55.636995f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null },
                    new SightingReport { Id = 12, Description = "Whales sighting", DateOfSighting = new DateOnly(2000, 06, 10), WhaleSpeciesId = 1, Longitude = -125.154906f, Latitude = 40.219563f, User = user, UserId = user.Id, Status = "approved", RejectedReason = null }];
                    await context.Set<SightingReport>().AddRangeAsync(sightings);
                }
            }
            await context.SaveChangesAsync();
        }
    }
}
