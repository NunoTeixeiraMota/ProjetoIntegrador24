using RobDroneAndGOAuth.Model.Token.TokenDTO;
using RobDroneAndGOAuth.Model.User;

namespace RobDroneAndGOAuth.Services.IServices
{
    public interface ITokenService
    {
        Task<TokenDto> GenerateJwtToken(ApplicationUser user);
    }
}
