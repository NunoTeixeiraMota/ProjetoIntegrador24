using System.ComponentModel.DataAnnotations;
using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;

namespace RobDroneAndGOAuth.Model.User
{
    public class ApplicationUser : MongoIdentityUser<ObjectId>
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [RegularExpression(@"^\d+$", ErrorMessage = "Phone number must be numeric")]
        public string phonenumber { get; set; }
    }
}
