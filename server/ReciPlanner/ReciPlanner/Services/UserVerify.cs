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
        public bool IsValidUser(LoginData loginData)
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

    }
}
