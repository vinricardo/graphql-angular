import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



export type Game = {
  __typename?: 'Game';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  genre?: Maybe<Scalars['String']>;
  developed?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateGameGenre?: Maybe<Game>;
  addGame?: Maybe<Game>;
  removeGame?: Maybe<Game>;
};


export type MutationUpdateGameGenreArgs = {
  id: Scalars['Int'];
  genre: Scalars['String'];
};


export type MutationAddGameArgs = {
  title: Scalars['String'];
  genre: Scalars['String'];
  developed: Scalars['String'];
};


export type MutationRemoveGameArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  games?: Maybe<Array<Maybe<Game>>>;
  allGames?: Maybe<Array<Maybe<Game>>>;
};


export type QueryGameArgs = {
  id: Scalars['Int'];
};


export type QueryGamesArgs = {
  genre?: Maybe<Scalars['String']>;
};

export type AddGameMutationVariables = Exact<{
  title: Scalars['String'];
  genre: Scalars['String'];
  developed: Scalars['String'];
}>;


export type AddGameMutation = (
  { __typename?: 'Mutation' }
  & { addGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'id' | 'title' | 'genre' | 'developed'>
  )> }
);

export type UpdateGenreMutationVariables = Exact<{
  id: Scalars['Int'];
  genre: Scalars['String'];
}>;


export type UpdateGenreMutation = (
  { __typename?: 'Mutation' }
  & { updateGameGenre?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'id' | 'genre'>
  )> }
);

export type AllGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGamesQuery = (
  { __typename?: 'Query' }
  & { allGames?: Maybe<Array<Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'id' | 'title' | 'genre' | 'developed'>
  )>>> }
);

export type DeleteGameMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGameMutation = (
  { __typename?: 'Mutation' }
  & { removeGame?: Maybe<(
    { __typename?: 'Game' }
    & Pick<Game, 'id' | 'title' | 'genre' | 'developed'>
  )> }
);

export const AddGameDocument = gql`
    mutation AddGame($title: String!, $genre: String!, $developed: String!) {
  addGame(title: $title, genre: $genre, developed: $developed) {
    id
    title
    genre
    developed
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddGameGQL extends Apollo.Mutation<AddGameMutation, AddGameMutationVariables> {
    document = AddGameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateGenreDocument = gql`
    mutation updateGenre($id: Int!, $genre: String!) {
  updateGameGenre(id: $id, genre: $genre) {
    id
    genre
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateGenreGQL extends Apollo.Mutation<UpdateGenreMutation, UpdateGenreMutationVariables> {
    document = UpdateGenreDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AllGamesDocument = gql`
    query allGames {
  allGames {
    id
    title
    genre
    developed
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllGamesGQL extends Apollo.Query<AllGamesQuery, AllGamesQueryVariables> {
    document = AllGamesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteGameDocument = gql`
    mutation deleteGame($id: Int!) {
  removeGame(id: $id) {
    id
    title
    genre
    developed
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteGameGQL extends Apollo.Mutation<DeleteGameMutation, DeleteGameMutationVariables> {
    document = DeleteGameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }