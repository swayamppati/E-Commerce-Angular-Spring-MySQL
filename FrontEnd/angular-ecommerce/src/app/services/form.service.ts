import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  generateMonths(): Observable<number[]> {
    let result: number[] = [];

    for(let month=1; month<=12; ++month)
      result.push(month);

    return of(result);
  }

  generateYears(): Observable<number[]> {
    let result: number[] = [];
    let startYear = new Date().getFullYear();

    for(let month=startYear; month<=startYear+10; ++month)
      result.push(month);

    return of(result);
  }
}
