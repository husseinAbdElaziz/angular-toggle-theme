import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) { }


  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.loadStyle(theme);
    } else {
      this.loadStyle('dark-theme.css');
    }
  }

  loadStyle(styleName: string) {

    localStorage.setItem('theme', styleName);

    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById('theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
