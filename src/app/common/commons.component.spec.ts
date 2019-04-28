import { TestBed, async } from '@angular/core/testing';
import { CommonsComponent } from './commons.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CommonsService } from './shared/commons.service';

describe('Component: CommonsComponent', () => {
  it('should create an instance', () => {
    let component = new CommonsComponent(Router, ActivatedRoute, CommonsService);
    expect(component).toBeTruthy();
  });
});
