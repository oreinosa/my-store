import { adminLinks } from './../auth/routes';
import { Component, OnInit } from '@angular/core';
import { Link } from '../shared/models/link.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  links: Link[] = [];
  menuShown = true;
  constructor() { }

  ngOnInit() {
    const adminLink = adminLinks.right.find(link => link.path === 'admin');
    if (adminLink) this.links = adminLink.children;
  }

}
