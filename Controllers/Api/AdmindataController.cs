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
    public class AdmindataController : ApiController
    {
        TESTEntities dbcontext = null;

        public AdmindataController()
        {
            dbcontext = new TESTEntities();
            dbcontext.Configuration.LazyLoadingEnabled = false;
        }

        #region public HttpResponseMessage AddEmployee(Integra)
        [Route("Api/Admindata/AddEmployee/")]
        [HttpPost]
        public HttpResponseMessage AddEmployee(IntegraEmployee employee)
        {

            HttpResponseMessage response;

            try
            {
                dbcontext.IntegraEmployees.Add(employee);

                dbcontext.SaveChanges();

                response = Request.CreateResponse(HttpStatusCode.OK, employee);

            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return response;
        }

        #endregion

        #region public HttpResponseMessage GetDashBoard()

        [Route("Api/Admindata/GetDashBoard/")]
        [HttpGet]
        public HttpResponseMessage GetDashBoard()
        {
            HttpResponseMessage response;
            List<IntegraEmployee> employees = null;
            List<Access> access = null;
            List<Request> request = null;
            List<DashboardRequest> DashboardRequest = new List<DashboardRequest>();
            try
            {
                employees = dbcontext.IntegraEmployees.ToList();
                access = dbcontext.Accesses.ToList();
                request = dbcontext.Requests.ToList();
                for(int i=0;i<employees.Count;i++)
                {
                    for (int j = 0; j <request.Count; j++)
                    {
                        if(employees[i].EmpID == request[j].Empid)
                        {
                            DashboardRequest d = new DashboardRequest()
                            {
                                EmpCode = employees[i].EmployeeCode,
                                EmpName = employees[i].EmployeeName,
                                DU = employees[i].Du,
                                Designation = employees[i].Designation,
                                AccessName = null,
                                AccessId = request[j].Accessid,
                                Reason = request[j].Reason,
                                DateTime = request[j].Requesteddate,
                            };
                            DashboardRequest.Add(d);
                        }
                    }                    
                }
                for (int k = 0; k < access.Count; k++)
                {
                    for(int l =0; l< request.Count;l++)
                    {
                        if (access[k].AccessID == request[l].Accessid)
                        {
                            DashboardRequest[l].AccessName = access[k].AccessName;
                            
                        }
                    }

                }
                    

                response = Request.CreateResponse(HttpStatusCode.OK, DashboardRequest);

            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return response;
        }
        #endregion


        #region public HttpResponseMessage GetUserDetails()

        [Route("Api/Admindata/GetUserDetails/{id}")]
        [HttpGet]
        public HttpResponseMessage GetUserDetails(int id)
        {
            HttpResponseMessage response;

            try
            {

                IEnumerable<IntegraEmployee> result = dbcontext.IntegraEmployees.Where(x => x.EmpID == id);
                response = Request.CreateResponse(HttpStatusCode.OK, result);

            }

            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return response;
        }
        #endregion

        #region public HttpResponseMessage UpdateDetails()
        [Route("Api/UserDetails/UpdateDetails/")]
        [HttpPut]
        public HttpResponseMessage UpdateDetails(IntegraEmployee employee)

        {
            HttpResponseMessage response;



            dbcontext.IntegraEmployees.Attach(employee);
            dbcontext.Entry(employee).State = EntityState.Modified;
            try
            {

                dbcontext.SaveChanges();
                response = Request.CreateResponse(HttpStatusCode.OK, employee);
            }

            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

            return response;

        }
        #endregion
        #region public HttpResponseMessage DeleteUser(int EmpId)
        [HttpDelete]
        public HttpResponseMessage DeleteUser(int EmpId)
        {
            int result = 0;
            try
            {
                var user = dbcontext.IntegraEmployees.Where(x => x.EmpID == EmpId).FirstOrDefault();
                //dbcontext.IntegraEmployees.Attach(user);
                dbcontext.IntegraEmployees.Remove(user);
                dbcontext.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {
                result = 0;
            }
            return Request.CreateResponse(HttpStatusCode.OK, result);

        }
        #endregion
    }
}
