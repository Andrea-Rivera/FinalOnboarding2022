using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace newOnboarding2022Core.Models
{
    public partial class Sales
    {
        [Key]
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        public DateTime? DateSold { get; set; }
        

        [ForeignKey(nameof(CustomerId))]
        [InverseProperty("Sales")]
        public virtual Customer Customer { get; set; }
        [ForeignKey(nameof(ProductId))]
        [InverseProperty("Sales")]
        public virtual Product Product { get; set; }
        [ForeignKey(nameof(StoreId))]
        [InverseProperty("Sales")]
        public virtual Store Store { get; set; }

    }
}
