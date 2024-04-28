import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Modify or log the outgoing request
        const modifiedReq = req.clone({
            withCredentials: true
        });
        // Here we get back an observable of the modified request
        return next.handle(modifiedReq);
        
        
        // This is how you can watch for events around the request
        // .pipe(
        //     tap((value) => {
        //         // Checks to see if the request was just sent off to the server
        //         if(value.type === HttpEventType.Sent){
        //             console.log('Request was sent to server')
        //         }
        //         // Checks to see request has gotten a response
        //         if(value.type === HttpEventType.Response){
        //             console.log('Got a response from the API', value)
        //         }
        //     })
        // )
    }
}
