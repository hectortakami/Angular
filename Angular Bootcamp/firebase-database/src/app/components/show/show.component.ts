import { Component, OnInit } from "@angular/core";
import { FirebaseService } from "src/app/services/firebase.service";
import { PokemonModel } from "src/app/models/pokemon";
import { NbToastrService, NbComponentStatus } from "@nebular/theme";

@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"]
})
export class ShowComponent implements OnInit {
  pokemons: PokemonModel[] = [];
  loading = false;
  constructor(
    private firebaseService: FirebaseService,
    private toastrService: NbToastrService
  ) {
    this.loading = true;
    this.firebaseService.read().subscribe(resp => {
      this.pokemons = resp;
      this.loading = false;
    });
  }

  deletePokemon(pokemon: PokemonModel, index: number) {
    this.loading = true;
    const firebaseID = pokemon.firebaseID;
    this.firebaseService.delete(firebaseID).subscribe(response => {
      this.showToast(
        "Pokemon Deleted!",
        `${pokemon.pokename} deleted successfully`,
        "primary",
        "top-start"
      );
    });
    this.pokemons.splice(index, 1);
    this.loading = false;
  }

  showToast(title: string, msg: string, status: NbComponentStatus, position) {
    this.toastrService.show(`${msg}`, `${title}`, { status, position });
  }

  ngOnInit(): void {}
}
