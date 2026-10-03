import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../core/icon.component';
import { RevealDirective } from '../core/reveal.directive';
import { PROJECTS } from '../data/portfolio.data';

@Component({
  selector: 'app-projects',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects" class="section">
      <div class="container">
        <div appReveal>
          <p class="eyebrow">Portfolio</p>
          <h2 class="section-title">Featured <span class="gradient-text">projects</span></h2>
          <p class="section-sub">Production applications I've led or built, used by healthcare practices and teams every day.</p>
        </div>

        <div class="projects">
          @for (p of projects; track p.name; let i = $index) {
            <article class="project" appReveal [revealDelay]="i * 90">
              <div class="banner" [attr.data-index]="i">
                <span class="num">0{{ i + 1 }}</span>
                <span class="name">{{ p.name }}</span>
              </div>
              <div class="body">
                <p class="tagline">{{ p.tagline }}</p>
                <p class="desc">{{ p.description }}</p>
                <p class="role">{{ p.role }}</p>
                <ul>
                  @for (h of p.highlights; track h) {
                    <li><app-icon name="check" [size]="16" /> {{ h }}</li>
                  }
                </ul>
                <div class="stack">
                  @for (t of p.stack; track t) {
                    <span>{{ t }}</span>
                  }
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
    .project {
      display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: 18px;
      background: var(--surface); overflow: hidden; transition: transform .25s, box-shadow .25s, border-color .25s;
    }
    .project:hover { transform: translateY(-6px); box-shadow: var(--shadow); border-color: var(--accent); }
    .banner {
      position: relative; height: 140px; display: flex; align-items: flex-end; justify-content: space-between;
      padding: 18px 22px; color: #fff; background: var(--gradient);
    }
    .banner[data-index='1'] { background: linear-gradient(135deg, #7702ff, #2563eb); }
    .banner[data-index='2'] { background: linear-gradient(135deg, #0ea5e9, #10b981); }
    .banner::after {
      content: ''; position: absolute; inset: 0;
      background-image: radial-gradient(rgb(255 255 255 / .18) 1px, transparent 1px); background-size: 16px 16px;
    }
    .num { font-family: var(--mono); font-size: 13px; opacity: .85; position: relative; z-index: 1; }
    .name { font-size: 1.7rem; font-weight: 800; letter-spacing: -.02em; position: relative; z-index: 1; }
    .body { display: flex; flex-direction: column; flex: 1; padding: 22px; }
    .tagline { margin: 0 0 8px; font-weight: 600; }
    .desc { margin: 0 0 14px; color: var(--muted); font-size: .95rem; }
    .role { margin: 0 0 12px; font-family: var(--mono); font-size: 12.5px; color: var(--accent); }
    ul { list-style: none; margin: 0 0 18px; padding: 0; display: grid; gap: 8px; }
    li { display: flex; gap: 8px; font-size: .93rem; color: var(--muted); }
    li app-icon { color: var(--accent); margin-top: 3px; }
    .stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
    .stack span { font-size: 12px; padding: 4px 10px; border-radius: 6px; background: var(--surface-2); border: 1px solid var(--border); }
    @media (max-width: 1000px) { .projects { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 680px) { .projects { grid-template-columns: 1fr; } }
  `,
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
}
