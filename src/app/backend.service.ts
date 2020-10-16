import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Ticket } from '../interfaces/ticket.interface';
import { User } from '../interfaces/user.interface';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

function randomDelay() {
    return Math.random() * 4000;
    // return Math.random();
}

@Injectable()
export class BackendService {
    public storedTickets: Ticket[] = [
        {
            id: 0,
            completed: false,
            assignee: { id: 111, name: 'Victor' },
            description: 'Install a monitor arm'
        },
        {
            id: 1,
            completed: false,
            assignee: { id: 111, name: 'Victor' },
            description: 'Move the desk to the new location'
        },
    ];

    public storedUsers: User[] = [{ id: 111, name: 'Victor' }];

    private lastId: number = 1;

    private findUserById = id => this.storedUsers.find((user: User) => user.id === +id);
    private findTicketById = id => this.storedTickets.find((ticket: Ticket) => ticket.id === +id);

    public tickets(): Observable<Ticket[]> {
        return of(this.storedTickets).pipe(delay(randomDelay()));
    }

    public ticket(id: number): Observable<Ticket> {
        return of(this.findTicketById(id)).pipe(delay(randomDelay()));
    }

    public users(): Observable<User[]> {
        return of(this.storedUsers).pipe(delay(randomDelay()));
    }

    public user(id: number): Observable<User> {
        return of(this.findUserById(id)).pipe(delay(randomDelay()));
    }

    public newTicket(description: string, assigneeId?: number): Observable<Ticket> {
        const newTicket: Ticket = {
            id: ++this.lastId,
            completed: false,
            assignee: null,
            description: description
        };

        if (assigneeId) {
            newTicket.assignee = this.findUserById(+assigneeId);
        }

        return of(newTicket).pipe(
            delay(randomDelay()),
            tap((ticket: Ticket) => this.storedTickets.push(ticket))
        );
    }

    public editTicket(ticketId: number, description: string, assigneeId?: number): Observable<Ticket> {
        const foundTicket = this.findTicketById(+ticketId);

        if (foundTicket) {
            foundTicket.description = description;
            if (assigneeId) {
                foundTicket.assignee = this.findUserById(+assigneeId);
            } else {
                foundTicket.assignee = null;
            }

            return of(foundTicket).pipe(
                delay(randomDelay())
            );
        }

        return throwError(new Error('ticket not found'));
    }

    public assign(ticketId: number, userId: number): Observable<Ticket> {
        const user = this.findUserById(+userId);
        const foundTicket = this.findTicketById(+ticketId);

        if (foundTicket && user) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => {
                    ticket.assignee = user;
                })
            );
        }

        return throwError(new Error('ticket or user not found'));
    }

    public complete(ticketId: number, completed: boolean): Observable<Ticket> {
        const foundTicket = this.findTicketById(+ticketId);

        if (foundTicket) {
            return of(foundTicket).pipe(
                delay(randomDelay()),
                tap((ticket: Ticket) => {
                    ticket.completed = completed;
                })
            );
        }

        return throwError(new Error('ticket not found'));
    }
}
