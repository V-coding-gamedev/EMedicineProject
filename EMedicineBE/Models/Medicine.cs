using System;
using System.Collections.Generic;

namespace EMedicineBE.Models
{
    public partial class Medicine
    {
        public Medicine()
        {
            Carts = new HashSet<Cart>();
            OrderItems = new HashSet<OrderItem>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Manufacturer { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? Discount { get; set; }
        public int? Quantity { get; set; }
        public DateTime? ExpDate { get; set; }
        public string? ImageUrl { get; set; }
        public int? Status { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
