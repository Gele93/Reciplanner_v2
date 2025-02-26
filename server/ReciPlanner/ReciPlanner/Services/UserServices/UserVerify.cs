using System.Security.Cryptography;
using System.Text;

using ReciPlanner.Models;
using ReciPlanner.Repositories.Users;

namespace ReciPlanner.Services.UserServices
{
    public class UserVerify : IUserVerify
    {
        private readonly IUserRepository _userRepository;

        public UserVerify(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public bool IsUniqueUsername(string username)
        {
            var allUsers = _userRepository.ReadAll();

            var user = allUsers.FirstOrDefault(u => u.Username == username);

            if (user is null) return true;

            return false;
        }

        public bool IsUniqueUsername(string username, int userId)
        {
            var allUsers = _userRepository.ReadAll();

            var user = allUsers.FirstOrDefault(u => u.Username == username);

            if (user is null || user.id == userId) return true;

            return false;
        }

        public bool IsUniqueEmail(string email)
        {
            var allUsers = _userRepository.ReadAll();

            var user = allUsers.FirstOrDefault(u => u.Email == email);

            if (user is null) return true;

            return false;
        }
        public bool IsUniqueEmail(string email, int userId)
        {
            var allUsers = _userRepository.ReadAll();

            var user = allUsers.FirstOrDefault(u => u.Email == email);

            if (user is null || user.id == userId) return true;

            return false;
        }
    }
}