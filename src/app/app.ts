import { Component, inject, computed } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { MainDoc } from './main-doc/main-doc';
import { Leftpanel } from './leftpanel/leftpanel';
import { AppStateService } from './services/app-state.service';

@Component({
  imports: [Navbar, Sidebar, MainDoc, Leftpanel],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly state = inject(AppStateService);
  protected readonly theme = computed(() => this.state.theme());
}
