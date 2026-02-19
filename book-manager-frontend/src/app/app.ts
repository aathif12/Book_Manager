import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: false
})
export class App implements OnInit {
  title = 'BookManager';
  currentYear = new Date().getFullYear();
  successMessage = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url = e.urlAfterRedirects || e.url;
        if (url.includes('success=created')) {
          this.showToast('Book added to your library!');
        } else if (url.includes('success=updated')) {
          this.showToast('Book updated successfully!');
        }
      });
  }

  private showToast(msg: string): void {
    this.successMessage = msg;
    setTimeout(() => this.successMessage = '', 4000);
  }
}
