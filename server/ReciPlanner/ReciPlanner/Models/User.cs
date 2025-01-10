namespace ReciPlanner.Models
{
    public class User
    {
        public int? Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public int Weight { get; set; }
        public int Height { get; set; }
        public string ProfilePic{ get; set; }

        public User (int? Id, string Username, string Password, string Email, string Gender, int Age, int Weight, int Height, string ProfilePic)
        {
            this.Id = Id;
            this.Username = Username;
            this.Password = Password;
            this.Email = Email;
            this.Gender = Gender;
            this.Age = Age;
            this.Weight = Weight;
            this.Height = Height;
            this.ProfilePic = ProfilePic;
        }
    }
}
