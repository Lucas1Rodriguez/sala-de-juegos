import { Routes } from '@angular/router';
import { ComponenteHome } from './components/mi-componente/componente-home/componente-home';
import { ComponenteLogin } from './components/mi-componente/componente-login/componente-login';
import { ComponenteQuienSoy } from './components/mi-componente/componente-quien-soy/componente-quien-soy';
import { ComponenteRegistrar } from './components/mi-componente/componente-registrar/componente-registrar';

export const routes: Routes = [

    {
        path: '',
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: ComponenteHome
    },
    {
        path: "quienSoy",
        component: ComponenteQuienSoy
    },
    {
        path: "login",
        component: ComponenteLogin
    },
    {
        path: "registrar",
        component: ComponenteRegistrar
    },
    {
        path: "**",
        component: ComponenteHome
    }


];
