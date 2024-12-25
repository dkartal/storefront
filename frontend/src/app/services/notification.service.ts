import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messages: string[] = [];
  private notifications = new BehaviorSubject<string[]>([]);

  constructor() {}

  // Observable for notifications
  getNotifications() {
    return this.notifications.asObservable();
  }

  // Add a new notification
  showNotification(message: string): void {
    this.messages.push(message);
    this.notifications.next([...this.messages]);

    // Automatically remove the notification after 3 seconds
    setTimeout(() => {
      this.removeNotification(message);
    }, 3000);
  }

  // Remove a notification
  private removeNotification(message: string): void {
    this.messages = this.messages.filter((msg) => msg !== message);
    this.notifications.next([...this.messages]);
  }
}
