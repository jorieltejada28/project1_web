import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { SigninService } from '../../services/signin.service';
import { SidebarService } from '../../services/sidebar.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, SidebarComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent  {
  private signinService = inject(SigninService);
  public sidebarService = inject(SidebarService);

  get session(): boolean {
    return this.signinService.isLoggedIn;
  }
}
