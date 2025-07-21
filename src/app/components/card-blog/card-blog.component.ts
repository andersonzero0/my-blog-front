import { Component, Input } from '@angular/core';
import { GitHubIssue } from '../../services/blogs.service';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { MarkdownModule } from 'ngx-markdown';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-blog',
  imports: [RelativeTimePipe, MarkdownModule, RouterLink],
  templateUrl: './card-blog.component.html',
})
export class CardBlogComponent {
  @Input({ required: true }) post!: GitHubIssue;
  @Input() body = false;

  getLightColor(hexColor: string): string {
    const color = hexColor.replace('#', '');
    
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    
    const lightR = Math.min(255, Math.floor(r + (255 - r) * 0.7));
    const lightG = Math.min(255, Math.floor(g + (255 - g) * 0.7));
    const lightB = Math.min(255, Math.floor(b + (255 - b) * 0.7));
    
    return `rgb(${lightR}, ${lightG}, ${lightB})`;
  }
}
