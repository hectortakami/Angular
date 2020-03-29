import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { PokemonsComponent } from "./components/pokemons/pokemons.component";
import { SearchComponent } from "./components/search/search.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "pokedex", component: PokemonsComponent },
  { path: "search", component: SearchComponent },
  { path: "about/:pokemon", component: AboutComponent },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
