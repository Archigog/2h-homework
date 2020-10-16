import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Ticket} from "../../interfaces/ticket.interface";
import {LoadingService} from "../core/loading/loading.service";
import {Observable} from "rxjs";
import {BackendService} from "../backend.service";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  public readonly isLoading$: Observable<boolean> = this.loadingService.isLoading$;

  public ticket: Ticket;

  constructor(
      private route: ActivatedRoute,
      private loadingService: LoadingService,
      private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({data}) => {
      this.loadingService.stop();
      this.ticket = data;
    });
  }

  public markAsComplete(): void {
    this.backendService.complete(this.ticket.id, true).subscribe(ticket => {
      this.ticket = ticket;
    });
  }

  public markAsNotCompleted(): void {
    this.backendService.complete(this.ticket.id, false).subscribe(ticket => {
      this.ticket = ticket;
    });
  }
}
