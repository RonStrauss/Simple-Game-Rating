import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { GridComponent } from './components/grid/grid.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: GridComponent, pathMatch: 'full' },
  { path: 'new', component: FormComponent },
  { path: 'edit/:id', component: FormComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
