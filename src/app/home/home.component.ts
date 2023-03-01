import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pet= {
       id : '',
       name : '',
       weight : '' ,
       category : '' ,
       entryDate : '' 
      }
      pets:any;
  constructor(private petService : PetsService,private router: Router) { }

  ngOnInit(): void {
    this.afficher();
  }
  afficher():void {
    this.petService.getPets()
      .subscribe({
        next:(res)=>{
           /* this.pet.id=res.id;
            this.pet.name=res.name;
            this.pet.weight=res.weight;
            this.pet.category=res.category;
            this.pet.entryDate=res.entryDate;*/
            this.pets = res;
        },
        error:(err)=>{
          console.log(err);
        }
      })
  }
}
