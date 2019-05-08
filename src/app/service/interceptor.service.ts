import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/do';
import { AlertService,  } from './alert.service';
import { SpinnerService  } from './spinner.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private _router:Router, private alertService: AlertService){

    }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      if(localStorage.getItem('token')){
          const duplicate = req.clone({ params: req.params.set('api_token', localStorage.getItem('token')) });
          return next.handle(duplicate).do((evt:HttpEvent<any>)=>{
              
        },((error:HttpErrorResponse) => {
          if(error instanceof HttpErrorResponse){
              if(error.status == 401){
                  localStorage.removeItem('token');
                  localStorage.clear();
                  //this._router.navigate(['login', { expire: 403 }]);
                  window.location.pathname = "/login;expire=403";
              }else{
                //localStorage.setItem('token-expire',"false");
              }
          }
        }));
      }else{
        return next.handle(req).do((evt:HttpEvent<any>)=>{
          /* TODO */
        },((error:any) => {

          // this.alertService.success(error.message, true);

        }));
      }
  }
}

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {

   private requests: HttpRequest<any>[] = [];
   constructor(private spinnerService: SpinnerService) { }

   removeRequest(req: HttpRequest<any>) {
       const i = this.requests.indexOf(req);
       if ( i >= 0) {
          this.requests.splice(i, 1);
       }
       this.spinnerService.isLoading.next(this.requests.length > 0);
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.spinnerService.isLoading.next(true);
    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        err => { this.removeRequest(req); observer.error(err); },
        () => { this.removeRequest(req); observer.complete(); });
        setTimeout(function() {
          this.removeRequest(req);
          subscription.unsubscribe();
       
       }.bind(this), 3000);
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}