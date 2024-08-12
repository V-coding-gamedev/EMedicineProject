using EMedicineBE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EMedicineBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        EMedicineContext context = new EMedicineContext();

        [HttpPost]
        public IActionResult AddCart([FromBody] Cart cart) // used for adding items to cart in the web app
        {
            try
            {
                context.Carts.Add(cart);
                context.SaveChanges();

                var cartList = context.Carts.Select(u => new
                {
                    u.Id,
                    u.UserId,
                    u.MedicineId,
                    u.UnitPrice,
                    u.Discount,
                    u.Quantity,
                    u.TotalPrice,
                }).ToList();

                return Ok(cartList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
