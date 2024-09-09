import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { PrimarySelectInputComponent } from '../../components/primary-select-input/primary-select-input.component';
import { CommonModule } from '@angular/common';

interface RegisterForm {
  name: FormControl;
  email: FormControl;
  role: FormControl;
  password: FormControl;
  passwordConfirm: FormControl;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    PrimarySelectInputComponent,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup<RegisterForm>;
  roles = [
    { value: 'user', label: 'Doador' },
    { value: 'ong', label: 'Representante ONG' },
    { value: 'company', label: 'Representante Empresa' }
  ];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),  
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    this.loginService.register(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.role,
      this.registerForm.value.password
    ).subscribe({
      next: () => this.toastService.success('Cadastro feito com sucesso'),
      error: () => this.toastService.error('Erro ao fazer cadastro')
    });
  }

  navigate(){
    this.router.navigate(['login']);
  }

}
