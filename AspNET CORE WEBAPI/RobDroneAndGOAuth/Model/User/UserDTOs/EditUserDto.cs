using System.ComponentModel.DataAnnotations;

namespace RobDroneAndGOAuth.Model.User.UserDTOs
{
    public class EditUserDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string CurrentEmail { get; set; }


        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }

        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [RegularExpression(@"^\d+$", ErrorMessage = "Phone number must be numeric")]
        public string phonenumber { get; set; }
    }
}
