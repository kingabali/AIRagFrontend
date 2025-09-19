import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
    constructor(private http: HttpClient) { }
    private apiBaseUrl = environment.apiUrl;
    streamChat(userid:string,prompt: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource(`${this.apiBaseUrl}/api/v1/ai/chat/v2?userid=${encodeURIComponent(userid)}&prompt=${encodeURIComponent(prompt)}`);

      eventSource.onmessage = (event) => {
        observer.next(event.data);
      };

      eventSource.onerror = (error) => {
        observer.complete();
        eventSource.close();
      };
    });
  }
}
