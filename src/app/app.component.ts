import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'soulmatters.ro';
  
  constructor() { }

  ngOnInit(): void {
  // subscribe to router events
  }

  // onRouteChange(): void {
  //   const transition = document.createDocumentTransition();
  //   transition.start(() => updateTheDOMSomehow(data));
  // }

}
