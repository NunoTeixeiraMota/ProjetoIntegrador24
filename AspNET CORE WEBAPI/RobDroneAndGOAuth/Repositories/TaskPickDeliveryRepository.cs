using MongoDB.Driver;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Repositories.IRepositories;

namespace RobDroneAndGOAuth.Repositories
{
    public class TaskPickDeliveryRepository : ITaskPickDeliveryRepository
    {
        private readonly IMongoCollection<TaskPickDelivery> _collection;

        public TaskPickDeliveryRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<TaskPickDelivery>("TaskPickDelivery");
        }

        public async Task<TaskPickDeliveryDto> InsertTaskAsync(TaskPickDelivery task)
        {
            await _collection.InsertOneAsync(task);
            return new TaskPickDeliveryDto
            {
                userEmail = task.UserEmail,
                NamePickup = task.NamePickup,
                NameDelivery = task.NameDelivery,
                CodeDelivery = task.CodeDelivery,
                Floor = task.Floor,
                Room = task.Room,
                Description = task.Description
            };
        }

        public async Task<TaskPickDelivery> GetTaskByIdAsync(Guid id)
        {
            return await _collection.Find(t => t._id == id).FirstOrDefaultAsync();
        }
        public async Task<TaskPickDelivery> GetTaskByUserAsync(string userEmail)
        {
            return await _collection.Find(t => t.userEmail == userEmail).FirstOrDefaultAsync();
        }
        public async Task<TaskPickDelivery> GetApprovedTasks(TaskStatus status)
        {
            return await _collection.Find(t => t.status == TaskStatus.Aproved).FirstOrDefaultAsync();
        }
        public async Task<TaskPickDelivery> GetDeniedTasks(TaskStatus status)
        {
            return await _collection.Find(t => t.status == TaskStatus.Denied).FirstOrDefaultAsync();
        }
        public async Task<TaskPickDelivery> GetUnapprovedTasks(TaskStatus status)
        {
            return await _collection.Find(t => t.status == TaskStatus.WaitingForAprove).FirstOrDefaultAsync();
        }

        public async Task<List<TaskPickDelivery>> GetAllTasksAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<TaskPickDeliveryDto> UpdateTaskAsync(TaskPickDelivery task)
        {
            await _collection.ReplaceOneAsync(t => t._id == task._id, task);
            return new TaskPickDeliveryDto
            {
                userEmail = task.UserEmail,
                NamePickup = task.NamePickup,
                NameDelivery = task.NameDelivery,
                CodeDelivery = task.CodeDelivery,
                Floor = task.Floor,
                Room = task.Room,
                Description = task.Description
            };
        }
        public async Task<List<TaskPickDeliveryDto>> GetAllPickDeliveryTasks()
        {
            var tasks = await _taskPickDeliveryRepository.GetAllTasksAsync();
            return tasks.Select(task => new TaskPickDeliveryDto
            {
                userEmail = task.UserEmail,
                NamePickup = task.NamePickup,
                NameDelivery = task.NameDelivery,
                CodeDelivery = task.CodeDelivery,
                Floor = task.Floor,
                Room = task.Room,
                Description = task.Description
            }).ToList();
        }
    }
}
}
