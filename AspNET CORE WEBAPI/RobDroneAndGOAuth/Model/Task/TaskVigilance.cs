using System.ComponentModel.DataAnnotations;

namespace RobDroneAndGOAuth.Model.Task
{


    public class Task
    {
        public string userEmail { get; set; }
        public TaskStatus status { get; set; }
        public string Floor { get; set; }
        public string Description { get; set; }
        public string PhoneNumber {get;set;}




        public Task(string userEmail,TaskStatus status,string Floor,string Description,string PhoneNumber)
        {
            userEmail = userEmail;
            status = TaskStatus.WaitingForAprove;
            Floor = Floor;
            Description = Description;
            PhoneNumber = PhoneNumber;

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