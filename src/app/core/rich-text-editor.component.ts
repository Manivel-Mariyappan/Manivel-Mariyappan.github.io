import { ChangeDetectionStrategy, Component, OnDestroy, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';

/**
 * Rich-text message field (ngx-editor) bound to a reactive FormControl.
 * Standalone so it can be lazy-loaded with @defer; the value is an HTML string.
 */
@Component({
  selector: 'app-rich-text-editor',
  imports: [NgxEditorModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="NgxEditor__Wrapper">
      <ngx-editor-menu [editor]="editor" [toolbar]="toolbar" />
      <ngx-editor [editor]="editor" [formControl]="control()" [placeholder]="placeholder()" />
    </div>
  `,
  styles: `
    :host { display: block; }
    :host ::ng-deep .NgxEditor { min-height: 150px; }
    :host ::ng-deep .NgxEditor .ProseMirror { min-height: 140px; padding: 10px 14px; }
  `,
})
export class RichTextEditorComponent implements OnDestroy {
  readonly control = input.required<FormControl<string>>();
  readonly placeholder = input('');

  protected readonly editor = new Editor();
  protected readonly toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['bullet_list', 'ordered_list'],
    ['link'],
    ['format_clear'],
  ];

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
