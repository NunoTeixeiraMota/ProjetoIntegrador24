using System.ComponentModel;
using IdentityMongo.Settings;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;
using RobDroneAndGOAuth.Model.ApplicationRole;
using RobDroneAndGOAuth.Model.Token.TokenDTO;
using RobDroneAndGOAuth.Model.User;
using RobDroneAndGOAuth.Model.User.UserDTOs;
using RobDroneAndGOAuth.Services.IServices;
namespace RobDroneAndGOAuth.Services
{
    public class UserAppService : IUserAppService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly RoleManager<ApplicationRole> _rolemanager;

        public UserAppService(UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ITokenService tokenService,
            RoleManager<ApplicationRole> rolemanager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _rolemanager = rolemanager;
        }

        public async Task<TokenDto> Login(LoginUserDto user)
        {
            ApplicationUser? appUser = await _userManager.FindByEmailAsync(user.Email);
            if (appUser != null)
            {
                try
                {
                    var result = await _signInManager.PasswordSignInAsync(appUser, user.Password, false, false);
                    if (result.Succeeded)
                    {
                        var roles = await _userManager.GetRolesAsync(appUser);
                        var token = await _tokenService.GenerateJwtToken(appUser);
                        return new TokenDto(true, token.AccessToken, roles, token.ExpirationDate);
                    }
                    else return new TokenDto($"Incorrect password for User with email {user.Email} !");

                }
                catch (Exception ex)
                {
                    return new TokenDto(ex.Message);
                }
            }
            else
            {
                return new TokenDto($"User with email {user.Email} not found!");
            }
        }

      

        public async Task<RegisteredDTO> Register(CreateUserDto user)
        {
            ApplicationUser appUser = new ApplicationUser
            {
                UserName = user.Name + user.phonenumber,
                Email = user.Email
            };
            IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);
            if (result.Succeeded)
            {
                string defaultRole = "ROLE_USER";
                if (!await _rolemanager.RoleExistsAsync(defaultRole))
                {
                    await _rolemanager.CreateAsync(new ApplicationRole(defaultRole));
                }

                await _userManager.AddToRoleAsync(appUser, defaultRole);
                await _userManager.SetLockoutEndDateAsync(appUser, (DateTimeOffset.Now.AddYears(100)));
                return new RegisteredDTO { User = appUser, Error = null };
            }
            else
            {
                return new RegisteredDTO { User = null, Error = result.Errors };
            }
        }

        public async Task<IdentityResult> DeleteAccount(string Email)
        {
            ApplicationUser? appUser = await _userManager.FindByEmailAsync(Email);
            if (appUser == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }
            else
                return await _userManager.DeleteAsync(appUser);
        }

        public async Task<IdentityResult> editUser(EditUserDto user)
        {
            ApplicationUser? appUser = await _userManager.FindByEmailAsync(user.CurrentEmail);
            if (appUser == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }

            try
            {
                if (user.Email != "")
                {
                    await _userManager.SetEmailAsync(appUser, user.Email);
                }

                if (user.Password != "")
                {
                    await _userManager.ChangePasswordAsync(appUser, user.CurrentPassword, user.Password);
                }
                if (user.phonenumber != "")
                {
                    await _userManager.SetPhoneNumberAsync(appUser, user.phonenumber);
                }
                if (user.Name != "")
                {
                    await _userManager.SetUserNameAsync(appUser, user.Name);
                }
                return await _userManager.UpdateAsync(appUser);

            }
            catch (Exception)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Please introduce valid data." });
            }
        }
        public async Task<IdentityResult> ApproveUser(string Email)
        {
            ApplicationUser? appUser = await _userManager.FindByEmailAsync(Email);
            if (appUser == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }
            else
            {
                return await _userManager.SetLockoutEndDateAsync(appUser, (DateTimeOffset.Now));

            }
        }
        public async Task<IdentityResult> DenyUser(string Email)
        {
            ApplicationUser? appUser = await _userManager.FindByEmailAsync(Email);
            if (appUser == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "User not found." });
            }
            else
            {
                return await _userManager.SetLockoutEndDateAsync(appUser, (DateTimeOffset.Now.AddYears(99999)));

            }
        }
    }
}