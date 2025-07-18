import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { injectInfiniteQuery, injectQuery } from '@tanstack/angular-query-experimental';

interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubLabel {
  id: number;
  name: string;
  color: string;
  description?: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body?: string;
  state: 'open' | 'closed';
  user: GitHubUser;
  labels: GitHubLabel[];
  created_at: string;
  updated_at: string;
  html_url: string;
}

interface BlogPostsParams {
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private readonly githubApiUrl = 'https://api.github.com/repos';
  private readonly owner = 'facebook';
  private readonly repo = 'react';

  private issueNumber: number | null = null;

  setBlogPostId(issueNumber: number) {
    this.issueNumber = issueNumber;
  }

  blogPostsInfiniteQuery = injectInfiniteQuery(() => ({
    queryKey: ['blogPosts'],
    queryFn: ({ pageParam = 1 }) => firstValueFrom(this.getBlogPosts({ page: pageParam })),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    staleTime: 60 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  }));

  blogPostQuery = injectQuery(() => ({
    queryKey: ['blogPost', this.issueNumber],
    queryFn: () => firstValueFrom(this.getBlogPost(this.issueNumber!)),
    staleTime: 60 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!this.issueNumber,
  }));

  constructor(
    private http: HttpClient
  ) { }

  private getBlogPosts(params: BlogPostsParams = {}): Observable<GitHubIssue[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('per_page', '5');

    if (params.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }

    const url = `${this.githubApiUrl}/${this.owner}/${this.repo}/issues`;
    return this.http.get<GitHubIssue[]>(url, { params: httpParams });
  }

  private getBlogPost(issueNumber: number): Observable<GitHubIssue> {
    return this.http.get<GitHubIssue>(`${this.githubApiUrl}/${this.owner}/${this.repo}/issues/${issueNumber}`);
  }
}
