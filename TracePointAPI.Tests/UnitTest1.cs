using System.Net;
using System.Net.Http.Json;
using TracePointAPI.Models;

namespace TracePointAPI.Tests;

public class UnitTest1 : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public UnitTest1(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PostInvestigation_ReturnsSuccess()
    {
        // Arrange
        var investigation = new Investigation
        {
            CaseID = 1,
            SuspectID = 2,
            Conclusion =
                "Jamie Smith appears to be the most likely suspect."
        };

        // Act
        var response = await _client.PostAsJsonAsync(
            "/api/investigations",
            investigation);

        // Assert
        Assert.Equal(
            HttpStatusCode.Created,
            response.StatusCode);
    }
}