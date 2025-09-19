import { Component, Output, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();

  private settings = inject(CoreService);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  get isDark() {
    return this.settings.getOptions().theme === 'dark';
  }

  toggle() {
    this.toggleTheme.emit();
  }
}
