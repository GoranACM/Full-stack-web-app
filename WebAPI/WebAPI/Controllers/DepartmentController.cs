using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using System.Data.SqlClient;
using System.Configuration;

namespace WebAPI.Controllers
{
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = "SELECT DepartmentID, DepartmentName from dbo.Departments";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString)) 
            using (var cmd = new SqlCommand(query, con)) 
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Department dep)
        {
            try
            {
                DataTable table = new DataTable();

                string query = "INSERT INTO dbo.Departments values ('" + dep.DepartmentName + "')";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Succesfully";
            }
            catch (System.Exception)
            {
                return "Failed to add";
            }
        }

        public string Put(Department dep)
        {
            try
            {
                DataTable table = new DataTable();

                string query = "UPDATE dbo.Departments SET DepartmentName = '" + dep.DepartmentName + "' WHERE DepartmentID = '" + dep.DepartmentID + "'";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Succesfully";
            }
            catch (System.Exception)
            {
                return "Failed to update";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = "DELETE FROM dbo.Departments WHERE DepartmentID = " + id ;

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Succesfully";
            }
            catch (System.Exception)
            {
                return "Failed to delete";
            }
        }
    }
}
