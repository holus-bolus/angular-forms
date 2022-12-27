import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  form: FormGroup | undefined;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      address: new FormGroup({
        country: new FormControl('nl'),
        city: new FormControl('Amsterdam', Validators.required),
      }),
      skills: new FormArray([]),
    });
  }

  submit() {
    if (this.form.valid) {
      console.log('form has been submitted', this.form);
      const formData = { ...this.form.value };
      console.log(formData);
    }
  }

  setCapital() {
    const cityMap = {
      nl: 'Amsterdam',
      de: 'Berlin',
      dm: 'Copenhagen',
    };
    const cityKey = this.form.get('address').get('country').value;
    const city = cityMap[cityKey];
    console.log(city);
    this.form.patchValue({ address: { city } });
  }

  addASkill() {
    const control = new FormControl('', Validators.required);
    // <FormArray>this.form.get('skills');
    (this.form.get('skills') as FormArray).push(control);
  }
}
