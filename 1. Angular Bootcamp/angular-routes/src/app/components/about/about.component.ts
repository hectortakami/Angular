import { Component, OnInit } from "@angular/core";
import { PokedataService, Pokemon } from "src/app/services/pokedata.service";

// Retreives the parameter from the URL
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  pokemonData: Pokemon;
  constructor(
    private _pokedataService: PokedataService,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe(pokeParams => {
      this.pokemonData = _pokedataService.searchPokemon(pokeParams.pokemon);
    });
    console.log(this.pokemonData);
  }

  ngOnInit(): void {}
}
