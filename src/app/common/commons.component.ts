import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CommonsService } from './shared/commons.service';

@Component({
  selector: 'app-data',
  template: ''
})
export class CommonsComponent implements OnInit {

  title: string;
  protected response: HttpResponse<object>;
  public data: any ;
  private link: string;
  protected id: string;
  public currentPage:number ;
  protected moduleName: string;
  
  constructor(
    protected route: ActivatedRoute,
    protected commonService: CommonsService
  ) 
  {
    
  }

  ngOnInit() {
    this.data = [];
    this.commonService.reset();
    this.getData();
  }

  /**
   * Gets data from the ngPopulateData also this sets
   * the current page if the is in the profile page.
   */
  getData(){
    var id = this.route.params.subscribe(params => {
      this.id = params['id'];    
      if (!this.id) {
        this.ngPopulateData(null)
      }
      else {        
        this.commonService.setCurrent(parseInt(params['page'], 10));   
        this.currentPage = this.commonService.getCurrent();
        this.title = this.ngGetTitle(this.id);
        this.ngPopulateData(this.id)
      }     
    });
  }

  /**
   * Gets data from the core service and sets the link sent by github api 
   * also this call to responseData to be override in the childs
   * @param id - id the github user
   */
  ngPopulateData(id) {
    this.commonService.getDataByIdAsObserver(id)
        .subscribe(
          data => {  this.link = data.headers.get('link');this.responseData(data.body)}
		  );
  }

  /**
   * This method should be override in the child this is the called after populate the data 
   * by default this build the paginations URL and sets the this.data with the git hub api values
   * @param data - github api data response 
   */
  responseData(data:any) {
    this.getPagesURL();
    this.data = data
	
  }

  /**
   * Parse Information about pagination this data is provided in the Link header
   * this is necessary executed in the child due to github documentation
   * "rely on these link relations provided to you. Don't try to guess or construct your own URL."
   */
  getPagesURL() {	  
    let links = this.link?this.link.replace(/ /g, "").split(','):[];	
    for(let link of links) {
      let value = link.split(';');
      let rel = value[1].split('=')[1];
      rel = rel.substring(1, rel.length-1);
      this.commonService[rel] = value[0].substring(1, value[0].length-1);
    }	
  }

  /**
   * Verifies if there is a next page
   * @return - returns true if there is a next page otherwise false 
  */
  hasNextPage():boolean {
    return this.link?this.link.includes('rel="next"'):false
  }

  /**
   * Verifies if there is a prev page
   * @return - returns true if there is a prev page otherwise false 
  */
  hasPrevPage():boolean {
    return this.link?this.link.includes('rel="prev"'):false
  }

  /**
   * Sets the values and gets the data for the prev page
   */
  getPrevData() {    
    if(this.hasPrevPage()) {
      this.commonService.setPrev();
      this.getData();
    }
  }
  
  /**
   * Sets the values and gets the data for the next page
   */
  getNextData() {
    if(this.hasNextPage()) {
      this.commonService.setNext();
      this.getData();
    }
  }

  /**
   * Gets the current page number.
   * @return - returns a number indicate the current page. 
   */
  getCurrentPage():number {    
    return this.commonService.page;    
  }
  
  /**
   * Gets the link value.
   * @return - returns link. 
   */
  getLinks():string {    
    return this.link;    
  }
  
   /**
   * Sets the link value.
   * @return - returns link. 
   */
  setLinks(link:string) {    
    this.link = link;    
  }

  /**
   * Sets the title.
   * @return - returns a string title value. 
   */
  ngGetTitle(id): string {
    return id ? 'Profile ' + this.moduleName : 'New ' + this.moduleName;
  }

}
