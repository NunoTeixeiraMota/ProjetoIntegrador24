using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Repositories.IRepositories;
using RobDroneAndGOAuth.Services.IServices;

namespace RobDroneAndGOAuth.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskPickDeliveryRepository _taskPickDeliveryRepository;
        private readonly ITaskVigilanceRepository _taskVigilanceRepository;

        public TaskService(ITaskPickDeliveryRepository taskPickDeliveryRepository, ITaskVigilanceRepository taskVigilanceRepository)
        {
            _taskPickDeliveryRepository = taskPickDeliveryRepository;
            _taskVigilanceRepository = taskVigilanceRepository;
        }

        public async Task<TaskPickDeliveryDto> TaskCreatePickDeliveryTask(TaskPickDeliveryDto dto)
        {
            try{
                return await _taskPickDeliveryRepository.InsertTaskAsync(new TaskPickDelivery(dto.userEmail, dto.NamePickup, dto.NameDelivery, dto.CodeDelivery, dto.Floor, dto.Room, dto.Description));
            }catch(Exception){
                return null;
            }
        }

        public async Task<TaskVigilanceDto> CreateVigilanceTask(TaskVigilanceDto dto)
        {
            try{
                return await _taskVigilanceRepository.InsertTaskAsync(new TaskVigilance(dto.userEmail, dto.Floor, dto.Description, dto.PhoneNumber));
            }catch(Exception){
                return null;
            }
            
        }
        public async Task<(List<TaskVigilanceDto>, List<TaskPickDeliveryDto>)> GetTasksNonAprovedAsync()
        {
            var vigilanceTasksEntities = await _taskVigilanceRepository.GetAllNonApproved();
            var pickDeliveryTasksEntities = await _taskPickDeliveryRepository.GetAllNonApproved();

            var vigilanceTasks = vigilanceTasksEntities.Select(v => new TaskVigilanceDto
            {
                userEmail = v.UserEmail,
                Floor = v.Floor,
                Description = v.Description,
                PhoneNumber = v.PhoneNumber
            }).ToList();

            var pickDeliveryTasks = pickDeliveryTasksEntities.Select(p => new TaskPickDeliveryDto
            {
                userEmail = p.UserEmail,
                NamePickup = p.NamePickup,
                NameDelivery = p.NameDelivery,
                CodeDelivery = p.CodeDelivery,
                Floor = p.Floor,
                Room = p.Room,
                Description = p.Description
            }).ToList();

            return (vigilanceTasks, pickDeliveryTasks);
        }

    }
}