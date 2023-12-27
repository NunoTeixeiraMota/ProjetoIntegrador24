using Xunit;
using Moq;
using RobDroneAndGOAuth.Services;
using Microsoft.AspNetCore.Identity;
using RobDroneAndGOAuth.Model.User;
using RobDroneAndGOAuth.Model.User.UserDTOs;
using System.Threading.Tasks;
using RobDroneAndGOAuth.Model.Token.TokenDTO;
using System.Collections.Generic;
using System;
using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;
using RobDroneAndGOAuth.Model.ApplicationRole;
using RobDroneAndGOAuth.Services.IServices;

namespace RobDroneAndGOAuth.Tests
{
    public class UserAppServiceTests
    {
        private readonly Mock<UserManager<ApplicationUser>> _mockUserManager;
        private readonly Mock<SignInManager<ApplicationUser>> _mockSignInManager;
        private readonly Mock<ITokenService> _mockTokenService;
        private readonly Mock<RoleManager<ApplicationRole>> _mockRoleManager;
        private readonly UserAppService _userAppService;

        public UserAppServiceTests()
        {
            _mockUserManager = new Mock<UserManager<ApplicationUser>>(
                Mock.Of<IUserStore<ApplicationUser>>(),
                null, null, null, null, null, null, null, null);
            _mockSignInManager = new Mock<SignInManager<ApplicationUser>>(
                _mockUserManager.Object,
                Mock.Of<IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<ApplicationUser>>(),
                null, null, null, null);
            _mockTokenService = new Mock<ITokenService>();
            _mockRoleManager = new Mock<RoleManager<ApplicationRole>>(
                Mock.Of<IRoleStore<ApplicationRole>>(),
                null, null, null, null);

            _userAppService = new UserAppService(
                _mockUserManager.Object,
                _mockSignInManager.Object,
                _mockTokenService.Object,
                _mockRoleManager.Object);
        }

        [Fact]
        public async Task Login_Successful_ReturnsTokenDto()
        {
            // Arrange
            var loginUserDto = new LoginUserDto { Email = "test@example.com", Password = "password123" };
            var appUser = new ApplicationUser { Email = "test@example.com", UserName = "TestUser" };
            var tokenDto = new TokenDto(true, "AccessToken123", new List<string> { "ROLE_USER" }, DateTime.Now.AddDays(1));

            _mockUserManager.Setup(x => x.FindByEmailAsync(loginUserDto.Email)).ReturnsAsync(appUser);
            _mockSignInManager.Setup(x => x.PasswordSignInAsync(appUser, loginUserDto.Password, false, false))
                              .ReturnsAsync(SignInResult.Success);
            _mockTokenService.Setup(x => x.GenerateJwtToken(appUser)).ReturnsAsync(tokenDto);

            // Act
            var result = await _userAppService.Login(loginUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.IsAuthenticated);
        }

        [Fact]
        public async Task Register_Successful_ReturnsRegisteredDTO()
        {
            // Arrange
            var createUserDto = new CreateUserDto { Name = "TestUser", Email = "test@example.com", Password = "password123", phonenumber = "1234567890" };
            var appUser = new ApplicationUser { Email = createUserDto.Email, UserName = createUserDto.Name + createUserDto.phonenumber };
            var identityResult = IdentityResult.Success;

            _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), createUserDto.Password))
                            .ReturnsAsync(identityResult);
            _mockRoleManager.Setup(x => x.RoleExistsAsync(It.IsAny<string>())).ReturnsAsync(true);
            _mockUserManager.Setup(x => x.AddToRoleAsync(appUser, It.IsAny<string>()))
                            .ReturnsAsync(identityResult);

            // Act
            var result = await _userAppService.Register(createUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.NotNull(result.User);
            Assert.Null(result.Error);
        }

        [Fact]
        public async Task Login_InvalidPassword_ReturnsFailure()
        {
            // Arrange
            var loginUserDto = new LoginUserDto { Email = "test@example.com", Password = "wrongPassword" };
            var appUser = new ApplicationUser { Email = "test@example.com", UserName = "TestUser" };

            _mockUserManager.Setup(x => x.FindByEmailAsync(loginUserDto.Email)).ReturnsAsync(appUser);
            _mockSignInManager.Setup(x => x.PasswordSignInAsync(appUser, loginUserDto.Password, false, false))
                              .ReturnsAsync(SignInResult.Failed);

            // Act
            var result = await _userAppService.Login(loginUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.False(result.IsAuthenticated);
        }

        [Fact]
        public async Task Login_AccountLockedOut_ReturnsFailure()
        {
            // Arrange
            var loginUserDto = new LoginUserDto { Email = "locked@example.com", Password = "password123" };
            var lockedUser = new ApplicationUser { Email = "locked@example.com", UserName = "LockedUser" };

            _mockUserManager.Setup(x => x.FindByEmailAsync(loginUserDto.Email)).ReturnsAsync(lockedUser);
            _mockSignInManager.Setup(x => x.PasswordSignInAsync(lockedUser, loginUserDto.Password, false, false))
                              .ReturnsAsync(SignInResult.LockedOut);

            // Act
            var result = await _userAppService.Login(loginUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.False(result.IsAuthenticated);
        }

        [Fact]
        public async Task Register_Successful_CreatesUserAndAssignsRole()
        {
            // Arrange
            var createUserDto = new CreateUserDto { Name = "TestUser", Email = "test@example.com", Password = "password123", phonenumber = "1234567890" };
            var identityResult = IdentityResult.Success;

            _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), createUserDto.Password))
                            .ReturnsAsync(identityResult);
            _mockRoleManager.Setup(x => x.RoleExistsAsync(It.IsAny<string>())).ReturnsAsync(true);
            _mockUserManager.Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                            .ReturnsAsync(identityResult);

            // Act
            var result = await _userAppService.Register(createUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.NotNull(result.User);
            Assert.Null(result.Error);
        }

        [Fact]
        public async Task Register_DuplicateEmail_Fail()
        {
            // Arrange
            var createUserDto = new CreateUserDto { Name = "TestUser", Email = "test@example.com", Password = "password123", phonenumber = "1234567890" };
            var identityResult = IdentityResult.Failed(new IdentityError { Description = "Email already taken" });

            _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), createUserDto.Password))
                            .ReturnsAsync(identityResult);

            // Act
            var result = await _userAppService.Register(createUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.Null(result.User);
            Assert.Single(result.Error);
            Assert.Equal("Email already taken", result.Error.First().Description);
        }

        [Fact]
        public async Task Register_RoleDoesNotExist_CreatesRoleAndAssignsUser()
        {
            // Arrange
            var createUserDto = new CreateUserDto { Name = "TestUser", Email = "test@example.com", Password = "password123", phonenumber = "1234567890" };
            var identityResult = IdentityResult.Success;

            _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<ApplicationUser>(), createUserDto.Password))
                            .ReturnsAsync(identityResult);
            _mockRoleManager.Setup(x => x.RoleExistsAsync(It.IsAny<string>())).ReturnsAsync(false);
            _mockRoleManager.Setup(x => x.CreateAsync(It.IsAny<ApplicationRole>())).ReturnsAsync(identityResult);
            _mockUserManager.Setup(x => x.AddToRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                            .ReturnsAsync(identityResult);

            // Act
            var result = await _userAppService.Register(createUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.NotNull(result.User);
            Assert.Null(result.Error);
        }

        [Fact]
        public async Task DeleteAccount_UserExists_DeletesUser()
        {
            // Arrange
            var userEmail = "test@example.com";
            var appUser = new ApplicationUser { Email = userEmail, UserName = "TestUser" };
            var identityResult = IdentityResult.Success;

            _mockUserManager.Setup(x => x.FindByEmailAsync(userEmail)).ReturnsAsync(appUser);
            _mockUserManager.Setup(x => x.DeleteAsync(appUser)).ReturnsAsync(identityResult);

            // Act
            var result = await _userAppService.DeleteAccount(userEmail);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Succeeded);
        }

        [Fact]
        public async Task DeleteAccount_UserDoesNotExist_ReturnsFailedResult()
        {
            // Arrange
            var userEmail = "nonexistent@example.com";

            _mockUserManager.Setup(x => x.FindByEmailAsync(userEmail)).ReturnsAsync((ApplicationUser)null);

            // Act
            var result = await _userAppService.DeleteAccount(userEmail);

            // Assert
            Assert.NotNull(result);
            Assert.False(result.Succeeded);
            Assert.Single(result.Errors);
            Assert.Equal("User not found.", result.Errors.First().Description);
        }

        [Fact]
        public async Task EditUser_ValidData_ReturnsSuccess()
        {
            // Arrange
            var editUserDto = new EditUserDto
            {
                CurrentEmail = "test@example.com",
                Email = "newemail@example.com",
                CurrentPassword = "currentPassword123",
                Password = "newPassword456",
                Name = "NewUserName",
                phonenumber = "9876543210"
            };

            var appUser = new ApplicationUser { Email = "test@example.com", UserName = "TestUser" };
            var identityResult = IdentityResult.Success;

            _mockUserManager.Setup(x => x.FindByEmailAsync(editUserDto.CurrentEmail)).ReturnsAsync(appUser);
            _mockUserManager.Setup(x => x.SetEmailAsync(appUser, editUserDto.Email)).ReturnsAsync(IdentityResult.Success);
            _mockUserManager.Setup(x => x.ChangePasswordAsync(appUser, editUserDto.CurrentPassword, editUserDto.Password)).ReturnsAsync(IdentityResult.Success);
            _mockUserManager.Setup(x => x.SetPhoneNumberAsync(appUser, editUserDto.phonenumber)).ReturnsAsync(IdentityResult.Success);
            _mockUserManager.Setup(x => x.SetUserNameAsync(appUser, editUserDto.Name)).ReturnsAsync(IdentityResult.Success);
            _mockUserManager.Setup(x => x.UpdateAsync(appUser)).ReturnsAsync(identityResult);

            // Act
            var result = await _userAppService.editUser(editUserDto);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.Succeeded);
        }

    }
}
