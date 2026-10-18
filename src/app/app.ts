import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { MainDoc } from './main-doc/main-doc';
import { Leftpanel } from './leftpanel/leftpanel';

@Component({
  imports: [RouterOutlet, Navbar, Sidebar, MainDoc, Leftpanel],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('kolloApp');
}
