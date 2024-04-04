import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStoreComponent } from './app-store.component';
import { RouterModule ,Routes} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';


const routes: Routes = [
  { path: "", component: AppStoreComponent},
];

@NgModule({
  declarations: [
    AppStoreComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslateModule,
    SharedModule,
    MatTooltipModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AppStoreModule { }
