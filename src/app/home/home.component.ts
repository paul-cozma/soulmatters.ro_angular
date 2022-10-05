import { Component, OnInit } from '@angular/core';
// import card component from angular material
// import list of posts from content folder
import posts from '../../assets/content/data/page-1.json';
import config from '../../assets/content/config.json';
import {ActivatedRoute, Router} from '@angular/router';
import { Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts = posts;
  pageEvent: any;
  config = config;
  pageNumber = 1;
  constructor(private route: Router, private router: ActivatedRoute, private meta: Meta ) {
    const page = this.router.snapshot.queryParamMap.get('page');
    console.log(page)
    if (page) {
      this.pageNumber = parseInt(page)
      console.log('i change page number')
      this.changePage({pageIndex: Number(page)}, true)
    }
    this.meta.addTags([
      { name: 'description', content: 'Un blog personal. Soulmatters.ro' },
      { name: 'og:title', content: 'Soulmatters.ro' },
      { name: 'og:description', content: 'Un blog personal. Soulmatters.ro' }
    ]);
   }
  
  async changePage (e: any, firstLoad: boolean = false): Promise<void> {
    if(!firstLoad) {
      this.pageNumber = e.pageIndex;
    }
    console.log(e)

    console.count('how many times')
    const data = await fetch(`../../assets/content/data/page-${this.pageNumber}.json`);
    this.posts  = await data.json();
    // set page number as query param
    this.route.navigate([''], { queryParams: { page: this.pageNumber } });
  }
  ngOnInit(): void {
  }

}
