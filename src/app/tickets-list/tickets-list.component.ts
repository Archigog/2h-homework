import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../interfaces/user.interface";
import {Ticket} from "../../interfaces/ticket.interface";
import {BackendService} from "../backend.service";


@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css']
})
export class TicketsListComponent implements OnInit {

  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();

  constructor(private readonly backendService: BackendService) {
  }

  ngOnInit(): void {
  }

}
