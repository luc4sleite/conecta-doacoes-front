import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service';
import { CadastroOngComponent } from './pages/cadastro/cadastro-ong/cadastro-ong.component';
import { CadastroEmpresaComponent } from './pages/cadastro/cadastro-empresa/cadastro-empresa.component';
import { DefaultRegisterLayoutComponent } from './components/default-register-layout/default-register-layout.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { roles: ['user', 'admin'] }
    },
    {
        path: 'ong-register',
        component: CadastroOngComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ong', 'admin'] }
    },
    {
        path: 'company-register',
        component: CadastroEmpresaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['company', 'admin'] }
    },
    {
        path: '',
        component: DefaultRegisterLayoutComponent
    }
];
