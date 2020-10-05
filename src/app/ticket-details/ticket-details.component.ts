import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Ticket} from "../../interfaces/ticket.interface";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  public ticket: Ticket;
  public assignee: User;

  constructor(
      private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({data}) => {
      this.ticket = data[0];
      this.assignee = data[1];
    });
  }

}
