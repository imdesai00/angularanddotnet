using corewebapiandangular.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Npgsql;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace corewebapiandangular.Services
{

    public interface IJwtService
    {
        String GenerateToken(string username);
        string GetreJwtToken(string referenceToken);
        string generaterefarancetoken();
        //bool IsValidRefreshToken(string refreshToken);
        //void StorerefToken(User user, string token, string reftoken);
    }
    public class JwtService : IJwtService
    {
        private readonly string _connectionstring;

        public JwtService(IConfiguration configuration)
        {
            _connectionstring = configuration.GetConnectionString("postgre");
        }

        public string GenerateToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("abcdefghijklmnopqrstuvwxyzsuperSecretKey@345");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, username),
                }),
                Expires = DateTime.UtcNow.AddMinutes(1),
                Issuer = "https://localhost:5050",
                Audience = "https://localhost:5050",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string generaterefarancetoken()
        {
            var reftoken = Guid.NewGuid().ToString();
            return reftoken;
        }
        public string GetreJwtToken(string referenceToken)
        {
            // Generate new JWT token with a new expiration time
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("abcdefghijklmnopqrstuvwxyzsuperSecretKey@345");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.Name, "username") // Get the username from refresh token
                }),
                Expires = DateTime.UtcNow.AddMinutes(15), // Set new token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return jwtToken;
            
        }
        //public bool IsValidRefreshToken(string refreshToken)
        //{
        //    var refreshTokenExists = new RefTokens();
        //    using (var connection = new NpgsqlConnection(_connectionstring))
        //    {
        //        connection.Open();
        //        using (var command = new NpgsqlCommand())
        //        {
        //            command.Connection = connection;
        //            command.CommandText = "SELECT * FROM \"RefTokens\" where \"RefToken\" = @reftoken";
        //            command.Parameters.AddWithValue("@reftoken", refreshToken);
        //            using (var reader = command.ExecuteReader())
        //            {
        //                while (reader.Read())
        //                {
        //                    var user = new RefTokens
        //                    {
        //                        Email = Convert.ToString(reader["Email"]),
        //                        RefToken = Convert.ToString(reader["RefToken"]),
        //                        UserName = Convert.ToString(reader["UserName"])
        //                    };
        //                    refreshTokenExists = user;
        //                }
                        
        //            }
        //            return true;
        //            //if (refreshTokenExists.RefToken == null)
        //            //{
        //            //    return false;
        //            //}
        //            //else
        //            //{
        //            //    command.CommandText = "DELETE FROM \"RefTokens\" where \"Email\" = @email";
        //            //    command.Parameters.AddWithValue("@email", refreshTokenExists.Email);
        //            //    command.ExecuteNonQuery();
        //            //    return true;
        //            //}
        //        }
        //    }
            
        //}
        //public void StorerefToken(User user, string token, string reftoken)
        //{
        //    var tokenEntry = new RefTokens
        //    {
        //        Email = user.Email,
        //        RefToken = reftoken,
        //        UserName = user.UserName
        //    };
        //    using (var connection = new NpgsqlConnection(_connectionstring))
        //    {
        //        connection.Open();
        //        using (var command = new NpgsqlCommand("insert into \"RefTokens\" (\"Email\",\"RefToken\",\"UserName\") values (@email,@token,@username);", connection))
        //        {
        //            command.Parameters.AddWithValue("@email", tokenEntry.Email);
        //            command.Parameters.AddWithValue("@token", tokenEntry.RefToken);
        //            command.Parameters.AddWithValue("@username", tokenEntry.UserName); ;
        //            command.ExecuteNonQuery();
        //        }
        //    }
        //}

    }
}
