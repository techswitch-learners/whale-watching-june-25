using Microsoft.AspNetCore.Identity;
using WhaleSpottingBackend.Models.DatabaseModels;

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

    public static async Task AssignAdminRole(IServiceProvider serviceProvider)
    {
        var UserManager = serviceProvider.GetRequiredService<UserManager<UserModel>>();

        var adminEmail = "test@test.com";
        var user = await UserManager.FindByEmailAsync(adminEmail);

        if (user != null && !await UserManager.IsInRoleAsync(user, "Admin"))
        {
            await UserManager.AddToRoleAsync(user, "Admin");
        }
    }
 }
