import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'my-blog-front';
}
