using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using RobDroneAndGOAuth.Model.User;
using RobDroneAndGOAuth.Services;

namespace RobDroneAndGOAuth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private ILogger<UserController> _logger;
        private IUserAppService _userAppService;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public UserController(ILogger<UserController> logger,
            IUserAppService userAppService)
        {
            _logger = logger;
            _userAppService = userAppService;
        }

        [HttpPost("Login")]
        public async Task<TokenDto> Login(LoginUserDto loginUser)
        {
            return await _userAppService.Login(loginUser);
        }

        [HttpPost("Register")]
        public async Task<ApplicationUser> Register(CreateUserDto createUser)
        {
            return await _userAppService.Register(createUser);
        }
    }
}
