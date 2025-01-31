using ReciPlanner.Models;
using ReciPlanner.Repositories;

namespace ReciPlanner.Services
{
    public class UserVerify : IUserVerify
    {
        private IUserRepository _userRepository;

        public UserVerify(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public bool IsValidLoginUser(LoginData loginData)
        {
            try
            {
                var user = _userRepository.ReadByName(loginData.username);

                if (user == null) return false;

                return user.Password == loginData.password;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool IsUniqueUsername(int? userId, string username)
        {
            var allUsers = _userRepository.ReadAll();

            var user = allUsers.FirstOrDefault(u => u.Username == username);

            if (user is null || user.Id == userId) return true;

            return false;
        }
        public bool IsUniqueEmail(int? userId, string email)
        {
            var allUsers = _userRepository.ReadAll();

            var user = allUsers.FirstOrDefault(u => u.Email == email);

            if (user is null || user.Id == userId) return true;

            return false;
        }

    }
}
