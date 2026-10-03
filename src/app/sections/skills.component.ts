import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevealDirective } from '../core/reveal.directive';
import { SKILL_GROUPS } from '../data/portfolio.data';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="section">
      <div class="container">
        <div appReveal>
          <p class="eyebrow">Skills</p>
          <h2 class="section-title">My <span class="gradient-text">tech stack</span></h2>
          <p class="section-sub">Tools I use every day to ship reliable, scalable front-ends.</p>
        </div>

        <div class="groups">
          @for (g of groups; track g.title; let i = $index) {
            <div class="group" appReveal [revealDelay]="i * 70">
              <h3>{{ g.title }}</h3>
              <div class="chips">
                @for (s of g.skills; track s) {
                  <span class="chip">{{ s }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .groups { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
    .group { padding: 24px; border: 1px solid var(--border); border-radius: 16px; background: var(--surface); }
    h3 { margin: 0 0 14px; font-size: .85rem; text-transform: uppercase; letter-spacing: .12em; color: var(--accent); font-family: var(--mono); font-weight: 600; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      padding: 7px 13px; border-radius: 8px; font-size: 14px; background: var(--surface-2);
      border: 1px solid var(--border); transition: border-color .2s, transform .2s;
    }
    .chip:hover { border-color: var(--accent); transform: translateY(-2px); }
    @media (max-width: 1000px) { .groups { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 640px) { .groups { grid-template-columns: 1fr; } }
  `,
})
export class SkillsComponent {
  protected readonly groups = SKILL_GROUPS;
}
