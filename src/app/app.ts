import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Sidebar } from './sidebar/sidebar';
import { MainDoc } from './main-doc/main-doc';

@Component({
  imports: [RouterOutlet, Navbar, Sidebar, MainDoc],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('kolloApp');
}
