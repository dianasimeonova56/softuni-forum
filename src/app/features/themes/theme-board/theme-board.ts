import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../../../core/services';
import { Theme } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-theme-board',
  imports: [],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard implements OnInit {
  themes: Theme[] = [];

  constructor(private themeService: ThemesService) { }

  ngOnInit(): void {
    this.themeService.getThemes()
    .pipe(takeUntilDestroyed())
    .subscribe((themes: Theme[]) => {
      this.themes = themes;
    });
  }
}
