using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Moq;
using RobDroneAndGOAuth.Model.User;
using RobDroneAndGOAuth.Services;
using Xunit;
using System.IdentityModel.Tokens.Jwt;

namespace YourNamespace.Tests
{
    public class TokenServiceTests
    {
        [Fact]
        public async Task GenerateJwtToken_ValidUser_ReturnsTokenDto()
        {
            // Arrange
            var user = new ApplicationUser { Email = "test@example.com", UserName = "TestUser" };
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json");

            var configuration = builder.Build();

            var userManager = new Mock<UserManager<ApplicationUser>>(
                new Mock<IUserStore<ApplicationUser>>().Object,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);

            userManager.Setup(u => u.GetRolesAsync(It.IsAny<ApplicationUser>()))
                       .ReturnsAsync(new List<string> { "Role1", "Role2" });

            var tokenService = new TokenService(configuration, userManager.Object);
            var tokenHandler = new JwtSecurityTokenHandler();

            // Act
            var result = await tokenService.GenerateJwtToken(user);
            var token = tokenHandler.ReadJwtToken(result.AccessToken);

            // Assert
            Assert.NotNull(result);
            Assert.NotEmpty(result.AccessToken);
            Assert.NotNull(token);

        }
    }
}
