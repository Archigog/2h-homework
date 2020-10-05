import { Component, OnInit } from '@angular/core';
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {
  public description: string;

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
  }


  save(): void {
    this.backendService.newTicket({ description: this.description }).subscribe(ticket => {
      this.router.navigate(['/']);
    });
  }
}
