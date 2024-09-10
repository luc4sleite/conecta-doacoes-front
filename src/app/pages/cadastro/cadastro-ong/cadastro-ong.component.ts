import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OngService } from '../../../services/ong.service';
import { Router } from '@angular/router';
import { Ong } from '../../../classes/ong';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { CommonModule } from '@angular/common';
import { DefaultRegisterLayoutComponent } from '../../../components/default-register-layout/default-register-layout.component';
import { ViacepService } from '../../../services/viacep.service';

interface OngForm {
  cnpj: FormControl,
  nome: FormControl,
  descricao: FormControl,
  telefone: FormControl,
  email: FormControl,
  tipoDoacao: FormControl
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
  selector: 'app-cadastro-ong',
  standalone: true,
  imports: [
    DefaultRegisterLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    OngService,
    ViacepService
  ],
  templateUrl: './cadastro-ong.component.html',
  styleUrl: './cadastro-ong.component.scss'
})
export class CadastroOngComponent {
  ongForm!: FormGroup<OngForm>;
  enderecoForm!: FormGroup<EnderecoForm>;
  dadosRecebidos: any;
  tipoDoacao: string[] = ['Roupa', 'Móveis', 'Outros'];
  selectedOptions: string[] = [];

  constructor(
    private ongService: OngService,
    private viacepService: ViacepService,
    private toastService: ToastrService,
    private router: Router
  ){
    this.ongForm = new FormGroup({
      cnpj: new FormControl('', Validators.required),
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      tipoDoacao: new FormControl([], Validators.required),
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

  onCheckboxChange(event: any) {
    const option = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedOptions.push(option);
    } else {
      const index = this.selectedOptions.indexOf(option);
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
      }
    }

    // Atualiza o formControl com as opções selecionadas
    this.ongForm.get('tipoDoacao')?.setValue(this.selectedOptions);
  }

  
  submit() {
    let ong: Ong = {
      cnpj: this.ongForm.value.cnpj,
      nome: this.ongForm.value.nome,
      descricao: this.ongForm.value.descricao,
      telefone: this.ongForm.value.telefone,
      email: this.ongForm.value.email,
      tipoDoacao: this.ongForm.value.tipoDoacao,
      endereco: {
        cep: this.enderecoForm.value.cep,
        logradouro: this.enderecoForm.value.logradouro,
        numero: this.enderecoForm.value.numero,
        complemento: this.enderecoForm.value.complemento,
        bairro: this.enderecoForm.value.bairro,
        cidade: this.enderecoForm.value.cidade,
        estado: this.enderecoForm.value.estado,
        pais: 'Brasil'
      }
    };

    this.ongService.register(ong).subscribe({
      next: () => {
        this.toastService.success('Cadastro realizado com sucesso');
        this.router.navigate(['login']);
      },
      error: (response) => {
        this.toastService.error('Erro ao realizar cadastro');
        console.error(response);
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
