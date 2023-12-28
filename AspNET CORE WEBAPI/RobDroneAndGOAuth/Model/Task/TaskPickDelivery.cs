using System.ComponentModel.DataAnnotations;

namespace RobDroneAndGOAuth.Model.Task
{


    public class Task
    {
        public string userEmail { get; set; }
        public string namePickup { get; set; }
        public string nameDelivery { get; set; }
        public TaskStatus status { get; set; }
        public int CodeDelivery { get; set; }
        public string Floor { get; set; }
        public string[] Room { get; set; }
        public string Description { get; set; }




        public Task(string userEmail, string NamePickup, string NameDelivery, TaskStatus status, int CodeDelivery, string Floor, string[] Room, string Description)
        {
            userEmail = userEmail;
            NamePickup = namePickup;
            NameDelivery = nameDelivery;
            status = TaskStatus.WaitingForAprove;
            CodeDelivery = codeDelivery;
            Floor = Floor;
            Room = Room;
            Description = Description;

        }

        public void AproveTask()
        {
            if (status == TaskStatus.WaitingForAprove)
            {
                status = TaskStatus.Aproved;
            }

        }

        public void DenyTask()
        {
            if (status == TaskStatus.WaitingForAprove)
            {
                status = TaskStatus.Denied;
            }

        }

        public void

        public enum TaskStatus
        {
            WaitingForAprove,
            Aproved,
            Denied

        }


    }
}