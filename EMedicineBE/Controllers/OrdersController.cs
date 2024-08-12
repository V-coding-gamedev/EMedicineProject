using EMedicineBE.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EMedicineBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        EMedicineContext context = new EMedicineContext();

        [HttpGet]
        public IActionResult GetOrders()
        {
            var orders = context.Orders.Select(o => new
            {
                o.Id,
                o.UserId,
                o.OrderNo,
                o.OrderTotal,
                o.OrderStatus,
            }).ToList();

            return Ok(orders);
        }

        [HttpGet("GetOrder")]
        public IActionResult GetOrder(int id)
        {
            var orders = context.Orders.Select(o => new
            {
                o.Id,
                o.UserId,
                o.OrderNo,
                o.OrderTotal,
                o.OrderStatus,
            }).Where(o => o.Id == id).ToList();

            var order = orders.FirstOrDefault();

            return Ok(order);
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] Order order) // used for place orders in the web app
        {
            try
            {
                context.Orders.Add(order);
                context.SaveChanges();

                var orderList = context.Orders.Select(o => new
                {
                    o.Id,
                    o.UserId,
                    o.OrderNo,
                    o.OrderTotal,
                    o.OrderStatus,
                }).ToList();

                return Ok(orderList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
