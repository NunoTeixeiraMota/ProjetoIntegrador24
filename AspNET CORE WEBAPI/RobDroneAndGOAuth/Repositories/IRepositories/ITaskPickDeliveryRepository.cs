using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Repositories.IRepositories
{
    public interface ITaskPickDeliveryRepository
    {
        Task<TaskPickDeliveryDto> InsertTaskAsync(TaskPickDelivery task);
        Task<TaskPickDelivery> GetTaskByIdAsync(Guid id);
        Task<List<TaskPickDelivery>> GetAllTasksAsync();
        Task<TaskPickDeliveryDto> UpdateTaskAsync(TaskPickDelivery task);
    }
}