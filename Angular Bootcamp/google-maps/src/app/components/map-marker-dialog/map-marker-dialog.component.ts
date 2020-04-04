import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "app-map-marker-dialog",
  templateUrl: "./map-marker-dialog.component.html",
  styleUrls: ["./map-marker-dialog.component.scss"]
})
export class MapMarkerDialogComponent implements OnInit {
  constructor(protected ref: NbDialogRef<MapMarkerDialogComponent>) {}

  ngOnInit(): void {}

  cancel() {
    this.ref.close();
  }

  returnDialogInfo(titleText: string, descText: string) {
    if (titleText.length < 5 || descText.length < 5) {
      return;
    } else {
      this.ref.close({ title: titleText, description: descText });
    }
  }
}
