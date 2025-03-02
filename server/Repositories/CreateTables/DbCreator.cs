using Npgsql;

using ReciPlanner.Models.Users;

using System.Data;

namespace ReciPlanner.Repositories.CreateTables
{
    public class DbCreator
    {
        private readonly string _connectionString;

        
        public DbCreator(IConfiguration config)
        {
            _connectionString = config["ConnectionStrings:Postgres"];
        }
        
        public void Create()
        {
            string query = CreateTablesScript.query;

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                if (connection.State == ConnectionState.Closed) connection.Open();

                var command = new NpgsqlCommand(query, connection);

                command.ExecuteNonQuery();
            }
        }


    }
}
