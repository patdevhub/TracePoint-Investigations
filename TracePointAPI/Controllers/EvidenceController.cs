using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EvidenceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EvidenceController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Evidence>>> GetEvidence()
        {
            return await _context.Evidence.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Evidence>> GetEvidence(int id)
        {
            var evidence = await _context.Evidence.FindAsync(id);

            if (evidence == null)
            {
                return NotFound();
            }

            return evidence;
        }
    }
}
