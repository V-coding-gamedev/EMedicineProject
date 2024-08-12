using EMedicineBE.Models;
using Microsoft.AspNetCore.Mvc;

namespace EMedicineBE.Controllers
{
    public class MedicinesController : Controller
    {
        EMedicineContext context = new EMedicineContext();

        [HttpPost]
        public IActionResult AddMedicine([FromBody] Medicine medicine)
        {
            try
            {
                List<Medicine> medicines = context.Medicines.ToList();

                foreach (Medicine m in medicines)
                {
                    if (m.Id.Equals(medicine.Id))
                    {
                        return BadRequest($"The inputted medicine with id {m.Id} already exists");
                    }
                }

                context.Medicines.Add(medicine);
                context.SaveChanges();

                var medicineList = context.Medicines.Select(m => new
                {
                    m.Id,
                    m.Name,
                    m.Manufacturer,
                    m.UnitPrice,
                    m.Discount,
                    m.Quantity,
                    expDate = ((DateTime)m.ExpDate).ToShortDateString(),
                    m.ImageUrl,
                    m.Status
                    
                }).ToList();

                return Ok(medicineList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetMedicineById/{id}")]
        public IActionResult GetUserByEmail(int id)
        {
            var medicineList = context.Medicines.Select(m => new
            {
                m.Id,
                m.Name,
                m.Manufacturer,
                m.UnitPrice,
                m.Discount,
                m.Quantity,
                expDate = ((DateTime)m.ExpDate).ToShortDateString(),
                m.ImageUrl,
                m.Status

            }).Where(m => m.Id == id).ToList();

            if (medicineList.Count == 0)
            {
                return NotFound($"The inputted medicine does not exist yet");
            }

            var medicine = medicineList.FirstOrDefault();

            return Ok(medicine);
        }

        [HttpPut]
        public IActionResult UpdateMedicine([FromBody] Medicine medicine)
        {
            try
            {
                List<Medicine> medicines = context.Medicines.ToList();

                foreach (Medicine m in medicines)
                {
                    if (m.Id.Equals(medicine.Id))
                    {
                        m.Name = medicine.Name;
                        m.Manufacturer = medicine.Manufacturer;
                        m.UnitPrice = medicine.UnitPrice;
                        m.Discount = medicine.Discount;
                        m.Quantity = medicine.Quantity;
                        m.ExpDate = medicine.ExpDate;
                        m.ImageUrl = medicine.ImageUrl;
                        m.Status = medicine.Status;

                        context.SaveChanges();

                        return Ok($"Update successfully.");
                    }
                }

                return BadRequest($"Medicine with id: {medicine.Id} does not exist!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
