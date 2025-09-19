import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  OnDestroy,
  inject,
} from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { CoreService } from 'src/app/services/core.service';
import { NavService } from 'src/app/services/nav.service';
import { AppSettings } from 'src/app/app.config';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavItem } from './sidebar/nav-item/nav-item';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { HeaderComponent } from './header/header.component';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: [],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
  ],
})
export class FullComponent implements OnInit, OnDestroy {
  navItems = new NavItem().getMenu();

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  //get options from service
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isMobileScreenSubscription: Subscription;

  options = this.settings.getOptions();
  private router = inject(Router);
  private settings = inject(CoreService);
  private breakpointObserver = inject(BreakpointObserver);
  private activatedRoute = inject(ActivatedRoute);

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  get isDark(): boolean {
    return this.options.theme === 'dark';
  }

  constructor(
    private navService: NavService,
    public CoreService: CoreService
  ) {}

  ngOnInit(): void {
    this.initBreakpointObserver();
  }

  ngOnDestroy(): void {
    this.layoutChangesSubscription.unsubscribe();
    this.isMobileScreenSubscription.unsubscribe();
  }

  toggleTheme() {
    this.options.theme = this.options.theme === 'dark' ? 'light' : 'dark';
  }

  private initBreakpointObserver(): void {
    this.isMobileScreenSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW])
      .subscribe((state: BreakpointState) => {
        this.isMobileScreen = state.breakpoints[MOBILE_VIEW];
        this.options.sidenavOpened = !this.isMobileScreen;
      });
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.options.sidenavOpened = isOpened;
  }

  onSidenavClosedStart() {
    // throw new Error('Method not implemented.');
  }
}
