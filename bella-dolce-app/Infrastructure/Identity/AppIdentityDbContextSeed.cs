using BellaDolce.WebApi.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BellaDolce.WebApi.Infrastructure.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedAsync(AppIdentityDbContext identityDbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        identityDbContext.Database.Migrate();

        // Create Admin role
        await roleManager.CreateAsync(new IdentityRole(RoleConstants.ADMINISTRATORS));
    
        // Define Tapiou
        var tapiouName = "tapiou@bella-dolce.fr";
        var tapiouUser = new ApplicationUser
        {
            UserName = tapiouName,
            Email = tapiouName
        };

        // Crate Tapiou in db
        await userManager.CreateAsync(tapiouUser, AuthorizationConstants.DEFAULT_PASSWORD);

        // Set Tapiou as admin
        tapiouUser = await userManager.FindByNameAsync(tapiouUser.UserName);
        await userManager.AddToRoleAsync(tapiouUser, RoleConstants.ADMINISTRATORS);

    }

}
