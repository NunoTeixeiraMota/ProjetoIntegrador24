using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;

namespace RobDroneAndGOAuth.Model.User
{
    public class ApplicationRole : MongoIdentityRole<ObjectId>
    {
        public ApplicationRole(string roleName) : base(roleName)
        {
        }
        public ApplicationRole() { }
    }
}
