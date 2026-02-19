using BookManagerAPI.Models;

namespace BookManagerAPI.Services
{
    public class BookService : IBookService
    {
        private readonly List<Book> _books = new();
        private int _nextId = 1;

        public BookService()
        {
            // Seed with some sample data
            _books.Add(new Book { Id = _nextId++, Title = "Clean Code", Author = "Robert C. Martin", Isbn = "978-0132350884", PublicationDate = new DateTime(2008, 8, 1) });
            _books.Add(new Book { Id = _nextId++, Title = "The Pragmatic Programmer", Author = "Andrew Hunt & David Thomas", Isbn = "978-0135957059", PublicationDate = new DateTime(2019, 9, 13) });
            _books.Add(new Book { Id = _nextId++, Title = "Design Patterns", Author = "Gang of Four", Isbn = "978-0201633610", PublicationDate = new DateTime(1994, 10, 31) });
        }

        public IEnumerable<Book> GetAll() => _books.ToList();

        public Book? GetById(int id) => _books.FirstOrDefault(b => b.Id == id);

        public Book Create(Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return book;
        }

        public Book? Update(int id, Book updatedBook)
        {
            var existing = _books.FirstOrDefault(b => b.Id == id);
            if (existing == null) return null;

            existing.Title = updatedBook.Title;
            existing.Author = updatedBook.Author;
            existing.Isbn = updatedBook.Isbn;
            existing.PublicationDate = updatedBook.PublicationDate;

            return existing;
        }

        public bool Delete(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return false;
            _books.Remove(book);
            return true;
        }
    }
}
