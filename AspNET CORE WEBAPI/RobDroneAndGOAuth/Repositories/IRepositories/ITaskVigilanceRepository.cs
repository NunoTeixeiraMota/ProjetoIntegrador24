using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Repositories.IRepositories
{
    public interface ITaskVigilanceRepository
    {
        Task<CreateTaskVigilanceDto> InsertTaskAsync(TaskVigilance task);
        Task<TaskVigilance> GetTaskByIdAsync(Guid id);
        Task<List<TaskVigilance>> GetAllTasksAsync();
        Task<TaskVigilanceDto> UpdateTaskAsync(TaskVigilance task);
        Task<List<TaskVigilance>> Search (string searchTerm);
        Task<List<TaskVigilance>> GetAllNonApproved();


    }
}