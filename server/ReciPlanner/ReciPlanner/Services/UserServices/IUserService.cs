using ReciPlanner.Models.Users;

namespace ReciPlanner.Services.UserServices
{
    public interface IUserService
    {
        bool RegisterUser (CreateUserData userDto);
        User ValidateLoginUser (LoginData loginData);
        UserDto GetUser(int userId);
        bool UpdateUser(CreateUserData createUserData, int userId);
    }
}
