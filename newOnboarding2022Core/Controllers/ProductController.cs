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
    public class ProductController : ControllerBase
    {

        //GET ROUTE/api/product/getproducts

        private OnboardingDBContext _dBContext;
        public ProductController(OnboardingDBContext dBContext)
        {
            _dBContext = dBContext;
        }


        [HttpGet("GetProducts")]
        public IActionResult Get()
        {
            try
            {
                var product = _dBContext.Product.ToList();
                if (product.Count == 0)
                {
                    return StatusCode(404, "No User found");
                }
                return Ok(product);
            }
            catch (Exception)
            {

                return StatusCode(500, "An error has ocurred");
            }

        }

        //POST ROUTE/api/product/CreateProduct

        [HttpPost("CreateProducts")]
        public IActionResult Create([FromBody] Product request)
        {
            Product prod = new Product();
            prod.Name = request.Name;
            prod.Price = request.Price;
            try
            {
                _dBContext.Product.Add(prod);
                //Save changes in the database
                _dBContext.SaveChanges();
            }
            catch (Exception)
            {

                return StatusCode(500, "An error has ocurred");
            }
            //Get all products
            var product = _dBContext.Customer.ToList();
            return Ok(product);
        }

        //PUT ROUTE/api/product/UpdateProduct
        [HttpPut("UpdateProducts")]
        public IActionResult Update([FromBody] Product request)
        {
            try
            {
                var prod = _dBContext.Product.FirstOrDefault(x => x.Id == request.Id);
                if (prod == null)
                {
                    return StatusCode(404, "No User found");
                }

           
                prod.Name = request.Name;
                prod.Price = request.Price;

                _dBContext.Entry(prod).State = EntityState.Modified;
                _dBContext.SaveChanges();
            }
            catch (Exception )
            {

                return StatusCode(500, "An error has ocurred");
            }

            //Get all products
            var product = _dBContext.Customer.ToList();
            return Ok(product);
        }
        //  DELETE ROUTE/api/product/DeleteProduct/id
        [HttpDelete("DeleteProducts/{Id}")]
        public IActionResult Delete([FromRoute]int Id)
        {
            try
            {
                var prod = _dBContext.Product.FirstOrDefault(x => x.Id == Id);
                if (prod == null)
                {
                    return StatusCode(404, "No User found");
                }


                _dBContext.Entry(prod).State = EntityState.Deleted;
                _dBContext.SaveChanges();
            }
            catch (Exception )
            {

                return StatusCode(500, "An error has ocurred"); ;
            }

            //Get all products
            var products = _dBContext.Product.ToList();
            return Ok(products);
        }

    }

}