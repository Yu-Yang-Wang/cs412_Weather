import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  form: FormGroup;
  loading: boolean = false;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private getDataService: GetDataService
  ) {
    this.form = this.fb.group({
      inputField: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.loading = true
      const inputValue = this.form.get('inputField')!.value;
      this.getDataService.getDataFromBackend(inputValue).subscribe((res: any) => {
        this.loading = false
        this.submitted.emit(res.data);
      });
    }
  }
}
