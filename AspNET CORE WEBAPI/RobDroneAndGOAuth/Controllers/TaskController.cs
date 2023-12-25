using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Web.Resource;
using RobDroneAndGOAuth.Model.Token.TokenDTO;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Services.IServices;

namespace RobDroneAndGOAuth.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private ITaskService _taskService;

        public UserController(ITaskService taskService)
        {
            _taskService = ITaskService;
        }

        [HttpPost("TaskVigilance")]
        public async Task<TaskVigilanceDto> taskVigilance(TaskVigilanceDto dto)
        {
            return await _taskService.createVigilanceTask(dto);
        }

        [HttpPost("TaskPickDelivery")]
        public async Task<TaskPickDeliveryDto> taskPickDelivery(TaskPickDeliveryDto dto)
        {
            return await _taskService.createPickDeliveryTask(dto);
        }
    } 
}
