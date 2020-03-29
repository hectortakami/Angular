import { Injectable } from "@angular/core";

@Injectable()
export class PokedataService {
  private iconPath: string = "../../../assets/icons";
  private pokemons: Pokemon[] = [
    {
      name: "Pikachu",
      icon: `${this.iconPath}/pikachu.svg`,
      description:
        "Pikachu are small, chubby, and incredibly cute mouse-like Pokémon. They are almost completely covered by yellow fur. They have long yellow ears that are tipped with black. A Pikachu's back has two brown stripes, and its large tail is notable for being shaped like a lightning bolt.",
      types: ["electric"],
      pokewiki: "https://pokemon.fandom.com/wiki/Pikachu"
    },
    {
      name: "Bullbasaur",
      icon: `${this.iconPath}/bullbasaur.svg`,
      description:
        "Bulbasaur resembles a small, squatting dinosaur that walks on four legs, but bears three claws on each of its feet and has no tail. It also has large, red eyes and very sharp teeth. Its skin is a light, turquoise color with dark, green spots. t has three claws on all four of its legs. Its most notable feature, however, is the aforementioned bulb on its back, which according to its entry in the Pokédex, was planted there at birth.",
      types: ["grass", "poisson"],
      pokewiki: "https://pokemon.fandom.com/wiki/Bulbasaur"
    },
    {
      name: "Squirtle",
      icon: `${this.iconPath}/squirtle.svg`,
      description:
        "Squirtle is a small, light-blue Pokémon with an appearance similar to a turtle. With its aerodynamic shape and grooved surface, Squirtle's shell helps it wade through the water very quickly. It also offers protection in battle. Like turtles, Squirtle has a shell that covers its body with holes that allow its limbs, tail, and head to be exposed. Unlike a turtle, Squirtle is ordinarily bipedal.",
      types: ["water"],
      pokewiki: "https://pokemon.fandom.com/wiki/Squirtle"
    },
    {
      name: "Charmander",
      icon: `${this.iconPath}/charmander.svg`,
      description:
        "Charmander is a small, bipedal, dinosaur-like Pokémon. Most of its body is colored orange, while its underbelly is a pale light-yellow color. Charmander, like its evolved forms, has a flame that constantly burns on the end of its tail. However, If the flame on Charmander's tail goes out, Charmander is known to die.",
      types: ["fire"],
      pokewiki: "https://pokemon.fandom.com/wiki/Charmander"
    },
    {
      name: "Eevee",
      icon: `${this.iconPath}/eevee.svg`,
      description:
        "Eevee is a small, mammalian creature with bushy, brown fur. Its muzzle is very cat-like, with a small, black and triangular nose. It has a fluffy cream-colored ruff around its neck and a short, bushy and fox-like tail with a creamy tip. Eevee has round, dog-like deep-brown eyes, long rabbit-like ears, and pink paw pads on its little feet. Its paws are small with three toes and no visible claws. Its body and fur are very similar that of a German Spitz (pomeranian) dog.",
      types: ["normal"],
      pokewiki: "https://pokemon.fandom.com/wiki/Eevee"
    },
    {
      name: "Psyduck",
      icon: `${this.iconPath}/psyduck.svg`,
      description:
        "Psyduck is a medium-sized, yellow duck Pokémon. Only the feet and bill are tan. The other body parts are all yellow. Psyduck has three black hairs on top of its head, and its hands are always on its head due to its constant headache. Psyduck always hold their heads due to the fact that they have a near-constant headache. This makes them seem like they are stupid, when in fact they are quite clever and wily.",
      types: ["normal", "water"],
      pokewiki: "https://pokemon.fandom.com/wiki/Psyduck"
    }
  ];

  constructor() {
    //   console.log("PokeDatabase Service Ready! :)");
  }

  public getPokemons(): Pokemon[] {
    return new PokedataService().pokemons;
  }

  public searchPokemon(name: string): Pokemon {
    for (let i = 0; i < this.pokemons.length; i++) {
      if (this.pokemons[i].name.toLocaleLowerCase() === name.toLowerCase()) {
        return this.pokemons[i];
      }
    }
    return null;
  }

  public retreiveSearch(searchTerm: string): Pokemon[] {
    let searchResults: Pokemon[] = [];
    this.getPokemons().forEach(pokemon => {
      let pokemonName = pokemon.name.toLowerCase();
      if (pokemonName.includes(searchTerm)) {
        searchResults.push(pokemon);
      }
    });
    return searchResults;
  }
}

export interface Pokemon {
  name: string;
  icon: string;
  description: string;
  types: string[];
  pokewiki: string;
}
