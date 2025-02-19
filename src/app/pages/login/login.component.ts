import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { merge } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, FormsModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  formGroup: FormGroup;
  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessages = signal<{ [key: string]: string }>({
    username: '',
    password: ''
  });
  hide = signal(true);
  hidePassword = true;

  constructor(private authService: AuthService, private router: Router) {
    this.formGroup = new FormGroup(
      {
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      }
    );

    const formControls = ['username', 'password'];
    const observables = formControls.map(controlName => 
      merge(
        this.formGroup.get(controlName)!.statusChanges,
        this.formGroup.get(controlName)!.valueChanges
      )
    );

    merge(...observables)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage(formControls));
  };

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  };

  updateErrorMessage(formControls: string[]) {
    const errorMessages: { [key: string]: string } = { username: '', password: '' };

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
        } else if (control.hasError('maxlength')) {
          const requiredLength = control.errors?.['maxlength'].requiredLength;
          errorMessages[controlName] = `Max length is ${requiredLength}.`;
        }
      }
    });
    this.errorMessages.set(errorMessages);
  };

  onChangePassword(event: MouseEvent) {
    this.hidePassword = !this.hidePassword;
    event.stopPropagation();
    event.preventDefault();
  };

  onSubmit() {
    const { username, password } = this.formGroup.value;
    this.authService
    .login({
      username,
      password
    }).subscribe({
      next:(data) => {
        if(data?.token) {
          localStorage.setItem('token', data?.token);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Credenciales incorrectas, intente de nuevo');
        }
      },
      error:(error) => {
        console.error(error.message);
      }
    });
  };
}
