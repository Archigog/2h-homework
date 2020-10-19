import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditComponent } from './ticket-edit.component';
import {of} from "rxjs";
import {BackendService} from "../backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ticket} from "../../interfaces/ticket.interface";
import {User} from "../../interfaces/user.interface";

describe('TicketEditComponent', () => {
  let component: TicketEditComponent;
  let fixture: ComponentFixture<TicketEditComponent>;
  let mockTicket: Ticket;
  let mockUser: User;
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
      declarations: [ TicketEditComponent ],
      providers: [
        {provide: BackendService, useValue: backendServiceSpy},
        {provide: Router, useValue: {}},
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
