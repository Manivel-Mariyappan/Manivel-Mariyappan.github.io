import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <div class="container inner">
        <p>© {{ year }} {{ profile.name }} · {{ profile.title }} · {{ profile.location }}</p>
        <p class="built">Built with <span class="gradient-text">Angular</span> · Standalone components &amp; Signals</p>
        <a href="#home" class="top">Back to top ↑</a>
      </div>
    </footer>
  `,
  styles: `
    footer { border-top: 1px solid var(--border); padding: 28px 0; font-size: 14px; color: var(--muted); }
    .inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; }
    p { margin: 0; }
    .built { font-family: var(--mono); font-size: 13px; }
    .top { color: var(--muted); }
    .top:hover { color: var(--text); }
  `,
})
export class FooterComponent {
  protected readonly profile = PROFILE;
  protected readonly year = new Date().getFullYear();
}
