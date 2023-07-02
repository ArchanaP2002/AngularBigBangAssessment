using Hospital.Models;

namespace Hospital.Repository.Interface
{
    public interface IPatientRepository
    {
        IEnumerable<Patient> GetAllPatients();
        Patient GetPatientById(int id);
        void AddPatient(Patient patient);
    }
}
