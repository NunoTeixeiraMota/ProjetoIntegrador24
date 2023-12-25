using RobDroneAndGOAuth.Model.Task;

namespace RobDroneAndGOAuth.Services.IServices
{
    public interface ITaskService
    {
        Task<TaskVigilanceDto> createVigilanceTask(TaskVigilanceDto dto);
        Task<TaskPickDeliveryDto> createPickDeliveryTask(TaskPickDeliveryDto dto);
    }
}