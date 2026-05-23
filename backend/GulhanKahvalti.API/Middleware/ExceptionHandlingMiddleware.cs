using System.Net;
using System.Text.Json;

namespace GulhanKahvalti.API.Middleware;

public class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger,
    IWebHostEnvironment environment)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(
                ex,
                "Unhandled API exception. Type: {ExceptionType}. Message: {ExceptionMessage}. Method: {Method}. Path: {Path}",
                ex.GetType().FullName,
                ex.Message,
                context.Request.Method,
                context.Request.Path.Value);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = environment.IsDevelopment()
                ? new
                {
                    message = "An unexpected error occurred.",
                    errors = new[] { ex.GetType().FullName ?? ex.GetType().Name, ex.Message }
                }
                : new
            {
                message = "An unexpected error occurred.",
                errors = Array.Empty<string>()
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
