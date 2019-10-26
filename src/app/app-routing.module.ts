import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGradeComponent } from './add-grade/add-grade.component';
import { AddStudyTermComponent } from './add-study-term/add-study-term.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { PredictionComponent } from './analysis/prediction/prediction.component';
import { WeightedGradeComponent } from './analysis/weighted-grade/weighted-grade.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpdateStudyTermComponent } from './update-study-term/update-study-term.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'add-study-term',
    component: AddStudyTermComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-study-term',
    component: UpdateStudyTermComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-grade',
    component: AddGradeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'analysis',
    component: AnalysisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'analysis/weighted-grade',
    component: WeightedGradeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'analysis/prediction',
    component: PredictionComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/sign-in' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
