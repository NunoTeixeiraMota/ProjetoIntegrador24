using MongoDB.Driver;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Repositories.IRepositories;

namespace RobDroneAndGOAuth.Repositories
{
    public class TaskVigilanceRepository : ITaskVigilanceRepository
    {
        private readonly IMongoCollection<TaskVigilance> _collection;

        public TaskVigilanceRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<TaskVigilance>("TaskVigilance");
        }

        public async Task<TaskVigilanceDto> InsertTaskAsync(TaskVigilance task)
        {
            await _collection.InsertOneAsync(task);
            return new TaskVigilanceDto
            {
                userEmail = task.UserEmail,
                Floor = task.Floor,
                Description = task.Description,
                PhoneNumber = task.PhoneNumber
            };
        }

        public async Task<TaskVigilance> GetTaskByIdAsync(Guid id)
        {
            return await _collection.Find(t => t._id == id).FirstOrDefaultAsync();
        }

        public async Task<List<TaskVigilance>> GetAllTasksAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<TaskVigilanceDto> UpdateTaskAsync(TaskVigilance task)
        {
            await _collection.ReplaceOneAsync(t => t._id == task._id, task);
            return new TaskVigilanceDto
            {
                userEmail = task.UserEmail,
                Floor = task.Floor,
                Description = task.Description,
                PhoneNumber = task.PhoneNumber
            };
        }
    }
}
