using corewebapiandangular.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;

namespace corewebapiandangular.Services
{
    public class HashService
    {
        public HashPasswordmodel HashPass(string password)
        {
            byte[] saltBytes = GenerateSalt();
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256))
            {
                byte[] Hash = pbkdf2.GetBytes(32); // 256-bit hash

                var hashdata = new HashPasswordmodel
                {
                    hash = Convert.ToBase64String(Hash),
                    salt = Convert.ToBase64String(saltBytes)
                };
                
                return hashdata;
            }
        }
        public string HashPassverifyer(string password, string salt)
        {
            byte[] bytes = Convert.FromBase64String(salt);
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, bytes, 10000, HashAlgorithmName.SHA256))
            {
                byte[] hash = pbkdf2.GetBytes(32); // 256-bit hash
                return Convert.ToBase64String(hash);
            }
        }

        private static byte[] GenerateSalt()
        {
            byte[] salt = new byte[16];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }
    }
}
