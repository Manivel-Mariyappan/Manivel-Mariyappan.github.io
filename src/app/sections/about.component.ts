import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../core/icon.component';
import { RevealDirective } from '../core/reveal.directive';
import { EDUCATION, PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-about',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="section">
      <div class="container grid">
        <div appReveal>
          <p class="eyebrow">About me</p>
          <h2 class="section-title">Front-end engineer who <span class="gradient-text">owns the outcome</span></h2>
          @for (p of profile.about; track $index) {
            <p class="text">{{ p }}</p>
          }
        </div>

        <div class="cards" appReveal [revealDelay]="120">
          <div class="info-card">
            <h3>Why clients work with me</h3>
            <ul>
              @for (item of reasons; track item) {
                <li><app-icon name="check" [size]="18" /> {{ item }}</li>
              }
            </ul>
          </div>
          <div class="info-card meta">
            <div><app-icon name="pin" [size]="18" /><span>{{ profile.location }}</span></div>
            <div><app-icon name="clock" [size]="18" /><span>{{ profile.timezoneNote }}</span></div>
            <div class="edu">
              <strong>{{ education.degree }}</strong>
              <span>{{ education.school }} · {{ education.year }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: start; }
    .grid > * { min-width: 0; }
    .text { color: var(--muted); font-size: 1.05rem; }
    .cards { display: grid; gap: 16px; }
    .info-card { padding: 26px; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); }
    h3 { margin: 0 0 16px; font-size: 1.1rem; }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
    li { display: flex; gap: 10px; color: var(--muted); }
    li app-icon { color: var(--accent); margin-top: 3px; }
    .meta { display: grid; gap: 14px; color: var(--muted); }
    .meta > div { display: flex; gap: 10px; align-items: flex-start; }
    .meta app-icon { color: var(--accent); margin-top: 3px; }
    .edu { flex-direction: column; gap: 2px !important; padding-top: 14px; border-top: 1px solid var(--border); }
    .edu strong { color: var(--text); }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; gap: 32px; } }
  `,
})
export class AboutComponent {
  protected readonly profile = PROFILE;
  protected readonly education = EDUCATION;
  protected readonly reasons = [
    'Nearly a decade of production Angular & front-end experience',
    'Clear communication and regular client updates',
    'Reusable, maintainable, well-documented code',
    'Experience leading and mentoring UI teams',
    'Strong focus on performance and cross-browser quality',
  ];
}
