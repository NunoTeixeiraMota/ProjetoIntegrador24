using Microsoft.AspNetCore.Mvc;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Services.IServices;

namespace RobDroneAndGOAuth.Controllers
{
    [ApiController]
    [Route("Task")]
    public class TaskController : ControllerBase
    {
        private ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("Vigilance")]
        public async Task<TaskVigilanceDto> taskVigilance(TaskVigilanceDto dto)
        {
            return await _taskService.createVigilanceTask(dto);
        }

        [HttpPost("PickDelivery")]
        public async Task<TaskPickDeliveryDto> taskPickDelivery(TaskPickDeliveryDto dto)
        {
            return await _taskService.createPickDeliveryTask(dto);
        }
        /*
        [HttpGet("Search")]
        public async Task<IActionResult> SearchTasks([FromQuery] string state, [FromQuery] string deviceType, [FromQuery] string userId)
        {
            var tasks = await _taskService.SearchTasks(state, deviceType, userId);

            if (tasks == null || !tasks.Any())
            {
                return NotFound("No matching tasks found.");
            }

            return Ok(tasks);
        }*/
    }
}