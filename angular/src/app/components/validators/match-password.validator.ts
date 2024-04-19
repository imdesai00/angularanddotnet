import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const MatchPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const passwordControl = control.get('Password');
  const confirmPasswordControl = control.get('ConfirmPassword');

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  if (confirmPasswordControl.errors && !confirmPasswordControl.errors['matchPassword']) {
    return null;
  }

  if (passwordControl.value !== confirmPasswordControl.value) {
    confirmPasswordControl.setErrors({ matchPassword: true });
    return { matchPassword: true };
  } else {
    confirmPasswordControl.setErrors(null);
    return null;
  }
};
