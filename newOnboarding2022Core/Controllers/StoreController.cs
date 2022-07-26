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
    public class StoreController : ControllerBase
    {
        //GET ROUTE/api/store/getstores

        private OnboardingDBContext _dBContext;
        public StoreController(OnboardingDBContext dBContext)
        {
            _dBContext = dBContext;
        }


        [HttpGet("GetStores")]
        public IActionResult Get()
        {
            try
            {
                var store = _dBContext.Store.ToList();
                if (store.Count == 0)
                {
                    return StatusCode(404, "No User found");
                }
                return Ok(store);
            }
            catch (Exception)
            {

                return StatusCode(500, "An error has ocurred");
            }

        }

        //POST ROUTE/api/store/createstores

        [HttpPost("CreateStores")]
        public IActionResult Create([FromBody] Store request)
        {
            Store store = new Store();
            store.Name = request.Name;
            store.Address = request.Address;
            try
            {
                _dBContext.Store.Add(store);
                //Save changes in the database
                _dBContext.SaveChanges();
            }
            catch (Exception)
            {

                return StatusCode(500, "An error has ocurred");
            }
            //Get all stores
            var stores = _dBContext.Product.ToList();
            return Ok(stores);
        }

        //PUT ROUTE/api/store/updatestores
        [HttpPut("UpdateStores")]
        public IActionResult Update([FromBody] Store request)
        {
            try
            {
                var store = _dBContext.Store.FirstOrDefault(x => x.Id == request.Id);
                if (store == null)
                {
                    return StatusCode(404, "No User found in back-end");
                }

                store.Name = request.Name;
                store.Address = request.Address;

                _dBContext.Entry(store).State = EntityState.Modified;
                _dBContext.SaveChanges();
            }
            catch (Exception)
            {

                return StatusCode(500, "An error has ocurred");
            }

            //Get all users
            var stores = _dBContext.Store.ToList();
            return Ok(stores);
        }
        //  DELETE ROUTE/api/store/deletestores/Id
        [HttpDelete("DeleteStores/{Id}")]
        public IActionResult Delete([FromRoute]int Id)
        {
            try
            {
                var store = _dBContext.Store.FirstOrDefault(x => x.Id == Id);
                if (store == null)
                {
                    return StatusCode(404, "No User found in back-end");
                }


                _dBContext.Entry(store).State = EntityState.Deleted;
                _dBContext.SaveChanges();
            }
            catch (Exception)
            {

                return StatusCode(500, "An error has ocurred"); ;
            }

            //Get all stores
            var stores = _dBContext.Store.ToList();
            return Ok(stores);
        }

    }

}