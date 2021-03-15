import { Query } from './types';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'angular-apollo';
  form: FormGroup;

constructor(private fb: FormBuilder, private apollo: Apollo){

}
  createForm(): void{
    this.form = this.fb.group({
      title: [null, Validators.required],
      genre: [null, Validators.required],
      developed: [null, Validators.required]
    })
  }

  sendForm(): void{
     const title = this.form.get('title').value;
     const genre = this.form.get('genre').value;
     const developed = this.form.get('developed').value;

     const QUERY_ADD = gql`
     mutation AddGame($title: String!, $genre: String!, $developed: String!) {
      addGame(title: $title, genre: $genre, developed: $developed){
        id
        title
        genre
        developed
      }
    }
     `
   this.apollo.mutate({
     mutation: QUERY_ADD,
     variables: {
      title: title,
      genre: genre,
      developed: developed
    }
   }).subscribe();

   this.form.reset();
  }

  ngOnInit() : void{
    this.createForm();
  }
}
