namespace BellaDolce.WebApi;

/// <summary>
/// Base class used by API Requests 
/// </summary>
public abstract class BaseMessage
{
    /// <summary>
    /// Unique Identifier used by logging
    /// </summary>
    protected Guid _correlationId = Guid.NewGuid();
    public Guid CorrelationId() => _correlationId;
}