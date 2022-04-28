import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/Operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

/**
 *
 */
constructor(private router : Router) {}

    // this adds the JWT token to all valid page requests
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(localStorage.getItem('token') != null)
        {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization','Bearer '+ localStorage.getItem('token'))
            })
            return next.handle(clonedReq).pipe(
                tap(

                    succ => {
                        
                    },
                    err => {

                        if(err.status == 401)
                        {
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');
                        }
                        else if(err.status == 403)
                        {
                            this.router.navigateByUrl('/forbidden');
                        }
                    },
                )
            );
        }
        else{
            return next.handle(req.clone());
        }
    }

}