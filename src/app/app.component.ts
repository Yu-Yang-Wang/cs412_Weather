import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ps6';
  showData: boolean = false;
  dataMockFromBackend = {
    "success": true,
    "data": {
      "city": "Thodiyoor, Kerala",
      "current_weather": "Mostly Cloudy",
      "temp": "27",
      "expected_temp": "Day 32° • Night 26°",
      "insight_heading": "",
      "insight_description": "",
      "wind": " 5 km/h",
      "humidity": "88%",
      "visibility": "8.05 km",
      "uv_index": "0 of 11",
      "aqi": "34",
      "aqi_remark": "Good",
      "aqi_description": "Minimal impact.",
      "last_update": "06:35 IST",
      "bg_image": "https://s.w-x.co/WeatherImages_Web/WeatherImage_MostlyCloudy-day_3.jpg?crop=16:9&width=800&format=pjpg&auto=webp&quality=70"
    },
    "source": "api"
  }
  onBtnClick() {
    this.showData = true
  }
}
