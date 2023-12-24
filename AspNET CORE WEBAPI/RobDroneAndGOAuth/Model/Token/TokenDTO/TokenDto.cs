using System;
using System.Collections.Generic;

namespace RobDroneAndGOAuth.Model.Token.TokenDTO
{
    public class TokenDto
    {
        public bool IsAuthenticated { get; set; }
        public string AccessToken { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string Error { get; set; }

        public TokenDto()
        {
            
        }

        public TokenDto(string error)
        {
            IsAuthenticated = false;
            Error = error;
        }

        public TokenDto(bool isAuthenticated, string accessToken = null, IEnumerable<string> roles = null, DateTime expirationDate = default)
        {
            IsAuthenticated = isAuthenticated;
            AccessToken = accessToken;
            Roles = roles ?? new List<string>();
            ExpirationDate = expirationDate;
        }


        public TokenDto(string accessToken, DateTime expirationDate)
        {
            IsAuthenticated = true; // Assuming token presence implies authentication
            AccessToken = accessToken;
            ExpirationDate = expirationDate;
            Roles = new List<string>(); // Default to an empty list
        }

    }
}
