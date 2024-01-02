using System.ComponentModel.DataAnnotations;

namespace RobDroneAndGOAuth.Model.Task.TaskDtos
{
    public class CreateTaskPickDeliveryDto
    {
        [Required]
        public string userEmail { get; set; }
        [Required]
        public string NamePickup { get; set; }
        
        [Required]
        public string NameDelivery { get; set; }

        [Required]
        public int CodeDelivery { get; set; }

        [Required]
        public string Floor { get; set; }

        [Required]
        public string[] Room { get; set; }

        [Required]
        public string Description { get; set; }
    }
}