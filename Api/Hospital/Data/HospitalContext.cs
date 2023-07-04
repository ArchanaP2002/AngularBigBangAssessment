using Hospital.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Data
{
    public class HospitalContext : DbContext
    {
        public HospitalContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<DoctorDetails> DoctorDetails { get; set; }
        public DbSet<Approval> Approvals { get; set; }
    }
}
