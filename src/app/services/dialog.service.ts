import { Component, Inject, Injectable, Input } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  show(component: any) {
    const dialogId = Math.random().toString(36).substring(2);
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ContentDialogComponent, {
        width: '90%',
        data: {
          component: component,
          actions: [{ text: 'Cancelar' }, { text: 'Guardar' }],
          dialogRef: dialogId,
        },
        id: dialogId,
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed', result);
        resolve(result);
      });
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: ` <h1 mat-dialog-title>Titulo</h1>
    <div mat-dialog-content>
      <p>{{ component.selector }}</p>
    </div>
    <div mat-dialog-actions>
      <div
        fxLayout="row"
        fxLayout.lt-md="column"
        fxLayoutAlign="center center"
        fxLayoutGap="10px"
      >
        <div fxFlex fxLayoutAlign="end">
          <button mat-stroked-button color="primary" (click)="cancel()" >
            {{ data?.actions[0].text }}
          </button>
        </div>
        <div fxFlex fxLayoutAlign="start">
          <button mat-raised-button color="primary" (click)="save()">
            {{ data?.actions[1].text }}
          </button>
        </div>
      </div>
    </div>`,
})
export class ContentDialogComponent {
  component: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {
    console.log('data', data.dialogRef);
    this.component = data.component;
  }

  cancel() {
    console.log('cancel');
    this.dialog.getDialogById(this.data?.dialogRef)?.close();
  }

  save() {
    console.log('save');
    this.dialog.getDialogById(this.data?.dialogRef)?.close();
  }
}
