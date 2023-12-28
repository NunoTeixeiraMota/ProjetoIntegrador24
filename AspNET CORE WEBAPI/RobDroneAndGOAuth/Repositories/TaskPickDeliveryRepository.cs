using MongoDB.Driver;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;

namespace RobDroneAndGOAuth.Repository
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
    }
}
