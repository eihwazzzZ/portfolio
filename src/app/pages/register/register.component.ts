import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { RegistrationService } from '../../services/registration/registration.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';

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
    username: '',
    confirmUsername: ''
  });
  misMatchusernamesMessage = signal('');
  hidePassword = true;
  hideConfirmPassword = true;

  username: string = '';
  password: string = '';

  constructor(private registrationService: RegistrationService, private router: Router) {
    this.formGroup = new FormGroup(
      {
        username: new FormControl('', [Validators.required, Validators.email]),
        confirmUsername: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      },
      [this.usernameMatchValidator, this.passwordMatchValidator]
    );

    const formControls = ['username', 'confirmUsername', 'password', 'confirmPassword'];
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
      const errorMessages: { [key: string]: string } = { username: '', confirmUsername: '', password: '', confirmPassword: '' };

      Object.keys(this.formGroup.controls).forEach(controlName => {
        const control = this.formGroup.get(controlName);

        if (control && control.touched) {
          if (control.hasError('required')) {
            errorMessages[controlName] = `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
          } else if (control.hasError('username')) {
            errorMessages[controlName] = `Not a valid ${controlName}.`;
          } else if (control.hasError('minlength')) {
            const requiredLength = control.errors?.['minlength'].requiredLength;
            errorMessages[controlName] = `Min length is ${requiredLength}.`;
          } /*else if (controlName === 'confirmUsername' && this.formGroup.hasError('usernameMismatch') && control.touched) {
            errorMessages[controlName] = 'usernames do not match.';
          } else if (controlName === 'confirmPassword' && this.formGroup.hasError('passwordMismatch') && control.touched) {
            errorMessages[controlName] = 'Passwords do not match.';
          }*/
        }
      });

      /*if (this.formGroup.hasError('usernameMismatch')) {
        this.misMatchusernamesMessage.set('usernames do not match.');
      }*/

      this.errorMessages.set(errorMessages);
    };

    usernameMatchValidator(control: AbstractControl): ValidationErrors | null {
      if (!(control instanceof FormGroup)) {
        return null;
      }
  
      const username = control.get('username')?.value;
      const confirmUsername = control.get('confirmUsername')?.value;
      
      if (username && confirmUsername && username !== confirmUsername) {
        return { usernameMismatch: true };
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
      if (this.formGroup.valid) {
        const { username, password }: User = this.formGroup.value;
        const user: User = { username, password };
        this.registrationService
        .singUp(user)
        .subscribe({
          next:(data) => {
            console.log(data);
            this.router.navigate(['card-game']);
          },
          error:(error) => {
            console.error(error);
          }
        });
      } else {
        console.log('Form is invalid');
        this.updateErrorMessage(['username', 'confirmUsername', 'password', 'confirmPassword']);
      }
    };

}
