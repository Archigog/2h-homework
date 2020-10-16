import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Ticket} from "../../interfaces/ticket.interface";
import {BackendService} from "../backend.service";
import {LoadingService} from "../core/loading/loading.service";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets().pipe(tap(() => this.loadingService.stop()));

  constructor(
      private readonly backendService: BackendService,
      private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.loadingService.start();
  }
}
