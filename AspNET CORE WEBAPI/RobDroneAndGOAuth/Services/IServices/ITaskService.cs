using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Services.IServices
{
    public interface ITaskService
    {
        Task<TaskPickDeliveryDto> TaskCreatePickDeliveryTask(TaskPickDeliveryDto dto);
        Task<TaskVigilanceDto> CreateVigilanceTask(TaskVigilanceDto dto);
        Task<bool> ApproveTaskPickDelivery(Guid taskId);
        Task<bool> DenyTaskPickDelivery(Guid taskId);
        Task<bool> ApproveTaskVigilance(Guid taskId);
        Task<bool> DenyTaskVigilance(Guid taskId);
        Task<List<TaskVigilanceDto>> GetAllVigilanceTasks();
        Task<List<TaskPickDeliveryDto>> GetAllPickDeliveryTasks();
    }
}