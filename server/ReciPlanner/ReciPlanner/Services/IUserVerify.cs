using ReciPlanner.Models;

namespace ReciPlanner.Services
{
    public interface IUserVerify
    {
        public bool IsValidLoginUser(LoginData loginData);
        public bool IsUniqueUsername(int? userId, string username);
        public bool IsUniqueEmail(int? userId, string email);
    }
}
