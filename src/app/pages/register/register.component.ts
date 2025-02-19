import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formGroup: FormGroup;
  
  errorMessages = signal<{ [key: string]: string }>({
    email: '',
    confirmEmail: ''
  });
  misMatchEmailsMessage = signal('');
  hidePassword = true;
  hideConfirmPassword = true;

  username: string = '';
  password: string = '';

  constructor() {
    this.formGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        confirmEmail: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      },
      [this.emailMatchValidator, this.passwordMatchValidator]
    );

    const formControls = ['email', 'confirmEmail', 'password', 'confirmPassword'];
    const observables = formControls.map(controlName => 
      merge(
        this.formGroup.get(controlName)!.statusChanges,
        this.formGroup.get(controlName)!.valueChanges
      )
    );

    // Listening to controls on the array
    merge(...observables)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage(formControls));
  }
  
    onChangePassword(event: MouseEvent) {
      this.hidePassword = !this.hidePassword;
      event.stopPropagation();
      event.preventDefault();
    };

    onChangeConfirmPassword(event: MouseEvent) {
      this.hideConfirmPassword = !this.hideConfirmPassword;
      event.stopPropagation();
      event.preventDefault();
    };

    updateErrorMessage(formControls: string[]) {
      const errorMessages: { [key: string]: string } = { email: '', confirmEmail: '', password: '', confirmPassword: '' };

      Object.keys(this.formGroup.controls).forEach(controlName => {
        const control = this.formGroup.get(controlName);

        if (control && control.touched) {
          if (control.hasError('required')) {
            errorMessages[controlName] = `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
          } else if (control.hasError('email')) {
            errorMessages[controlName] = `Not a valid ${controlName}.`;
          } else if (control.hasError('minlength')) {
            const requiredLength = control.errors?.['minlength'].requiredLength;
            errorMessages[controlName] = `Min length is ${requiredLength}.`;
          } /*else if (controlName === 'confirmEmail' && this.formGroup.hasError('emailMismatch') && control.touched) {
            errorMessages[controlName] = 'Emails do not match.';
          } else if (controlName === 'confirmPassword' && this.formGroup.hasError('passwordMismatch') && control.touched) {
            errorMessages[controlName] = 'Passwords do not match.';
          }*/
        }
      });

      /*if (this.formGroup.hasError('emailMismatch')) {
        this.misMatchEmailsMessage.set('Emails do not match.');
      }*/

      this.errorMessages.set(errorMessages);
    };

    emailMatchValidator(control: AbstractControl): ValidationErrors | null {
      if (!(control instanceof FormGroup)) {
        return null;
      }
  
      const email = control.get('email')?.value;
      const confirmEmail = control.get('confirmEmail')?.value;
      
      if (email && confirmEmail && email !== confirmEmail) {
        return { emailMismatch: true };
      }
      return null;
    };

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
      if (!(control instanceof FormGroup)) {
        return null;
      }
    
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
    
      if (password && confirmPassword && password !== confirmPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };

    onSubmit() {
      console.log(this.formGroup);
      if (this.formGroup.valid) {
        console.log('Form submitted', this.formGroup.value);
      } else {
        console.log('Form is invalid');
        this.updateErrorMessage(['email', 'confirmEmail', 'password', 'confirmPassword']);
      }
    };

}
