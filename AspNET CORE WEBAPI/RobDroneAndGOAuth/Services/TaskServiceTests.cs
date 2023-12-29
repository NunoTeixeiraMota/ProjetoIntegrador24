using Xunit;
using Moq;
using RobDroneAndGOAuth.Services;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Repositories.IRepositories;

namespace RobDroneAndGOAuth.Tests
{
    public class TaskServiceTests
    {
        private readonly Mock<ITaskPickDeliveryRepository> _mockTaskPickDeliveryRepository;
        private readonly Mock<ITaskVigilanceRepository> _mockTaskVigilanceRepository;
        private readonly TaskService _taskService;

        public TaskServiceTests()
        {
            _mockTaskPickDeliveryRepository = new Mock<ITaskPickDeliveryRepository>();
            _mockTaskVigilanceRepository = new Mock<ITaskVigilanceRepository>();

            _taskService = new TaskService(_mockTaskPickDeliveryRepository.Object, _mockTaskVigilanceRepository.Object);
        }

        [Fact]
        public async Task TaskCreatePickDeliveryTask_Successful_ReturnsTaskPickDeliveryDto()
        {
            // Arrange
            var taskPickDeliveryDto = new TaskPickDeliveryDto
            {
                userEmail = "test@example.com",
                NamePickup = "PickupLocation",
                NameDelivery = "DeliveryLocation",
                CodeDelivery = 1234,
                Floor = "1",
                Room = new[] { "aaa" },
                Description = "Task Description"
            };

            var expectedTask = new TaskPickDelivery(taskPickDeliveryDto.userEmail, taskPickDeliveryDto.NamePickup, taskPickDeliveryDto.NameDelivery, taskPickDeliveryDto.CodeDelivery, taskPickDeliveryDto.Floor, taskPickDeliveryDto.Room, taskPickDeliveryDto.Description);

            _mockTaskPickDeliveryRepository.Setup(x => x.InsertTaskAsync(It.IsAny<TaskPickDelivery>()).Result).Returns(taskPickDeliveryDto);

            // Act
            var result = await _taskService.TaskCreatePickDeliveryTask(taskPickDeliveryDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(taskPickDeliveryDto.userEmail, result.userEmail);
            Assert.Equal(taskPickDeliveryDto.NamePickup, result.NamePickup);
            Assert.Equal(taskPickDeliveryDto.NameDelivery, result.NameDelivery);
            Assert.Equal(taskPickDeliveryDto.CodeDelivery, result.CodeDelivery);
            Assert.Equal(taskPickDeliveryDto.Floor, result.Floor);
            Assert.Equal(taskPickDeliveryDto.Room, result.Room);
            Assert.Equal(taskPickDeliveryDto.Description, result.Description);
        }

        [Fact]
        public async Task CreateVigilanceTask_Successful_ReturnsTaskVigilanceDto()
        {
            // Arrange
            var taskVigilanceDto = new TaskVigilanceDto
            {
                userEmail = "test@example.com",
                Floor = "2",
                Description = "Vigilance Task Description",
                PhoneNumber = "1234567890"
            };

            var expectedTask = new TaskVigilance(taskVigilanceDto.userEmail, taskVigilanceDto.Floor, taskVigilanceDto.Description, taskVigilanceDto.PhoneNumber);

            _mockTaskVigilanceRepository.Setup(x => x.InsertTaskAsync(It.IsAny<TaskVigilance>()).Result).Returns(taskVigilanceDto);

            // Act
            var result = await _taskService.CreateVigilanceTask(taskVigilanceDto);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(taskVigilanceDto.userEmail, result.userEmail);
            Assert.Equal(taskVigilanceDto.Floor, result.Floor);
            Assert.Equal(taskVigilanceDto.Description, result.Description);
            Assert.Equal(taskVigilanceDto.PhoneNumber, result.PhoneNumber);
        }

        [Fact]
        public async Task GetTasksNonAprovedAsync_ReturnsCorrectDtoLists()
        {
            // Arrange
            var mockVigilanceTasks = new List<TaskVigilance>
{
    new TaskVigilance("user1@example.com", "Floor1", "Description1", "1234567890"),
    new TaskVigilance("user3@example.com", "Floor3", "Description3", "0987654321"),
    new TaskVigilance("user4@example.com", "Floor4", "Description4", "1122334455"),
    // Add as many as needed for thorough testing
};


            var mockPickDeliveryTasks = new List<TaskPickDelivery>
{
    new TaskPickDelivery("user2@example.com", "PickupLocation1", "DeliveryLocation1", 1234, "Floor2", new[] { "Room1" }, "Description2"),
    new TaskPickDelivery("user5@example.com", "PickupLocation2", "DeliveryLocation2", 5678, "Floor5", new[] { "Room2", "Room3" }, "Description5"),
    new TaskPickDelivery("user6@example.com", "PickupLocation3", "DeliveryLocation3", 9012, "Floor6", new[] { "Room4" }, "Description6"),
    // More instances can be added as needed
};


            _mockTaskVigilanceRepository.Setup(repo => repo.GetAllNonApproved()).ReturnsAsync(mockVigilanceTasks);
            _mockTaskPickDeliveryRepository.Setup(repo => repo.GetAllNonApproved()).ReturnsAsync(mockPickDeliveryTasks);

            // Act
            var (vigilanceTasks, pickDeliveryTasks) = await _taskService.GetTasksNonAprovedAsync();

            // Assert
            Assert.NotNull(vigilanceTasks);
            Assert.NotNull(pickDeliveryTasks);
            Assert.Equal(mockVigilanceTasks.Count, vigilanceTasks.Count);
            Assert.Equal(mockPickDeliveryTasks.Count, pickDeliveryTasks.Count);

            for (int i = 0; i < mockVigilanceTasks.Count; i++)
            {
                Assert.Equal(mockVigilanceTasks[i].UserEmail, vigilanceTasks[i].userEmail);
                Assert.Equal(mockVigilanceTasks[i].Floor, vigilanceTasks[i].Floor);
                Assert.Equal(mockVigilanceTasks[i].Description, vigilanceTasks[i].Description);
                Assert.Equal(mockVigilanceTasks[i].PhoneNumber, vigilanceTasks[i].PhoneNumber);
            }

            for (int i = 0; i < mockPickDeliveryTasks.Count; i++)
            {
                Assert.Equal(mockPickDeliveryTasks[i].UserEmail, pickDeliveryTasks[i].userEmail);
                Assert.Equal(mockPickDeliveryTasks[i].NamePickup, pickDeliveryTasks[i].NamePickup);
                Assert.Equal(mockPickDeliveryTasks[i].NameDelivery, pickDeliveryTasks[i].NameDelivery);
                Assert.Equal(mockPickDeliveryTasks[i].CodeDelivery, pickDeliveryTasks[i].CodeDelivery);
                Assert.Equal(mockPickDeliveryTasks[i].Floor, pickDeliveryTasks[i].Floor);
                Assert.Equal(mockPickDeliveryTasks[i].Room, pickDeliveryTasks[i].Room);
                Assert.Equal(mockPickDeliveryTasks[i].Description, pickDeliveryTasks[i].Description);
            }   
        }
        [Fact]
        public async Task GetTasksNonAprovedAsync_TaskVigilanceRepositoryFails_ThrowsException()
        {
            // Arrange
            _mockTaskVigilanceRepository.Setup(repo => repo.GetAllNonApproved()).ThrowsAsync(new Exception("Database access error"));

            var mockPickDeliveryTasks = new List<TaskPickDelivery>
        {
            new TaskPickDelivery("user2@example.com", "PickupLocation1", "DeliveryLocation1", 1234, "Floor2", new[] { "Room1" }, "Description2"),
            // Additional TaskPickDelivery instances if needed
        };

            _mockTaskPickDeliveryRepository.Setup(repo => repo.GetAllNonApproved()).ReturnsAsync(mockPickDeliveryTasks);

            // Act & Assert
            var exception = await Assert.ThrowsAsync<Exception>(() => _taskService.GetTasksNonAprovedAsync());
            Assert.Equal("Database access error", exception.Message);
        }
    }
}
