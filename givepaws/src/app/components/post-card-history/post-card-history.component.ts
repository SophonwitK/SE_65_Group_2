import { Component } from '@angular/core';

@Component({
  selector: 'app-post-card-history',
  templateUrl: './post-card-history.component.html',
  styleUrls: ['./post-card-history.component.scss']
})
export class PostCardHistoryComponent {
  username = sessionStorage.getItem('username')
  user_id = sessionStorage.getItem('id')
}
