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
            try
            {
                return await _taskPickDeliveryRepository.InsertTaskAsync(new TaskPickDelivery(dto.userEmail, dto.NamePickup, dto.NameDelivery, dto.CodeDelivery, dto.Floor, dto.Room, dto.Description));
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<TaskVigilanceDto> CreateVigilanceTask(TaskVigilanceDto dto)
        {
            try
            {
                return await _taskVigilanceRepository.InsertTaskAsync(new TaskVigilance(dto.userEmail, dto.Floor, dto.Description, dto.PhoneNumber));
            }
            catch (Exception)
            {
                return null;
            }

        }

        public async Task<bool> ApproveTaskPickDelivery(Guid taskId)
        {
            try
            {
                var existingTask = await _taskPickDeliveryRepository.GetTaskByIdAsync(taskId);

                if (existingTask == null)
                {
                    return false;
                }

                existingTask.AproveTask();
                await _taskPickDeliveryRepository.UpdateTaskAsync(existingTask);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DenyTaskPickDelivery(Guid taskId)
        {
            try
            {
                var existingTask = await _taskPickDeliveryRepository.GetTaskByIdAsync(taskId);

                if (existingTask == null)
                {
                    return false;
                }

                existingTask.DenyTask();
                await _taskPickDeliveryRepository.UpdateTaskAsync(existingTask);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public async Task<bool> ApproveTaskVigilance(Guid taskId)
        {
            try
            {
                var existingTask = await _taskVigilanceRepository.GetTaskByIdAsync(taskId);
                if (existingTask == null)
                {
                    return false;
                }

                existingTask.AproveTask();
                await _taskVigilanceRepository.UpdateTaskAsync(existingTask);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DenyTaskVigilance(Guid taskId)
        {
            try
            {
                var existingTask = await _taskVigilanceRepository.GetTaskByIdAsync(taskId);
                if (existingTask == null)
                {
                    return false;
                }

                existingTask.DenyTask();
                await _taskVigilanceRepository.UpdateTaskAsync(existingTask);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<TaskVigilanceDto>> GetAllVigilanceTasks()
        {
            var tasks = await _taskVigilanceRepository.GetAllTasksAsync();
            return tasks.Select(task => new TaskVigilanceDto
            {
                userEmail = task.UserEmail,
                Floor = task.Floor,
                Description = task.Description,
                PhoneNumber = task.PhoneNumber
            }).ToList();
        }
        public async Task<TaskVigilanceDto> GetVigilanceTaskById(Guid _taskId)
        {
            return await _taskVigilanceRepository.GetTaskByIdAsync(_taskId);
        }
         public async Task<TaskPickDeliveryDto> GetPickDeliveryTaskById(Guid _taskId)
        {
            return await _taskPickDeliveryRepository.GetTaskByIdAsync(_taskId);
        }

        public async Task<List<TaskPickDeliveryDto>> GetAllPickDeliveryTasks()
        {
            var tasks = await _taskPickDeliveryRepository.GetAllTasksAsync();
            return tasks.Select(task => new TaskPickDeliveryDto
            {
                userEmail = task.UserEmail,
                NamePickup = task.NamePickup,
                NameDelivery = task.NameDelivery,
                CodeDelivery = task.CodeDelivery,
                Floor = task.Floor,
                Room = task.Room,
                Description = task.Description
            }).ToList();
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