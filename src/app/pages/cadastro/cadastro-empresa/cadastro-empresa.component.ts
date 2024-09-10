import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpresaService } from '../../../services/empresa.service';
import { Empresa } from '../../../classes/empresa';
import { CommonModule } from '@angular/common';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { DefaultRegisterLayoutComponent } from '../../../components/default-register-layout/default-register-layout.component';
import { ViacepService } from '../../../services/viacep.service';

interface EmpresaForm {
  cnpj: FormControl,
  nome: FormControl,
  descricao: FormControl,
  telefone: FormControl,
  email: FormControl
}

interface EnderecoForm{
  cep: FormControl,
  logradouro: FormControl,
  numero: FormControl,
  complemento: FormControl,
  bairro: FormControl,
  cidade: FormControl,
  estado: FormControl
}

@Component({
  selector: 'app-cadastro-empresa',
  standalone: true,
  imports: [
    DefaultRegisterLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    EmpresaService,
    ViacepService
  ],
  templateUrl: './cadastro-empresa.component.html',
  styleUrl: './cadastro-empresa.component.scss'
})
export class CadastroEmpresaComponent {
  ongForm!: FormGroup<EmpresaForm>;
  enderecoForm!: FormGroup<EnderecoForm>;
  dadosRecebidos: any;

  constructor(
    private viacepService: ViacepService,
    private service: EmpresaService,
    private toastService: ToastrService,
    private router: Router
  ){
    this.ongForm = new FormGroup({
      cnpj: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.enderecoForm = new FormGroup({
      cep: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required)
    });
    this.dadosRecebidos = this.router.getCurrentNavigation()?.extras.state;
  }

  submit() {
    let empresa: Empresa = {
      cnpj: this.ongForm.value.cnpj,
      nome: this.ongForm.value.nome,
      descricao: this.ongForm.value.descricao,
      telefone: this.ongForm.value.telefone,
      email: this.ongForm.value.email,
      endereco: {
        cep: this.enderecoForm.value.cep,
        logradouro: this.enderecoForm.value.logradouro,
        numero: this.enderecoForm.value.numero,
        complemento: this.enderecoForm.value.complemento,
        bairro: this.enderecoForm.value.bairro,
        cidade: this.enderecoForm.value.cidade,
        estado: this.enderecoForm.value.estado,
        pais: 'Brasil'
      },
      user: {
        nome: this.dadosRecebidos.nome,
        email: this.dadosRecebidos.email,
        role: this.dadosRecebidos.role
      }
    };

    this.service.register(empresa).subscribe({
      next: () => {
        this.toastService.success('Cadastro realizado com sucesso');
        this.router.navigate(['login']);
      },
      error: () => {
        this.toastService.error('Erro ao realizar cadastro');
      }
    });
  }

  navigate(){
    this.router.navigate(['home']);
  }

  async buscarEndereco() {
    const cep = this.enderecoForm.get('cep')?.value;
    if (cep) {
      this.viacepService.getAddressByCep(cep).subscribe(address => {
        this.enderecoForm.get('logradouro')?.setValue(address.logradouro);
        this.enderecoForm.get('bairro')?.setValue(address.bairro);
        this.enderecoForm.get('cidade')?.setValue(address.localidade);
        this.enderecoForm.get('estado')?.setValue(address.uf);
      });
    }
  }

}
