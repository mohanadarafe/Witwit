import{Injectable,Injector} from '@angular/core';
import{HttpInterceptor} from '@angular/common/http';
import {AuthService} from 'src/app/shared/services/auth.service';



@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

    constructor(private injector: Injector){

    }

    intercept(req,next){
        let authService = this.injector.get(AuthService)
        let tokenizeReq = req.clone({
            setHeaders:{
                Authorization: `Bearer ${authService.getToken()}`
            }
        })
        return next.handle(tokenizeReq)
    }
}