using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Model.Task;

public class TaskMapper
{
    public TaskVigilanceDto ToDtoVigilance(TaskVigilance v)
    {
        return new TaskVigilanceDto
        {
            _id = v._id,
            userEmail = v.UserEmail,
            Floor = v.Floor,
            Description = v.Description,
            PhoneNumber = v.PhoneNumber,
            Status = v.Status
        };
    }

    public TaskPickDeliveryDto ToDtoDelivery(TaskPickDelivery p)
    {
        return new TaskPickDeliveryDto
        {
            _id = p._id,
            userEmail = p.UserEmail,
            NamePickup = p.NamePickup,
            NameDelivery = p.NameDelivery,
            CodeDelivery = p.CodeDelivery,
            Floor = p.Floor,
            Room = p.Room,
            Description = p.Description,
            Status = p.Status
        };
    }
}
