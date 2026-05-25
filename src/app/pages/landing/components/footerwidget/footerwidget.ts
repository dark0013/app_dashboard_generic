import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    imports: [RouterModule],
    templateUrl: './footerwidget.html',
    styleUrls: ['./footerwidget.css'],
    standalone: true
})
export class FooterWidget {
    constructor(public router: Router) {}
}
