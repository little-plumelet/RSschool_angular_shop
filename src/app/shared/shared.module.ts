import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { InformationBlockComponent } from './components/header/information-block/information-block.component';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { NavigationMainBlockComponent } from './components/header//navigation-main-block/navigation-main-block.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    HeaderComponent,
    InformationBlockComponent,
    NavigationMainBlockComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    AuthModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule { }
