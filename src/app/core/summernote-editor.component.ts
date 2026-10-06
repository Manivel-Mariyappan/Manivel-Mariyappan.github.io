import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

/** Email-safe fonts offered in the toolbar. */
const FONT_NAMES = ['Arial', 'Georgia', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Courier New'];

/** Loads jQuery + Summernote (lite build, no Bootstrap) once, on demand. */
let summernoteReady: Promise<any> | undefined;
function loadSummernote(): Promise<any> {
  return (summernoteReady ??= (async () => {
    const { default: $ } = await import('jquery');
    Object.assign(window, { jQuery: $, $ });
    await import('summernote/dist/summernote-lite.js');
    return $;
  })());
}

/**
 * Summernote rich-text editor bound to a reactive FormControl (value is an HTML string).
 * Browser-only and standalone so it can be lazy-loaded with @defer.
 */
@Component({
  selector: 'app-summernote-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #editor></div>`,
  styles: `:host { display: block; }`,
})
export class SummernoteEditorComponent {
  readonly control = input.required<FormControl<string>>();
  readonly placeholder = input('');

  private readonly editorEl = viewChild.required<ElementRef<HTMLElement>>('editor');
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.init());
  }

  private async init(): Promise<void> {
    const $ = await loadSummernote();
    const control = this.control();
    const $editor = $(this.editorEl().nativeElement);

    $editor.summernote({
      placeholder: this.placeholder(),
      height: 180,
      dialogsInBody: true,
      disableDragAndDrop: true,
      fontNames: FONT_NAMES,
      fontNamesIgnoreCheck: FONT_NAMES,
      fontSizes: ['12', '14', '16', '18', '24', '32'],
      toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'strikethrough']],
        ['fontname', ['fontname', 'fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
      ],
      callbacks: {
        onChange: (html: string) => {
          const value = $editor.summernote('isEmpty') ? '' : html;
          if (value !== control.value) {
            control.setValue(value, { emitEvent: true });
            control.markAsDirty();
            this.cdr.markForCheck();
          }
        },
        onBlur: () => {
          control.markAsTouched();
          this.cdr.markForCheck();
        },
      },
    });

    if (control.value) $editor.summernote('code', control.value);

    // Keep the editor in sync when the form is reset or set from code.
    const sub = control.valueChanges.subscribe((value) => {
      const current = $editor.summernote('isEmpty') ? '' : $editor.summernote('code');
      if ((value ?? '') !== current) {
        if (value) $editor.summernote('code', value);
        else $editor.summernote('reset');
      }
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
      $editor.summernote('destroy');
    });
  }
}
