using Microsoft.AspNetCore.Hosting.Server;
using Npgsql;
using System;
using System.Data;
using System.ComponentModel;
using ReciPlanner.Models.Recipes;

namespace ReciPlanner.Repositories.Recipes
{
    public class RecipeRepository : IRecipeRepository
    {
        private string _connectionString;

        public RecipeRepository(IConfiguration config)
        {
            _connectionString = config["ConnectionStrings:Postgres"];
        }

        public int Create(Recipe Recipe)
        {
            string query = $@"INSERT INTO recipes (label, image, servings, calories, calories_per_serving, total_time, source, start_date, url, user_id)
                            VALUES (@label, @image, @servings, @calories, @calories_per_serving, @total_time, @source, @start_date, @url, @user_id )
                            RETURNING recipe_id;";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("label", Recipe.Label);
                command.Parameters.AddWithValue("image", Recipe.Image);
                command.Parameters.AddWithValue("servings", Recipe.Yield);
                command.Parameters.AddWithValue("calories", Recipe.Calories);
                command.Parameters.AddWithValue("calories_per_serving", Recipe.CaloriesPerServing);
                command.Parameters.AddWithValue("total_time", Recipe.TotalTime);
                command.Parameters.AddWithValue("source", Recipe.Source);
                command.Parameters.AddWithValue("start_date", Recipe.StartDate);
                command.Parameters.AddWithValue("url", Recipe.Url);
                command.Parameters.AddWithValue("user_id", Recipe.UserId);

                var idData = command.ExecuteScalar();
                int recipeId = Convert.ToInt32(idData);

                CreateSimpleSubtableEntries(Recipe.CuisineType, "cuisine_types");
                foreach (var cuisine in Recipe.CuisineType)
                {
                    CreateConnectionTable("cuisine_types_to_recipes", "cuisine_type_id", recipeId, GetIdFromSubtable("cuisine_types", "cuisine_type_id", cuisine));
                }

                CreateSimpleSubtableEntries(Recipe.DietLabels, "diet_labels");
                foreach (var diet in Recipe.DietLabels)
                {
                    CreateConnectionTable("diet_labels_to_recipes", "diet_label_id", recipeId, GetIdFromSubtable("diet_labels", "diet_label_id", diet));
                }

                CreateSimpleSubtableEntries(Recipe.DishType, "dish_types");
                foreach (var dish in Recipe.DishType)
                {
                    CreateConnectionTable("dish_types_to_recipes", "dish_type_id", recipeId, GetIdFromSubtable("dish_types", "dish_type_id", dish));
                }

                CreateSimpleSubtableEntries(Recipe.HealthLabels, "health_labels");
                foreach (var health in Recipe.HealthLabels)
                {
                    CreateConnectionTable("health_labels_to_recipes", "health_label_id", recipeId, GetIdFromSubtable("health_labels", "health_label_id", health));
                }

                CreateSimpleSubtableEntries(Recipe.IngredientLines, "ingredient_lines");
                foreach (var ingredient in Recipe.IngredientLines)
                {
                    CreateConnectionTable("ingredient_lines_to_recipes", "ingredient_line_id", recipeId, GetIdFromSubtable("ingredient_lines", "ingredient_line_id", ingredient));
                }

                CreateSimpleSubtableEntries(Recipe.MealTypes, "meal_types");
                foreach (var meal in Recipe.MealTypes)
                {
                    CreateConnectionTable("meal_types_to_recipes", "meal_type_id", recipeId, GetIdFromSubtable("meal_types", "meal_type_id", meal));
                }

                CreateNutrients(Recipe.TotalNutrients);
                foreach (var nutrient in Recipe.TotalNutrients)
                {
                    CreateTotalNutrientToRecipe(recipeId, GetIdFromSubtable("nutrients", "nutrient_id", nutrient.Value.label), nutrient.Value.quantity);
                }

                return recipeId;
            }
        }

        private void CreateSimpleSubtableEntries(List<string> labelList, string tableName)
        {
            string query = $@"INSERT INTO {tableName} (name) VALUES (@name) ON CONFLICT (name) DO NOTHING;";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                foreach (var label in labelList)
                {
                    var cmd = new NpgsqlCommand(query, connection);

                    cmd.Parameters.AddWithValue("name", label);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        private int GetIdFromSubtable(string tableName, string idName, string label)
        {
            string query = $@"SELECT {idName} FROM {tableName} WHERE name = @nutrient";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();
                var cmd = new NpgsqlCommand(query, connection);

                cmd.Parameters.AddWithValue("nutrient", label);

                int id = 0;

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        id = reader.GetInt32(0);
                    }
                }
                return id;
            }
        }
        private void CreateConnectionTable(string tableName, string subIdName, int recipeId, int subId)
        {
            string query = $@"INSERT INTO {tableName} (recipe_id, {subIdName}) VALUES (@recipe_id, @sub_id);";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();
                var cmd = new NpgsqlCommand(query, connection);

                cmd.Parameters.AddWithValue("recipe_id", recipeId);
                cmd.Parameters.AddWithValue("sub_id", subId);

                cmd.ExecuteNonQuery();
            }
        }
        private void CreateNutrients(Dictionary<string, NutritionDetails> nutrients)
        {
            string query = $@"INSERT INTO nutrients (name, unit, label) VALUES (@name, @unit, @label) ON CONFLICT (name) DO NOTHING;";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                foreach (var nutrient in nutrients)
                {
                    var cmd = new NpgsqlCommand(query, connection);

                    cmd.Parameters.AddWithValue("name", nutrient.Value.label);
                    cmd.Parameters.AddWithValue("unit", nutrient.Value.unit);
                    cmd.Parameters.AddWithValue("label", nutrient.Key);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        private void CreateTotalNutrientToRecipe(int recipeId, int nutrientId, decimal quantity)
        {
            string query = $@"INSERT INTO total_nutrients_to_recipes (recipe_id, nutrient_id, quantity) VALUES (@recipe_id, @nutrient_id, @quantity);";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();
                var cmd = new NpgsqlCommand(query, connection);

                cmd.Parameters.AddWithValue("recipe_id", recipeId);
                cmd.Parameters.AddWithValue("nutrient_id", nutrientId);
                cmd.Parameters.AddWithValue("quantity", quantity);

                cmd.ExecuteNonQuery();
            }
        }



        public List<Recipe> ReadByUser(int UserId)
        {
            string query = $@"SELECT 
    r.recipe_id,
    r.label,
    r.image,
	r.servings,	
	calories,
	calories_per_serving,
	total_time,
	source,
	start_date,
	url,
	user_id,
    ARRAY_AGG(DISTINCT ct.name) AS cuisine_types,
    ARRAY_AGG(DISTINCT dl.name) AS diet_labels,
	ARRAY_AGG(DISTINCT dt.name) AS dish_types,
	ARRAY_AGG(DISTINCT hl.name) AS health_labels,
	ARRAY_AGG(DISTINCT il.name) AS ingredient_lines,
	ARRAY_AGG(DISTINCT mt.name) AS meal_types
FROM recipes r
LEFT JOIN cuisine_types_to_recipes ctr ON ctr.recipe_id = r.recipe_id
LEFT JOIN cuisine_types ct ON ct.cuisine_type_id = ctr.cuisine_type_id
LEFT JOIN diet_labels_to_recipes dlr ON dlr.recipe_id = r.recipe_id
LEFT JOIN diet_labels dl ON dl.diet_label_id = dlr.diet_label_id
LEFT JOIN dish_types_to_recipes dtr ON dtr.recipe_id = r.recipe_id
LEFT JOIN dish_types dt ON dt.dish_type_id = dtr.dish_type_id
LEFT JOIN health_labels_to_recipes hlr ON hlr.recipe_id = r.recipe_id
LEFT JOIN health_labels hl ON hl.health_label_id = hlr.health_label_id
LEFT JOIN ingredient_lines_to_recipes ilr ON ilr.recipe_id = r.recipe_id
LEFT JOIN ingredient_lines il ON il.ingredient_line_id = ilr.ingredient_line_id
LEFT JOIN meal_types_to_recipes mtr ON mtr.recipe_id = r.recipe_id
LEFT JOIN meal_types mt ON mt.meal_type_id = mtr.meal_type_id
WHERE r.user_id = @userId
GROUP BY r.recipe_id, r.label, r.image, r.calories;";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("userId", UserId);

                List<Recipe> recipes = new();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int recipeId = reader.GetInt32("recipe_id");
                        string label = reader.GetString("label");
                        string image = reader.GetString("image");
                        int yield = reader.GetInt32("servings");
                        decimal calories = reader.GetDecimal("calories");
                        int caloriesPerServing = reader.GetInt32("calories_per_serving");
                        int totalTime = reader.GetInt32("total_time");
                        string source = reader.GetString("source");
                        DateOnly startDate = DateOnly.FromDateTime(reader.GetDateTime("start_date"));
                        string url = reader.GetString("url");
                        List<string> cuisineType = reader.GetFieldValue<List<string>>("cuisine_types");
                        List<string> dietLabels = reader.GetFieldValue<List<string>>("diet_labels");
                        List<string> dishType = reader.GetFieldValue<List<string>>("dish_types");
                        List<string> healthLabels = reader.GetFieldValue<List<string>>("health_labels");
                        List<string> ingredientLines = reader.GetFieldValue<List<string>>("ingredient_lines");
                        List<string> mealTypes = reader.GetFieldValue<List<string>>("meal_types");
                        Dictionary<string, NutritionDetails> totalNutrients = ReadNutritionDetails(recipeId);

                        recipes.Add(new(recipeId, label, image, yield, dietLabels, healthLabels, calories, caloriesPerServing, totalTime, totalNutrients, ingredientLines, source, cuisineType, dishType, startDate, mealTypes, url, UserId));
                    }
                }
                return recipes;
            }
        }

        private Dictionary<string, NutritionDetails> ReadNutritionDetails(int recipeId)
        {
            string query = $@"SELECT * FROM total_nutrients_to_recipes WHERE recipe_id = @recipeId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("recipeId", recipeId);

                Dictionary<string, NutritionDetails> totalNutrients = new();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        string label = GetNutrientLabel(reader.GetInt32("nutrient_id"));
                        string name = GetNutrientName(reader.GetInt32("nutrient_id"));
                        int quantity = reader.GetInt32("quantity");
                        string unit = GetNutrientUnit(reader.GetInt32("nutrient_id"));

                        NutritionDetails nutToAdd = new(name, quantity, unit);

                        totalNutrients.Add(label, nutToAdd);
                    }
                }

                return totalNutrients;
            }
        }
        private string GetNutrientLabel(int nutId)
        {
            string query = $@"SELECT label FROM nutrients WHERE nutrient_id = @nutId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("nutId", nutId);

                var labelObj = command.ExecuteScalar();

                string label = Convert.ToString(labelObj);

                return label;
            }
        }
        private string GetNutrientName(int nutId)
        {
            string query = $@"SELECT name FROM nutrients WHERE nutrient_id = @nutId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("nutId", nutId);

                var nameObj = command.ExecuteScalar();

                string name = Convert.ToString(nameObj);

                return name;
            }
        }
        private string GetNutrientUnit(int nutId)
        {
            string query = $@"SELECT unit FROM nutrients WHERE nutrient_id = @nutId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("nutId", nutId);

                var unitObj = command.ExecuteScalar();

                string unit = Convert.ToString(unitObj);

                return unit;
            }
        }

        public void Update(Recipe Recipe, int recipeId)
        {
            string query = $@"UPDATE recipes SET servings = @servings, start_date = @startDate WHERE recipe_id = @recipeId;";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("servings", Recipe.Yield);
                command.Parameters.AddWithValue("startDate", Recipe.StartDate);
                command.Parameters.AddWithValue("recipeId", recipeId);

                command.ExecuteNonQuery();

                UpdateMealTypeToRecipe(Recipe.MealTypes, recipeId);
            }
        }

        private void UpdateMealTypeToRecipe(List<string> updatedMealTypes, int recipeId)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var currentMealTypes = ReadMealTypes(connection, recipeId);

                foreach (var mealType in currentMealTypes)
                {
                    if (!updatedMealTypes.Any(m => m == mealType)) DeleteMealTypeFromRecipe(connection, mealType, recipeId);
                }

                CreateSimpleSubtableEntries(updatedMealTypes, "meal_types");
                foreach (var mealType in updatedMealTypes)
                {
                    if (!currentMealTypes.Any(m => m == mealType))
                    {
                        CreateConnectionTable("meal_types_to_recipes", "meal_type_id", recipeId, GetIdFromSubtable("meal_types", "meal_type_id", mealType));
                    }
                }

            }
        }

        private List<string> ReadMealTypes(NpgsqlConnection connection, int recipeId)
        {
            string query = $@"SELECT mt.name FROM meal_types_to_recipes mtr
                              JOIN meal_types mt ON mtr.meal_type_id = mt.meal_type_id
                              WHERE recipe_id = @recipeId";

            var command = new NpgsqlCommand(query, connection);

            command.Parameters.AddWithValue("recipeId", recipeId);

            List<string> mealTypes = new();

            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    string name = reader.GetString("name");
                    mealTypes.Add(name);
                }
            }
            return mealTypes;
        }
        private void DeleteMealTypeFromRecipe(NpgsqlConnection connection, string mealType, int recipeId)
        {
            string query = $@"DELETE FROM meal_types_to_recipes mtr
                              USING meal_types mt
                              WHERE mtr.meal_type_id = mt.meal_type_id
                              AND mtr.recipe_id = @recipeId
                              AND mt.name = @mealType;";

            var command = new NpgsqlCommand(query, connection);

            command.Parameters.AddWithValue("recipeId", recipeId);
            command.Parameters.AddWithValue("mealType", mealType);

            command.ExecuteNonQuery();
        }

        public void Delete(int recipeId)
        {
            string query = $@"DELETE FROM cuisine_types_to_recipes WHERE recipe_id = @recipeId;
                              DELETE FROM diet_labels_to_recipes WHERE recipe_id = @recipeId;
                              DELETE FROM dish_types_to_recipes WHERE recipe_id = @recipeId;
                              DELETE FROM health_labels_to_recipes WHERE recipe_id = @recipeId;
                              DELETE FROM ingredient_lines_to_recipes WHERE recipe_id = @recipeId;
                              DELETE FROM meal_types_to_recipes WHERE recipe_id = @recipeId;
                              DELETE FROM total_nutrients_to_recipes WHERE recipe_id = @recipeId;
                              DELETE FROM recipes WHERE recipe_id = @recipeId;";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        using (var command = new NpgsqlCommand(query, connection, transaction))
                        {
                            command.Parameters.AddWithValue("recipeId", recipeId);
                            command.ExecuteNonQuery();
                        }
                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }

            }
        }
    }
}
