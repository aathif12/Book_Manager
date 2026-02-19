import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  standalone: false
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId: number | null = null;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.bookId = +id;
        this.loadBook(this.bookId);
      }
    });
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      isbn: ['', [Validators.required, Validators.pattern(/^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/)]],
      publicationDate: ['', [Validators.required]]
    });
  }

  loadBook(id: number): void {
    this.isLoading = true;
    this.bookService.getById(id).subscribe({
      next: (book: Book) => {
        const date = new Date(book.publicationDate);
        const dateStr = date.toISOString().split('T')[0];
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          publicationDate: dateStr
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load book details.';
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.bookForm.controls;
  }

  onSubmit(): void {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const formValue = this.bookForm.value;

    if (this.isEditMode && this.bookId !== null) {
      this.bookService.update(this.bookId, formValue).subscribe({
        next: () => {
          this.router.navigate(['/books'], { queryParams: { success: 'updated' } });
        },
        error: () => {
          this.errorMessage = 'Failed to update book. Please try again.';
          this.isSaving = false;
        }
      });
    } else {
      this.bookService.create(formValue).subscribe({
        next: () => {
          this.router.navigate(['/books'], { queryParams: { success: 'created' } });
        },
        error: () => {
          this.errorMessage = 'Failed to create book. Please try again.';
          this.isSaving = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/books']);
  }
}
