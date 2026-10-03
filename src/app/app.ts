import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from './core/theme.service';
import { HeaderComponent } from './sections/header.component';
import { HeroComponent } from './sections/hero.component';
import { AboutComponent } from './sections/about.component';
import { ServicesComponent } from './sections/services.component';
import { SkillsComponent } from './sections/skills.component';
import { ExperienceComponent } from './sections/experience.component';
import { ProjectsComponent } from './sections/projects.component';
import { ContactComponent } from './sections/contact.component';
import { FooterComponent } from './sections/footer.component';
import { WhatsappButtonComponent } from './sections/whatsapp-button.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    WhatsappButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-about />
      <app-services />
      <app-skills />
      <app-experience />
      <app-projects />
      <app-contact />
    </main>
    <app-footer />
    <app-whatsapp-button />
  `,
})
export class App {
  // Instantiate early so the saved theme is applied on first render.
  private readonly theme = inject(ThemeService);
}
