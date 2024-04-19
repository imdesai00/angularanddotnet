import { AbstractControl, ValidationErrors, FormGroup, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[controlName];
    const confirmPasswordControl = formGroup.controls[matchingControlName];

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ confirmPassword: true });
      return { confirmPassword: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}