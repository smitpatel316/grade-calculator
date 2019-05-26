import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AddStudyTermComponent } from './add-study-term/add-study-term.component';
import { UpdateStudyTermComponent } from './update-study-term/update-study-term.component';
import { AddGradeComponent } from './add-grade/add-grade.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { WeightedGradeComponent } from './analysis/weighted-grade/weighted-grade.component';
import { PredictionComponent } from './analysis/prediction/prediction.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
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
