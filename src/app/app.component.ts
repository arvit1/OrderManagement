import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, RoleEnum } from './_models';

// tslint:disable-next-line:component-selector
@Component({selector: 'app',
            templateUrl: 'app.component.html'
})
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.roles[0].name === RoleEnum.ROOTLESS;
    }

    get isStore() {
        return this.currentUser && this.currentUser.roles[0].name === RoleEnum.CURIOUS;
    }

    get isWarehouse() {
        return this.currentUser && this.currentUser.roles[0].name === RoleEnum.EXPERT;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
