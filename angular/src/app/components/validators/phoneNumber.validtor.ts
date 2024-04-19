import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberPattern: RegExp = /^[0-9]{10}$/;

    if (control.value && !phoneNumberPattern.test(control.value)) {
      return { 'invalidPhoneNumber': true };
    }

    return null;
  };
}
