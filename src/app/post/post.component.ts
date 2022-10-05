import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Meta } from '@angular/platform-browser';  

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  // get the slug from the url
  // get the post from the slug
  // display the post
  slug = ''
  post = {} as Post;
  constructor(private route: ActivatedRoute, private meta: Meta) { 

  }
  formatDate(date: string): string {
    const d = new Date(date);
    // return in format month as word  day in number  YYYY to locale
    return d.toLocaleDateString('ro-RO', {month: 'long', day: 'numeric', year: 'numeric'});
  }

  async ngOnInit(): Promise<void> {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    if(this.slug !== '') {
     this.post = await import(`../../assets/content/data/article/${this.slug}.json`);
    }
    this.addMetaTags(this.post.excerpt, this.post.title, this.post.slug);
  }
  addMetaTags(description: string, title: string, slug: string) {
    // add meta tags
    this.meta.addTags([
      { name: 'description', content: description },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: `assets/content/images/${slug}.jpeg` },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `assets/content/images/${slug}.jpeg` },

    ]); 
  }

}

interface Post {
  title: string;
  content: string;
  slug: string;
  date: string;
  article: string;
  excerpt: string;
}