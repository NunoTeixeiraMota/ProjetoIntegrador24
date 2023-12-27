using IdentityMongo.Settings;
using MongoDB.Driver;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Services.IServices;

namespace RobDroneAndGOAuth.Services
{
    public class TaskService : ITaskService
    {
        IUserAppService userSrvc;
        private readonly IMongoDatabase _database;

        public TaskService(MongoDbConfig mongoDbConfig, string databaseName)
        {
            var client = new MongoClient(mongoDbConfig.ConnectionString);
            _database = client.GetDatabase(databaseName);
        }

        public async Task<TaskVigilanceDto> createVigilanceTask(TaskVigilanceDto dto)
        {
            await CreateCollectionIfNotExists("VigilanceTasks");
            if (userSrvc.UserExists(dto.userEmail).Result)
            {
                var tasksCollection = _database.GetCollection<TaskVigilanceDto>("VigilanceTasks");
                tasksCollection.InsertOne(dto);
            }
            return dto;
        }

        public async Task<TaskPickDeliveryDto> createPickDeliveryTask(TaskPickDeliveryDto dto)
        {
            await CreateCollectionIfNotExists("PickDeliveryTasks");

            if (userSrvc.UserExists(dto.userEmail).Result)
            {
                var tasksCollection = _database.GetCollection<TaskPickDeliveryDto>("PickDeliveryTasks");
                tasksCollection.InsertOne(dto);
            }
            return dto;
        }

        private async Task CreateCollectionIfNotExists(string collectionName)
        {
            var collections = await _database.ListCollectionNames().ToListAsync();
            if (!collections.Contains(collectionName))
            {
                await _database.CreateCollectionAsync(collectionName);
            }
        }

        /*
        public async Task<IEnumerable<TaskDto>> SearchTasks(string state, string deviceType, string userId)
        {
            var filter = Builders<Task>.Filter.Empty;

            if (!string.IsNullOrEmpty(state))
            {
                filter &= Builders<Task>.Filter.Eq(t => t.State, state);
            }

            if (!string.IsNullOrEmpty(deviceType))
            {
                filter &= Builders<Task>.Filter.Eq(t => t.DeviceType, deviceType);
            }

            if (!string.IsNullOrEmpty(userId))
            {
                filter &= Builders<Task>.Filter.Eq(t => t.UserId, userId);
            }

            var tasks = await dbContext.Tasks.Find(filter).Project(t => new TaskSearchDto
            {
                State = t.State,
                DeviceType = t.DeviceType,
                UserId = t.UserId
            }).ToListAsync();

            return tasks;
        }*/
    }
}