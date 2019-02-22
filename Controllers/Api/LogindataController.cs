using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using iAccess.Models;

namespace iAccess.Controllers.Api
{
    public class LogindataController : ApiController
    {
        TESTEntities dbContext = null;
        public LogindataController()
        {
            dbContext = new TESTEntities();
            dbContext.Configuration.LazyLoadingEnabled = false;
        }

        [Route("api/Logindata/GetUserDetailss/{employeecode}/{pswd}")]
        [HttpGet]
        public HttpResponseMessage GetUserDetails(string employeecode, string pswd)
        {
            HttpResponseMessage response;

            try
            {
                IEnumerable<IntegraEmployee> users = dbContext.IntegraEmployees.Where(x => x.EmployeeCode == employeecode && x.Password == pswd);

                response = Request.CreateResponse(HttpStatusCode.OK, users);

            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return response;
        }



    }
}

