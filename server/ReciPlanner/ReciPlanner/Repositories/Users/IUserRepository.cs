using ReciPlanner.Models.Users;

namespace ReciPlanner.Repositories.Users
{
    public interface IUserRepository
    {
        public void Create(CreateUserDto user);
        public List<User> ReadAll();
        public User? ReadById(int userId);
        public User? ReadByName(string userName);
        public int? GetUserId(string userName);
        public void Update(CreateUserDto user, int userId);
        public void Delete(int userId);
    }
}
