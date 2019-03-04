import {NgModule} from '@angular/core';
import { MatVideoModule } from 'mat-video';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatVideoModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
  MatInputModule,
  MatSelectModule,
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatVideoModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
  MatInputModule,
  MatSelectModule,
  ]
})
export class MaterialModule {}