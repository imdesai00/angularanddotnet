import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailvalidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailPattern: RegExp =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (control.value && !emailPattern.test(control.value)) {
      return { 'invalidEmail': true };
    }

    return null;
  };
}
