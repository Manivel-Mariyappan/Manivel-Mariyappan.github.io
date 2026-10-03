import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { IconComponent } from '../core/icon.component';
import { PROFILE, STATS } from '../data/portfolio.data';

@Component({
  selector: 'app-hero',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="hero">
      <div class="glow" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="copy">
          <span class="badge"><span class="dot"></span> Available for freelance projects</span>
          <h1>
            Hi, I'm <span class="gradient-text">{{ profile.name }}</span>
          </h1>
          <p class="typed" aria-live="polite">
            <span class="mono">&lt;</span>{{ typed() }}<span class="caret"></span><span class="mono">/&gt;</span>
          </p>
          <p class="lead">{{ profile.summary }}</p>

          <div class="cta">
            <a href="#contact" class="btn btn-primary">Start a project <app-icon name="arrow" [size]="18" /></a>
            <a href="#projects" class="btn btn-ghost">View my work</a>
            <a [href]="profile.resume" class="btn btn-ghost" download>
              <app-icon name="download" [size]="18" /> Résumé
            </a>
          </div>

          <div class="socials">
            <a [href]="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" /></a>
            @if (profile.github) {
              <a [href]="profile.github" target="_blank" rel="noopener" aria-label="GitHub"><app-icon name="github" /></a>
            }
            <a [href]="profile.whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp"><app-icon name="whatsapp" /></a>
            <a [href]="'mailto:' + profile.email" aria-label="Email"><app-icon name="mail" /></a>
            <span class="loc"><app-icon name="pin" [size]="16" /> {{ profile.location }} · Working remotely worldwide</span>
          </div>
        </div>

        <div class="card-code" aria-hidden="true">
          <div class="code-head"><span></span><span></span><span></span><em>developer.ts</em></div>
          <pre><code><span class="k">const</span> <span class="v">developer</span> = {{ '{' }}
  name: <span class="s">'{{ profile.name }}'</span>,
  role: <span class="s">'{{ profile.title }}'</span>,
  experience: <span class="n">9</span> + <span class="s">' years'</span>,
  stack: [<span class="s">'Angular'</span>, <span class="s">'TypeScript'</span>,
          <span class="s">'RxJS'</span>, <span class="s">'NgRx'</span>, <span class="s">'React'</span>],
  ui: [<span class="s">'Kendo'</span>, <span class="s">'DevExpress'</span>, <span class="s">'Material'</span>],
  realtime: <span class="s">'SignalR'</span>,
  available: <span class="k">true</span>,
{{ '}' }};</code></pre>
        </div>
      </div>

      <div class="container stats">
        @for (stat of stats; track stat.label) {
          <div class="stat">
            <strong class="gradient-text">{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .hero { position: relative; padding: 150px 0 80px; overflow: hidden; }
    .glow {
      position: absolute; inset: -20% -10% auto auto; width: 720px; height: 720px; border-radius: 50%;
      background: radial-gradient(circle, color-mix(in srgb, var(--accent-2) 30%, transparent), transparent 65%);
      filter: blur(40px); pointer-events: none;
    }
    .hero-inner { position: relative; display: grid; grid-template-columns: 1.2fr 1fr; gap: 56px; align-items: center; }
    .hero-inner > * { min-width: 0; }
    .badge {
      display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px;
      border: 1px solid var(--border); background: var(--surface); font-size: 13px; color: var(--muted);
    }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgb(34 197 94 / .2); animation: pulse 2s infinite; }
    @keyframes pulse { 50% { box-shadow: 0 0 0 7px rgb(34 197 94 / 0); } }
    h1 { font-size: clamp(2.4rem, 5.5vw, 4rem); line-height: 1.05; margin: 22px 0 12px; letter-spacing: -.03em; }
    .typed { font-family: var(--mono); font-size: clamp(1.1rem, 2.4vw, 1.5rem); color: var(--text); margin: 0 0 20px; min-height: 1.6em; }
    .typed .mono { color: var(--accent); }
    .caret { display: inline-block; width: 2px; height: 1.1em; margin: 0 2px -3px; background: var(--accent); animation: blink 1s steps(1) infinite; }
    @keyframes blink { 50% { opacity: 0; } }
    .lead { font-size: 1.08rem; color: var(--muted); max-width: 560px; margin: 0 0 32px; }
    .cta { display: flex; flex-wrap: wrap; gap: 12px; }
    .socials { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-top: 32px; }
    .socials a {
      display: grid; place-items: center; width: 42px; height: 42px; border-radius: 10px;
      border: 1px solid var(--border); color: var(--muted); transition: all .2s;
    }
    .socials a:hover { color: var(--text); border-color: var(--accent); transform: translateY(-2px); }
    .loc { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: 14px; margin-left: 6px; }

    .card-code {
      background: var(--code-bg); border: 1px solid var(--border); border-radius: 16px;
      box-shadow: var(--shadow); overflow: hidden; transform: rotate(1.5deg);
    }
    .code-head { display: flex; align-items: center; gap: 7px; padding: 12px 16px; border-bottom: 1px solid var(--border); }
    .code-head span { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
    .code-head span:nth-child(2) { background: #febc2e; }
    .code-head span:nth-child(3) { background: #28c840; }
    .code-head em { margin-left: 10px; font-style: normal; font-size: 12px; color: var(--muted); font-family: var(--mono); }
    pre { margin: 0; padding: 20px 22px; font-family: var(--mono); font-size: 13.5px; line-height: 1.75; color: var(--text); overflow-x: auto; }
    .k { color: #c678dd; } .v { color: #61afef; } .s { color: #98c379; } .n { color: #d19a66; }

    .stats { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 72px; }
    .stat { padding: 22px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); }
    .stat strong { display: block; font-size: 2rem; font-weight: 800; line-height: 1.1; }
    .stat span { color: var(--muted); font-size: 14px; }

    @media (max-width: 900px) {
      .hero { padding: 120px 0 60px; }
      .hero-inner { grid-template-columns: 1fr; gap: 40px; }
      .card-code { transform: none; }
      .stats { grid-template-columns: repeat(2, 1fr); margin-top: 48px; }
      .loc { margin-left: 0; width: 100%; }
    }
  `,
})
export class HeroComponent implements OnInit {
  protected readonly profile = PROFILE;
  protected readonly stats = STATS;
  protected readonly typed = signal('');

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const roles = this.profile.roles;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.typed.set(roles[0]);
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = roles[roleIndex];
      charIndex += deleting ? -1 : 1;
      this.typed.set(word.slice(0, charIndex));

      let delay = deleting ? 45 : 90;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 500);
    this.destroyRef.onDestroy(() => clearTimeout(timer));
  }
}
