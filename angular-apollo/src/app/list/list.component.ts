import { AllGamesDocument, AllGamesGQL, AllGamesQuery, DeleteGameDocument, DeleteGameGQL} from './../../generated/graphql';
import { Component, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from  'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Game, Query } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  games: Observable<AllGamesQuery['allGames']>;

  constructor(private allGames: AllGamesGQL, private deleteGame : DeleteGameGQL) {}

  ngOnInit(): void {
   this.games = this.allGames.watch().valueChanges.pipe(
    map(result => result.data.allGames)
     );
  }

  removeGame(id){
    this.deleteGame.mutate({id}).subscribe();
    this.games = this.games.pipe( map(x => x.filter(g => g.id != id)));

  }


}