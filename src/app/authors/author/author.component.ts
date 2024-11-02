import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Author } from '../model/author';
import { AuthorService } from '../service/author.service';
import {Subscription} from "rxjs";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [NgIf],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css'
})
export class AuthorComponent {
  submittedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorsService: AuthorService = inject(AuthorService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorsService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.submittedAuthor = data;
        },
        error: (_: any) => {
          this.submittedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
