using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

using ReciPlanner.Models.Recipes;
using ReciPlanner.Repositories.Recipes;


namespace ReciPlanner.Controllers.Recipes
{
    [ApiController]
    [Route("[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly ILogger<RecipesController> _logger;

        public RecipesController(IRecipeRepository recipeRepository, ILogger<RecipesController> logger)
        {
            _recipeRepository = recipeRepository;
            _logger = logger;
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
                _logger.LogError(ex.Message);
                return StatusCode(500, "Creating recipe failed");
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
                _logger.LogError(ex.Message);
                return StatusCode(500, "Getting recipes failed");
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
                _logger.LogError(ex.Message);
                return StatusCode(500, $"Updating #{recipeId} recipe failed");
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
                _logger.LogError(ex.Message);
                return StatusCode(500, $"Deleting #{recipeId} failed");
            }
        }
    }
}