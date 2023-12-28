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

        public TaskService(MongoDbConfig mongoDbConfig, string databaseName, IUserAppService userSrvc)
        {
            var client = new MongoClient(mongoDbConfig.ConnectionString);
            _database = client.GetDatabase(databaseName);
            this.userSrvc = userSrvc;
        }

        public async Task<TaskVigilanceDto> createVigilanceTask(TaskVigilanceDto dto)
        {
            await CreateCollectionIfNotExists("VigilanceTasks");
            if (await userSrvc.UserExists(dto.userEmail))
            {
                var tasksCollection = _database.GetCollection<TaskVigilanceDto>("VigilanceTasks");
                tasksCollection.InsertOne(dto);
            }
            return dto;
        }

        public async Task<TaskPickDeliveryDto> createPickDeliveryTask(TaskPickDeliveryDto dto)
        {
            await CreateCollectionIfNotExists("PickDeliveryTasks");

            if (await userSrvc.UserExists(dto.userEmail))
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
    

    }
}