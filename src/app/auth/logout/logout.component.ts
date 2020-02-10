import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private dialog: MatDialogRef<LogoutComponent>
  ) { }

  ngOnInit() {
  }

  async onLogout(){
    await this.auth.signOut();
    this.dialog.close();
  }

}
