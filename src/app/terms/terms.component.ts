import { Component, OnInit } from '@angular/core';
import termeni from '../../assets/content/data/pages/termeni-si-conditii.json';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  termeni = termeni;
  constructor() { }

  ngOnInit(): void {
  }

}
