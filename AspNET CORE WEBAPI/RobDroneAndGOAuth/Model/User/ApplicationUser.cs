using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;

namespace RobDroneAndGOAuth.Model.User
{
    public class ApplicationUser : MongoIdentityUser<ObjectId>
    {
    }
}
