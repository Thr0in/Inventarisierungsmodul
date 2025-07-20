import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Statistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private readonly url = `${environment.apiUrl}/statistics`;

  constructor(private readonly http: HttpClient) { }

  /**
   * Fetches statistics data from the backend API.
   * @returns An observable containing the statistics data.
   */
  getStatistics() {
    return this.http.get<Statistics>(this.url);
  }
}
