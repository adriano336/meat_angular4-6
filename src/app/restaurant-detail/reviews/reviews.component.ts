import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Observable } from 'rxjs';
import { RestaurantsService } from "../../restaurants/restaurants.service";


@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews : any;
  constructor(private restaurantsService : RestaurantsService,
              private route : ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantsService
    .reviewsOfRestaurants(this.route.parent.snapshot.params['id']);
  }

}
