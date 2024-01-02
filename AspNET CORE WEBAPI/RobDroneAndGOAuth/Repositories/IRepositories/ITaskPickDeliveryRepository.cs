using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Repositories.IRepositories
{
    public interface ITaskPickDeliveryRepository
    {
        Task<CreateTaskPickDeliveryDto> InsertTaskAsync(TaskPickDelivery task);
        Task<TaskPickDelivery> GetTaskByIdAsync(Guid id);
        Task<List<TaskPickDelivery>> GetAllTasksAsync();
        Task<TaskPickDeliveryDto> UpdateTaskAsync(TaskPickDelivery task);
        Task<List<TaskPickDelivery>> Search (string searchTerm);
        Task<List<TaskPickDelivery>> GetAllNonApproved();
    }
}