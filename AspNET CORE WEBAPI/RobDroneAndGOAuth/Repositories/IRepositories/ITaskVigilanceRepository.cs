using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Repository
{
    public interface ITaskVigilanceRepository
    {
        Task<TaskVigilanceDto> InsertTaskAsync(TaskVigilance task);
        Task<TaskVigilance> GetTaskByIdAsync(Guid id);
        Task<List<TaskVigilance>> GetAllTasksAsync();
        Task<TaskVigilanceDto> UpdateTaskAsync(TaskVigilance task);
    }
}