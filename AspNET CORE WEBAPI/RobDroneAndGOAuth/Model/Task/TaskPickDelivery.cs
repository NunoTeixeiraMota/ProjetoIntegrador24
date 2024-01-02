using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Model.Task
{
    public class TaskPickDelivery
    {
        public Guid _id { get; set; }
        public string UserEmail { get; set; }
        public string NamePickup { get; set; }
        public string NameDelivery { get; set; }
        public TaskStatus Status { get; set; }
        public int CodeDelivery { get; set; }
        public string Floor { get; set; }
        public string[] Room { get; set; }
        public string Description { get; set; }

        public TaskPickDelivery(string userEmail, string namePickup, string nameDelivery, int codeDelivery, string floor, string[] room, string description)
        {
            this._id = Guid.NewGuid();
            this.UserEmail = userEmail;
            this.NamePickup = namePickup;
            this.NameDelivery = nameDelivery;
            this.Status = TaskStatus.WaitingForAprove;
            this.CodeDelivery = codeDelivery;
            this.Floor = floor;
            this.Room = room;
            this.Description = description;

        }
        public void AproveTask()
        {
                Status = TaskStatus.Aproved;
        
        }

        public void DenyTask()
        {
                Status = TaskStatus.Denied;
        }
        public enum TaskStatus
        {
            WaitingForAprove,
            Aproved,
            Denied
        }
    }
}