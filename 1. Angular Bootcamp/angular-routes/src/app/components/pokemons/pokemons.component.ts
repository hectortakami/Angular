import { Component, OnInit } from "@angular/core";
import { PokedataService } from "src/app/services/pokedata.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-pokemons",
  templateUrl: "./pokemons.component.html",
  styleUrls: ["./pokemons.component.scss"]
})
export class PokemonsComponent implements OnInit {
  pokemons = null;
  search = null;
  constructor(
    private _pokedataService: PokedataService,
    private router: Router
  ) {
    this.pokemons = this._pokedataService.getPokemons();
  }

  ngOnInit(): void {}

  redirectPokemonPage(pokemon: string) {
    this.router.navigate(["/about", pokemon.toLowerCase()]);
  }
}
