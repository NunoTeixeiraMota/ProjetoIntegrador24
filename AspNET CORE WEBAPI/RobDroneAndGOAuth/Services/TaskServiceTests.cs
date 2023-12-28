using Xunit;
using Moq;
using RobDroneAndGOAuth.Services;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Repository;

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
    }
}
