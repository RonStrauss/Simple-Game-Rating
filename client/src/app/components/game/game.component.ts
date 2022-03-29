import { Component, Input, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Game } from './game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  @Input() game: Game | undefined;

  constructor(public _games:GamesService) {}

  ngOnInit(): void {}
}
