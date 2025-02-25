using Microsoft.AspNetCore.Mvc;
using ReciPlanner.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Reflection;
using ReciPlanner.Services.UserServices;
using ReciPlanner.Models.Users;

namespace ReciPlanner.Controllers.Users
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;

        private readonly string _uploadFolder = Path.Combine("wwwroot", "uploads");

        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("register")]
        public IActionResult Register(CreateUserData user)
        {
            try
            {
                _userService.RegisterUser(user);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "User creation failed");
            }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginData loginData)
        {
            try
            {
                var user = _userService.ValidateLoginUser(loginData);
                LoginUser(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "Login failed");
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [Authorize]
        [HttpGet("{userId}")]
        public IActionResult GetUserById(int userId)
        {
            try
            {
                var userDto = _userService.GetUser(userId);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, $"User #{userId} not found");
            }
        }

        [Authorize]
        [HttpPatch("{userId}")]
        public IActionResult UpdateUser(CreateUserData user, int userId)
        {
            try
            {
                _userService.UpdateUser(user, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, $"Updating #{userId} failed");
            }
        }

        [HttpPost("profilepic")]
        public async Task<IActionResult> UploadProfilePic(IFormFile profilePic)
        {
            if (profilePic == null || profilePic.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }
            try
            {
                var relativePath = await UploadFile(profilePic);
                return Ok(relativePath);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, "Profile picture is faild to upload.");
            }
        }


        private void LoginUser(User user)
        {
            var claims = new List<Claim>
                {
                    new Claim("Username", user.Username),
                    new Claim("UserId", user.id.ToString()),
                };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            var properties = new AuthenticationProperties
            {
                IsPersistent = true
            };

            HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal, properties);
        }
        private async Task<string> UploadFile(IFormFile file)
        {
            if (!Directory.Exists(_uploadFolder))
            {
                Directory.CreateDirectory(_uploadFolder);
            }

            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var filePath = Path.Combine(_uploadFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return $"/uploads/{fileName}";
        }
    }
}
