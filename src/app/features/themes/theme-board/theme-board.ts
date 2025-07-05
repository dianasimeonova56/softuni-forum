import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemesService } from '../../../core/services';
import { Theme } from '../../../models';
import { ThemeItem } from "../theme-item/theme-item";
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-board',
  imports: [ThemeItem, CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  themes: Theme[] = [];
  theme$: Observable<Theme[]>;

  constructor(private themeService: ThemesService) { 
    this.theme$ = this.themeService.getThemes();
  }

  ngOnInit(): void {
    // this.subscriptions.push(
    //   this.themeService.getThemes()
    //   .subscribe((themes: Theme[]) => {
    //     this.themes = themes;
    //   }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
