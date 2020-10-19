import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketDetailsComponent} from './ticket-details.component';
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";
import {BackendService} from "../backend.service";
import {Ticket} from "../../interfaces/ticket.interface";
import {User} from "../../interfaces/user.interface";

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;
  let mockUser: User;
  let mockTicket: Ticket;
  let backendServiceSpy;
  let activatedRouteSpy;

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

    activatedRouteSpy = {
      snapshot: {},
      data: of({
        data: mockTicket
      })
    };

    await TestBed.configureTestingModule({
      declarations: [TicketDetailsComponent],
      imports: [AppRoutingModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: BackendService, useValue: backendServiceSpy},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should have an assignee text, that', () => {
    it('should write "Assignee : $NAME (ID $ID)" when there is an assignee on ticket', () => {
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#assignee').textContent).toContain('Assignee : Victor (ID 111)');
    });
  });
});
