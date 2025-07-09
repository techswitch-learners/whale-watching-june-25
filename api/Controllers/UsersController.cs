using System.Net;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WhaleSpottingBackend.Database;
using WhaleSpottingBackend.Models.Database;
using WhaleSpottingBackend.Models.Request;

namespace WhaleSpottingBackend.Controllers
{
    [ApiController]
    [Route("/users")]
    public class UsersController : ControllerBase
    {
        private UserManager<User> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly WhaleSpottingDbContext _context;

        public UsersController(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            WhaleSpottingDbContext context
        )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
        }

        [HttpPost()]
        public async Task<ActionResult> Create([FromBody] CreateUserRequest newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = new User { UserName = newUser.UserName, Email = newUser.Email };

                if (await _userManager.FindByNameAsync(newUser.UserName!) != null)
                {

                    return BadRequest("Username is taken.");
                }
                else if (await _userManager.FindByEmailAsync(newUser.Email!) != null)
                {
                    return BadRequest("Email already exists in the system.");

                }

                var result = await _userManager.CreateAsync(user, newUser.Password!);


                if (result.Succeeded == false)
                {
                    return BadRequest
                    ("Password rules do not comply - Should contain 6 characters with atleast 1 uppercase, 1 lowercase, 1 non-alphanumeric and 1 number ");
                }

                if (result.Succeeded && !string.Equals(newUser.Role, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    await _userManager.AddToRoleAsync(user, "User");
                }
                else if (result.Succeeded && string.Equals(newUser.Role, "Admin", StringComparison.OrdinalIgnoreCase))
                {
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

            return StatusCode(StatusCodes.Status201Created, "User created successfully");
        }

    }
}
