using System;
using System.Collections.Generic;

namespace EMedicineBE.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderItems = new HashSet<OrderItem>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public string? OrderNo { get; set; }
        public decimal? OrderTotal { get; set; }
        public string? OrderStatus { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
