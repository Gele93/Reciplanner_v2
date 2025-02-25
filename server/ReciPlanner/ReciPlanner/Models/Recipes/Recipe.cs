namespace ReciPlanner.Models.Recipes
{
    public class Recipe
    {
        public int? Id { get; set; }
        public string Label { get; set; }
        public string Image { get; set; }
        public int Yield { get; set; }
        public List<string> DietLabels { get; set; }
        public List<string> HealthLabels { get; set; }
        public decimal Calories { get; set; }
        public int CaloriesPerServing { get; set; }
        public int TotalTime { get; set; }
        public Dictionary<string, NutritionDetails> TotalNutrients { get; set; }
        public List<string> IngredientLines { get; set; }
        public string Source { get; set; }
        public List<string> CuisineType { get; set; }
        public List<string> DishType { get; set; }
        public DateOnly StartDate { get; set; }
        public List<string> MealTypes { get; set; }
        public string Url { get; set; }
        public int UserId { get; set; }


        public Recipe(
    int? Id,
    string Label,
    string Image,
    int Yield,
    List<string> DietLabels,
    List<string> HealthLabels,
    decimal Calories,
    int CaloriesPerServing,
    int TotalTime,
    Dictionary<string, NutritionDetails> TotalNutrients,
    List<string> IngredientLines,
    string Source,
    List<string> CuisineType,
    List<string> DishType,
    DateOnly StartDate,
    List<string> MealTypes,
    string Url,
    int UserId)
        {
            this.Id = Id;
            this.Label = Label;
            this.Image = Image;
            this.Yield = Yield;
            this.DietLabels = DietLabels;
            this.HealthLabels = HealthLabels;
            this.Calories = Calories;
            this.CaloriesPerServing = CaloriesPerServing;
            this.TotalTime = TotalTime;
            this.TotalNutrients = TotalNutrients;
            this.IngredientLines = IngredientLines;
            this.Source = Source;
            this.CuisineType = CuisineType;
            this.DishType = DishType;
            this.StartDate = StartDate;
            this.MealTypes = MealTypes;
            this.Url = Url;
            this.UserId = UserId;
        }

    }
}
