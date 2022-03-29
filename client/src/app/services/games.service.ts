import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from '../components/game/game';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  games: Game[] = [];
  names: string[] = [];

  constructor(public _router: Router) {}

  async getGames() {
    try {
      const res = await fetch('http://localhost:8000/games');
      const data = await res.json();
      if (res.status == 200) {
        this.games = data;
        this.names = this.games.map((gm) => gm.name);
      } else {
        alert('wtf ' + res.status);
      }
    } catch (e) {
      alert(e);
    }
  }

  async searchGames(event: Event) {
    const query = (<HTMLInputElement>event.target).value;
    if (!query) {
      this.getGames();
    } else {
      try {
        const res = await fetch(
          `http://localhost:8000/games/search?query=${query}`
        );
        const data = await res.json();
        if (res.status == 200) {
          this.names = data.map((gm: { name: string }) => gm.name);
        } else {
          alert('search ' + data);
        }
      } catch (e) {
        alert(e);
      }
    }
  }

  async addGame(body: Game) {
    try {
      const res = await fetch(`http://localhost:8000/games`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' },
      });
      const data = await res.json();
      if (res.status == 200) {
        this.games = data;
        this._router.navigateByUrl('');
      } else {
        alert('not 200: ' + res);
      }
    } catch (e) {
      alert('exception' + e);
    }
  }

  async deleteGame(game_id: number) {
    try {
      const res = await fetch(`http://localhost:8000/games/${game_id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.status == 200) {
        this.games = data;
      } else {
        alert(data.msg);
      }
    } catch (e) {
      alert(e);
    }
  }

  async editGame(body: Game) {
    try {
      const res = await fetch(`http://localhost:8000/games/edit/${body.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' },
      });
      const data = await res.json();
      if (res.status == 200) {
        this.games = data;
        this._router.navigateByUrl('');
      } else {
        alert(data.detail);
      }
    } catch (e) {
      alert('exception' + e);
    }
  }

  // async changeImg(game_id:number, url: string) {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:8000/games/img/${game_id}?url=${url}`,{
  //         method:"PUT"
  //       }
  //     );
  //     const data = await res.json();
  //     if (res.status == 200) {
  //       this.games = data;
  //     } else {
  //       alert(data.msg);
  //     }
  //   } catch (e) {
  //     alert(e);
  //   }
  // }
}
