import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showMessage: boolean = false;
  message: any;

  handleSubmission(data: any) {
    this.showMessage = true;
    this.message = data
  }
}
