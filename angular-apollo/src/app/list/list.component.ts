import { Component, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from  'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Game, Query } from '../types';

const QUERY = gql`
query allGames {
  allGames {
    id
    title
    genre
    developed
  }
}
`

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  games: Observable<Game[]>;
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.games = this.apollo.watchQuery<Query>({query:QUERY}).valueChanges.pipe(
      map(result => result.data.allGames)
    )
  }

  removeGame(id){
    const QUERY_REMOVE= gql`
      mutation deleteGame($id: Int!){
        removeGame(id:$id){
          id
          title
          genre
          developed
        }
      }
    `
    this.apollo.mutate({
      mutation: QUERY_REMOVE,
      variables:{
        id: id
      }
    }).subscribe();

    this.games = this.games.pipe( map(x => x.filter(g => g.id != id)));

  }


}