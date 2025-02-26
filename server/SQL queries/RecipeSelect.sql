SELECT 
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
WHERE r.recipe_id = 6
GROUP BY r.recipe_id, r.label, r.image, r.calories;
