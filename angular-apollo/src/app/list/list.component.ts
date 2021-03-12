import { Component, OnInit} from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from  'rxjs';
import { map } from 'rxjs/operators';
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
  constructor(private apollo: Apollo) { }


  ngOnInit(): void {
    this.games = this.apollo.watchQuery<Query>({query:QUERY}).valueChanges.pipe(
      map(result => result.data.allGames)
    )
  }

}
