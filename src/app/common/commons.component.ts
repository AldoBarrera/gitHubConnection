import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CommonsService } from './shared/commons.service';

@Component({
  selector: 'app-data',
  template: ''
})
export class CommonsComponent implements OnInit {

  form: FormGroup;
  title: string;
  protected response: HttpResponse<object>;
  protected data: any ;
  protected link: string;
  protected id: string;
  protected currentPage:number ;
  protected moduleName: string;
  constructor(    
    protected router: Router,
    protected route: ActivatedRoute,
    protected commonService: CommonsService
  ) {
    
  }

  ngOnInit() {
    this.data = [];
    this.commonService.reset();
    this.getData();
  }

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

  ngPopulateData(id) {
    this.commonService.getDataByIdAsObserver(id)
        .subscribe(
          data => {this.link = data.headers.get('link'); this.responseData(data.body)},
          response => {
            if (response.status == 404) {
              this.router.navigate(['NotFound']);
            }
          });
  }

  responseData(data:any) {
    this.getPagesURL();
    this.data = data
  }

  getPagesURL() {
    let links = this.link?this.link.replace(/ /g, "").split(','):[];
    for(let link of links) {
      let value = link.split(';');
      let rel = value[1].split('=')[1];
      rel = rel.substring(1, rel.length-1);
      this.commonService[rel] = value[0].substring(1, value[0].length-1);
    }
  }

  getNextData() {
    if(this.hasNextPage()) {
      this.commonService.setNext();
      this.getData();
    }
  }

  hasNextPage():boolean {
    return this.link?this.link.includes('rel="next"'):false
  }

  hasPrevPage():boolean {
    return this.link?this.link.includes('rel="prev"'):false
  }

  getPrevData() {    
    if(this.hasPrevPage()) {
      this.commonService.setPrev();
      this.getData();
    }
  }

  getCurrentPage():number {    
    return this.commonService.page;    
  }

  ngGetTitle(id) {
    return id ? 'Profile ' + this.moduleName : 'New ' + this.moduleName;
  }

}
