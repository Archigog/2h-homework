import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BackendService} from './backend.service';
import {AppRoutingModule} from "./app-routing.module";
import {TicketDetailsComponent} from './ticket-details/ticket-details.component';
import {TicketsListComponent} from "./tickets-list/tickets-list.component";
import { TicketEditComponent } from './ticket-edit/ticket-edit.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent, TicketsListComponent, TicketDetailsComponent, TicketEditComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [BackendService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
