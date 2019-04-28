import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import {default as config} from '../config/config.json';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CommonsService {

  protected baseUrl;
  protected paginationUrl;  
  public page = config["users"].component.pagebydefault;
  private per_page = config["users"].component.maxpagecards;
  protected next: string;
  protected prev: string;
  protected last: string;
  constructor(protected http: HttpClient) { 

  }

  /**
   * Service to call to users and repositories.
   * @param id - id the github user
   */
  getDataByIdAsObserver(id: string): Observable<HttpResponse<object>> {
    
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
  * Set the page count to current page.
  */
  setCurrent(current: number){
    this.page = current?current:config["users"].component.pagebydefault;
  }

  /**
  * gets the current page number.
  * @return - returns the current page number.
  */
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

