using System.Security.Claims;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

using ReciPlanner.Models.Users;
using ReciPlanner.Repositories.Users;

namespace ReciPlanner.Services.UserServices
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserVerify _userVerify;
        private readonly IHasher _hasher;
        public UserService(IUserRepository userRepository, IUserVerify userVerify, IHasher hasher)
        {
            _userRepository = userRepository;
            _userVerify = userVerify;
            _hasher = hasher;
        }

        public bool RegisterUser(CreateUserData userData)
        {

            if (userData == null) throw new Exception("Invalid user data");

            if (!_userVerify.IsUniqueUsername(userData.Username)) throw new Exception("username is already taken");

            if (!_userVerify.IsUniqueEmail(userData.Email)) throw new Exception("email is already taken");

            var passwordHash = _hasher.HashPassword(userData.Password, out var salt);
            var userToCreate = new CreateUserDto
                (
                userData.Username,
                passwordHash,
                userData.Email,
                userData.Gender,
                userData.Age,
                userData.Weight,
                userData.Height,
                userData.ProfilePic,
                salt
                );

            _userRepository.Create(userToCreate);

            return true;
        }

        public User ValidateLoginUser(LoginData loginData)
        {
            var user = _userRepository.ReadByName(loginData.username);

            if (user == null) throw new Exception("Invalid username");

            if (!_hasher.VerifyPassword(loginData.password, user.Password, user.Salt)) throw new Exception("Invalid username or password");

            return user;

        }

        public UserDto GetUser(int userId)
        {
            var user = _userRepository.ReadById(userId);

            if (user is null) throw new Exception("User not found");
            return new UserDto(user.id, user.Username, user.Email, user.Gender, user.Age, user.Weight, user.Height, user.ProfilePic);
        }


        public bool UpdateUser(CreateUserData createUserData, int userId)
        {
            if (!_userVerify.IsUniqueUsername(createUserData.Username, userId)) throw new Exception("username is already taken");

            if (!_userVerify.IsUniqueEmail(createUserData.Email, userId)) throw new Exception("email is already taken");

            var passwordHash = _hasher.HashPassword(createUserData.Password, out var salt);
            var updatedUser = new CreateUserDto(
                createUserData.Username,
                passwordHash,
                createUserData.Email,
                createUserData.Gender,
                createUserData.Age,
                createUserData.Weight,
                createUserData.Height,
                createUserData.ProfilePic,
                salt
                );

            _userRepository.Update(updatedUser, userId);
            return true;
        }

    }
}