using MongoDB.Driver;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Repositories;
using RobDroneAndGOAuth.Repositories.IRepositories;
using RobDroneAndGOAuth.Services;
using RobDroneAndGOAuth.Services.IServices;
using Xunit;

public class TaskServiceIntegrationTests: IDisposable
{
    private readonly ITaskService _taskService;
    private readonly IMongoDatabase _testDatabase;
    private readonly IMongoClient _mongoClient;

    public TaskServiceIntegrationTests()
    {
        var configuration = CreateConfiguration();

        // Initialize MongoDB client
        var connectionString = "mongodb://mongoadmin:105711abb1e672194c53cbe4@vsgate-s1.dei.isep.ipp.pt:11147/?authMechanism=SCRAM-SHA-256";
        _mongoClient = new MongoClient(connectionString);

        // Create or get your test database
        _testDatabase = _mongoClient.GetDatabase("IntegrationTesting");

        // Set up dependency injection container
        var services = new ServiceCollection();
        ConfigureServices(services, connectionString, configuration);

        var serviceProvider = services.BuildServiceProvider();
        _taskService = serviceProvider.GetRequiredService<ITaskService>();
        ClearCollectionsAsync().Wait(); // Clear collections at the beginning of each test

    }

    private void ConfigureServices(IServiceCollection services, string connectionString, IConfiguration configuration)
    {
        // Add configuration to services
        services.AddSingleton<IConfiguration>(configuration);

        // Add logging services
        services.AddLogging();

        // Configure your services here as you did in program.cs
        services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
        services.AddScoped<IMongoDatabase>(provider =>
        {
            var client = provider.GetRequiredService<IMongoClient>();
            return client.GetDatabase("IntegrationTesting");
        });

        services.AddScoped<ITaskPickDeliveryRepository, TaskPickDeliveryRepository>();
        services.AddScoped<ITaskVigilanceRepository, TaskVigilanceRepository>();
        services.AddScoped<ITaskService, TaskService>();
    }

    private IConfiguration CreateConfiguration()
    {

        var configurationBuilder = new ConfigurationBuilder();
        configurationBuilder.AddInMemoryCollection(new Dictionary<string, string>
    {
        {"JwtSettings:SecretKey", "v3ryC0mpl3x&L0ngS3cr3tKeyTh@t1sH@rdToGu3ss"},
        {"JwtSettings:Issuer", "RobDroneAndGO"},
        {"JwtSettings:Audience", "RobDroneAndGO"},
        {"JwtSettings:Expires", "1440"} // Assuming 'Expires' is in minutes
    });

        return configurationBuilder.Build();
    }

    public async Task DisposeAsync()
    {
        var taskPDCollection = _testDatabase.GetCollection<TaskPickDelivery>("TaskPickDelivery");
        var taskVCollection = _testDatabase.GetCollection<TaskVigilance>("TaskVigilance");

        await taskPDCollection.DeleteManyAsync(Builders<TaskPickDelivery>.Filter.Empty);
        await taskVCollection.DeleteManyAsync(Builders<TaskVigilance>.Filter.Empty);
    }

    [Fact]
    public async Task TaskCreatePickDeliveryTask_Successful_CreatesNewTask()
    {
        // Arrange
        var createTaskDto = new TaskPickDeliveryDto
        {
            userEmail = "testuser@example.com",
            NamePickup = "Pickup",
            NameDelivery = "Delivery",
            CodeDelivery = 12345,
            Floor = "1",
            Room = ["111"],
            Description = "Task Description"
        };

        // Act
        var result = await _taskService.TaskCreatePickDeliveryTask(createTaskDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(createTaskDto.userEmail, result.userEmail);
        Assert.Equal(createTaskDto.NamePickup, result.NamePickup);
        Assert.Equal(createTaskDto.NameDelivery, result.NameDelivery);
    }

    [Fact]
    public async Task CreateVigilanceTask_Successful_CreatesNewTask()
    {
        // Arrange
        var createTaskDto = new TaskVigilanceDto
        {
            userEmail = "testuser@example.com",
            Floor = "2",
            Description = "Vigilance Task",
            PhoneNumber = "1234567890"
        };

        // Act
        var result = await _taskService.CreateVigilanceTask(createTaskDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(createTaskDto.userEmail, result.userEmail);
        Assert.Equal(createTaskDto.Floor, result.Floor);
        Assert.Equal(createTaskDto.Description, result.Description);
    }
    [Fact]
    public async Task GetTasksNonAprovedAsync_ReturnsNonApprovedTasks()
    {
        // Arrange - Create non-approved vigilance and pick delivery tasks using the service
        var nonApprovedVigilanceTaskDto = new TaskVigilanceDto
        {
            userEmail = "vigilance@example.com",
            Floor = "3",
            Description = "Non-approved Vigilance Task",
            PhoneNumber = "1234567890"
        };

        var nonApprovedPickDeliveryTaskDto = new TaskPickDeliveryDto
        {
            userEmail = "pickdelivery@example.com",
            NamePickup = "NonApprovedPickup",
            NameDelivery = "NonApprovedDelivery",
            CodeDelivery = 54321,
            Floor = "4",
            Room = new[] { "444" },
            Description = "Non-approved Delivery Task"
        };

        await _taskService.CreateVigilanceTask(nonApprovedVigilanceTaskDto);
        await _taskService.TaskCreatePickDeliveryTask(nonApprovedPickDeliveryTaskDto);

        // Act
        var (vigilanceTasks, pickDeliveryTasks) = await _taskService.GetTasksNonAprovedAsync();

        // Assert
        Assert.Contains(vigilanceTasks, task => task.userEmail == nonApprovedVigilanceTaskDto.userEmail && task.Floor == nonApprovedVigilanceTaskDto.Floor && task.Description == nonApprovedVigilanceTaskDto.Description);
        Assert.Contains(pickDeliveryTasks, task => task.userEmail == nonApprovedPickDeliveryTaskDto.userEmail && task.NamePickup == nonApprovedPickDeliveryTaskDto.NamePickup && task.NameDelivery == nonApprovedPickDeliveryTaskDto.NameDelivery && task.Description == nonApprovedPickDeliveryTaskDto.Description);
    }
    [Fact]
    public async Task GetTasksNonAprovedAsync_NoNonApprovedTasks_ReturnsEmptyLists()
    {
        // Act
        var (vigilanceTasks, pickDeliveryTasks) = await _taskService.GetTasksNonAprovedAsync();

        // Assert
        Assert.Empty(vigilanceTasks);
        Assert.Empty(pickDeliveryTasks);
    }
    public async Task ClearCollectionsAsync()
    {
        var taskPDCollection = _testDatabase.GetCollection<TaskPickDelivery>("TaskPickDelivery");
        var taskVCollection = _testDatabase.GetCollection<TaskVigilance>("TaskVigilance");

        await taskPDCollection.DeleteManyAsync(Builders<TaskPickDelivery>.Filter.Empty);
        await taskVCollection.DeleteManyAsync(Builders<TaskVigilance>.Filter.Empty);
    }

    [Fact]
    public async Task GetTasksNonAprovedAsync_WithEdgeCases_HandlesCorrectly()
    {
        // Arrange
        var edgeCaseTaskDto = new TaskVigilanceDto
        {
            userEmail = "edge@example.com",
            Floor = "999", // Edge case value
            Description = new string('x', 1000), // Long description
            PhoneNumber = "123!@#"
        };

        await _taskService.CreateVigilanceTask(edgeCaseTaskDto);

        // Act
        var (vigilanceTasks, _) = await _taskService.GetTasksNonAprovedAsync();

        // Assert
        Assert.Contains(vigilanceTasks, task => task.userEmail == edgeCaseTaskDto.userEmail && task.Description.Length <= 1000);
    }

    [Fact]
    public async Task GetTasksNonAprovedAsync_WithEmptyDatabase_ReturnsEmptyLists()
    {
        // Arrange
        // Ensure the database is empty
        await ClearCollectionsAsync();

        // Act
        var (vigilanceTasks, pickDeliveryTasks) = await _taskService.GetTasksNonAprovedAsync();

        // Assert
        Assert.Empty(vigilanceTasks);
        Assert.Empty(pickDeliveryTasks);
    }





    public void Dispose()
    {
        ClearCollectionsAsync().Wait(); // Clear collections at the end of each test
    }

}