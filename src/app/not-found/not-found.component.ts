/**
 * Title: not-found.component.ts
 * Author: Alex Haefner
 * Date: 28 October 2021
 * Description: The not-found component file for nodebucket
 */

import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})

//exporting the class
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
