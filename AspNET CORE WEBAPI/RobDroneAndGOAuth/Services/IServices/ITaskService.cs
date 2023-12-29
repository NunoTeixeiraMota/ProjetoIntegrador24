using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Services.IServices
{
    public interface ITaskService
    {
        Task<TaskPickDeliveryDto> TaskCreatePickDeliveryTask(TaskPickDeliveryDto dto);
        Task<TaskVigilanceDto> CreateVigilanceTask(TaskVigilanceDto dto);
        Task<(List<TaskVigilanceDto>, List<TaskPickDeliveryDto>)> GetTasksNonAprovedAsync();

    }
}