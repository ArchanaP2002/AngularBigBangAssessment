using Hospital.Models.DTO;
using Hospital.Models;
using Hospital.Repository.Interface;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Hospital.Data;

namespace Hospital.Repository.Services
{
    public class UserService
    {
        private readonly IbaseRepo<string, User> _repo;
        private readonly ITokenGenerate _tokenService;
        private readonly HospitalContext _dbContext;

        public UserService(IbaseRepo<string, User> repo, ITokenGenerate tokenGenerate, HospitalContext dbContext)
        {
            _repo = repo;
            _tokenService = tokenGenerate;
            _dbContext = dbContext;
        }

        public UserDTO Login(UserDTO userDTO)
        {
            UserDTO user = null;
            var userData = _repo.Get(userDTO.Email);
            if (userData != null)
            {
                var hmac = new HMACSHA512(userData.HashKey);
                var userPass = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password));
                for (int i = 0; i < userPass.Length; i++)
                {
                    if (userPass[i] != userData.Password[i])
                        return null;
                }
                user = new UserDTO();
                user.Email = userData.Email;
                user.Role = userData.Role;
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }

        public UserDTO Register(UserRegisterDTO userDTO)
        {
            UserDTO user = null;
            var hmac = new HMACSHA512();
            userDTO.Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDTO.PasswordClear));
            userDTO.HashKey = hmac.Key;
            var resultUser = _repo.Add(userDTO);
            if (resultUser != null)
            {
                user = new UserDTO();
                user.Name = resultUser.Name;
                user.Email = resultUser.Email;
                user.Role = resultUser.Role;
                user.Token = _tokenService.GenerateToken(user);
            }
            return user;
        }

        public int GetDoctorCount()
        {
            return _dbContext.Users.Count(u => u.Role == "Doctor");
        }

        public int GetUserCount()
        {
            return _dbContext.Users.Count(u => u.Role == "User");
        }
    }
}
