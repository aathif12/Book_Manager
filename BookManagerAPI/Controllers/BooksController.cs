using BookManagerAPI.Models;
using BookManagerAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookManagerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET: api/books
        [HttpGet]
        public IActionResult GetAll()
        {
            var books = _bookService.GetAll();
            return Ok(books);
        }

        // GET: api/books/{id}
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var book = _bookService.GetById(id);
            if (book == null)
                return NotFound(new { message = $"Book with id {id} not found." });

            return Ok(book);
        }

        // POST: api/books
        [HttpPost]
        public IActionResult Create([FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = _bookService.Create(book);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: api/books/{id}
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Book book)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = _bookService.Update(id, book);
            if (updated == null)
                return NotFound(new { message = $"Book with id {id} not found." });

            return Ok(updated);
        }

        // DELETE: api/books/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _bookService.Delete(id);
            if (!success)
                return NotFound(new { message = $"Book with id {id} not found." });

            return NoContent();
        }
    }
}
