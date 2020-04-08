import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  getCollection() {
    return this.http.get(`${environment.firebaseURL}/getCollection`);
  }

  postItem(itemID: string) {
    return this.http.post(`${environment.firebaseURL}/postItem/${itemID}`, {});
  }
}
