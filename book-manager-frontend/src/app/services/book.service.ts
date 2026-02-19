import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly apiUrl = 'http://localhost:5199/api/books';
  private books: Book[] = [];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Book[]> {
    if (this.books.length > 0) {
      return of(this.books);
    }
    return this.http.get<Book[]>(this.apiUrl).pipe(
      tap(books => this.books = books)
    );
  }

  getById(id: number): Observable<Book> {
    const cachedBook = this.books.find(b => b.id === id);
    if (cachedBook) {
      return of(cachedBook);
    }
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  create(book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      tap(newBook => this.books.push(newBook))
    );
  }

  update(id: number, book: Omit<Book, 'id'>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book).pipe(
      tap(updatedBook => {
        const index = this.books.findIndex(b => b.id === id);
        if (index !== -1) {
          this.books[index] = updatedBook;
        }
      })
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.books = this.books.filter(b => b.id !== id);
      })
    );
  }
}
