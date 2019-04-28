import {
  async, ComponentFixture, fakeAsync, inject, TestBed, tick
} from '@angular/core/testing';
import { UsersDetailComponent } from './users-detail.component';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { RouterModule }  from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import {
  ActivatedRoute, ActivatedRouteStub, asyncData, click, newEvent
} from '../../../../../testing';

let component: UsersDetailComponent;
let fixture: ComponentFixture<UsersDetailComponent>;

//Create the component for testing
function createComponent() {
  fixture = TestBed.createComponent(UsersDetailComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
  });
}

//Create the router spy
function createRouterSpy() {
  return jasmine.createSpyObj('Router', ['navigate']);
}

//mock the service
class UsersServiceSpy {
	next:string;
	prev:string;
	current:number;
	page : number = 4;
	testData: any = {
		body: [
			{name:"User for unit test", 
			description:"description", 
			forks:"6",
			open_issues:"1"
			}],
		headers: {
			get:function()
				{return "<https://api.github.com/user/1/repos?per_page=20&page=2>; rel=\"next\","+
						" <https://api.github.com/user/1/repos?per_page=20&page=4>; rel=\"last\""}}};
	getDataByIdAsObserver = jasmine.createSpy('getDataByIdAsObserver').and.callFake(
	  () => asyncData(Object.assign({}, this.testData))
	);		
	reset : any = jasmine.createSpy('reset');
	getCurrent : any =  function(){return 45};
	setCurrent: any = jasmine.createSpy('setCurrent');
}

describe('Component: UsersDetailComponent', () => {

	let usersServiceSpy: UsersServiceSpy;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UsersDetailComponent],
			imports: [RouterModule.forRoot([]), HttpClientTestingModule]
			})
			.overrideComponent(UsersDetailComponent, {
			  set: {
				providers: [
				  { provide: UsersService, useClass: UsersServiceSpy }
				]
			  }
			})
			.compileComponents();
    }));
	
	beforeEach(() => {
		createComponent();
		usersServiceSpy = fixture.debugElement.injector.get(UsersService) as any;
    });	
	
	it('should create an instance of users component', () => {
		expect(component).toBeTruthy();
	});
  
	it('should build the link header', () => {
		component.setLinks("<https://api.github.com/user/1/repos?per_page=20&page=2>; rel=\"next\", <https://api.github.com/user/1/repos?per_page=20&page=4>; rel=\"last\"")
		component.getPagesURL();
		expect(usersServiceSpy.next).toBe('https://api.github.com/user/1/repos?per_page=20&page=2');
	});
  
	it('should display the elements in the respond', fakeAsync(() => {
		component.getData();
		tick();    
		expect(component.data.length).toEqual(1);
	}));
  
    it('should get the link from the response', fakeAsync(() => {
		component.getData();
		tick();
		expect(component.getLinks()).toEqual("<https://api.github.com/user/1/repos?per_page=20&page=2>; rel=\"next\","+
							" <https://api.github.com/user/1/repos?per_page=20&page=4>; rel=\"last\"");
	}));  
  
	it('should have called `getData`', () => {
		expect(usersServiceSpy.getDataByIdAsObserver.calls.count()).toBe(1, 'getData called once');
	});
  
	it('should get the current page from service', () => {
		expect(component.getCurrentPage()).toBe(4);
	});
	
	it('should verify if there is a prev page using the link in the header', fakeAsync(() => {
		component.getData();
		tick();
		expect(component.hasPrevPage()).toBe(false);
	}));
	
	it('should verify if there is a next page using the link in the header', fakeAsync(() => {
		component.getData();
		tick();
		expect(component.hasNextPage()).toBe(true);
	}));
	
	it('should get data should not call to the setCurrent', fakeAsync(() => {
		component.getData();
		tick();    
		expect(usersServiceSpy.setCurrent.calls.count()).toBe(0, 'getData not called');
	}));
	
	it('should get data should not call to the setCurrent', fakeAsync(() => {

		expect(component.ngGetTitle("test")).toBe('Profile users');		
	}));  
});
