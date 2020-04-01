import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PokemonModel } from "../models/pokemon";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  private firebase = "https://angular-udemy-crud-d991d.firebaseio.com";

  constructor(private http: HttpClient) {}

  create(pokemon: PokemonModel) {
    // POST
    // returns the id when the POST request is submitted, we modify it
    // to set the ID to the pokemon before return it
    return this.http.post(`${this.firebase}/pokemons.json`, pokemon).pipe(
      map(response => {
        pokemon.firebaseID = response["name"];
        return pokemon;
      })
    );
  }

  read() {
    // GET
    return (
      this.http
        .get(`${this.firebase}/pokemons.json`)
        // To retreive the entire object array containing keys whe need to add them by a pipe
        .pipe(
          map(response => {
            if (!response) {
              return [];
            } else {
              const firebaseIDs = Object.keys(response); //Retreive all the keys, in this case Firebase IDs
              const firebaseData = Object.values(response); //Retreive all the properties contained by each key (without the key)
              for (let i = 0; i < firebaseIDs.length; i++) {
                firebaseData[i].firebaseID = firebaseIDs[i];
              }
              return firebaseData;
            }
          })
        )
    );
  }

  readByID(firebaseID: string) {
    return this.http.get(`${this.firebase}/pokemons/${firebaseID}.json`);
  }

  update(pokemon: PokemonModel) {
    const pokemonTemp = {
      ...pokemon
    };
    delete pokemonTemp.firebaseID;
    // PUT
    return this.http.put(
      `${this.firebase}/pokemons/${pokemon.firebaseID}.json`,
      pokemonTemp
    );
  }

  delete(firebaseID: string) {
    return this.http.delete(`${this.firebase}/pokemons/${firebaseID}.json`);
  }
}
