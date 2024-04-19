using corewebapiandangular.Data;
using corewebapiandangular.Models;
using corewebapiandangular.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace corewebapiandangular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthDataAccess _authDataAccess;
        private readonly EmailService _emailService;
        private readonly TokenService _tokenService;
        private readonly IJwtService _jwtService;
        private readonly HashService _hashService;

        public AuthController(EmailService emailService, TokenService tokenService, AuthDataAccess authDataAccess, IJwtService jwtService, HashService hashService)
        {
            _authDataAccess = authDataAccess;
            _emailService = emailService;
            _tokenService = tokenService;
            _jwtService = jwtService;
            _hashService = hashService;
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPassword model)
        {
            var user = await _authDataAccess.FindEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("Email Not Found");
            }

            var token = await _tokenService.GenerateTokenAsync(user);
            var result = await _tokenService.StoreTokenAsync(user, token);

            if (!result)
            {
                return BadRequest("Error storing token.");
            }
            string userEmail = user.Email;
            string resetToken = token;
            string angularAppBaseUrl = "http://localhost:4200";
            string passwordResetRoute = "/resetpassword";
            string callbackUrl = $"{angularAppBaseUrl}{passwordResetRoute}?email={Uri.EscapeDataString(userEmail)}&token={Uri.EscapeDataString(resetToken)}";
            //var callbackUrl = Url.Action(nameof(ResetPassword), "Auth", new { email = user.Email, tokens = token },protocol: HttpContext.Request.Scheme);

            await _emailService.SendEmailAsync(model.Email,"Reset Password",$"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");

            return Ok("Password reset link has been sent to your email.");
        }


        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
        {
            // Validate the token and userId...
            // Typically, you'd also accept a new password here and reset it for the user.
            var user = await _authDataAccess.FindEmailAsync(resetPassword.Email);
            if (user == null)
            {
                return BadRequest("Invalid request.");
            }

            // Verify the token is valid and not expired based on your stored data
            var isValid = await _tokenService.ValidateTokenAsync(user, resetPassword.Token);
            if (!isValid)
            {
                return BadRequest("Invalid or expired token.");
            }
            HashPasswordmodel hashedPassword = _hashService.HashPass(resetPassword.Password);
            var users = new User
            {
                Id = user.Id,
                UserName = user.UserName,
                PhoneNo = user.PhoneNo,
                Email = user.Email,
                Password = hashedPassword.hash,
                Salt = hashedPassword.salt
            };
            var result = await _authDataAccess.updatePassword(users);
            if (result)
            {
                return Ok("Password Reset");
            }
            return BadRequest("Password did not update");
           
        }


        [HttpPost("login")]
        public async Task<ActionResult> GetUserbyusernameandpassword(UserLoginModel model)
        {
            var users = await _authDataAccess.FindEmailAsync(model.Email);
            if (users == null)
            {
                return BadRequest("Invalid email or password");
            }

            string hashedPassword = _hashService.HashPassverifyer(model.Password, users.Salt);
            if (users.Password == hashedPassword)
            {
                var token = _jwtService.GenerateToken(model.Email);
                var reftoken = _jwtService.generaterefarancetoken();
                //_jwtService.StorerefToken(users, token,reftoken);
                return Ok( new { Token = token, RefToken = reftoken });
                
            }
            else
            {
                return BadRequest("Password did not match");
            }

            return Unauthorized();

        }
        [HttpPost("register")]
        public IActionResult createuser(User user)
        {
            HashPasswordmodel hashedPassword = _hashService.HashPass(user.Password);
            var users = new User
            {
                Id = user.Id,
                UserName = user.UserName,
                PhoneNo = user.PhoneNo,
                Email = user.Email,
                Password = hashedPassword.hash,
                Salt = hashedPassword.salt
            };
            var result = _authDataAccess.registeruser(users);
            if (result)
            {
                return Ok("Registration successful");
            }
            else
            {
                return BadRequest("registration faild");
            }
        }

        //[AllowAnonymous]
        //[HttpPost("regenerate")]
        //public async Task<ActionResult> regenerate(string reftoken)
        //{
        //    var result = _jwtService.IsValidRefreshToken(reftoken);
        //    if (result)
        //    {
        //        var gettoken = _jwtService.GetreJwtToken(reftoken);
        //        return Ok(new { regeneratetoken = gettoken });
        //    }
        //    return BadRequest();
                
        //}
    }
}
