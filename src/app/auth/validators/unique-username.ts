import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator } from "@angular/forms";
import { map, catchError, of } from "rxjs";

import { AuthService } from "../auth.service";

@Injectable({ providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService){}

    validate = (control: AbstractControl) => {
        const { value } = control;

        return this.authService.usernameAvailable(value).pipe(
            map(value => {
                if(value.available){   
                    return null;
                } else {
                    return value;
                }
            }), catchError((err) => {
                if(err.error.username){
                    return of({ nonUniqueUsername: true });
                }else{
                    return of({ noConnection: true });
                }
            })
        )
    }
}
