using System.ComponentModel.DataAnnotations

namespace RobDroneAndGOAuth.Model.Task
{
    
    public class TaskSearchDto
    {
        [Required]
        public string State { get; set; }
        [Required]
        public string DeviceType { get; set; }
        [Required]
        public string UserId { get; set; }
        public string TaskName { get; set; }
    }
}