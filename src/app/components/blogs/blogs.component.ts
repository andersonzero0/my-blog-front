import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { BlogsService } from '../../services/blogs.service';
import { GitHubIssue } from '../../services/blogs.service';
import { CardBlogComponent } from '../card-blog/card-blog.component';
import { CreateInfiniteQueryResult, InfiniteData } from '@tanstack/angular-query-experimental';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-blogs',
  imports: [CardBlogComponent, RouterLink, LoadingComponent],
  templateUrl: './blogs.component.html',
  providers: [BlogsService],
})
export class BlogsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private readonly blogsService: BlogsService) {}

  blogPostsQuery: CreateInfiniteQueryResult<InfiniteData<GitHubIssue[], unknown>, Error> | null = null;
  private scrollListener?: () => void;

  ngOnInit() {
    this.blogPostsQuery = this.blogsService.blogPostsInfiniteQuery;
  }

  ngAfterViewInit() {
    this.setupInfiniteScroll();
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private setupInfiniteScroll() {
    this.scrollListener = () => {
      const threshold = 100; // pixels from bottom
      const position = window.innerHeight + window.scrollY;
      const height = document.documentElement.offsetHeight;

      if (position >= height - threshold) {
        this.loadMore();
      }
    };

    window.addEventListener('scroll', this.scrollListener);
  }

  loadMore() {
    if (this.blogPostsQuery?.hasNextPage() && !this.blogPostsQuery?.isFetchingNextPage()) {
      this.blogPostsQuery.fetchNextPage();
    }
  }

  get allPosts(): GitHubIssue[] {
    return this.blogPostsQuery?.data()?.pages.flat() || [];
  }
}