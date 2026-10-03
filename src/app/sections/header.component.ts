import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ThemeService } from '../core/theme.service';
import { IconComponent } from '../core/icon.component';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-header',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '[class.scrolled]': 'scrolled()',
  },
  template: `
    <nav class="container nav" aria-label="Main">
      <a href="#home" class="logo" (click)="menuOpen.set(false)">
        <span class="logo-mark">{{ profile.initials }}</span>
        <span class="logo-text">{{ profile.name }}</span>
      </a>

      <ul class="links" [class.open]="menuOpen()">
        @for (link of links; track link.id) {
          <li>
            <a [href]="'#' + link.id" [class.active]="active() === link.id" (click)="menuOpen.set(false)">
              {{ link.label }}
            </a>
          </li>
        }
        <li class="mobile-cta"><a href="#contact" class="btn btn-primary" (click)="menuOpen.set(false)">Hire me</a></li>
      </ul>

      <div class="actions">
        <button class="icon-btn" type="button" (click)="theme.toggle()"
                [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'">
          <app-icon [name]="theme.theme() === 'dark' ? 'sun' : 'moon'" [size]="18" />
        </button>
        <a href="#contact" class="btn btn-primary btn-sm desktop-cta">Hire me</a>
        <button class="icon-btn menu-btn" type="button" (click)="menuOpen.update(o => !o)"
                [attr.aria-expanded]="menuOpen()" aria-label="Toggle menu">
          <app-icon [name]="menuOpen() ? 'close' : 'menu'" [size]="20" />
        </button>
      </div>
    </nav>
  `,
  styles: `
    :host {
      position: fixed; inset: 0 0 auto 0; z-index: 50;
      transition: background .3s, border-color .3s, backdrop-filter .3s;
      border-bottom: 1px solid transparent;
    }
    :host(.scrolled) {
      background: color-mix(in srgb, var(--bg) 82%, transparent);
      backdrop-filter: blur(14px);
      border-bottom-color: var(--border);
    }
    .nav { display: flex; align-items: center; justify-content: space-between; height: 72px; gap: 16px; }
    .logo { display: flex; align-items: center; gap: 10px; font-weight: 700; color: var(--text); }
    .logo-mark {
      display: grid; place-items: center; width: 38px; height: 38px; border-radius: 10px;
      background: var(--gradient); color: #fff; font-size: 14px; letter-spacing: .5px;
    }
    .links { display: flex; gap: 4px; list-style: none; margin: 0; padding: 0; }
    .links a {
      display: block; padding: 8px 14px; border-radius: 8px; color: var(--muted);
      font-size: 14px; font-weight: 500; transition: color .2s, background .2s;
    }
    .links a:hover, .links a.active { color: var(--text); background: var(--surface-2); }
    .actions { display: flex; align-items: center; gap: 8px; }
    .menu-btn, .mobile-cta { display: none; }

    @media (max-width: 900px) {
      .logo-text { display: none; }
      .menu-btn { display: inline-flex; }
      .desktop-cta { display: none; }
      .links {
        position: fixed; top: 72px; left: 0; right: 0; flex-direction: column; gap: 2px;
        padding: 16px; background: var(--bg); border-bottom: 1px solid var(--border);
        transform: translateY(-120%); transition: transform .3s ease; z-index: -1;
      }
      .links.open { transform: translateY(0); }
      .links a { padding: 12px 14px; font-size: 16px; }
      .mobile-cta { display: block; margin-top: 8px; }
      .mobile-cta .btn { justify-content: center; color: #fff; }
    }
  `,
})
export class HeaderComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly profile = PROFILE;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly active = signal('home');

  protected readonly links = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
    const probe = window.scrollY + window.innerHeight * 0.35;
    let current = 'home';
    for (const { id } of this.links) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= probe) current = id;
    }
    this.active.set(current);
  }
}
