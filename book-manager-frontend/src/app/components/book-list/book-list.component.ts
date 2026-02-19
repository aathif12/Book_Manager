import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: false
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  searchQuery = '';
  sortField: keyof Book = 'id';
  sortAsc = true;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.bookService.getAll().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load books. Please ensure the backend is running.';
        this.isLoading = false;
      }
    });
  }

  get filteredBooks(): Book[] {
    const q = this.searchQuery.toLowerCase();
    let result = this.books.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q)
    );

    result = result.sort((a, b) => {
      const aVal = a[this.sortField];
      const bVal = b[this.sortField];
      if (aVal < bVal) return this.sortAsc ? -1 : 1;
      if (aVal > bVal) return this.sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }

  sortBy(field: keyof Book): void {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
  }



  editBook(id: number): void {
    this.router.navigate(['/books/edit', id]);
  }

  deleteBook(book: Book): void {
    if (!confirm(`Are you sure you want to delete "${book.title}"?`)) return;

    this.bookService.delete(book.id).subscribe({
      next: () => {
        this.books = this.books.filter(b => b.id !== book.id);
        this.showSuccess(`"${book.title}" has been deleted successfully.`);
      },
      error: () => {
        this.errorMessage = 'Failed to delete the book. Please try again.';
      }
    });
  }

  formatDate(date: string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  dismissError(): void {
    this.errorMessage = '';
  }

  dismissSuccess(): void {
    this.successMessage = '';
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = '', 4000);
  }
}
