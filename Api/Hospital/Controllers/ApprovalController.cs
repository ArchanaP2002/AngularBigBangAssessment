using Hospital.Data;
using Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApprovalController : ControllerBase
    {
        private readonly HospitalContext _context;

        public ApprovalController(HospitalContext context)
        {
            _context = context; // to access the patient property
        }


        [HttpGet] // Read from Data base 
        public IActionResult Get()
        {
            try
            {
                var approval = _context.Approvals.ToList();//property to get all list 
                if (approval.Count == 0)
                {
                    return NotFound("Not available.");
                }
                return Ok(approval);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]// ready by id 
        public IActionResult Get(int id)
        {
            try
            {
                var approve = _context.Approvals.Find(id);
                if (approve == null)
                {
                    return NotFound($"Not found with ID: {id}");
                }
                return Ok(approve);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost] // Creating
        public IActionResult Post(Approval model)
        {
            try
            {
                _context.Add(model); // insert into db
                _context.SaveChanges(); // commit 
                return Ok(" created successfully.");
            }
            catch (Exception ex)
            {
                string errorMessage = "An error occurred.";
                if (ex.InnerException != null)
                {
                    errorMessage += " Inner Exception: " + ex.InnerException.Message;
                }
                return BadRequest(errorMessage);
            }
        }

        [HttpDelete("{id}")] // Delete by ID
        public IActionResult Delete(int id)
        {
            try
            {
                var approval = _context.Approvals.Find(id);
                if (approval == null)
                {
                    return NotFound($"Not found with ID: {id}");
                }

                _context.Approvals.RemoveRange(approval);
                _context.SaveChanges();

                return Ok("Deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




    }
}