using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Services.IServices;
using System.Runtime.Serialization;
using MongoDB.Driver;

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