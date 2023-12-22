using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RobDroneAndGOAuth.Model.User;

namespace RobDroneAndGOAuth.Services
{
    public interface IUserAppService
    {
        Task<TokenDto> Login(LoginUserDto user);
        Task<ApplicationUser> Register(CreateUserDto user);
    }
}