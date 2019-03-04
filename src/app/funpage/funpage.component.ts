import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from '../hacker-news.service';

@Component({
  selector: 'app-funpage',
  templateUrl: './funpage.component.html',
  styleUrls: ['./funpage.component.css']
})
export class FunpageComponent implements OnInit {

  currentPage: number = 1;

  news: Array<any> = [];
  pictures: Array<any> = [];
  gg:any = {'title': 'sine'};

  scrollCallback;

  constructor(private hackerNewsSerivce: HackerNewsService) {

    this.scrollCallback = this.getStories.bind(this);

   }

  getStories() {
    return this.hackerNewsSerivce.getLatestStories(this.currentPage).do(this.processData);
  }

  private processData = (news) => {
    this.currentPage++;
    this.news = this.news.concat(news.json());
  }

  ngOnInit() {
  }

}


