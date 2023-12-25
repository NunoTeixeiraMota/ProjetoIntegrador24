using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RobDroneAndGOAuth.Controllers;
using RobDroneAndGOAuth.Model.ApplicationRole;
using RobDroneAndGOAuth.Model.Token.TokenDTO;
using RobDroneAndGOAuth.Model.User;
using RobDroneAndGOAuth.Model.User.UserDTOs;
using RobDroneAndGOAuth.Services.IServices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RobDroneAndGOAuth.Services
{
    public class TaskService : ITaskService
    {
        public TaskService()
        {

        }

        public async Task<TaskVigilanceDto> createVigilanceTask(TaskVigilanceDto dto)
        {
            try{

            } catch (BusinessRuleValidationException ex){
                throw new BadHttpRequestException(ex.Message);
            }
        }

        public async Task<TaskPickDeliveryDto> createPickDeliveryTask(TaskPickDeliveryDto dto)
        {
            try{

            } catch (BusinessRuleValidationException ex){
                throw new BadHttpRequestException(ex.Message);
            }
        }
    }
}