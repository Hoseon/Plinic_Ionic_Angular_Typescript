import { Component, Input } from '@angular/core';

@Component({
  selector: 'user-card',
  templateUrl: 'user-card.html'
})
export class UserCard {
  @Input('user') user: object;

  constructor() {}
}
