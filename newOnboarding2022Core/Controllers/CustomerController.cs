using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using newOnboarding2022Core.Data;
using newOnboarding2022Core.Models;
using Microsoft.EntityFrameworkCore;

namespace newOnboarding2022Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {

        

        private OnboardingDBContext _dBContext;
        public CustomerController(OnboardingDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        //GET ROUTE/api/customer/getcustomers
        [HttpGet("GetCustomers")]
        public IActionResult Get()
        {
            try
            {
                var users = _dBContext.Customer.ToList();
                if (users.Count == 0)
                {
                    return StatusCode(404, "No User found");
                }
                return Ok(users);
            }
            catch (Exception)
            {

                return StatusCode(500, "An error has ocurred");
            }

        }

       

        //POST ROUTE/api/customer/createcustomers

        [HttpPost ("CreateCustomers")]
        public IActionResult Create([FromBody] Customer request)
        {
            Customer cust = new Customer();
            cust.Name = request.Name;
            cust.Address = request.Address;
            try
            {
                _dBContext.Customer.Add(cust);
                //Save changes in the database
                _dBContext.SaveChanges();
            }
            catch (Exception )
            {

                return StatusCode(500, "An error has ocurred");
            }
            //Get all users
            var users = _dBContext.Customer.ToList();
            return Ok(users);
        }

        //PUT ROUTE/api/customer/updatecustomers
        [HttpPut("UpdateCustomers")]
        public IActionResult Update([FromBody] Customer request)
        {
            try
            {
                var user = _dBContext.Customer.FirstOrDefault(x => x.Id == request.Id);
                if (user == null) 
                {
                    return StatusCode(404, "No User found in back-end");
                }

                user.Name = request.Name;
                user.Address = request.Address;

                _dBContext.Entry(user).State = EntityState.Modified;
                _dBContext.SaveChanges();
            }
            catch (Exception )
            {

                return StatusCode(500, "An error has ocurred");
            }

            //Get all users
            var users = _dBContext.Customer.ToList();
            return Ok(users);
        }
        //  DELETE ROUTE/api/customer/deletecustomers/Id
        [HttpDelete("DeleteCustomers/{Id}")]
        public IActionResult Delete([FromRoute]int Id)
        {
            try
            {
                var user = _dBContext.Customer.FirstOrDefault(x => x.Id == Id);
                if (user == null)
                {
                    return StatusCode(404, "No User found in back-end");
                }


                _dBContext.Entry(user).State = EntityState.Deleted;
                _dBContext.SaveChanges();
            }
            catch (Exception)
            {

                return StatusCode(500, "An error has ocurred"); ;
            }

            //Get all users
            var users = _dBContext.Customer.ToList();
            return Ok(users);
        }

    }
  
}