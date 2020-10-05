import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketDetailsComponent} from './ticket-details.component';
import {of} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppRoutingModule} from "../app-routing.module";

describe('TicketDetailsComponent', () => {
  let component: TicketDetailsComponent;
  let fixture: ComponentFixture<TicketDetailsComponent>;
  let activatedRouteSpy;
  let mockData;

  beforeEach(async () => {
    mockData = [
      {
        id: 0,
        completed: false,
        assigneeId: 111,
        description: 'Install a monitor arm'
      },
      {id: 111, name: 'Victor'}
    ];
    activatedRouteSpy = {
      snapshot: {},
      data: of({
        data: mockData
      })
    };

    await TestBed.configureTestingModule({
      declarations: [TicketDetailsComponent],
      imports: [AppRoutingModule],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
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
