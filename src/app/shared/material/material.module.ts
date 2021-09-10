import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';


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
    MatPaginatorModule,
    MatCardModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatPaginatorModule,
    MatCardModule,
  ],
})
export class MaterialModule { }
