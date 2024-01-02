using RobDroneAndGOAuth.Model.Task.TaskDtos;
using RobDroneAndGOAuth.Model.Task;
using RobDroneAndGOAuth.Model.User.UserDTOs;
using RobDroneAndGOAuth.Model.User;
using System.ComponentModel.DataAnnotations;

public class UserMapper
{
    public DisplayUserDto toDisplayDTO(ApplicationUser v)
    {
        return new DisplayUserDto
        {
            Name = v.UserName,
            Email = v.Email
        };
    }
}
