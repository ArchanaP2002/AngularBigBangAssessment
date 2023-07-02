using System.ComponentModel.DataAnnotations;

namespace Hospital.Models
{
    public class DoctorDetails
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Specialization { get; set; }
        public string? ImgPath { get; set; }
    }
}
