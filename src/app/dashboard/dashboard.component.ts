import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user:any;
  Currentuser:any;
  role:string;
  showFiller = false;
  tiles = [
    {text: 'Utilisateurs', cols: 1, rows: 2, color: '#3f51b5'},
    {text: 'Domaine', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Formateur', cols: 1, rows: 2, color: 'lightpink'},
    {text: 'Formation', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Organisme', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Participant', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Pays', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Session', cols: 1, rows: 2, color: '#DDBDF1'},
    {text: 'Profil', cols: 1, rows: 2, color: '#DDBDF1'},
  ];
  
  constructor( public dialog: MatDialog, private router: Router) 
  { }

  ngOnInit(): void {
  }

}
