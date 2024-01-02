using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;
using RobDroneAndGOAuth.Model.ApplicationRole;
using RobDroneAndGOAuth.Model.User;
using RobDroneAndGOAuth.Model.User.UserDTOs;
using RobDroneAndGOAuth.Services;
using RobDroneAndGOAuth.Services.IServices;
using Xunit;

public class UserAppServiceIntegrationTests : IAsyncLifetime
{
    private readonly IMongoClient _mongoClient;
    private readonly IMongoDatabase _testDatabase;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly IUserAppService _userAppService;

    public UserAppServiceIntegrationTests()
    {

        // Create configuration
        var configuration = CreateConfiguration();

        // Initialize MongoDB client
        var connectionString = "mongodb://mongoadmin:105711abb1e672194c53cbe4@vsgate-s1.dei.isep.ipp.pt:11147/?authMechanism=SCRAM-SHA-256";
        _mongoClient = new MongoClient(connectionString);

        // Create or get your test database
        _testDatabase = _mongoClient.GetDatabase("IntegrationTesting");

        // Set up dependency injection container
        var services = new ServiceCollection();
        ConfigureServices(services, connectionString, configuration);

        // Build service provider and resolve services
        var serviceProvider = services.BuildServiceProvider();
        _userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        _signInManager = serviceProvider.GetRequiredService<SignInManager<ApplicationUser>>();
        _tokenService = serviceProvider.GetRequiredService<ITokenService>();
        _roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
        _userAppService = serviceProvider.GetRequiredService<IUserAppService>();

    }

    private IConfiguration CreateConfiguration()
    {
        var configurationBuilder = new ConfigurationBuilder();
        configurationBuilder.AddInMemoryCollection(new Dictionary<string, string>
    {
        {"JwtSettings:SecretKey", "v3ryC0mpl3x&L0ngS3cr3tKeyTh@t1sH@rdToGu3ss"},
        {"JwtSettings:Issuer", "RobDroneAndGO"},
        {"JwtSettings:Audience", "RobDroneAndGO"},
        {"JwtSettings:Expires", "1440"} // Assuming 'Expires' is in minutes
    });

        return configurationBuilder.Build();
    }
    public Task InitializeAsync()
    {
        // Initialization code if needed, otherwise just return Task.CompletedTask
        return Task.CompletedTask;
    }

    private void ConfigureServices(IServiceCollection services, string connectionString, IConfiguration configuration)
    {
        // Add configuration to services
        services.AddSingleton<IConfiguration>(configuration);

        // Add logging services
        services.AddLogging();

        // Configure your services here as you did in program.cs
        services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
        {
            options.User.RequireUniqueEmail = true;
            options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+ ";
        })
        .AddMongoDbStores<ApplicationUser, ApplicationRole, ObjectId>(
            connectionString,
            _testDatabase.DatabaseNamespace.DatabaseName
        )
        .AddDefaultTokenProviders();

        // Add other services like ITokenService, IUserAppService, etc.
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserAppService, UserAppService>();
    }

    public async Task DisposeAsync()
    {
        await ClearCollectionsAsync();

    }
    private async Task ClearCollectionsAsync()
    {
        var userCollection = _testDatabase.GetCollection<ApplicationUser>("applicationUsers");
        var roleCollection = _testDatabase.GetCollection<ApplicationRole>("applicationRoles");

        var emptyUserFilter = Builders<ApplicationUser>.Filter.Empty;
        var emptyRoleFilter = Builders<ApplicationRole>.Filter.Empty;

        await userCollection.DeleteManyAsync(emptyUserFilter);
        await roleCollection.DeleteManyAsync(emptyRoleFilter);
    }
    [Fact]
    public async Task RegisterIntegrationTest_Successful_CreatesNewUser()
    {
        // Arrange
        var createUserDto = new CreateUserDto
        {
            Name = "Test User",
            Email = "testusersucess@example.com",
            Password = "TestPassword123!",
            phonenumber = "1234567890"
        };

        // Act
        var result = await _userAppService.Register(createUserDto);

        // Assert
        Assert.NotNull(result);
        Assert.NotNull(result.User);
        Assert.Equal(createUserDto.Email, result.User.Email);
        Assert.Equal(createUserDto.Name + createUserDto.phonenumber, result.User.UserName);
    }

    [Fact]
    public async Task Register_WithExistingEmail_Fails()
    {
        // Arrange: Create a user
        var existingUserDto = new CreateUserDto
        {
            Name = "Existing User",
            Email = "existinguser@example.com",
            Password = "ExistingPassword123!",
            phonenumber = "9876543210"
        };
        var rs = await _userAppService.Register(existingUserDto);

        // Act: Try to register another user with the same email
        var newUserDto = new CreateUserDto
        {
            Name = "New User",
            Email = "existinguser@example.com",
            Password = "NewPassword123!",
            phonenumber = "1230984567"
        };
        var result = await _userAppService.Register(newUserDto);

        // Assert: Registration should fail
        Assert.NotNull(result);
        Assert.Null(result.User);
        Assert.NotEmpty(result.Error);
    }

    [Fact]
    public async Task Register_WithInvalidEmail_Fails()
    {
        // Arrange
        var createUserDto = new CreateUserDto
        {
            Name = "Test User",
            Email = "invalidemail",
            Password = "TestPassword123!",
            phonenumber = "1234567890"
        };

        // Act
        var result = await _userAppService.Register(createUserDto);

        // Assert
        Assert.NotNull(result);
        Assert.Null(result.User);
    }
    [Fact]
    public async Task Register_WithWeakPassword_Fails()
    {
        // Arrange
        var createUserDto = new CreateUserDto
        {
            Name = "Test User",
            Email = "testuserweakpassowrd@example.com",
            Password = "123",
            phonenumber = "1234567890"
        };

        // Act
        var result = await _userAppService.Register(createUserDto);

        // Assert
        Assert.NotNull(result);
        Assert.Null(result.User);
        Assert.NotEmpty(result.Error);
    }

    [Fact]
    public async Task Login_IncorrectPassword_ReturnsFailureMessage()
    {
        // Arrange: Register a user first
        var registeredUser = new CreateUserDto
        {
            Name = "Test User",
            Email = "testloginfail@example.com",
            Password = "TestLoginPassword123!",
            phonenumber = "123456789"
        };
        var rs = await _userAppService.Register(registeredUser);


        var loginUserDto = new LoginUserDto
        {
            Email = "testloginfail@example.com",
            Password = "IncorrectPassword!"
        };

        // Act
        var result = await _userAppService.Login(loginUserDto);

        // Assert
        Assert.NotNull(result);
        Assert.False(result.IsAuthenticated);
        Assert.Contains("Incorrect password", result.Error);

    }

    [Fact]
    public async Task Login_NonexistentEmail_ReturnsFailureMessage()
    {
        // Arrange
        var loginUserDto = new LoginUserDto
        {
            Email = "nonexistent@example.com",
            Password = "AnyPassword123!"
        };

        // Act
        var result = await _userAppService.Login(loginUserDto);

        // Assert
        Assert.NotNull(result);
        Assert.False(result.IsAuthenticated);
        Assert.Contains("User with email", result.Error);
        Assert.Contains("not found", result.Error);
    }

    [Fact]
    public async Task DeleteAccount_ExistingUser_DeletesSuccessfully()
    {
        // Arrange: Register a user first
        var registeredUser = new CreateUserDto
        {
            Name = "Test User",
            Email = "testdelete@example.com",
            Password = "TestDeletePassword123!",
            phonenumber = "1234567890"
        };
        var registeredResult = await _userAppService.Register(registeredUser);

        // Act
        var result = await _userAppService.DeleteAccount(registeredUser.Email);

        // Assert
        Assert.True(result.Succeeded);
    }
    [Fact]
    public async Task DeleteAccount_NonexistentUser_ReturnsErrorMessage()
    {
        // Arrange
        var nonExistentEmail = "nonexistentdelete@example.com";

        // Act
        var result = await _userAppService.DeleteAccount(nonExistentEmail);

        // Assert
        Assert.False(result.Succeeded);
        Assert.Contains(result.Errors, e => e.Description == "User not found.");
    }


    [Fact]
    public async Task EditUser_SuccessfulEdit_ReturnsIdentityResultSuccess()
    {
        // Arrange: Register a user first
        var registeredUser = new CreateUserDto
        {
            Name = "Test User",
            Email = "testedit@example.com",
            Password = "TestEditPassword123!",
            phonenumber = "1234567890"
        };
        var registeredResult = await _userAppService.Register(registeredUser);

        // Act: Edit the user
        var editUserDto = new EditUserDto
        {
            CurrentEmail = registeredUser.Email,
            Email = "edited@example.com",
            Password = "NewPassword123!",
            CurrentPassword = registeredUser.Password,
            phonenumber = "9876543210",
            Name = "Edited Name"
        };
        var result = await _userAppService.editUser(editUserDto);
        Assert.True(result.Succeeded);

    }
    [Fact]
    public async Task EditUser_UserNotFound_ReturnsErrorMessage()
    {
        // Arrange
        var editUserDto = new EditUserDto
        {
            CurrentEmail = "nonexistent@example.com",
            Email = "edited@example.com",
            Password = "NewPassword123!",
            CurrentPassword = "NonexistentPassword",
            phonenumber = "9876543210",
            Name = "Edited Name"
        };

        // Act
        var result = await _userAppService.editUser(editUserDto);

        // Assert: Editing should fail with user not found error
        Assert.False(result.Succeeded);
        Assert.Contains(result.Errors, e => e.Description == "User not found.");
    }

    [Fact]
    public async Task EditUser_InvalidData_ReturnsErrorMessage()
    {
        // Arrange: Register a user first
        var registeredUser = new CreateUserDto
        {
            Name = "Test User",
            Email = "testinvalidedit@example.com",
            Password = "TestInvalidEditPassword123!",
            phonenumber = "1234567890"
        };
        var registeredResult = await _userAppService.Register(registeredUser);

        // Act: Try to edit with invalid data
        var editUserDto = new EditUserDto
        {
            CurrentEmail = registeredUser.Email,
            Email = "invalidemail",
            Password = "ShortPwd",
            CurrentPassword = registeredUser.Password,
            phonenumber = "9876543210",
            Name = ""
        };
        var result = await _userAppService.editUser(editUserDto);

        // Assert: Editing should fail with invalid data error
        Assert.False(result.Succeeded);
        Assert.Contains(result.Errors, e => e.Description == "Email 'invalidemail' is invalid.");
    }

    [Fact]
    public async Task ApproveUser_ExistingUser_ApprovesSuccessfully()
    {
        // Arrange: Register a user first
        var registeredUser = new CreateUserDto
        {
            Name = "Approval Test User",
            Email = "testapprove@example.com",
            Password = "TestApprovePassword123!",
            phonenumber = "1234567890"
        };
        await _userAppService.Register(registeredUser);

        // Act
        var result = await _userAppService.ApproveUser(registeredUser.Email);

        // Assert
        Assert.True(result.Succeeded);
    }

    [Fact]
    public async Task ApproveUser_NonexistentUser_ReturnsErrorMessage()
    {
        // Arrange
        var nonExistentEmail = "nonexistentapprove@example.com";

        // Act
        var result = await _userAppService.ApproveUser(nonExistentEmail);

        // Assert
        Assert.False(result.Succeeded);
        Assert.Contains(result.Errors, e => e.Description == "User not found.");
    }

    [Fact]
    public async Task DenyUser_ExistingUser_DeletesSuccessfully()
    {
        // Arrange: Register a user first
        var registeredUser = new CreateUserDto
        {
            Name = "Denial Test User",
            Email = "testdeny@example.com",
            Password = "TestDenyPassword123!",
            phonenumber = "1234567890"
        };
        await _userAppService.Register(registeredUser);

        // Act
        var result = await _userAppService.DenyUser(registeredUser.Email);

        // Assert
        Assert.True(result.Succeeded);
    }

    [Fact]
    public async Task DenyUser_NonexistentUser_ReturnsErrorMessage()
    {
        // Arrange
        var nonExistentEmail = "nonexistentdeny@example.com";

        // Act
        var result = await _userAppService.DenyUser(nonExistentEmail);

        // Assert
        Assert.False(result.Succeeded);
        Assert.Contains(result.Errors, e => e.Description == "User not found.");
    }

}