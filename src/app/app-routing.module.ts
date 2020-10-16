import {Injectable, NgModule} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterModule,
  RouterStateSnapshot,
  Routes
} from '@angular/router';
import {TicketDetailsComponent} from "./ticket-details/ticket-details.component";
import {BackendService} from "./backend.service";
import {of} from "rxjs";
import {TicketsListComponent} from "./tickets-list/tickets-list.component";
import {TicketEditComponent} from "./ticket-edit/ticket-edit.component";
import {LoadingService} from "./core/loading/loading.service";

@Injectable({providedIn: 'root'})
export class TicketResolver implements Resolve<any> {
  constructor(
      private backendService: BackendService,
      private loadingService: LoadingService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.loadingService.start();
    const ticketId = route.params['ticketId'] ? route.params['ticketId'] : null;
    if (ticketId) {
      return this.backendService.ticket(ticketId);
    }
    return of({});
  }
}

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tickets',
    pathMatch: 'full',
  },
  {
    component: TicketsListComponent,
    path: 'tickets',
  },
  {
    component: TicketEditComponent,
    path: 'tickets/new',
  },
  {
    component: TicketEditComponent,
    path: 'tickets/:ticketId/edit',
    resolve: {
      data: TicketResolver
    }
  },
  {
    component: TicketDetailsComponent,
    path: 'tickets/:ticketId',
    resolve: {
      data: TicketResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
