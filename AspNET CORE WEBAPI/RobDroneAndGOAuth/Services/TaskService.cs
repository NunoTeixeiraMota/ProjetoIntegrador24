using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Services.IServices;
using System.Runtime.Serialization;

namespace RobDroneAndGOAuth.Services
{
    public class TaskService : ITaskService
    {
        public TaskService()
        {

        }

        public async Task<TaskVigilanceDto> createVigilanceTask(TaskVigilanceDto dto)
        {
            return null;
        }

        public async Task<TaskPickDeliveryDto> createPickDeliveryTask(TaskPickDeliveryDto dto)
        {
            return null;
        }
    }
}