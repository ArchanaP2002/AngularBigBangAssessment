using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Role { get; set; } = string.Empty;
        public byte[]? Password { get; set; }
        public byte[]? HashKey { get; set; }
      //  public string Specialization_Name { get; set; } = string.Empty;
        public  Specialization?  Specialization { get; set; }
    }
}
