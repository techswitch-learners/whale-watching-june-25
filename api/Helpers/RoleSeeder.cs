using Microsoft.AspNetCore.Identity;
using WhaleSpottingBackend.Models.Database;

public static class RoleSeeder
{

    public static async Task CreateRoles(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        string[] roles = ["Admin", "User"];

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
    public static async Task CreateFirstAdminUser(IServiceProvider serviceProvider)
    {
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

        var adminEmail = "admin@whalespotting.com";
        var adminPassword = "Admin@123";

        var userExist = await userManager.FindByEmailAsync(adminEmail);

        if (userExist == null)
        {
            var adminUser = new User
            {
                UserName = adminEmail,
                Email = adminEmail,
                EmailConfirmed = true
            };

            var adminCreation = await userManager.CreateAsync(adminUser, adminPassword);
            if (adminCreation.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
            else
            {
                throw new Exception("Failed to create the admin user: " + string.Join(", ", adminCreation.Errors));
            }
        }
    }

    public static async Task AssignAdminRole(IServiceProvider serviceProvider)
    {
        var UserManager = serviceProvider.GetRequiredService<UserManager<User>>();

        var adminEmail = "test@test.com";
        var user = await UserManager.FindByEmailAsync(adminEmail);

        if (user != null && !await UserManager.IsInRoleAsync(user, "Admin"))
        {
            await UserManager.AddToRoleAsync(user, "Admin");
        }
    }
}
