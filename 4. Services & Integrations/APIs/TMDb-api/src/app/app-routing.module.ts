import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./components/movies-home/movies.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { SearchComponent } from "./components/search/search.component";

const routes: Routes = [
  { path: "movies", component: MoviesComponent },
  { path: "search", component: SearchComponent },
  { path: "detail/:movie_id", component: MovieDetailsComponent },
  { path: "**", pathMatch: "full", redirectTo: "movies" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
