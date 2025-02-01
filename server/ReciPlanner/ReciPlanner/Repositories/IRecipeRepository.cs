using ReciPlanner.Models;
using ReciPlanner.Models.Nutritions;

namespace ReciPlanner.Repositories
{
    public interface IRecipeRepository
    {
        public int Create(Recipe recipe);
        public List<Recipe> ReadByUser(int userId);
        public void Update(Recipe recipe, int recipeId);
        public void Delete(int recipeId);
    }
}
