import { Routes } from '@angular/router';
import { AddCityComponent } from './components/add-city/add-city.component';
import { AddGradeComponent } from './components/add-grade/add-grade.component';
import { AddcityformComponent } from './components/addcityform/addcityform.component';
import { CityComponent } from './components/city/city.component';
import { EditCityComponent } from './components/edit-city/edit-city.component';
import { EditGradeComponent } from './components/edit-grade/edit-grade.component';
import { GradeComponent } from './components/grade/grade.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"city",
        component:CityComponent,
        canActivate:[AuthGuardService]
    },
    {
        path:"addcity",
        component:AddcityformComponent,
        canActivate:[AuthGuardService]
    },
    {
        path:"editcity/:id",
        component:EditCityComponent,
        canActivate:[AuthGuardService]
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"requestreset",
        component:RequestResetComponent
    },
    {
        path:"resetpassword",
        component:ResetPasswordComponent
    }
    // ,
    // {
    //     path:"grade",
    //     component:GradeComponent
    // },
    // {
    //     path:"addgrade",
    //     component:AddGradeComponent
    // },
    // {
    //     path:"editgrade/:id",
    //     component:EditGradeComponent
    // },
    // {
    //     path:"editcity/:id",
    //     component:TestComponent
    // }

];
