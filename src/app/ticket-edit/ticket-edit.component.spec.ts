import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditComponent } from './ticket-edit.component';
import {of} from "rxjs";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";

describe('TicketEditComponent', () => {
  let component: TicketEditComponent;
  let fixture: ComponentFixture<TicketEditComponent>;
  let backendServiceSpy;

  beforeEach(async () => {
    backendServiceSpy = jasmine.createSpyObj({
      tickets: of([{
        id: 0,
        completed: false,
        assigneeId: 111,
        description: 'Install a monitor arm'
      }]),
      users: of([{id: 111, name: 'Victor'}])
    });

    await TestBed.configureTestingModule({
      declarations: [ TicketEditComponent ],
      providers: [
        {provide: BackendService, useValue: backendServiceSpy},
        {provide: Router, useValue: {}}
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
