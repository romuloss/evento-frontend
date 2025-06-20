import { Event } from './../models/event.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../models/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = `${window.location.protocol}//${window.location.hostname}:8080/api/events`; // URL do seu backend

  constructor(private http: HttpClient) {

    console.log(this.apiUrl);
  }

  public getAllEvents(page: number, size: number): Observable<PaginatedResponse<Event>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponse<Event>>(this.apiUrl, { params });
  }

  public getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  public createEvent(event: Event): Observable<Event> {
    // Remove o ID antes de enviar para o backend, já que ele é auto-increment
    const { id, apagado: deleted, ...eventToCreate } = event;
    return this.http.post<Event>(this.apiUrl, eventToCreate);
  }

  public updateEvent(id: number, event: Event): Observable<Event> {
    // Remove o ID antes de enviar para o backend
    const { id: eventId, apagado: deleted, ...eventToUpdate } = event;
    return this.http.put<Event>(`${this.apiUrl}/${id}`, eventToUpdate);
  }

  public softDeleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


