import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent  {

}
