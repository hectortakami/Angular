export class MapMarker {
  constructor(
    public latitude: number,
    public longitude: number,
    public title: string = "Marker title goes here!",
    public description: string = "Marker description goes here!"
  ) {}
}
