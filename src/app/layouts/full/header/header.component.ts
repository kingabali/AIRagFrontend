import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  isDark = false;

  constructor() {
    // Set initial theme based on html class, or default to light
    const html = document.documentElement;
    if (!html.classList.contains('light-theme') && !html.classList.contains('dark-theme')) {
      html.classList.add('light-theme');
    }
    this.isDark = html.classList.contains('dark-theme');
  }

  toggleTheme() {
    const html = document.documentElement;
    this.isDark = !this.isDark;
    if (this.isDark) {
      html.classList.remove('light-theme');
      html.classList.add('dark-theme');
    } else {
      html.classList.remove('dark-theme');
      html.classList.add('light-theme');
    }
  }
}