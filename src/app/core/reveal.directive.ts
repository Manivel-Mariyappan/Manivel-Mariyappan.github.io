import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Fades an element in when it scrolls into view. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective {
  readonly revealDelay = input(0);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Browser only — skipped during prerendering.
    afterNextRender(() => {
      const node = this.el.nativeElement;
      node.style.transitionDelay = `${this.revealDelay()}ms`;

      if (!('IntersectionObserver' in window)) {
        node.classList.add('is-visible');
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            observer.disconnect();
          }
        },
        { threshold: 0.12 },
      );
      observer.observe(node);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
