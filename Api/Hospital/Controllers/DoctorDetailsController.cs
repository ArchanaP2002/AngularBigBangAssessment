using Hospital.Data;
using Hospital.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorDetailsController : ControllerBase
    {
        private readonly HospitalContext _context;  //inherits from DbContext and represents the database context

        public DoctorDetailsController(HospitalContext context)
        {
            _context = context; // to access the patient property
        }

        [HttpGet] // Read from Data base 
        public IActionResult Get()
        {
            try
            {
                var patient = _context.DoctorDetails.ToList();//property to get all list 
                if (patient.Count == 0)
                {
                    return NotFound("Not available.");
                }
                return Ok(patient);
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
                var patient = _context.DoctorDetails.Find(id);
                if (patient == null)
                {
                    return NotFound($"Not found with ID: {id}");
                }
                return Ok(patient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost] // Creating
        public IActionResult Post(DoctorDetails model)
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

        [HttpPut("{id}")] // Update
        public IActionResult Put(int id, DoctorDetails model)
        {
            try
            {
                if (model == null || model.Id == 0 || model.Id != id)
                {
                    return BadRequest("Invalid data or ID.");
                }

                var doctor = _context.DoctorDetails.Find(id);
                if (doctor == null)
                {
                    return NotFound($"Not found with ID: {id}");
                }

                doctor.Name = model.Name;
                doctor.Specialization = model.Specialization;
                doctor.ImgPath = model.ImgPath;

                _context.SaveChanges();

                return Ok("Updated successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")] // Delete by ID
        public IActionResult Delete(int id)
        {
            try
            {
                var doctor = _context.DoctorDetails.Find(id);
                if (doctor == null)
                {
                    return NotFound($"Not found with ID: {id}");
                }

                _context.DoctorDetails.RemoveRange(doctor);
                _context.SaveChanges();

                return Ok("Deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

 

        [HttpGet("filter")]
        public ActionResult<IEnumerable<DoctorDetails>> FilterDoctors(string specialization)
        {
            try
            {
                var doctors = _context.DoctorDetails.Where(d => d.Specialization == specialization).ToList();

                if (doctors.Count == 0)
                {
                    return NotFound("No doctors found with the specified specialization.");
                }

                return Ok(doctors);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("count")]
        public IActionResult GetCount()
        {
            try
            {
                var count = _context.DoctorDetails.Count();

                return Ok(count);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}
