import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ThemeBoard } from './features/themes';
import { PostBoard } from './features/posts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ThemeBoard, PostBoard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
