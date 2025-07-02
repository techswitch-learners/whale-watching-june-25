using WhaleSpottingBackend.Services;
using WhaleSpottingBackend.Models.Request;
using WhaleSpottingBackend.Database;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WhaleSpottingBackend.Models.Database;
using Microsoft.AspNetCore.Identity.Data;

namespace WhaleSpottingBackend.Controllers;

[ApiController]
[Route("/accounts")]
public class AccountsLoginController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AccountsLoginController(SignInManager<User> signInManager, UserManager<User> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return Unauthorized("Invalid Email");
        }

        var result = await _signInManager.PasswordSignInAsync(user, request.Password, isPersistent: false, lockoutOnFailure: false);
        if (!result.Succeeded)
        {
            return Unauthorized("Invalid Password");
        }
        return Ok(new { message = "Login successful" });
    }
}