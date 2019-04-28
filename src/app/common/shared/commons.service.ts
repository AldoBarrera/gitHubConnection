import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CommonsService {

  protected baseUrl;
  protected paginationUrl;  
  public page = 1;
  private per_page = 32;
  protected next: string;
  protected prev: string;
  protected last: string;
  constructor(protected http: HttpClient) { 

  }

  /**
   * Service to call to users and repositories.
   * @param id - id the github user
   */
  getDataByIdAsObserver(id: number): Observable<HttpResponse<object>> {
    
    let params = new HttpParams()
    .set('per_page', this.per_page.toString())
    .set('page', this.page.toString());
    let url = id?`${this.baseUrl}/${id}/repos`:`${this.baseUrl}`
    if(!id) {
      params = new HttpParams()
      .set('per_page', this.per_page.toString())
      url = this.paginationUrl?this.paginationUrl:url;    
    }   
    return this.http.get<HttpResponse<object>>(url, {params,observe: 'response'}).pipe(
      tap(_ => this.log(`fetched data id=${id}`)),
      catchError(this.handleError<HttpResponse<object>>(`getData id=${id}`))
    );
  }

  /**
  * Set the page to next page.
  */
  setNext(){
    this.page = this.page + 1;
    this.paginationUrl=this.next;
  }

  /**
  * Set the page count to previus page.
  */
  setPrev(){
    this.page = this.page - 1;
    this.paginationUrl=this.prev;
  }

  /**
  * Set the page count to previus page.
  */
  setCurrent(current: number){
    this.page = current?current:1;
  }

  getCurrent():number{
    return this.page;
  }

  /**
  * Reset the page count when the page is refreshed.
  */
  reset(){
    this.page = 1;
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /**
   * Display the meessage in the console
   * @param message - message of the operation
   */
  private log(message: string) {
    console.log(`log: ${message}`);
  }
}

