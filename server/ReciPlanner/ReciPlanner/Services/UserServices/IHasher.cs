namespace ReciPlanner.Services.UserServices
{
    public interface IHasher
    {
        string HashPassword(string password, out byte[] salt);
        bool VerifyPassword(string password, string hash, byte[] salt);
    }
}