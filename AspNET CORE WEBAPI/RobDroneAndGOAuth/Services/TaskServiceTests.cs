using IdentityMongo.Settings;
using MongoDB.Driver;
using Moq;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Services;
using RobDroneAndGOAuth.Services.IServices;
using Xunit;

public class TaskServiceTests
{/*
    private readonly Mock<IUserAppService> _mockUserAppService;
    private readonly Mock<IMongoDatabase> _mockDatabase;
    private readonly TaskService _taskService;

    public TaskServiceTests()
    {
        var mockMongoDbConfig = new Mock<MongoDbConfig>();
        mockMongoDbConfig.Setup(x => x.ConnectionString)
            .Returns("mongodb://mongoadmin:105711abb1e672194c53cbe4@vs1147.dei.isep.ipp.pt:27017/admin?authMechanism=DEFAULT");

        _mockUserAppService = new Mock<IUserAppService>();
        _mockDatabase = new Mock<IMongoDatabase>();

        _taskService = new TaskService(mockMongoDbConfig.Object, "TestDatabase", _mockUserAppService.Object);
    }

    [Fact]
    public async Task CreateVigilanceTask_UserExists_TaskCreated()
    {
        var dto = new TaskVigilanceDto { userEmail = "test@example.com" };
        var mockCollection = new Mock<IMongoCollection<TaskVigilanceDto>>();

        _mockDatabase.Setup(x => x.GetCollection<TaskVigilanceDto>("VigilanceTasks", It.IsAny<MongoCollectionSettings>()))
                     .Returns(mockCollection.Object);

        _mockUserAppService.Setup(x => x.UserExists(dto.userEmail)).ReturnsAsync(true);

        await _taskService.createVigilanceTask(dto);

        mockCollection.Verify(x => x.InsertOneAsync(dto, It.IsAny<InsertOneOptions>(), default), Times.Once);
    }

    [Fact]
    public async Task CreateVigilanceTask_UserDoesNotExist_TaskNotCreated()
    {
        var dto = new TaskVigilanceDto { userEmail = "nonexistent@example.com" };
        var mockCollection = new Mock<IMongoCollection<TaskVigilanceDto>>();

        _mockDatabase.Setup(x => x.GetCollection<TaskVigilanceDto>("VigilanceTasks", It.IsAny<MongoCollectionSettings>()))
                     .Returns(mockCollection.Object);
        _mockUserAppService.Setup(x => x.UserExists(dto.userEmail)).ReturnsAsync(false);

        await _taskService.createVigilanceTask(dto);

        mockCollection.Verify(x => x.InsertOneAsync(It.IsAny<TaskVigilanceDto>(), It.IsAny<InsertOneOptions>(), default), Times.Never);
    }

    [Fact]
    public async Task CreatePickDeliveryTask_UserExists_TaskCreated()
    {
        var dto = new TaskPickDeliveryDto { userEmail = "test@example.com" };
        var mockCollection = new Mock<IMongoCollection<TaskPickDeliveryDto>>();

        _mockDatabase.Setup(x => x.GetCollection<TaskPickDeliveryDto>("PickDeliveryTasks", It.IsAny<MongoCollectionSettings>()))
                     .Returns(mockCollection.Object);

        _mockUserAppService.Setup(x => x.UserExists(dto.userEmail)).ReturnsAsync(true);

        await _taskService.createPickDeliveryTask(dto);

        mockCollection.Verify(x => x.InsertOneAsync(dto, It.IsAny<InsertOneOptions>(), default), Times.Once);
    }

    [Fact]
    public async Task CreatePickDeliveryTask_UserDoesNotExist_TaskNotCreated()
    {
        var dto = new TaskPickDeliveryDto { userEmail = "nonexistent@example.com" };
        var mockCollection = new Mock<IMongoCollection<TaskPickDeliveryDto>>();

        _mockDatabase.Setup(x => x.GetCollection<TaskPickDeliveryDto>("PickDeliveryTasks", It.IsAny<MongoCollectionSettings>()))
                     .Returns(mockCollection.Object);
        _mockUserAppService.Setup(x => x.UserExists(dto.userEmail)).ReturnsAsync(false);

        await _taskService.createPickDeliveryTask(dto);

        mockCollection.Verify(x => x.InsertOneAsync(It.IsAny<TaskPickDeliveryDto>(), It.IsAny<InsertOneOptions>(), default), Times.Never);
    }*/
}
