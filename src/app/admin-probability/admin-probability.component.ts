import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-probability',
  templateUrl: './admin-probability.component.html',
  styleUrls: ['./admin-probability.component.scss']
})
export class AdminProbabilityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getProbability(firstButton: any, secondButton:any): void {
    var firstBtnValue = firstButton.options[firstButton.selectedIndex].value;
    var secondButtonValue = secondButton.options[secondButton.selectedIndex].value;
    var percentage = document.getElementById("percentage");
    var clarifications = document.getElementById("clarifications");
    window.console.log(firstBtnValue + " " + secondButtonValue);
    percentage.innerHTML = "";
    var allTimeStats = [];
    allTimeStats = JSON.parse(localStorage.getItem("stats"));
    if (allTimeStats === null || allTimeStats === undefined || allTimeStats === []) {
      percentage.innerHTML = "Not enough data";
      return;
    }
    if (firstBtnValue == secondButtonValue) {
      percentage.innerHTML = "The values can't be the same";
      return;
    }
    var nrOfTimesBefore = 0;
    var nrOfTimesAfter = 0;
    allTimeStats.forEach(function (session) {
      var indexFirst;
      var indexSecond;
      for (var i = 0; i < session.length; i++) {
        if (session[i].btnId === firstBtnValue) {
          indexFirst = i;
          continue;
        }
        if (session[i].btnId === secondButtonValue) {
          indexSecond = i;
          continue;
        }
      }
      if (indexFirst !== undefined && indexSecond === undefined) {
        nrOfTimesBefore++;
        return;
      }
      if (indexFirst === undefined && indexSecond !== undefined) {
        nrOfTimesAfter++;
        return;
      }
      if (indexFirst !== undefined && indexSecond !== undefined) {
        if (indexFirst < indexSecond)
          nrOfTimesBefore++;
        else
          nrOfTimesAfter++;
        return;
      }
    });
    const percentageCalculated = (nrOfTimesBefore / (nrOfTimesBefore + nrOfTimesAfter)) * 100;
    percentage.innerHTML = "Button <strong>" + firstButton.options[firstButton.selectedIndex].text + "</strong> was clicked before <strong>"
      + secondButton.options[secondButton.selectedIndex].text + "</strong> on <strong>" + percentageCalculated + "</strong> of ocassions ("
      + nrOfTimesBefore + " of " + (nrOfTimesBefore + nrOfTimesAfter) + ")";
    window.console.log(allTimeStats);
    window.console.log(nrOfTimesBefore + " " + nrOfTimesAfter);
  }
}
