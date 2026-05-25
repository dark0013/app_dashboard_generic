import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget/statswidget';
import { RecentSalesWidget } from './components/recentsaleswidget/recentsaleswidget';
import { BestSellingWidget } from './components/bestsellingwidget/bestsellingwidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget/revenuestreamwidget';
import { NotificationsWidget } from './components/notificationswidget/notificationswidget';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
    standalone: true
})
export class Dashboard { }
