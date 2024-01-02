using System.ComponentModel.DataAnnotations;


namespace RobDroneAndGOAuth.Model.User.UserDTOs;

public class DisplayUserDto
{
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }
}
