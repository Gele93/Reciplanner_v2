CREATE TABLE IF NOT EXISTS public.cuisine_types
(
    cuisine_type_id integer NOT NULL DEFAULT nextval('cuisine_types_cuisine_type_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT cuisine_types_pkey PRIMARY KEY (cuisine_type_id),
    CONSTRAINT uq_cuisine_type UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cuisine_types
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.diet_labels
(
    diet_label_id integer NOT NULL DEFAULT nextval('diet_labels_diet_label_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT diet_labels_pkey PRIMARY KEY (diet_label_id),
    CONSTRAINT uq_diet_labels UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.diet_labels
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.diet_labels
(
    diet_label_id integer NOT NULL DEFAULT nextval('diet_labels_diet_label_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT diet_labels_pkey PRIMARY KEY (diet_label_id),
    CONSTRAINT uq_diet_labels UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.diet_labels
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.health_labels
(
    health_label_id integer NOT NULL DEFAULT nextval('health_labels_health_label_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT health_labels_pkey PRIMARY KEY (health_label_id),
    CONSTRAINT uq_health_labels UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.health_labels
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.ingredient_lines
(
    ingredient_line_id integer NOT NULL DEFAULT nextval('ingredient_lines_ingredient_line_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT ingredient_lines_pkey PRIMARY KEY (ingredient_line_id),
    CONSTRAINT uq_ingredient UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.ingredient_lines
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.meal_types
(
    meal_type_id integer NOT NULL DEFAULT nextval('meal_types_meal_type_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT meal_types_pkey PRIMARY KEY (meal_type_id),
    CONSTRAINT uq_meal_types UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.meal_types
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.nutrients
(
    nutrient_id integer NOT NULL DEFAULT nextval('nutrients_nutrient_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog.""default"",
    unit character varying(255) COLLATE pg_catalog.""default"",
    label character varying(255) COLLATE pg_catalog.""default"",
    CONSTRAINT nutrients_pkey PRIMARY KEY (nutrient_id),
    CONSTRAINT uq_nutrients UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.nutrients
    OWNER to postgres;



CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    username character varying(255) COLLATE pg_catalog.""default"",
    password character varying(512) COLLATE pg_catalog.""default"",
    email character varying(255) COLLATE pg_catalog.""default"",
    gender character varying(255) COLLATE pg_catalog.""default"",
    age integer,
    weight integer,
    height integer,
    profile_pic character varying(255) COLLATE pg_catalog.""default"",
    salt bytea,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;



CREATE TABLE IF NOT EXISTS public.recipes
(
    recipe_id integer NOT NULL DEFAULT nextval('recipes_recipe_id_seq'::regclass),
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
    CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id),
    CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.recipes
    OWNER to postgres;


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

ALTER TABLE IF EXISTS public.cuisine_types_to_recipes
    OWNER to postgres;


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

ALTER TABLE IF EXISTS public.diet_labels_to_recipes
    OWNER to postgres;


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

ALTER TABLE IF EXISTS public.dish_types_to_recipes
    OWNER to postgres;


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

ALTER TABLE IF EXISTS public.health_labels_to_recipes
    OWNER to postgres;



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

ALTER TABLE IF EXISTS public.ingredient_lines_to_recipes
    OWNER to postgres;

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

ALTER TABLE IF EXISTS public.meal_types_to_recipes
    OWNER to postgres;



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

ALTER TABLE IF EXISTS public.total_nutrients_to_recipes
    OWNER to postgres;