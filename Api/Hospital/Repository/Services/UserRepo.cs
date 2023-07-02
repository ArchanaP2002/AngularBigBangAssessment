using Hospital.Data;
using Hospital.Models;
using Hospital.Repository.Interface;
using System.Diagnostics;

namespace Hospital.Repository.Services
{
    public class UserRepo : IbaseRepo<string, User>
    {
        private readonly HospitalContext _context;

        public UserRepo(HospitalContext context)
        {
            _context = context;
        }
        public User Add(User item)
        {
            try
            {
                _context.Users.Add(item);
                _context.SaveChanges();
                return item;
            }
            catch (Exception e)
            {
                Debug.WriteLine(e.Message);
                Debug.WriteLine(item);
            }
            return null;
        }

        public User Get(string key)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == key);
            return user;
        }

    }
}
