import { Component, Renderer2, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Modernize Angular Admin Tempplate';
  isDarkMode: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(this.el.nativeElement.ownerDocument.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.el.nativeElement.ownerDocument.body, 'dark-theme');
    }
  }
}
