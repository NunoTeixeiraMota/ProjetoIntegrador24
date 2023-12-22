using RobDroneAndGOAuth.Model.User;

namespace RobDroneAndGOAuth.Services
{
    public interface ITokenService
    {
        Task<TokenDto> GenerateJwtToken(ApplicationUser user);
    }
}
