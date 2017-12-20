import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private retain = false;

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.retain) {
                    // only keep for a single location change
                    this.retain = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, retain = false) {
        this.alert(message, 'success', retain);
    }

    error(message: string, retain = false) {
      this.alert(message, 'danger', retain);
    }

    alert(message: string, type: string = 'info', retain: boolean = false) {
        this.retain = retain;
        this.subject.next({ type: type, text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
