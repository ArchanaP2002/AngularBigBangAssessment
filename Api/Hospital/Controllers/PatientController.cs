using Hospital.Data;
using Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly HospitalContext _context;  //inherits from DbContext and represents the database context

        public PatientController(HospitalContext context)
        {
            _context = context; // to access the patient property
        }

        [HttpGet] // Read from Data base 
        public IActionResult Get()
        {
            try
            {
                var patient = _context.Patients.ToList();//property to get all list 
                if ( patient.Count == 0)
                {
                    return NotFound("Not available.");
                }
                return Ok( patient);
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
                var  patient = _context. Patients.Find(id);
                if ( patient == null)
                {
                    return NotFound($"Not found with ID: {id}");
                }
                return Ok( patient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost] // Creating
        public IActionResult Post(Patient model)
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

        [HttpGet("filter")]
        public ActionResult<IEnumerable<Patient>> FilterDoctors(string Name)
        {
            try
            {
                var patient = _context.Patients.Where(d => d.Name ==  Name).ToList();

                if (patient.Count == 0)
                {
                    return NotFound("No patient found with the specified specialization.");
                }

                return Ok(patient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
