import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../core/icon.component';
import { RevealDirective } from '../core/reveal.directive';
import { PROCESS, SERVICES } from '../data/portfolio.data';

@Component({
  selector: 'app-services',
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="services" class="section alt">
      <div class="container">
        <div class="head" appReveal>
          <p class="eyebrow">Services</p>
          <h2 class="section-title">How I can <span class="gradient-text">help your project</span></h2>
          <p class="section-sub">Hire me for a full build, a feature, an upgrade, or to strengthen your existing team.</p>
        </div>

        <div class="services">
          @for (s of services; track s.title; let i = $index) {
            <article class="service" appReveal [revealDelay]="i * 70">
              <span class="icon"><app-icon [name]="s.icon" [size]="22" /></span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.description }}</p>
            </article>
          }
        </div>

        <h3 class="process-title" appReveal>How we'll work together</h3>
        <ol class="process">
          @for (p of process; track p.step; let i = $index) {
            <li appReveal [revealDelay]="i * 90">
              <span class="step">{{ p.step }}</span>
              <strong>{{ p.title }}</strong>
              <p>{{ p.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .head { text-align: center; margin-bottom: 48px; }
    .head .section-sub { margin-inline: auto; }
    .services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .service {
      padding: 28px; border-radius: 16px; border: 1px solid var(--border); background: var(--surface);
      transition: transform .25s, border-color .25s, box-shadow .25s;
    }
    .service:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: var(--shadow); }
    .icon {
      display: grid; place-items: center; width: 48px; height: 48px; border-radius: 12px; color: #fff;
      background: var(--gradient); margin-bottom: 18px;
    }
    h3 { margin: 0 0 8px; font-size: 1.12rem; }
    .service p { margin: 0; color: var(--muted); font-size: .97rem; }

    .process-title { text-align: center; margin: 80px 0 28px; font-size: 1.4rem; }
    .process { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; counter-reset: s; }
    .process li { position: relative; padding: 24px; border-radius: 16px; border: 1px dashed var(--border-strong); }
    .step { display: block; font-family: var(--mono); font-size: 13px; color: var(--accent); margin-bottom: 8px; }
    .process strong { display: block; margin-bottom: 6px; }
    .process p { margin: 0; color: var(--muted); font-size: .95rem; }

    @media (max-width: 1000px) {
      .services { grid-template-columns: repeat(2, 1fr); }
      .process { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .services, .process { grid-template-columns: 1fr; }
    }
  `,
})
export class ServicesComponent {
  protected readonly services = SERVICES;
  protected readonly process = PROCESS;
}
