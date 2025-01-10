using ReciPlanner.Models;

namespace ReciPlanner.Services
{
    public interface IUserVerify
    {
        public bool IsValidUser(LoginData loginData);
    }
}
