import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { PricingModernComponent } from "../modern/modern.component";

@Component({
    styleUrls: ['./home.component.scss'],
    selector: 'landing-home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatIconModule, PricingModernComponent]
})
export class LandingHomeComponent implements OnInit {

    /**
     * Constructor
     */


    ngOnInit(): void {

    }
    constructor(
        private _router: Router,
        private _authService: AuthService,
    ) {
    }
}
