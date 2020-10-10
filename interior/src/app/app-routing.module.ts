import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CabinetTypeComponent } from './pages/cabinet-type/cabinet-type.component';
import { FirstStepComponent } from './pages/steps/first-step/first-step.component';
import { SecondStepComponent } from './pages/steps/second-step/second-step.component';
import { SidePanelComponent } from './pages/steps/shared/side-panel/side-panel.component';
import { ThirdStepComponent } from './pages/steps/third-step/third-step.component';


const routes: Routes = [
  {path : 'cabinet-type', component :CabinetTypeComponent},
  {path : 'side-panel', component :SidePanelComponent},
  {path : 'first-step', component :FirstStepComponent},
  {path : 'second-step', component :SecondStepComponent},
  {path : 'third-step', component :ThirdStepComponent},
  {path : '' , pathMatch : 'full' ,component:CabinetTypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
