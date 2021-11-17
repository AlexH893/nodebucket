/*
 * Author: Alex Haefner
 * Date: 11.10.2021
 * Description: TS file for create-task-dialog component
 * Sources:
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css'],
})
export class CreateTaskDialogComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  createTask() {
    this.dialogRef.close(this.taskForm.value);
  }

  /*
   * Exit the form
   */
  cancel() {
    this.dialogRef.close();
  }
}
