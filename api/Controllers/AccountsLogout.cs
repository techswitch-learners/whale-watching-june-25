using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WhaleSpottingBackend.Models.Database;

namespace WhaleSpottingBackend.Controllers
{
    [ApiController]
    [Route("/users")]
    public class AccountsLogoutController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;

        public AccountsLogoutController(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost]
        [Authorize]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok("User logged out");
            }
            catch
            {
                return Unauthorized("User is not logged in");
            }
        }
    }
}
