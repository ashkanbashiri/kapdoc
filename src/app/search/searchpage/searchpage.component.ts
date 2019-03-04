import { Component, Injectable, OnInit } from "@angular/core";
import {  HttpClient } from "@angular/common/http";
import {  FormControl} from "@angular/forms";
import 'rxjs/add/operator/map'
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from "rxjs/operators";
import { Observable } from 'rxjs';

class SearchItem {
  constructor(
    public track: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) {}
}

@Injectable()
export class SearchService {

  apiRoot: string = "https://itunes.apple.com/search";
  constructor(private http: HttpClient) {}
  search(term: string): Observable<SearchItem[]> {
    console.log('Searching for '+term);
    let apiURL = 'https://itunes.apple.com/search?term=${term}&media=music&limit=20';
    return this.http.get<any>(apiURL).pipe(
      map(res => {
        return res.results.map(item=> {
          return new SearchItem(
            item.trackName,
            item.artistName,
            item.trackViewUrl,
            item.artworkUrl30,
            item.artistId
          );
        });
      })
    );
  }
}

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})

export class SearchpageComponent implements OnInit {

  private loading: boolean = false;
  private results: Observable<SearchItem[]>;
  private searchField: FormControl;
  private searchTerm = "";

  constructor(private itunes: SearchService) {}

  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges.pipe(

      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => (this.loading = true)),
      switchMap(term => this.itunes.search(term)),
      tap(_ => (this.loading = false))
    );
  }

  doSearch() {
    this.itunes.search(this.searchTerm);
  }
}

