import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketsListComponent} from './tickets-list.component';
import {BackendService} from "../backend.service";
import {AppRoutingModule} from "../app-routing.module";
import {of} from "rxjs";

describe('TicketsListComponent', () => {
  let component: TicketsListComponent;
  let fixture: ComponentFixture<TicketsListComponent>;
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
    expect(backendServiceSpy.users).toHaveBeenCalled();
  });
});
