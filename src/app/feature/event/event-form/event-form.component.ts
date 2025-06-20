import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { Event } from '../../../core/models/event.model';
import { DatePipe } from '@angular/common'; // Para formatar a data

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
  providers: [DatePipe] // Adicione DatePipe aos providers do componente
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  isEditMode = false;
  eventId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    public router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe // Injete DatePipe
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.eventId = +id;
        this.loadEvent(this.eventId);
      }
    });
  }

  initForm(): void {
    this.eventForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      dataHora: ['', [Validators.required]], // Campo para data e hora
      localizacao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });
  }

  loadEvent(id: number): void {
    this.eventService.getEventById(id).subscribe(
      event => {
        // Formata LocalDateTime para o formato de input datetime-local
        const formattedDateTime = this.datePipe.transform(event.dataHora, 'yyyy-MM-ddTHH:mm');
        this.eventForm.patchValue({
          titulo: event.titulo,
          descricao: event.descricao,
          dataHora: formattedDateTime,
          localizacao: event.localizacao
        });
      },
      error => {
        console.error('Erro ao carregar evento para edição:', error);
        alert('Erro ao carregar evento: ' + (error.error?.message || error.message));
      }
    );
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const event: Event = this.eventForm.value;

      if (this.isEditMode && this.eventId) {
        this.eventService.updateEvent(this.eventId, event).subscribe(
          () => {
            alert('Evento atualizado com sucesso!');
            this.router.navigate(['/events']);
          },
          error => {
            console.error('Erro ao atualizar evento:', error);
            alert('Erro ao atualizar evento: ' + this.getErrorMessage(error));
          }
        );
      } else {
        this.eventService.createEvent(event).subscribe(
          () => {
            alert('Evento criado com sucesso!');
            this.router.navigate(['/events']);
          },
          error => {
            console.error('Erro ao criar evento:', error);
            alert('Erro ao criar evento: ' + this.getErrorMessage(error));
          }
        );
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios e corrija os erros.');
      this.eventForm.markAllAsTouched(); // Marca todos os campos como tocados para exibir as validações
    }
  }

  getErrorMessage(error: any): string {
    if (error.error && typeof error.error === 'object') {
      // Trata erros de validação do backend (@ControllerAdvice)
      if (error.error.error === 'Bad Request' && error.error.message.includes('Erro de validação')) {
        try {
          const validationErrors = JSON.parse(error.error.message.split(': ')[1]);
          return Object.values(validationErrors).join(', ');
        } catch (e) {
          return error.error.message;
        }
      }
      return error.error.message || error.statusText || 'Erro desconhecido';
    }
    return error.message || 'Erro desconhecido';
  }
}
