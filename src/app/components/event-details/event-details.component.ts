import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event: Event | undefined;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    protected router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadEvent(+id);
      }
    });
  }

  loadEvent(id: number): void {
    this.eventService.getEventById(id).subscribe(
      event => {
        this.event = event;
      },
      error => {
        console.error('Erro ao carregar detalhes do evento:', error);
        alert('Erro ao carregar detalhes do evento: ' + (error.error?.message || error.message));
        this.router.navigate(['/events']); // Redireciona se o evento não for encontrado
      }
    );
  }

  softDeleteEvent(): void {
    if (this.event?.id) {
      if (confirm('Tem certeza que deseja apagar este evento?')) {
        this.eventService.softDeleteEvent(this.event.id).subscribe(
          () => {
            console.log('Evento apagado (soft delete) com sucesso!');
            alert('Evento apagado com sucesso!');
            this.router.navigate(['/events']); // Volta para a lista
          },
          error => {
            console.error('Erro ao apagar evento:', error);
            alert('Erro ao apagar evento: ' + (error.error?.message || error.message));
          }
        );
      }
    }
  }
}
