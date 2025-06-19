import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event, PaginatedResponse } from '../../models/event.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents(this.currentPage, this.pageSize).pipe(take(1))
      .subscribe(
        (response: PaginatedResponse<Event>) => {
          this.events = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = response.number; // Atualiza a página atual com a que veio do backend
        },
        error => {
          console.error('Erro ao carregar eventos:', error);
        }
      );
  }

  softDeleteEvent(id: number | undefined): void {
    if (id) {
      if (confirm('Tem certeza que deseja apagar este evento?')) {
        this.eventService.softDeleteEvent(id).subscribe(
          () => {
            console.log('Evento apagado (soft delete) com sucesso!');
            this.loadEvents(); // Recarrega a lista após a exclusão
          },
          error => {
            console.error('Erro ao apagar evento:', error);
            alert('Erro ao apagar evento: ' + (error.error?.message || error.message));
          }
        );
      }
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadEvents();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents();
    }
  }
}
