namespace ReciPlanner.Models.Users
{
    public record CreateUserDto
   (
     string Username,
     string PasswordHash,
     string Email,
     string Gender,
     int Age,
     int Weight,
     int Height,
     string ProfilePic,
    byte[] Salt
    );
}