import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: false,
  
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  messages: string[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to notifications
    this.notificationService.getNotifications().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
