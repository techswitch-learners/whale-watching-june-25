using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Request;

namespace WhaleSpottingBackend.Controllers
{
    public class UsersController : ControllerBase
    {
        private UserManager<IdentityUser> _userManager;
        private RoleManager<IdentityUser> _roleManager;
        private readonly WhaleSpottingDbContext _context;

        public UsersController(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityUser> roleManager,
            WhaleSpottingDbContext context
        )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        // [ApiController]
        [HttpPost("/users")]
        public async Task<ActionResult> CreateUser(CreateUserRequest newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = new IdentityUser { UserName = newUser.UserName, Email = newUser.Email };

                if (await _userManager.FindByEmailAsync(newUser.Email) != null)
                {
                    return BadRequest("User is already registered.");
                }

                var result = await _userManager.CreateAsync(user, newUser.Password);

                if (result.Succeeded && newUser.Role != "Admin")
                {
                    await _userManager.AddToRoleAsync(user, "User");
                }
                else if (result.Succeeded && newUser.Role == "Admin")
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return Ok(new { message = "" });
        }
    }
}
