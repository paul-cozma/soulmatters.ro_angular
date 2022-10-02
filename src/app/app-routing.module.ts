import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
    // home route
    {
        path: '',
        component: HomeComponent,
       
    },
    {
        path: 'termeni-si-conditii',
        component: TermsComponent
    },
    {
        path: ':slug',
        component: PostComponent
    },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
