import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class MyValidators {
  static restrictedEmails(control: FormControl): { [key: string]: boolean } {
    if (['v@mail.ru'].includes(control.value)) {
      return { restrictedEmail: true };
    }
    return null;
  }

  static UniqueEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'async@gamil.com') {
          resolve({
            UniqueEmail: true,
          });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
}
