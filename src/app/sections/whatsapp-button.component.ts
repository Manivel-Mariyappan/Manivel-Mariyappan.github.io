import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../core/icon.component';
import { PROFILE } from '../data/portfolio.data';

@Component({
  selector: 'app-whatsapp-button',
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="wa" [href]="whatsapp" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <app-icon name="whatsapp" [size]="28" />
      <span class="label">Chat with me</span>
    </a>
  `,
  styles: `
    .wa {
      position: fixed; right: 22px; bottom: 22px; z-index: 60;
      display: flex; align-items: center; gap: 0; height: 58px; padding: 0 15px;
      border-radius: 999px; background: #25d366; color: #fff;
      box-shadow: 0 10px 28px -6px rgb(37 211 102 / .55);
      transition: transform .2s, gap .25s, padding .25s;
    }
    .wa::before {
      content: ''; position: absolute; inset: 0; border-radius: inherit; background: #25d366;
      z-index: -1; animation: ring 2.4s ease-out infinite;
    }
    @keyframes ring { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.5); opacity: 0; } }
    .label { max-width: 0; overflow: hidden; white-space: nowrap; font-weight: 600; font-size: 15px; transition: max-width .3s; }
    .wa:hover { transform: translateY(-2px); gap: 10px; padding-right: 20px; }
    .wa:hover .label { max-width: 140px; }
    @media (max-width: 640px) { .wa { right: 16px; bottom: 16px; height: 54px; padding: 0 13px; } }
  `,
})
export class WhatsappButtonComponent {
  protected readonly whatsapp = PROFILE.whatsapp;
}
