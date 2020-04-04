import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private youtubeURL = `https://www.googleapis.com/youtube/v3`;
  private apiKey = 'AIzaSyBV9dCMqjVOyNp4dLSZ_9CDKcmsLIRDpt4';
  private playlistId = 'RDL5xP4RPTwf4';

  constructor(private http: HttpClient) {}

  getChannelVideos(nextPageToken?: string) {
    if (nextPageToken) {
      return this.http.get(
        `${this.youtubeURL}/playlistItems?part=snippet&playlistId=${this.playlistId}&key=${this.apiKey}&maxResults=6&pageToken=${nextPageToken}`
      );
    } else {
      return this.http.get(
        `${this.youtubeURL}/playlistItems?part=snippet&playlistId=${this.playlistId}&key=${this.apiKey}&maxResults=6`
      );
    }
  }
}
