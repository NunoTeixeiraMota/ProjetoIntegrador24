using RobDroneAndGOAuth.Model.Token.TokenDTO;

namespace RobDroneAndGOAuth.Model.User.UserDTOs
{
    public class AccountDeletionDto
    {
        public TokenDto AccessToken { get; set; } 
        public string Email { get; set; } 
    }

}
