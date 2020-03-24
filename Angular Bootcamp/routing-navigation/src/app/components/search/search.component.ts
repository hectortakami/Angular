import { Component, OnInit } from "@angular/core";
import { PokedataService, Pokemon } from "src/app/services/pokedata.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  pokemons: Pokemon[] = [];
  constructor(
    private _pokedataService: PokedataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  searchPokemon(searchTerm: string) {
    if (searchTerm == "") {
      return;
    } else {
      searchTerm = searchTerm.toLowerCase();
      this.pokemons = this._pokedataService.retreiveSearch(searchTerm);
      console.log(this.pokemons);
      return;
    }
  }

  redirectPokemonPage(pokemon: string) {
    this.router.navigate(["/about", pokemon.toLowerCase()]);
  }
}
