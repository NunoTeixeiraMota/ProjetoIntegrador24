using Microsoft.AspNetCore.Identity;
using RobDroneAndGOAuth.Model.Token.TokenDTO;
using RobDroneAndGOAuth.Model.User.UserDTOs;

namespace RobDroneAndGOAuth.Services.IServices
{
    public interface IUserAppService
    {
        Task<TokenDto> Login(LoginUserDto user);
        Task<RegisteredDTO> Register(CreateUserDto user);

        Task<IdentityResult> DeleteAccount(string user);
        Task<IdentityResult> editUser(EditUserDto user);
        Task<IdentityResult> ApproveUser(string Email);
        Task<IdentityResult> DenyUser(string Email);
        Task<List<DisplayUserDto>> ListNonApproved();


    }
}