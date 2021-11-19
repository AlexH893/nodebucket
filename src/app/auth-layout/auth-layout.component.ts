/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: TS file for auth-layout component
 * Sources:
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}
  year: number = Date.now();
  ngOnInit(): void {}
}
