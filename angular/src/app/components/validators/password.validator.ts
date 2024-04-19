import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    // Ensure password has a minimum length of 8 characters
    if (value.length < 8) {
      return { 'passwordLength': true };
    }

    // Ensure password contains at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
      return { 'passwordUppercase': true };
    }

    // Ensure password contains at least one lowercase letter
    if (!/[a-z]/.test(value)) {
      return { 'passwordLowercase': true };
    }

    // Ensure password contains at least one number
    if (!/\d/.test(value)) {
      return { 'passwordNumber': true };
    }

    // Ensure password contains at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)) {
      return { 'passwordSpecialCharacter': true };
    }

    return null;
  };
}
