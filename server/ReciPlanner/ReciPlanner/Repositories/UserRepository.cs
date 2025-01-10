using Npgsql;
using ReciPlanner.Models;
using System.Data;

namespace ReciPlanner.Repositories
{
    public class UserRepository : IUserRepository
    {
        const string _connectionString = "Server = localhost; Username=postgres;Database=reciplanner;Port=5432;Password=admin;SSLMode=Prefer";

        public void Create(User user)
        {
            string query = $@"INSERT INTO users (username, password, email, gender, age, weight, height, profile_pic)
                              VALUES (@username, @password, @email, @gender, @age, @weight, @height, @profile_pic)";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("username", user.Username);
                command.Parameters.AddWithValue("password", user.Password);
                command.Parameters.AddWithValue("email", user.Email);
                command.Parameters.AddWithValue("gender", user.Gender);
                command.Parameters.AddWithValue("age", user.Age);
                command.Parameters.AddWithValue("weight", user.Weight);
                command.Parameters.AddWithValue("height", user.Height);
                command.Parameters.AddWithValue("profile_pic", user.ProfilePic);

                command.ExecuteNonQuery();
            }
        }

        public List<User> ReadAll()
        {
            string query = $@"SELECT * FROM users";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                List<User> users = new();

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int user_id = reader.GetInt32("user_id");
                        string username = reader.GetString("username");
                        string password = reader.GetString("password");
                        string email = reader.GetString("email");
                        string gender = reader.GetString("gender");
                        int age = reader.GetInt32("age");
                        int weight = reader.GetInt32("weight");
                        int height = reader.GetInt32("height");
                        string profile_pic = reader.GetString("profile_pic");

                        users.Add(new(user_id, username, password, email, gender, age, weight, height, profile_pic));
                    }
                }

                return users;
            }
        }
        public User? ReadById(int userId)
        {
            string query = $@"SELECT * FROM users WHERE user_id = @userId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("userId", userId);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int user_id = reader.GetInt32("user_id");
                        string username = reader.GetString("username");
                        string password = reader.GetString("password");
                        string email = reader.GetString("email");
                        string gender = reader.GetString("gender");
                        int age = reader.GetInt32("age");
                        int weight = reader.GetInt32("weight");
                        int height = reader.GetInt32("height");
                        string profile_pic = reader.GetString("profile_pic");

                        return new(user_id, username, password, email, gender, age, weight, height, profile_pic);
                    }
                }
                return null;
            }
        }
        public User? ReadByName(string username)
        {
            string query = $@"SELECT * FROM users WHERE username = @username";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("username", username);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int user_id = reader.GetInt32("user_id");
                        string password = reader.GetString("password");
                        string email = reader.GetString("email");
                        string gender = reader.GetString("gender");
                        int age = reader.GetInt32("age");
                        int weight = reader.GetInt32("weight");
                        int height = reader.GetInt32("height");
                        string profile_pic = reader.GetString("profile_pic");

                        return new(user_id, username, password, email, gender, age, weight, height, profile_pic);
                    }
                }
                return null;
            }
        }
        public int? GetUserId(string username)
        {
            string query = $@"SELECT user_id FROM users WHERE username = @username";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("username", username);

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        int user_id = reader.GetInt32("user_id");
                        return user_id;
                    }
                }
                return null;
            }
        }

        public void Update(User user, int userId)
        {
            string query = $@"UPDATE users 
                              SET username = @username, password = @password, email = @email, gender = @gender, age = @age, weight = @weight, height = @height, profile_pic = @profile_pic
                              WHERE user_id = @userId ";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("username", user.Username);
                command.Parameters.AddWithValue("password", user.Password);
                command.Parameters.AddWithValue("email", user.Email);
                command.Parameters.AddWithValue("gender", user.Gender);
                command.Parameters.AddWithValue("age", user.Age);
                command.Parameters.AddWithValue("weight", user.Weight);
                command.Parameters.AddWithValue("height", user.Height);
                command.Parameters.AddWithValue("profile_pic", user.ProfilePic);
                command.Parameters.AddWithValue("userId", userId);

                command.ExecuteNonQuery();
            }
        }
        public void Delete(int userId)
        {
            string query = $@"DELTE FROM users
                              WHERE user_id = @userId";

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.Parameters.AddWithValue("user_id", userId);

                command.ExecuteNonQuery();
            }
        }
    }
}
