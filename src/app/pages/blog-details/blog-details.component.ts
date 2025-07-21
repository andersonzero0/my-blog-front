import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardBlogComponent } from '../../components/card-blog/card-blog.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogsService, GitHubIssue } from '../../services/blogs.service';
import { CreateQueryResult } from '@tanstack/angular-query-experimental';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-blog-details',
  imports: [CardBlogComponent, RouterLink, LoadingComponent],
  templateUrl: './blog-details.component.html',
  providers: [BlogsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogDetailsComponent {
  id: number | null = null;
  blogPostQuery: CreateQueryResult<GitHubIssue, Error> | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private blogService: BlogsService) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(this.id)) {
      this.router.navigate(['/blogs']);
    }

    this.blogService.setBlogPostId(this.id);

    this.blogPostQuery = this.blogService.blogPostQuery;
  }
}
