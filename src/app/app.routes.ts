import { Routes } from '@angular/router';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { BlogsComponent } from './components/blogs/blogs.component';

export const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blogs/:id', component: BlogDetailsComponent },
];
