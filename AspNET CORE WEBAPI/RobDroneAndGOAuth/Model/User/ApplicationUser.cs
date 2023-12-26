using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;

namespace RobDroneAndGOAuth.Model.User
{
    public class ApplicationUser : MongoIdentityUser<ObjectId>
    {
    }
}
