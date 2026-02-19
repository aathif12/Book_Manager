using BookManagerAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<IBookService, BookService>();

// Configure CORS to allow Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAngularApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
