namespace ReciPlanner.Models.Users
{
    public record CreateUserData
    (
     string Username,
     string Password,
     string Email,
     string Gender,
     int Age,
     int Weight,
     int Height,
     string ProfilePic
    );
}
