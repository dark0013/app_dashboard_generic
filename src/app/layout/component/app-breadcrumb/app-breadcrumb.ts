import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    standalone: true,
    imports: [BreadcrumbModule],
    templateUrl: './app-breadcrumb.html',
    styleUrl: './app-breadcrumb.scss'
})


export class AppBreadcrumb  implements OnInit {

    title = '';

    items: MenuItem[] = [];

    home: MenuItem = {
        icon: 'pi pi-home',
        routerLink: '/'
    };

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {

        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.loadPageData();
            });

        this.loadPageData();
    }

    private loadPageData() {

        let route = this.activatedRoute.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        this.title =
            route.snapshot.data['title']
            || route.snapshot.data['breadcrumb']
            || '';

        this.items = this.buildBreadcrumb(this.activatedRoute.root);
    }

    private buildBreadcrumb(
        route: ActivatedRoute,
        url: string = '',
        breadcrumbs: MenuItem[] = []
    ): MenuItem[] {

        const children = route.children;

        if (!children.length) {
            return breadcrumbs;
        }

        for (const child of children) {

            const routeURL = child.snapshot.url
                .map(segment => segment.path)
                .join('/');

            if (routeURL) {
                url += `/${routeURL}`;
            }

            const breadcrumb = child.snapshot.data['breadcrumb'];

            if (breadcrumb) {
                breadcrumbs.push({
                    label: breadcrumb,
                    routerLink: url
                });
            }

            return this.buildBreadcrumb(
                child,
                url,
                breadcrumbs
            );
        }

        return breadcrumbs;
    }
}