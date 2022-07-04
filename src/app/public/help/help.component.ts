import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help-about',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  itemsServices = ['Question 1', 'Question 2', 'Question  3', 'Question  4', 'Question  5',
    'Question 6', 'Question 7', 'Question  8', 'Question  9'];
  itemsAccount = ['Question 1', 'Question 2', 'Question  3', 'Question  4', 'Question  5'];
  itemsPayment = ['Question 1', 'Question 2', 'Question  3'];
  itemsAccesibility = ['Question 1', 'Question 2', 'Question  3', 'Question  4', 'Question  5', 'Question 6', 'Question 7'];
  constructor() { }

  ngOnInit(): void {
  }

}
