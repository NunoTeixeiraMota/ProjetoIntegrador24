using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;

namespace RobDroneAndGOAuth.Model.ApplicationRole
{
    public class ApplicationRole : MongoIdentityRole<ObjectId>
    {
        public ApplicationRole(string roleName) : base(roleName)
        {
        }
        public ApplicationRole() { }
    }
}
