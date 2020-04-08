import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PokemonModel } from "src/app/models/pokemon";
import { FirebaseService } from "src/app/services/firebase.service";
import {
  NbToastrService,
  NbComponentStatus,
} from "@nebular/theme";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-formulary-crud",
  templateUrl: "./formulary-crud.component.html",
  styleUrls: ["./formulary-crud.component.scss"]
})
export class FormularyCrudComponent implements OnInit {
  buttons = [
    {
      type: "Grass",
      status: "success",
      disabled: false,
      icon: "fas fa-seedling fa-2x"
    },
    {
      type: "Fire",
      status: "danger",
      disabled: false,
      icon: "fas fa-fire fa-2x"
    },
    {
      type: "Water",
      status: "info",
      disabled: false,
      icon: "fas fa-tint fa-2x"
    },
    {
      type: "Electric",
      status: "warning",
      disabled: false,
      icon: "fas fa-bolt fa-2x"
    },
    {
      type: "Mystic",
      status: "primary",
      disabled: false,
      icon: "fas fa-moon fa-2x"
    }
  ];
  loading = false;
  form: FormGroup;
  pokemon = new PokemonModel();
  pokemonID: string;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private toastrService: NbToastrService,
    private routerParams: ActivatedRoute,
    private router: Router
  ) {
    this.setupForm();
    this.routerParams.params.subscribe(params => {
      this.pokemonID = params["id"];
    });
  }

  ngOnInit(): void {
    if (this.pokemonID != "new") {
      this.firebaseService
        .readByID(this.pokemonID)
        .subscribe((response: PokemonModel) => {
          this.pokemon = response;
          this.pokemon.firebaseID = this.pokemonID;
          this.form.setValue(this.pokemon);
        });
    }
  }

  setupForm() {
    this.form = this.formBuilder.group({
      firebaseID: [this.pokemon.firebaseID],
      pokename: [this.pokemon.pokename, Validators.required],
      poketype: [this.pokemon.poketype, Validators.required],
      pokestatus: [this.pokemon.pokestatus, Validators.required]
    });
  }

  onSubmit() {

    if (this.form.valid) {
      this.pokemon.pokename = this.form.get("pokename").value;
      this.pokemon.poketype = this.form.get("poketype").value;
      this.pokemon.pokestatus = Boolean(this.form.get("pokestatus").value);
      console.log(this.pokemon);

      this.uploadPokemon(this.pokemon);

    } else {
      console.log("Invalid Form");
    }
    setTimeout(() => {
      this.router.navigate(['/show']);
    }, 1000);

  }

  uploadPokemon(pokemon: PokemonModel) {
    this.loading = true;
    if (this.pokemon.firebaseID) {
      this.firebaseService.update(this.pokemon).subscribe(
        response => {
          this.showToast(
            "Pokemon Updated!",
            `Pokemon ${this.pokemon.pokename} updated :)`,
            "info",
            "top-start"
          );
          this.loading = false;
        },
        error => {
          this.showToast(
            "Couldn't Update Pokemon.",
            `Pokemon ${this.pokemon.pokename} couldn't be updated`,
            "danger",
            "top-start"
          );
          this.loading = false;
        }
      );
    } else {
      this.firebaseService.create(this.pokemon).subscribe(
        response => {
          this.form.setValue(response);
          this.showToast(
            "Pokemon Created!",
            `Pokemon ${this.pokemon.pokename} created :)`,
            "success",
            "top-start"
          );
          this.loading = false;
        },
        error => {
          this.showToast(
            "Couldn't Create Pokemon.",
            `Pokemon ${this.pokemon.pokename} couldn't be created`,
            "danger",
            "top-start"
          );
          this.loading = false;
        }
      );
    }
  }

  changeType(type: string) {
    this.form.get("poketype").setValue(type);
  }

  changeStatus(status: boolean) {
    this.form.get("pokestatus").setValue(status);
  }

  showToast(title: string, msg: string, status: NbComponentStatus, position) {
    this.toastrService.show(`${msg}`, `${title}`, { status, position });
  }
}
