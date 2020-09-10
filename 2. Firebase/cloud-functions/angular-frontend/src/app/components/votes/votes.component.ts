import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ItemModel } from 'src/app/models/item';
import { Router } from '@angular/router';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent {
  items: ItemModel[] = [];

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private toastrService: NbToastrService
  ) {
    this.firebase.getCollection().subscribe((response: ItemModel[]) => {
      this.items = response;
    });
  }

  voteGame(gameID: string, gameName: string) {
    this.firebase.postItem(gameID).subscribe(() => {
      console.log('Thanks for voting!');
    });
    this.showToast('primary', gameName, 5000);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

  showToast(status: NbComponentStatus, gameName: string, duration) {
    this.toastrService.show(
      `Your vote for ${gameName} was register!`,
      'Thanks for voting!',
      { status, duration }
    );
  }
}
