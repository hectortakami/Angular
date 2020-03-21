import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  language = 'en';
  languages: string[] = [];
  theme = 'Cosmic';
  isSocialActivated = false;
  isSettingsActivated = false;
  

  constructor(
    public themeService: NbThemeService,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    this.translate.use('en')
    translate.addLangs(['en', 'es', 'fr']);
    this.languages = translate.getLangs();
  }

  ngOnInit() {
    this.themeService.onThemeChange()
      .subscribe((theme: any) => {
        console.log(`Theme changed to ${theme.name}`);
      });
  }

  changeLanguage() {

    switch (this.language) {
      case 'en':
        this.translate.use('es');
        this.language = 'es';
        break;
      case 'es':
        this.translate.use('fr');
        this.language = 'fr';
        break;
      case 'fr':
        this.translate.use('de');
        this.language = 'de';
        break;
      case 'de':
        this.translate.use('en');
        this.language = 'en';
        break;

      default:
        break;
    }
  }

  changeTheme() {
    if (this.themeService.currentTheme === 'cosmic') {
      this.themeService.changeTheme('dark');
      this.theme = 'Dark';
    } else if (this.themeService.currentTheme === 'dark') {
      this.themeService.changeTheme('default');
      this.theme = 'Light';
    } else {
      this.themeService.changeTheme('cosmic');
      this.theme = 'Cosmic';
    }

  }

  activateMoreOptions(button) {
    if (button == 'social') {
      this.isSocialActivated = !this.isSocialActivated;
      this.isSettingsActivated = false;
    } else if (button == 'settings') {
      this.isSettingsActivated = !this.isSettingsActivated;
      this.isSocialActivated = false;
    }
  }

}
