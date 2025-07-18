import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { localizePrice } from "../../app.component";
import { CardComponent } from "../../components/card/card.component";
import { StatisticsService } from "../../services/statistics.service";

/**
 * Interface representing user order statistics.
 */
interface UserOrder {
  name: string;
  quantity: number;
  orderPrice: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  /**
   * Total number of orders across all users.
   */
  totalOrders: number | null = null;

  /**
   * Total price value of all orders combined.
   */
  totalPrice: string | null = null;

  /**
   * Array containing the top 5 users with highest order values, sorted by price descending.
   */
  userOrders: UserOrder[] = [];

  /**
   * Array of colors used for the pie chart segments and legend.
   */
  legendColors: string[] = ['#001f4d', '#1f3d7a', '#4a6bb3', '#7c98d4', '#aac4e7'];

  constructor(private statisticsService: StatisticsService) { }

  /**
   * Angular lifecycle hook.
   * Initializes the component by fetching statistics data.
   */
  ngOnInit(): void {
    this.fetchStatistics();
  }

  /**
   * Fetches statistics data from the backend API.
   * Retrieves total orders, total price, and user order data.
   * Sorts users by order price in descending order and takes the top 5.
   * Renders the pie chart after successful data retrieval.
   */
  fetchStatistics(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (stats) => {
        this.totalOrders = stats.totalOrders;
        this.totalPrice = localizePrice(stats.totalPrice);

        // Sort by orderPrice in descending order and take top 5
        this.userOrders = stats.names
          .sort((a, b) => b.orderPrice - a.orderPrice)
          .slice(0, 5);

        this.renderChart();

      },
      error: (err) => {
        console.error('Failed to fetch stats:', err);
        this.totalOrders = 0;
        this.totalPrice = localizePrice(0);
        this.userOrders = [];
      }
    });
  }

  localizePrice(price: number): string {
    return localizePrice(price);
  }

  /**
   * Renders the pie chart using Chart.js.
   * Accesses the canvas via ViewChild
   * Creates a pie chart showing the distribution of order values among the top 5 users.
   * Destroys any existing chart instance before creating a new one.
   * Uses custom colors from legendColors array and disables the default legend.
   */
  @ViewChild('pieChart') pieChartRef!: ElementRef<HTMLCanvasElement>;
  renderChart(): void {
    if (!this.pieChartRef) return;

    const canvas = this.pieChartRef.nativeElement;

    const existingChart = Chart.getChart(canvas.id);
    if (existingChart) {
      existingChart.destroy();
    }

    const data = this.userOrders.map(u => u.orderPrice);
    const labels = this.userOrders.map(u => u.name);

    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: this.legendColors.slice(0, this.userOrders.length)
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
