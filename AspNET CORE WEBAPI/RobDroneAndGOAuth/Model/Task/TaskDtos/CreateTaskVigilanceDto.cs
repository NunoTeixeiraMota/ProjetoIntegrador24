using System.ComponentModel.DataAnnotations;

namespace RobDroneAndGOAuth.Model.Task.TaskDtos
{
    public class CreateTaskVigilanceDto
    {
        [Required]
        public string userEmail { get; set; }
        
        [Required]
        public string Floor { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [RegularExpression(@"^\d+$", ErrorMessage = "Phone number must be numeric")]
        public string PhoneNumber { get; set; }
    }
}
