import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MarkdownModule } from 'ngx-markdown';
import { CustomPaginator } from './home/CustomPaginatorConfiguration';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TermsComponent } from './terms/terms.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    SiteHeaderComponent,
    TermsComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MarkdownModule.forRoot(),
    MatPaginatorModule,
    MatToolbarModule

  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
