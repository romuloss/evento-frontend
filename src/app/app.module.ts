import { SharedModule } from './shared/shared.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Para formulários

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './feature/event/event-list/event-list.component';
import { EventFormComponent } from './feature/event/event-form/event-form.component';
import { EventDetailsComponent } from './feature/event/event-details/event-details.component';
import pt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(pt)

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventFormComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
