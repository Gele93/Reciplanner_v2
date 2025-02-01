using Microsoft.AspNetCore.Mvc;
using ReciPlanner.Repositories;
using ReciPlanner.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Authorization;


namespace ReciPlanner.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipesController : ControllerBase
    {
        private IRecipeRepository _recipeRepository;

        public RecipesController(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }

        [Authorize]
        [HttpPost]
        public IActionResult CreateRecipe(Recipe Recipe)
        {
            try
            {
                int recipeId = _recipeRepository.Create(Recipe);
                return Ok(recipeId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetRecipes()
        {
            try
            {
                var userIdClaim = HttpContext.User.FindFirst("UserId")?.Value;
                bool isValidUserId = int.TryParse(userIdClaim, out int userId);

                if (!isValidUserId) return StatusCode(500, "Invalid userId");

                var recipes = _recipeRepository.ReadByUser(userId);

                return Ok(recipes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error in controller: {ex.Message}");
            }

        }

        [Authorize]
        [HttpPatch("{recipeId}")]
        public IActionResult PatchRecipe(Recipe recipe, int recipeId)
        {
            try
            {
                _recipeRepository.Update(recipe, recipeId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{recipeId}")]
        public IActionResult DeleteRecipe(int recipeId)
        {
            try
            {
                _recipeRepository.Delete(recipeId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
