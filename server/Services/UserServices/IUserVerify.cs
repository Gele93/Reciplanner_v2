using ReciPlanner.Models;

namespace ReciPlanner.Services.UserServices
{
    public interface IUserVerify
    {
        public bool IsUniqueUsername(string username);
        public bool IsUniqueUsername(string username, int userId);
        public bool IsUniqueEmail(string email);
        public bool IsUniqueEmail(string email, int userId);

    }
}