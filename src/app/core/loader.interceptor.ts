import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, combineLatest, timer } from 'rxjs';
import { LoaderService } from './loader.service';
import { map, finalize } from 'rxjs/Operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private loaderService: LoaderService) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);

        }
        //console.log(i, this.requests.length);
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);

        this.loaderService.isLoading.next(true);

        return Observable.create(observer => {
            const subscription =  combineLatest(timer(500),next.handle(req))
            .pipe(
                map(x => x[1]),
                finalize(() => ( this.loaderService.isLoading.next(false)))
              )
            .subscribe
                (
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    err => {
                        this.removeRequest(req); observer.error(err);
                    },
                    () => {
                        this.removeRequest(req); observer.complete();
                    });
            // teardown logic in case of cancelled requests
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}
