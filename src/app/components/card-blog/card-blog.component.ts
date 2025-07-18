import { Component, Input } from '@angular/core';
import { GitHubIssue } from '../../services/blogs.service';
import { RelativeTimePipe } from '../../pipes/relative-time.pipe';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-card-blog',
  imports: [RelativeTimePipe, MarkdownModule],
  templateUrl: './card-blog.component.html',
})
export class CardBlogComponent {
  @Input({ required: true }) post!: GitHubIssue;
  @Input() body = false;
}
