using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class Specialization
    {
        [Key]
        public string Specialization_Name { get; set; } = string.Empty;

       //public string? Description { get; set; }
    }
}
