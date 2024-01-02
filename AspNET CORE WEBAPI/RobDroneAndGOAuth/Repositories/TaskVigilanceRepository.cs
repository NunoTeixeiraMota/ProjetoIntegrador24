using MongoDB.Driver;
using MongoDB.Bson;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Repositories.IRepositories;
using System.Text.RegularExpressions;

namespace RobDroneAndGOAuth.Repositories
{
    public class TaskVigilanceRepository : ITaskVigilanceRepository
    {
        private readonly IMongoCollection<TaskVigilance> _collection;

        public TaskVigilanceRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<TaskVigilance>("TaskVigilance");
        }

        public async Task<CreateTaskVigilanceDto> InsertTaskAsync(TaskVigilance task)
        {
            await _collection.InsertOneAsync(task);
            return new CreateTaskVigilanceDto
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
                public async Task<TaskVigilance> GetTaskByUserAsync(string userEmail)
        {
            return await _collection.Find(t => t.UserEmail == userEmail).FirstOrDefaultAsync();
        }
        public async Task<TaskVigilance> GetApprovedTasks()
        {
            return await _collection.Find(t => t.Status == TaskVigilance.TaskStatus.Aproved).FirstOrDefaultAsync();
        }
        public async Task<TaskVigilance> GetDeniedTasks()
        {
            return await _collection.Find(t => t.Status == TaskVigilance.TaskStatus.Denied).FirstOrDefaultAsync();
        }
        public async Task<TaskVigilance> GetUnapprovedTasks()
        {
            return await _collection.Find(t => t.Status == TaskVigilance.TaskStatus.WaitingForAprove).FirstOrDefaultAsync();
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

        public async Task<List<TaskVigilance>> GetAllNonApproved()
        {
            var filter = Builders<TaskVigilance>.Filter.Eq(tv => tv.Status, TaskVigilance.TaskStatus.WaitingForAprove);
            var list = await _collection.Find(filter).ToListAsync();
            return list ;
        }

         public async Task<List<TaskVigilance>> Search(string searchTerm)
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

    }
}
