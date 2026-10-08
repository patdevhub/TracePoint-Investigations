using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TracePointAPI.Data;
using TracePointAPI.Models;

namespace TracePointAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CasesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CasesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Case>>> GetCases()
        {
            return await _context.Cases.ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Case>> GetCase(int id)
        {
            var caseItem = await _context.Cases.FindAsync(id);

            if (caseItem == null)
            {
                return NotFound();
            }

            return caseItem;
        }
    }
}
