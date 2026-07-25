using CitationPulse.Application.Dtos;
using CitationPulse.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace CitationPulse.Api.Controllers;

[ApiController]
[Route("api/citation-checks")]
public class CitationChecksController : ControllerBase
{
    private readonly CitationCheckService _citationCheckService;

    public CitationChecksController(CitationCheckService citationCheckService)
    {
        _citationCheckService = citationCheckService;
    }

    [HttpPost]
    public async Task<ActionResult<CitationCheckResponse>> CheckAsync(
        [FromBody] BusinessSearchRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.BusinessName))
        {
            return BadRequest("businessName is required.");
        }

        var result = await _citationCheckService.CheckAsync(request, cancellationToken);
        return Ok(result);
    }
}