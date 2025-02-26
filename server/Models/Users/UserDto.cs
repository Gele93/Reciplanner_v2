namespace ReciPlanner.Models.Users
{
    public record UserDto
    (
     int id,
     string Username,
     string Email,
     string Gender,
     int Age,
     int Weight,
     int Height,
     string ProfilePic
        );

}