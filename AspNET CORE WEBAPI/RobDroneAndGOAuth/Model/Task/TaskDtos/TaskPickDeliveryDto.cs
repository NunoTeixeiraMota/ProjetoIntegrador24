using System.ComponentModel.DataAnnotations;

namespace RobDroneAndGOAuth.Model.Task.TaskDtos
{
    public class TaskPickDeliveryDto
    {
        public Guid _id {get;set;}
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
        [Required]
        public TaskPickDelivery.TaskStatus Status { get; set; }
    }
}
