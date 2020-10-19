import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketsListComponent} from './tickets-list.component';
import {BackendService} from "../backend.service";
import {AppRoutingModule} from "../app-routing.module";
import {of} from "rxjs";
import {Ticket} from "../../interfaces/ticket.interface";
import {User} from "../../interfaces/user.interface";

describe('TicketsListComponent', () => {
  let component: TicketsListComponent;
  let fixture: ComponentFixture<TicketsListComponent>;
  let mockTicket: Ticket;
  let mockUser: User;
  let backendServiceSpy;

  beforeEach(async () => {
    mockUser = {id: 111, name: 'Victor'};
    mockTicket = {
      id: 0,
      completed: false,
      assignee: mockUser,
      description: 'Install a monitor arm'
    };

    backendServiceSpy = jasmine.createSpyObj({
      tickets: of([mockTicket]),
      users: of([mockUser])
    });

    await TestBed.configureTestingModule({
      declarations: [TicketsListComponent],
      imports: [AppRoutingModule],
      providers: [
        {provide: BackendService, useValue: backendServiceSpy},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the tickets service on init', () => {
    expect(backendServiceSpy.tickets).toHaveBeenCalled();
  });
});
