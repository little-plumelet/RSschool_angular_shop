import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatDividerModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
  ],
})
export class MaterialModule { }
