import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';
import { Game } from '../game/game';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  game: Game | undefined;

  constructor(
    public _acr: ActivatedRoute,
    public _fb: FormBuilder,
    public _games: GamesService
  ) {}

  ngOnInit(): void {
    this._acr.params.subscribe((data) => {
      this.game = this._games.games.find((game) => game.id == data['id']);
    });
    this.form = this._fb.group({
      title: [this.game?.name || '', Validators.required],
      rating: [
        this.game?.rating || 0,
        [Validators.required, Validators.max(5), Validators.min(0)],
      ],
      imgURL: [this.game?.imgURL || ''],
    });
  }

  handleSubmit() {
    const correction = this.form.value['imgURL'] || null;
    this.game
      ? this._games.editGame({
          ...this.form.value,
          name: this.form.value['title'],
          imgURL: correction,
          id: this.game.id,
        })
      : this._games.addGame({
          ...this.form.value,
          name: this.form.value['title'],
          imgURL: correction,
        });
  }
}
