using corewebapiandangular.Data;
using corewebapiandangular.Models;
using CoreApiResponse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace corewebapiandangular.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CityController : BaseController
    {
        private readonly CityDataAccess _CityDataAccess;

        public CityController(CityDataAccess cityDataAccess)
        {
            _CityDataAccess = cityDataAccess;
        }

        [Authorize]
        [HttpGet]
        public IActionResult getallCity()
        {

            var citys = _CityDataAccess.getallCity();
            return CustomResult("Data Fetched", citys, HttpStatusCode.OK);

        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult getallCitybyid(int id)
        {
            var country = _CityDataAccess.getallCitybyid(id);
            if (country == null)
            {
                return CustomResult("data not found", HttpStatusCode.NotFound);
            }
            else
            {
                var citys = _CityDataAccess.getallCitybyid(id);
                return CustomResult("Data Fetched", citys, HttpStatusCode.OK);
            }

        }

        [Authorize]
        [HttpPost]
        public IActionResult insertCitymaster(CityMaster cityMaster)
        {

            _CityDataAccess.insertCitymaster(cityMaster);
            return CustomResult("Data added", HttpStatusCode.OK);

        }

        [Authorize]
        [HttpPut("{id}")]
        public IActionResult updateCitymaster([FromBody] CityMaster cityMaster)
        {

            //if (id != cityMaster.CityId)
            //{
            //    return CustomResult(HttpStatusCode.BadRequest);
            //}
            //var country = _CityDataAccess.getallCitybyid(id);
            //if (country == null)
            //{
            //    return CustomResult("data does not exits", HttpStatusCode.NotFound);
            //}
            _CityDataAccess.updateCitymaster(cityMaster);
            return CustomResult("data updated", HttpStatusCode.OK);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult deleteCitymaster(int id)
        {
            var country = _CityDataAccess.getallCitybyid(id);
            if (country == null)
            {
                return CustomResult("data not found", HttpStatusCode.NotFound);
            }
            else
            {
                _CityDataAccess.deleteCitymaster(id);
                return CustomResult("data deleted", HttpStatusCode.OK);
            }
        }

        [Authorize]
        [HttpGet("state")]
        public IActionResult getallstate()
        {

            var state = _CityDataAccess.getallstate();
            return CustomResult("Data Fetched", state, HttpStatusCode.OK);

        }

        [Authorize]
        [HttpGet("country/{id}")]
        public IActionResult getcountrybystate(int id)
        {

            var state = _CityDataAccess.getcountrybystate(id);
            return CustomResult("Data Fetched", state, HttpStatusCode.OK);

        }

        [Authorize]
        [HttpGet("countrys")]
        public IActionResult getcountrybyid()
        {

            var state = _CityDataAccess.getallcountry();
            return CustomResult("Data Fetched", state, HttpStatusCode.OK);

        }
    }

}
