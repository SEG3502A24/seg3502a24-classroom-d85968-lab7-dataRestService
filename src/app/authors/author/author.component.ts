import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Author} from '../model/author';
import {AuthorsService} from '../service/authors.service';
import {Subscription} from "rxjs";
import { BookNamesPipe } from '../../pipes/booknames.pipe';
import { BiodataPipe } from 'src/app/pipes/biodata.pipe';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css'],
    standalone: true,
    imports: [NgIf, BookNamesPipe, BiodataPipe ]
})
export class AuthorComponent implements OnInit, OnDestroy {
  selectedAuthor!: Author | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authorsService: AuthorsService = inject(AuthorsService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.authorsService.getAuthor(id).subscribe({
        next: (data: Author) => {
          this.selectedAuthor = data;
        },
        error: (_: any) => {
          this.selectedAuthor = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}