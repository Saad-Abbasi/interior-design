import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabinetTypeComponent } from './pages/cabinet-type/cabinet-type.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from '../app/material/material.module';
import { FirstStepComponent } from './pages/steps/first-step/first-step.component';
import { SidePanelComponent } from './pages/steps/shared/side-panel/side-panel.component';
import { SecondStepComponent } from './pages/steps/second-step/second-step.component';
import { ThirdStepComponent } from './pages/steps/third-step/third-step.component';
import { FourthStepComponent } from './pages/steps/fourth-step/fourth-step.component';
import { ChooseClosetComponent } from './pages/steps/dialogs/choose-closet/choose-closet.component';
import { ChooseClosetSmallComponent } from './pages/steps/dialogs/choose-closet-small/choose-closet-small.component';

@NgModule({
  declarations: [
    AppComponent,
    CabinetTypeComponent,
    FirstStepComponent,
    SidePanelComponent,
    SecondStepComponent,
    ThirdStepComponent,
    FourthStepComponent,
    ChooseClosetComponent,
    ChooseClosetSmallComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
