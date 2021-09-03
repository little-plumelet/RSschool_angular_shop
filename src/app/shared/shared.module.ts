import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { InformationBlockComponent } from './components/header/information-block/information-block.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    InformationBlockComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
  ],
})
export class SharedModule { }
