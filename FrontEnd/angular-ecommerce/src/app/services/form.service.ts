import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  generateYears(): Observable<number[]> {
    let result: number[] = [];
    let startYear = new Date().getFullYear();

    for(let month=startYear; month<=startYear+10; ++month)
      result.push(month);

    return of(result);
  }

  generateMonths(startMonth: number): Observable<number[]> {
    let result: number[] = [];

    for(let month=startMonth; month<=12; ++month)
      result.push(month);

    return of(result);
  }
}
