import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';

/** Email-safe fonts offered in the toolbar. */
export const EDITOR_FONTS = ['Arial', 'Georgia', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Courier New'];
/** Font sizes offered in the toolbar. */
export const EDITOR_SIZES = ['12px', '14px', '18px', '24px', '32px'];

/**
 * Summernote-style rich-text message field (Quill via ngx-quill) bound to a reactive FormControl.
 * Fonts, sizes, colours and alignment are written as inline styles so formatting survives in email.
 * Standalone so it can be lazy-loaded with @defer; the value is an HTML string.
 */
@Component({
  selector: 'app-rich-text-editor',
  imports: [QuillEditorComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <quill-editor
      theme="snow"
      format="html"
      [formControl]="control()"
      [placeholder]="placeholder()"
      [modules]="modules"
      [customOptions]="customOptions"
      defaultEmptyValue=""
    />
  `,
  styles: `
    app-rich-text-editor { display: block; }
    app-rich-text-editor quill-editor { display: block; }
    app-rich-text-editor .ql-container { min-height: 160px; font-size: 15px; }
  `,
})
export class RichTextEditorComponent {
  readonly control = input.required<FormControl<string>>();
  readonly placeholder = input('');

  // Use inline-style attributors instead of Quill's default CSS classes (email clients drop the classes).
  protected readonly customOptions = [
    { import: 'attributors/style/font', whitelist: EDITOR_FONTS },
    { import: 'attributors/style/size', whitelist: EDITOR_SIZES },
    { import: 'attributors/style/align', whitelist: ['right', 'center', 'justify'] },
  ];

  protected readonly modules: QuillModules = {
    toolbar: [
      [{ font: [false, ...EDITOR_FONTS] }, { size: [false, ...EDITOR_SIZES] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
      ['link', 'clean'],
    ],
  };
}
