using ReciPlanner.Models;

namespace ReciPlanner.Repositories
{
    public interface IUserRepository
    {
        public void Create(User user);
        public List<User> ReadAll();
        public User? ReadById(int userId);
        public User? ReadByName(string userName);
        public int? GetUserId(string userName);
        public void Update(User user, int userId);
        public void Delete(int userId);
    }
}
