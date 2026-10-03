import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../core/icon.component';
import { RevealDirective } from '../core/reveal.directive';
import { PROFILE } from '../data/portfolio.data';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="section alt">
      <div class="container grid">
        <div appReveal>
          <p class="eyebrow">Contact</p>
          <h2 class="section-title">Let's build <span class="gradient-text">something great</span></h2>
          <p class="section-sub">
            Have an Angular project, an upgrade, or need an experienced front-end developer on your team?
            Tell me about it — I usually reply within 24 hours.
          </p>

          <div class="channels">
            <a [href]="'mailto:' + profile.email" class="channel">
              <span class="ic"><app-icon name="mail" /></span>
              <span><small>Email</small>{{ profile.email }}</span>
            </a>
            <a [href]="'tel:' + profile.phone.replace(' ', '')" class="channel">
              <span class="ic"><app-icon name="phone" /></span>
              <span><small>Phone / WhatsApp</small>{{ profile.phone }}</span>
            </a>
            <a [href]="profile.linkedin" target="_blank" rel="noopener" class="channel">
              <span class="ic"><app-icon name="linkedin" /></span>
              <span><small>LinkedIn</small>manivel-frontendengineer</span>
            </a>
          </div>
        </div>

        <form class="form" [formGroup]="form" (ngSubmit)="submit()" appReveal [revealDelay]="120" novalidate>
          @if (status() === 'sent') {
            <div class="success" role="status">
              <span class="ic big"><app-icon name="check" [size]="28" /></span>
              <h3>Thanks for reaching out!</h3>
              <p>Your message is on its way. I'll get back to you shortly.</p>
              <button type="button" class="btn btn-ghost" (click)="status.set('idle')">Send another</button>
            </div>
          } @else {
            <div class="row">
              <label>
                <span>Name</span>
                <input formControlName="name" autocomplete="name" placeholder="Your name" />
                @if (showError('name')) { <em>Please enter your name.</em> }
              </label>
              <label>
                <span>Email</span>
                <input formControlName="email" type="email" autocomplete="email" placeholder="you@company.com" />
                @if (showError('email')) { <em>Please enter a valid email.</em> }
              </label>
            </div>
            <label>
              <span>Project type</span>
              <select formControlName="type">
                @for (t of projectTypes; track t) { <option [value]="t">{{ t }}</option> }
              </select>
            </label>
            <label>
              <span>Message</span>
              <textarea formControlName="message" rows="5" placeholder="Tell me about your project, timeline and budget…"></textarea>
              @if (showError('message')) { <em>Please write at least 10 characters.</em> }
            </label>
            @if (status() === 'error') {
              <p class="err" role="alert">Something went wrong. Please email me directly at {{ profile.email }}.</p>
            }
            <button type="submit" class="btn btn-primary full" [disabled]="status() === 'sending'">
              {{ status() === 'sending' ? 'Sending…' : 'Send message' }}
              <app-icon name="arrow" [size]="18" />
            </button>
          }
        </form>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 56px; align-items: start; }
    .grid > * { min-width: 0; }
    .channels { display: grid; gap: 12px; margin-top: 32px; }
    .channel {
      display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 14px;
      border: 1px solid var(--border); background: var(--surface); color: var(--text); transition: border-color .2s, transform .2s;
      overflow-wrap: anywhere;
    }
    .channel:hover { border-color: var(--accent); transform: translateX(4px); }
    .channel small { display: block; color: var(--muted); font-size: 12px; }
    .ic { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 10px; background: var(--gradient); color: #fff; flex-shrink: 0; }
    .ic.big { width: 60px; height: 60px; border-radius: 50%; margin: 0 auto 16px; }

    .form { padding: 30px; border-radius: 18px; border: 1px solid var(--border); background: var(--surface); display: grid; gap: 18px; box-shadow: var(--shadow); }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    label { display: grid; gap: 6px; font-size: 14px; font-weight: 500; }
    input, select, textarea {
      width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--border-strong);
      background: var(--bg); color: var(--text); font: inherit; font-weight: 400; transition: border-color .2s, box-shadow .2s;
    }
    textarea { resize: vertical; }
    input:focus, select:focus, textarea:focus {
      outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent);
    }
    input.ng-invalid.ng-touched, textarea.ng-invalid.ng-touched { border-color: #ef4444; }
    em { font-style: normal; color: #ef4444; font-size: 12.5px; font-weight: 400; }
    .err { margin: 0; color: #ef4444; font-size: 14px; }
    .full { width: 100%; justify-content: center; }
    .success { text-align: center; padding: 30px 10px; }
    .success h3 { margin: 0 0 6px; }
    .success p { color: var(--muted); margin: 0 0 20px; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; gap: 36px; } }
    @media (max-width: 560px) { .row { grid-template-columns: 1fr; } .form { padding: 22px; } }
  `,
})
export class ContactComponent {
  protected readonly profile = PROFILE;
  protected readonly status = signal<Status>('idle');
  protected readonly projectTypes = [
    'New Angular application',
    'Angular upgrade / migration',
    'Feature development',
    'UI / component library',
    'React project',
    'Long-term contract / team extension',
    'Other',
  ];

  protected readonly form = inject(NonNullableFormBuilder).group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    type: [this.projectTypes[0]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected showError(name: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[name];
    return c.invalid && c.touched;
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email, type, message } = this.form.getRawValue();

    const { serviceId, templateId, publicKey } = this.profile.emailjs;

    // EmailJS not configured: open the visitor's email client instead.
    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`${type} — enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    this.status.set('sending');
    try {
      // Loaded on demand so the SDK stays out of the initial bundle.
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(serviceId, templateId, { name, email, type, message }, { publicKey });
      this.form.reset();
      this.status.set('sent');
    } catch {
      this.status.set('error');
    }
  }
}
