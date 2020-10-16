import {Component, OnInit} from '@angular/core';
import {BackendService} from "../backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../../interfaces/user.interface";
import {LoadingService} from "../core/loading/loading.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-ticket-edit',
  templateUrl: './ticket-edit.component.html',
  styleUrls: ['./ticket-edit.component.css']
})
export class TicketEditComponent implements OnInit {
  public readonly users$: Observable<User[]> = this.backendService.users().pipe(tap(() => this.loadingService.stop()));

  public ticketId: number;
  public description: string;
  public assignee: User;
  public isEditing: boolean = false;

  constructor(
      private backendService: BackendService,
      private router: Router,
      private route: ActivatedRoute,
      private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.loadingService.start();
    this.route.data.subscribe(({data}) => {
      this.ticketId = data.id;
      this.description = data.description;
      this.assignee = data.assignee;
      this.isEditing = !!data;
    });
  }

  public compareAssignee(a1: User, a2: User): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }

  saveOrCreate(): void {
    this.loadingService.start();
    if (this.isEditing) {
      this.save();
    } else {
      this.create();
    }
  }

  private save(): void {
    this.backendService.editTicket(this.ticketId, this.description, this.assignee?.id).subscribe(() => {
      this.loadingService.stop();
      this.router.navigate(['/']);
    });
  }

  private create(): void {
    this.backendService.newTicket(this.description, this.assignee?.id).subscribe(() => {
      this.loadingService.stop();
      this.router.navigate(['/']);
    });
  }
}
