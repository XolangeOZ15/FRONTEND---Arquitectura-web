import { Routes } from '@angular/router';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';
import { CreaeditaalmacenComponent } from './components/almacen/creaeditaalmacen/creaeditaalmacen.component';
import { AlmacenComponent } from './components/almacen/almacen.component';
import { CreaeditaclasificacionComponent } from './components/clasificacion/creaeditaclasificacion/creaeditaclasificacion.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { segGuard } from './guard/seguridad.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'clasificaciones',
    component: ClasificacionComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaclasificacionComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaclasificacionComponent,
      },
    ],
    canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno     
  },
  {
    path: 'almacenes',
    component: AlmacenComponent,
    children: [
      {
        path: 'nuevo',
        component: CreaeditaalmacenComponent,
      },
      {
        path: 'ediciones/:id',
        component: CreaeditaalmacenComponent,
      },
    ],
    canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno     
  },
  {
    path: 'homes',
    component: HomeComponent,    
    canActivate:[segGuard]// solo construcciones, se debe agregar a cada uno 

  },

];
