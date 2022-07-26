using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using newOnboarding2022Core.Data;
using newOnboarding2022Core.Models;



namespace newOnboarding2022Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
       

        private OnboardingDBContext _dBContext;
        public SalesController(OnboardingDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        //GET ROUTE/api/sales/getsales
        [HttpGet("GetSales")]
        public IActionResult Get()
        {
            try
            {
                var sale = _dBContext.Sales
                    .Include(x => x.Customer)
                    .Include(x => x.Product)
                    .Include(x => x.Store);


                return Ok(sale.AsNoTracking().ToList());
            }
            catch (Exception ex)
            {

                return StatusCode(400, "An error has ocurred");
            }

        }

        //POST ROUTE/api/sales/createsales
        [HttpPost("CreateSales")]
        public IActionResult Create([Bind("CustomerId, ProductId, StoreId,DateSold")][FromBody] Sales createdSale)
        {
            
            try
            {    
                _dBContext.Sales.Add(createdSale);
              
                _dBContext.SaveChanges();

                // Loading navigation properties.
               _dBContext.Entry(createdSale).Reference(x => x.Customer).Load();
              _dBContext.Entry(createdSale).Reference(x => x.Product).Load();
              _dBContext.Entry(createdSale).Reference(x => x.Store).Load();
                
            }
            catch (Exception ex)
            {

                return StatusCode(400, "An error has ocurred");
            }
            //Get all sales in a List
            var saleDisplay = _dBContext.Sales.AsNoTracking().ToList();
            return Ok(saleDisplay);
        }

        //PUT ROUTE/api/sales/Updatesales
        [HttpPut("UpdateSales")]
        public IActionResult Update([Bind("Id, CustomerId, ProductId, StoreId,  DateSold")][FromBody] Sales updateSale)
        {
            
      
                try
                {
                    Sales sale = _dBContext.Sales.Single(x => x.Id == updateSale.Id);

                    sale.CustomerId = updateSale.CustomerId;
                    sale.ProductId = updateSale.ProductId;
                    sale.StoreId = updateSale.StoreId;
                    sale.DateSold = updateSale.DateSold;
                _dBContext.Entry(updateSale).State = EntityState.Modified;
                //Save changes in the database.
                _dBContext.SaveChanges();

                 

                    var saleDisplay = _dBContext.Sales
                    .AsNoTracking()
                    .ToList();
                    return Ok(saleDisplay);

                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
             
        }
        //  DELETE ROUTE/api/sales/deletesales/Id
        [HttpDelete("DeleteSales/{Id}")]
        public IActionResult Delete([FromRoute]int Id)
        {
            try
            {
                var sale = _dBContext.Sales.FirstOrDefault(x => x.Id == Id);
                if (sale == null)
                {
                    return StatusCode(404, "An error has ocurred");
                }


                _dBContext.Entry(sale).State = EntityState.Deleted;
                _dBContext.SaveChanges();
            }
            catch (Exception ex)
            {

                return StatusCode(400, "An error has ocurred"); ;
            }

            //Get all users
            var saleDisplay = _dBContext.Customer.ToList();
            return Ok(saleDisplay);
        }

    }

}
    


    
