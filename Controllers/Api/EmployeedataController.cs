using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using iAccess.Models;
using System.Data;

namespace iAccess.Controllers.Api
{
    public class EmployeedataController : ApiController
    {
        TESTEntities dbContext = null;
        TESTEntities dbContext1 = null;
        // Constructor   
        public EmployeedataController()
        {
            dbContext = new TESTEntities();
        }
        #region public HttpResponseMessage PostRequest(Request request)
        [Route("api/Employeedata/PostRequest")]
        [HttpPost]
        public HttpResponseMessage PostRequest(Request request)
        {
            HttpResponseMessage response;

            try
            {
                dbContext.Requests.Add(request);
                dbContext.SaveChanges();
                response = Request.CreateResponse(HttpStatusCode.OK, request);
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }
            return response;
        }
        #endregion

        #region HttpResponseMessage GetAccessID(int EmpID)
        [Route("api/Employeedata/GetAccessID/{EmpID}")]
        [HttpGet]
        public HttpResponseMessage GetAccessID(int EmpID)
        {
            HttpResponseMessage response;

            try
            {
                var Data = dbContext.Accesses.Select(x=>new {
                x.AccessID,
                x.AccessName,
                IsAvaiable = x.EmployeeAccessMappings.Where(y => y.EmpID == EmpID).Any()
                });

                response = Request.CreateResponse(HttpStatusCode.OK, Data);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return response;
        }
        #endregion

        #region HttpResponseMessage GetAllAccess()
        [Route("api/Employeedata/GetAllAccess")]
        [HttpGet]
        public HttpResponseMessage GetAccess()
        {
            HttpResponseMessage response;
            List<Access> accessess = null;
            try
            {
                accessess = dbContext.Accesses.ToList();
                response = Request.CreateResponse(HttpStatusCode.OK, accessess);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return response;
        }
        #endregion

        #region HttpResponseMessage GetRequest(int EmpID)
        [Route("api/Employeedata/GetRequest/{EmpID}")]
        [HttpGet]
        public HttpResponseMessage GetRequest(int EmpID)
        {
            HttpResponseMessage response;
            List<Request> requests = null;
            List<Recentrequest> result = new List<Recentrequest>();
            List<Access> output;

            try
            {
                requests = dbContext.Requests.Where(x => x.Empid == EmpID).ToList();
                output = dbContext1.Accesses.ToList();
                for (int i = 0; i < requests.Count; i++)
                {
                    for (int j = 0; j < output.Count; j++)
                    {
                        if (requests[i].Accessid == output[j].AccessID)
                        {
                            Recentrequest r = new Recentrequest { Accessname = output[j].AccessName, Reason = requests[i].Reason, requesteddate = requests[i].Requesteddate };
                            result.Add(r);

                        }
                    }

                }

                response = Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return response;
        }
        #endregion


        #region HttpResponseMessage GetDetails(int Empid)
        [Route("api/Employeedata/GetDetails/{Empid}")]
        [HttpGet]
        public HttpResponseMessage GetDetails(int Empid)
        {
            HttpResponseMessage response;
            IEnumerable<IntegraEmployee> user = null;
            try
            {
                user = dbContext.IntegraEmployees.Where(x => x.EmpID == Empid);
                response = Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return response;
        }
        #endregion
        [Route("api/Employeedata/UpdateDetails/")]
        [HttpPut]
        public HttpResponseMessage UpdateStudent(IntegraEmployee auser)
        {
            HttpResponseMessage response;
            List<IntegraEmployee> now = null;
            try
            {
                now = dbContext.IntegraEmployees.Where(x => x.EmpID == auser.EmpID).ToList();
                now[0].Password = auser.Password;
                dbContext.IntegraEmployees.Attach(now[0]);
                dbContext.Entry(now[0]).State = EntityState.Modified;
                dbContext.SaveChanges();
                response = Request.CreateResponse(HttpStatusCode.OK, auser);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return response;
        }


        #region HttpResponseMessage GetResponse(int EmpID)
        [Route("api/Employeedata/GetResponse/{EmpID}")]
        [HttpGet]
        public HttpResponseMessage GetResponse(int EmpID)
        {
            HttpResponseMessage response;


            List<Response> responses1;
            List<Access> output;
            List<Responsed> final1 = new List<Responsed>();
            List<IntegraEmployee> adminname = new List<IntegraEmployee>();

            try
            {
                responses1 = dbContext.Responses.Where(x => x.Senderid == EmpID).ToList();
                adminname = dbContext1.IntegraEmployees.Where(a => a.EmployeeRole == 1).ToList();
                output = dbContext1.Accesses.ToList();

                for (int i = 0; i < responses1.Count; i++)
                {
                    for (int j = 0; j < adminname.Count; j++)
                    {
                        if (responses1[i].Adminid == adminname[j].EmpID)
                        {
                            Responsed res = new Responsed() { Adminname = adminname[j].EmployeeName, Accesstype = null, status = responses1[i].Status, reason = responses1[i].Reason, Readtype = responses1[i].Readtype };
                            final1.Add(res);

                        }
                    }
                    for (int x = 0; x < output.Count; x++)
                    {
                        if (responses1[i].Accessid == output[x].AccessID)
                        {
                            final1[i].Accesstype = output[x].AccessName;
                        }
                    }
                }


                response = Request.CreateResponse(HttpStatusCode.OK, final1);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return response;
        }
        #endregion


        [Route("api/Employeedata/UpdateResponse/")]
        [HttpPut]
        public HttpResponseMessage UpdateResponse(Response res)
        {
            HttpResponseMessage response;
            List<Response> now = null;
            try
            {
                now = dbContext.Responses.Where(x => x.Senderid == res.Senderid).ToList();
                for (int i = 0; i < now.Count; i++)
                {
                    now[i].Readtype = res.Readtype;
                    dbContext.Responses.Attach(now[i]);
                    dbContext.Entry(now[i]).State = EntityState.Modified;
                    dbContext.SaveChanges();
                }


                response = Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            return response;
        }

    }
}
