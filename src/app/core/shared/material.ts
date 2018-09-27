import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';

const MAT_MODULES = [
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatInputModule,
  MatTableModule
];

@NgModule({
  imports: [MAT_MODULES],
  exports: [MAT_MODULES],
})
export class MaterialModule {}
