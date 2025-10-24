import { Routes } from '@angular/router';
import { ComponenteHome } from './components/mi-componente/componente-home/componente-home';
import { ComponenteLogin } from './components/mi-componente/componente-login/componente-login';
import { ComponenteQuienSoy } from './components/mi-componente/componente-quien-soy/componente-quien-soy';
import { ComponenteRegistrar } from './components/mi-componente/componente-registrar/componente-registrar';
import { ComponenteChat } from './components/mi-componente/componente-chat/componente-chat';
import { ComponenteEncuesta } from './components/mi-componente/componente-encuesta/componente-encuesta';
import { ComponenteResultadosEncuesta } from './components/mi-componente/componente-resultados-encuesta/componente-resultados-encuesta';
import { adminGuard } from './guards/admin-guard';
import { ComponenteResultadosJuegos } from './components/mi-componente/componente-resultados-juegos/componente-resultados-juegos';

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
        path: "juegos",
        loadChildren: () => import('./components/mi-componente/juegos/juego-module').then(m => m.JuegoModule)
    },
    {
        path: "chat",
        component: ComponenteChat
    },
    {
        path: "encuesta",
        component: ComponenteEncuesta
    },
    {
        path: "resultadosEncuesta",
        component: ComponenteResultadosEncuesta, 
        canActivate: [adminGuard]
    },
    {
        path: "resultadosJuegos",
        component: ComponenteResultadosJuegos
    },
    {
        path: "**",
        component: ComponenteHome
    }

];
