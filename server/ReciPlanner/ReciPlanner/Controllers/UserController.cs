using Microsoft.AspNetCore.Mvc;
using ReciPlanner.Repositories;
using ReciPlanner.Models;
using ReciPlanner.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ReciPlanner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private IUserRepository _userRepository;
        private IUserVerify _userVerify;
        public UserController(IUserRepository userRepository, IUserVerify userVerify)
        {
            _userRepository = userRepository;
            _userVerify = userVerify;
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            try
            {
                if (user == null) StatusCode(500, "Invalid user data");

                if (!_userVerify.IsUniqueUsername(user.Id, user.Username)) return Conflict(new { error = "username is already taken", field = "username" });

                if (!_userVerify.IsUniqueEmail(user.Id, user.Email)) return Conflict(new { error = "email is already taken", field = "email" });

                _userRepository.Create(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginData loginData)
        {
            try
            {
                if (!_userVerify.IsValidLoginUser(loginData)) return Unauthorized("Invalid username or password");

                int? userId = _userRepository.GetUserId(loginData.username);

                int validUserId = 0;

                if (userId is null)
                {
                    return StatusCode(500, "Invalid user id");
                }
                else
                {
                    validUserId = userId.Value;
                }

                User user = _userRepository.ReadById(validUserId);

                var claims = new List<Claim>
                {
                    new Claim("Username", loginData.username),
                    new Claim("UserId", userId.ToString()),
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                var properties = new AuthenticationProperties
                {
                    IsPersistent = true
                };

                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal, properties);

                return Ok(user);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserById(int userId)
        {
            try
            {
                var user = _userRepository.ReadById(userId);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("{userId}")]
        public IActionResult UpdateUser(User updatedUser, int userId)
        {
            try
            {
                if (!_userVerify.IsUniqueUsername(userId, updatedUser.Username)) return Conflict(new { error = "username is already taken", field= "username" });

                if (!_userVerify.IsUniqueEmail(userId, updatedUser.Email)) return Conflict(new { error= "email is already taken", field = "email"});

                _userRepository.Update(updatedUser, userId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
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
                var uploadsFolder = Path.Combine("wwwroot", "uploads");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Generate a unique file name
                var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(profilePic.FileName)}";
                var filePath = Path.Combine(uploadsFolder, fileName);

                // Save the file to disk
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await profilePic.CopyToAsync(stream);
                }

                // Return the file path for use in the front-end
                var relativePath = $"/uploads/{fileName}";
                return Ok(relativePath);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


    }
}
