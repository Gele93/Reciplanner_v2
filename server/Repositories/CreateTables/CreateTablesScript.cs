namespace ReciPlanner.Repositories.CreateTables
{
    public static class CreateTablesScript
    {
        public readonly static string query = @"
CREATE TABLE IF NOT EXISTS public.cuisine_types
(
cuisine_type_id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT uq_cuisine_type UNIQUE (name)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.diet_labels
(
    diet_label_id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT uq_diet_labels UNIQUE (name)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.diet_labels
(
    diet_label_id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT uq_diet_labels UNIQUE (name)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.health_labels
(
    health_label_id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT uq_health_labels UNIQUE (name)
)

TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS public.ingredient_lines
(
    ingredient_line_id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT uq_ingredient UNIQUE (name)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.meal_types
(
    meal_type_id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT uq_meal_types UNIQUE (name)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.nutrients
(
    nutrient_id SERIAL PRIMARY KEY,
    name character varying(255) COLLATE pg_catalog.""default"",
    unit character varying(255) COLLATE pg_catalog.""default"",
    label character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT uq_nutrients UNIQUE (name)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id SERIAL PRIMARY KEY,
    username character varying(255) COLLATE pg_catalog.""default"",
    password character varying(512) COLLATE pg_catalog.""default"",
    email character varying(255) COLLATE pg_catalog.""default"",
    gender character varying(255) COLLATE pg_catalog.""default"",
    age integer,
    weight integer,
    height integer,
    profile_pic character varying(255) COLLATE pg_catalog.""default"",
    salt bytea,
)

TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS public.recipes
(
    recipe_id SERIAL PRIMARY KEY,
    label character varying(255) COLLATE pg_catalog.""default"",
    image text COLLATE pg_catalog.""default"",
    servings integer,
    calories integer,
    calories_per_serving integer,
    total_time integer,
    source character varying(255) COLLATE pg_catalog.""default"",
    start_date date,
    url character varying(255) COLLATE pg_catalog.""default"",
    user_id integer,
    CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS public.cuisine_types_to_recipes
(
    recipe_id integer,
    cuisine_type_id integer,
    CONSTRAINT cuisine_types_to_recipes_cuisine_type_id_fkey FOREIGN KEY (cuisine_type_id)
        REFERENCES public.cuisine_types (cuisine_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT cuisine_types_to_recipes_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.diet_labels_to_recipes
(
    recipe_id integer,
    diet_label_id integer,
    CONSTRAINT recipes_diet_labels_diet_label_id_fkey FOREIGN KEY (diet_label_id)
        REFERENCES public.diet_labels (diet_label_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT recipes_diet_labels_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS public.dish_types_to_recipes
(
    recipe_id integer,
    dish_type_id integer,
    CONSTRAINT dish_types_to_recipes_dish_type_id_fkey FOREIGN KEY (dish_type_id)
        REFERENCES public.dish_types (dish_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT dish_types_to_recipes_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.health_labels_to_recipes
(
    recipe_id integer,
    health_label_id integer,
    CONSTRAINT health_labels_to_recipes_health_label_id_fkey FOREIGN KEY (health_label_id)
        REFERENCES public.health_labels (health_label_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT health_labels_to_recipes_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.ingredient_lines_to_recipes
(
    recipe_id integer,
    ingredient_line_id integer,
    CONSTRAINT ingredient_lines_to_recipes_ingredient_line_id_fkey FOREIGN KEY (ingredient_line_id)
        REFERENCES public.ingredient_lines (ingredient_line_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT ingredient_lines_to_recipes_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.meal_types_to_recipes
(
    recipe_id integer,
    meal_type_id integer,
    CONSTRAINT meal_types_to_recipes_meal_type_id_fkey FOREIGN KEY (meal_type_id)
        REFERENCES public.meal_types (meal_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT meal_types_to_recipes_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS public.total_nutrients_to_recipes
(
    recipe_id integer,
    nutrient_id integer,
    quantity integer,
    CONSTRAINT total_nutrients_to_recipes_nutrient_id_fkey FOREIGN KEY (nutrient_id)
        REFERENCES public.nutrients (nutrient_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT total_nutrients_to_recipes_recipe_id_fkey FOREIGN KEY (recipe_id)
        REFERENCES public.recipes (recipe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

";
    }
}
