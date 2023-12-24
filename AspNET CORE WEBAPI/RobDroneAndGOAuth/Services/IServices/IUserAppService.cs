using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RobDroneAndGOAuth.Model.Token.TokenDTO;
using RobDroneAndGOAuth.Model.User;
using RobDroneAndGOAuth.Model.User.UserDTOs;

namespace RobDroneAndGOAuth.Services.IServices
{
    public interface IUserAppService
    {
        Task<TokenDto> Login(LoginUserDto user);
        Task<RegisteredDTO> Register(CreateUserDto user);

        Task<IdentityResult> DeleteAccount(AccountDeletionDto user);
    }
}