import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../core/reveal.directive';
import { EXPERIENCE } from '../data/portfolio.data';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="section alt">
      <div class="container narrow">
        <div appReveal>
          <p class="eyebrow">Experience</p>
          <h2 class="section-title">Where I've <span class="gradient-text">worked</span></h2>
        </div>

        <ol class="timeline">
          @for (job of jobs; track job.company; let i = $index) {
            <li appReveal [revealDelay]="i * 100">
              <span class="marker" aria-hidden="true"></span>
              <div class="job">
                <div class="top">
                  <div>
                    <h3>{{ job.role }}</h3>
                    <p class="company">{{ job.company }} · {{ job.location }}</p>
                  </div>
                  <span class="period">{{ job.period }}</span>
                </div>
                <ul>
                  @for (pt of job.points; track pt) {
                    <li>{{ pt }}</li>
                  }
                </ul>
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .narrow { max-width: 900px; }
    .timeline { list-style: none; margin: 40px 0 0; padding: 0 0 0 28px; border-left: 2px solid var(--border); }
    .timeline > li { position: relative; padding-bottom: 28px; }
    .timeline > li:last-child { padding-bottom: 0; }
    .marker {
      position: absolute; left: -38px; top: 26px; width: 18px; height: 18px; border-radius: 50%;
      background: var(--gradient); border: 4px solid var(--bg-alt);
    }
    .job { padding: 26px; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); }
    .top { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 14px; }
    h3 { margin: 0; font-size: 1.2rem; }
    .company { margin: 4px 0 0; color: var(--muted); }
    .period {
      align-self: flex-start; font-family: var(--mono); font-size: 13px; padding: 5px 12px; border-radius: 999px;
      background: var(--surface-2); border: 1px solid var(--border); color: var(--accent); white-space: nowrap;
    }
    ul { margin: 0; padding-left: 18px; color: var(--muted); display: grid; gap: 8px; }
    ul li::marker { color: var(--accent); }
  `,
})
export class ExperienceComponent {
  protected readonly jobs = EXPERIENCE;
}
