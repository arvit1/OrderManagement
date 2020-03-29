import { WarehouseComponent } from './warehouse/warehouse.component';
import { StoreComponent } from './store/store.component';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';
import { RoleEnum } from './_models';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        // data: { roles: [RoleEnum.User] }
    },
    {
        path: 'store',
        component: StoreComponent,
        canActivate: [AuthGuard],
        data: { roles: [RoleEnum.Store] }
    },
    {
        path: 'warehouse',
        component: WarehouseComponent,
        canActivate: [AuthGuard],
        data: { roles: [RoleEnum.Warehouse] }
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [RoleEnum.Admin] }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
