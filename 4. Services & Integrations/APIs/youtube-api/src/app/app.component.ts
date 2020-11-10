import { Component } from '@angular/core';
import { YoutubeService } from './services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  year = new Date().getFullYear();
  videos: any[] = [];
  nextPageToken: string;
  prevPageToken: string;
  page = 1;

  constructor(private youtubeService: YoutubeService) {
    this.youtubeService.getChannelVideos().subscribe(response => {
      this.videos = response['items'];
      if (response['nextPageToken']) {
        this.nextPageToken = response['nextPageToken'];
      }
      if (response['prevPageToken']) {
        this.prevPageToken = response['nextPageToken'];
      }
    });
  }

  getNextPage() {
    this.page++;
    this.youtubeService
      .getChannelVideos(this.nextPageToken)
      .subscribe(response => {
        this.videos = response['items'];
        console.log(response);
        if (response['nextPageToken']) {
          this.nextPageToken = response['nextPageToken'];
        } else {
          this.nextPageToken = undefined;
        }
        if (response['prevPageToken']) {
          this.prevPageToken = response['prevPageToken'];
        } else {
          this.prevPageToken = undefined;
        }
      });
  }

  getPreviousPage() {
    this.page--;

    this.youtubeService
      .getChannelVideos(this.prevPageToken)
      .subscribe(response => {
        console.log(response);
        this.videos = response['items'];
        if (response['nextPageToken']) {
          this.nextPageToken = response['nextPageToken'];
        } else {
          this.nextPageToken = undefined;
        }
        if (response['prevPageToken']) {
          this.prevPageToken = response['prevPageToken'];
        } else {
          this.prevPageToken = undefined;
        }
      });
  }
}
