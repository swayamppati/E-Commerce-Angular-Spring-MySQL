import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() keywordEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  getSearchInput(keyword: string) {
    /**
     * Here the MAGIC happens with @Output(), value is passed to parent, now lets catch it.
     */
    this.keywordEmitter.emit(keyword);
  }
}
