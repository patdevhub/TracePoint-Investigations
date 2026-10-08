using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuspectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SuspectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Suspect>>> GetSuspects()
        {
            return await _context.Suspects.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Suspect>> GetSuspect(int id)
        {
            var suspect = await _context.Suspects.FindAsync(id);

            if (suspect == null)
            {
                return NotFound();
            }

            return suspect;
        }
    }
}
