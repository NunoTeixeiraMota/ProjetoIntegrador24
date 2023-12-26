using RobDroneAndGOAuth.Model.Task;

namespace RobDroneAndGOAuth.Services.IServices
{
    public interface ITaskService
    {
        Task<TaskVigilanceDto> createVigilanceTask(TaskVigilanceDto dto);
        Task<TaskPickDeliveryDto> createPickDeliveryTask(TaskPickDeliveryDto dto);
        //Task<IEnumerable<TaskDto>> SearchTasks(string state, string deviceType, string userId);
    }
}