import { AddGameGQL, UpdateGenreGQL } from './../generated/graphql';
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
  prevTitle; prevGenre; prevDeveloped;
  form: FormGroup;
  formUpdate: FormGroup;
constructor(private fb: FormBuilder, private addGame : AddGameGQL, private updateGenreGame : UpdateGenreGQL){
 

}
  createForm(): void{
    this.form = this.fb.group({
      title: [null, Validators.required],
      genre: [null, Validators.required],
      developed: [null, Validators.required]
    })

    this.formUpdate = this.fb.group({
      id: [null, Validators.required],
      genreUp: [null, Validators.required]
    })
  }

  sendForm(): void{
     const title = this.form.get('title').value;
     const genre = this.form.get('genre').value;
     const developed = this.form.get('developed').value;
    
    this.prevTitle = title; this.prevGenre = genre; this.prevDeveloped = developed;
   
    this.addGame.mutate({title,genre,developed}).subscribe();

    this.form.reset();
    window.location.reload();
  }


  updateForm(): void{
    const id = parseInt(this.formUpdate.get('id').value);
    const genre = this.formUpdate.get('genreUp').value;

    this.updateGenreGame.mutate({id,genre}).subscribe();
    this.form.reset();
  }

  ngOnInit() : void{
    this.createForm();
  }
}
