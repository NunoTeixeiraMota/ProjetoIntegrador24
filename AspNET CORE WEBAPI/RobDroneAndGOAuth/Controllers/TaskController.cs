using Microsoft.AspNetCore.Mvc;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Services.IServices;

namespace RobDroneAndGOAuth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("Vigilance")]
        public async Task<TaskVigilanceDto> taskVigilance(TaskVigilanceDto dto)
        {
            return await _taskService.CreateVigilanceTask(dto);
        }

        [HttpPost("PickDelivery")]
        public async Task<TaskPickDeliveryDto> taskPickDelivery(TaskPickDeliveryDto dto)
        {
            return await _taskService.TaskCreatePickDeliveryTask(dto);
        }

    }
}