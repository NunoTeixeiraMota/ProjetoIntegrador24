using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Model.Task
{
    public class TaskVigilance
    {
        public Guid _id { get; set; }
        public string UserEmail { get; set; }
        public TaskStatus Status { get; set; }
        public string Floor { get; set; }
        public string Description { get; set; }
        public string PhoneNumber {get;set;}

        public TaskVigilance(string userEmail, string floor, string description, string phoneNumber)
        {
            this._id = Guid.NewGuid();
            this.UserEmail = userEmail;
            this.Status = TaskStatus.WaitingForAprove;
            this.Floor = floor;
            this.Description = description;
            this.PhoneNumber = phoneNumber;
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