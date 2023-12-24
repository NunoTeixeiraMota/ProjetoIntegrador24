using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace RobDroneAndGOAuth.Model.User.UserDTOs
{
    public class RegisteredDTO 
    {
        [Required]
        public ApplicationUser User { get; set; }
        [Required]
        public IEnumerable<IdentityError> Error { get; set; }

    }
}
