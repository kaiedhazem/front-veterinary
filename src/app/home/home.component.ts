import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PetsService } from '../pets.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'weight','category','entryDate','Actions'];
  dataSource: MatTableDataSource<any>;
  pet= {
       id : '',
       name : '',
       weight : '' ,
       category : '' ,
       entryDate : '' 
      }
     
      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;
  constructor( private petService : PetsService,private router: Router,
    public dialog: MatDialog, private formBuilder : FormBuilder,
    private _snackBar: MatSnackBar) { }

    ajoutPetForm !: FormGroup;
    modifierPetForm !: FormGroup;
    pets:any;
    objectToEdit: any;
    idSupp: any;
  ngOnInit(): void {
    this.afficher();
    this.ajoutPetForm = this.formBuilder.group(
      {
        
       name : ['', Validators.required] ,
       weight : ['', Validators.required] ,
       category : ['', Validators.required] ,
       entryDate :['', Validators.required] 
      })
  }
  openDialog(mymodal: any, row: any) {
    const dialogRef = this.dialog.open(mymodal, {
      width: '30%'
    });
    if(row){
      this.objectToEdit = row;
      console.log(this.objectToEdit);
      this.modifierPetForm = this.formBuilder.group(
        {
          id: [this.objectToEdit.id ],
          name : [this.objectToEdit.name ] ,
          weight : [this.objectToEdit.weight] ,
          category :[this.objectToEdit.category] ,
          entryDate :[this.objectToEdit.entryDate]
        })
        
    }
  }

  openSuppDialog(mymodal: any, id: any) {
    const dialogRef = this.dialog.open(mymodal, {
      width: '30%'
    });
    this.idSupp = id;
  }

  afficher():void {
    this.petService.getPets()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort=this.sort;
          console.log(this.dataSource);
        },
        error:(err)=>{
          this.openSnackBar("Erreur d'affichage des pets!!", "OOPS");
          console.log(err);
        }
      })
  }

  ajouterPet(): void {
    console.log(this.ajoutPetForm.value);
    
      this.petService.addPet(this.ajoutPetForm.value)
      .subscribe({
        next:(res)=>{
          this.ajoutPetForm.reset();
          this.dialog.closeAll();
          this.openSnackBar("Pet ajouté avec succés!!", "Ok");
          this.ngOnInit();
        },
        error:()=>{
          this.ajoutPetForm.reset();
          this.dialog.closeAll();
          this.openSnackBar("Erreur d'ajout de pet!!", "OOPS");
        }
      })
    
  }

  modifierPet() {
    console.log(this.objectToEdit);
    if(this.modifierPetForm.valid)
    {
      this.petService.updatePet(this.modifierPetForm.value)
      .subscribe({
        next:(res)=>{
          this.modifierPetForm.reset();
          this.dialog.closeAll();
          this.openSnackBar("pet modifié avec succés!!", "Ok");
          this.ngOnInit();
        },
        error:()=>{
          this.modifierPetForm.reset();
          this.dialog.closeAll();
          this.openSnackBar("pet modifié avec succés!!", "Ok");
          this.ngOnInit();
        }
      })
    }
  }

  supprimerPet(){
    this.petService.deletePet(this.idSupp)
    .subscribe({
      next:(res)=>{
        this.dialog.closeAll();
        this.openSnackBar("Pet supprimé avec succés!!", "Ok");
        this.ngOnInit();
      },
      error:()=>{
        this.dialog.closeAll();
        this.openSnackBar("Pet supprimé avec succés!!", "Ok");
        this.ngOnInit();
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}