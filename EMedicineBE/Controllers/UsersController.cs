using EMedicineBE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EMedicineBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        EMedicineContext context = new EMedicineContext();

        [HttpPost]
        public IActionResult AddUser([FromBody] User user)
        {
            try
            {
                List<User> users = context.Users.ToList();

                foreach (User u in users)
                {
                    if (u.Email.Equals(user.Email))
                    {
                        return BadRequest($"The inputted email {user.Email} already exists");
                    }
                }

                user.CreatedOn = DateTime.Now;
                context.Users.Add(user);
                context.SaveChanges();

                var userList = context.Users.Select(u => new
                {
                    u.Id,
                    u.FirstName,
                    u.LastName,
                    u.Password,
                    u.Email,
                    u.Fund,
                    u.Type,
                    u.Status,
                    createdAt = ((DateTime)u.CreatedOn).ToShortDateString(),
                    // createdAt = (DateTime.Now).ToShortDateString(),
                }).ToList();

                return Ok(userList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetUserByEmail/{email}/{password}")]
        public IActionResult GetUserByEmail(string email, string password)
        {
            var users = context.Users.Select(u => new
            {
                u.Id,
                u.FirstName,
                u.LastName,
                u.Password,
                u.Email,
                u.Fund,
                u.Type,
                u.Status,
                createdAt = ((DateTime)u.CreatedOn).ToShortDateString(),
            }).Where(u => u.Email.Equals(email) && u.Password.Equals(password)).ToList();

            if (users.Count == 0)
            {
                return NotFound($"The inputted user does not exist yet"); 
            }

            var user = users.FirstOrDefault();

            return Ok(user);
        }

        [HttpPut]
        public IActionResult UpdateAccount([FromBody] User user)
        {
            try
            {
                List<User> users = context.Users.ToList();

                foreach (User u in users)
                {
                    if (u.Email.Equals(user.Email))
                    {
                        u.FirstName = user.FirstName;
                        u.LastName = user.LastName;
                        u.Password = user.Password;
                        u.Fund = user.Fund;
                        u.Status = user.Status;

                        context.SaveChanges();

                        return Ok($"Update successfully.");
                    }
                }
                
                return BadRequest($"User with id: {user.Id} does not exist!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetTypes")]
        public IActionResult GetTypes()
        {
            var types = context.Users.Select(u => u.Type).Distinct().ToList(); 

            return Ok(types);
        }

    }
}
