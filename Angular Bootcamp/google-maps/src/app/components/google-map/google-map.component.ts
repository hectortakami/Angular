import { Component, OnInit } from "@angular/core";
import { MapMarker } from "src/app/models/map-marker";
import {
  NbDialogService,
  NbToastrService,
  NbComponentStatus
} from "@nebular/theme";
import { MapMarkerDialogComponent } from "../map-marker-dialog/map-marker-dialog.component";

@Component({
  selector: "app-google-map",
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"]
})
export class GoogleMapComponent implements OnInit {
  latitude = 40.73061;
  longitude = -73.935242;
  mapMarkers: MapMarker[] = [];

  constructor(
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    const firstMarker = new MapMarker(40.73061, -73.935242);
    this.mapMarkers.push(firstMarker);
  }

  addMapMarker(event: Event) {
    const newMarker = new MapMarker(event["coords"].lat, event["coords"].lng);
    this.mapMarkers.push(newMarker);
    this.showToast("primary");
  }

  deleteMapMarker(index: number) {
    this.mapMarkers.splice(index, index);
    this.showToast(
      "danger",
      "Marker Deleted!",
      "Map marker deleted successfully :)"
    );
  }

  editMapMarker(index: number) {
    this.openDialog(index);
  }

  openDialog(index: number) {
    this.dialogService
      .open(MapMarkerDialogComponent)
      .onClose.subscribe(markerInfo => {
        if (markerInfo) {
          this.mapMarkers[index].title = markerInfo["title"];
          this.mapMarkers[index].description = markerInfo["description"];
          this.showToast(
            "success",
            "Marker Edited!",
            "Map marker edited successfully :)"
          );
        }
      });
  }

  showToast(
    status: NbComponentStatus,
    title = "Marker Created!",
    msg = "New map marker created :)"
  ) {
    this.toastrService.show(msg, title, { limit: 3, status });
  }

  ngOnInit(): void {}
}
