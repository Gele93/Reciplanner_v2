namespace ReciPlanner.Models.Users
{
    public record User
    (
     int id,
     string Username,
     string Password,
     string Email,
     string Gender,
     int Age,
     int Weight,
     int Height,
     string ProfilePic,
     byte[] Salt
    );
}