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
                var result = await _signInManager.PasswordSignInAsync(appUser, user.Password, false, false);
                if (result.Succeeded)
                {
                    var roles = await _userManager.GetRolesAsync(appUser);
                    var token = await _tokenService.GenerateJwtToken(appUser);
                    return new TokenDto(true,token.AccessToken,roles,token.ExpirationDate);
                }
            }

            return new TokenDto(false);
        }

        public async Task<ApplicationUser> Register(CreateUserDto user)
        {
            try
            {
                ApplicationUser appUser = new ApplicationUser
                {
                    UserName = user.Name,
                    Email = user.Email
                };

                IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);
                if (result.Succeeded)
                {
                    // Assuming the default role is "ROLE_USER"
                    string defaultRole = "ROLE_USER";
                    // Check if the role exists
                    if (!await _rolemanager.RoleExistsAsync(defaultRole))
                    {
                        // Create the role if it doesn't exist
                        await _rolemanager.CreateAsync(new ApplicationRole(defaultRole));
                    }

                    // Add the user to the default role
                    await _userManager.AddToRoleAsync(appUser, defaultRole);
                    // Lockout new users in order to admin to accept them
                    await _userManager.SetLockoutEndDateAsync(appUser, (DateTimeOffset.Now.AddYears(100)));
                    return appUser;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                // Consider logging the exception
                return null;
            }
        }

    }
}
