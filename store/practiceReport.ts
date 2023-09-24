import { defineStore } from "pinia";
import { AxiosResult, ProfileData, TypingReport } from "~/lib/DataType";

import ApiUser from "~/lib/api/ApiUser";

export const usePracticeReportStore = defineStore("practiceReport", {
  // store the state
  state: () => {
    const previousTypingReport: TypingReport = {
      timeTaken: 0,
      totalWords: 0,
      totalCharacter: 0,
      totalError: 10,
      keyReport: [],
      averageWPM: 10,
      highestWPM: 0,
    };

    const currentTypingReport: TypingReport = {
      timeTaken: 0,
      totalWords: 0,
      totalCharacter: 0,
      totalError: 0,
      keyReport: [],
      averageWPM: 0,
      highestWPM: 0,
    };

    const typingSpeedPerformance = "+0%";
    const typingAccuracyPerformance = "+0%";
    var keysMaxValue = 0;
    var keysMinValue = 0;

    return {
      isLoaded: false,
      previousTypingReport,
      currentTypingReport,
      typingSpeedPerformance,
      typingAccuracyPerformance,
      keysMaxValue,
      keysMinValue,
    };
  },

  // getters
  getters: {
    // doubleCount: (state) => state.count * 2,
  },

  // setters
  actions: {
    updateTypingReport(reportData: TypingReport) {
      // calculating maxValue and minValue for key highlight (green and red the color on the most typed keys)
      reportData.keyReport.forEach((data) => {
        const change = data.correctCount - data.errorCount;
        if (change > this.keysMaxValue) {
          this.keysMaxValue = change;
        } else if (change < this.keysMinValue) {
          this.keysMinValue = change;
        }
      });

      // update key report
      this.currentTypingReport.keyReport = reportData.keyReport;

      // calculating speed change percentage
      this.currentTypingReport.averageWPM = reportData.averageWPM;

      const speedChange = Math.round(
        ((this.previousTypingReport.averageWPM -
          this.currentTypingReport.averageWPM) /
          this.previousTypingReport.averageWPM) *
          100
      );
      if (speedChange <= 0) {
        this.typingSpeedPerformance = `+${Math.abs(speedChange)}%`;
      } else {
        this.typingSpeedPerformance = `-${speedChange}%`;
      }

      // calculating typing accuracy percentage
      this.currentTypingReport.totalError = reportData.totalError;

      const accuracyChange = Math.round(
        ((this.previousTypingReport.totalError -
          this.currentTypingReport.totalError) /
          this.previousTypingReport.totalError) *
          100
      );
      if (accuracyChange >= 0) {
        this.typingAccuracyPerformance = `+${accuracyChange}%`;
      } else {
        this.typingAccuracyPerformance = `${accuracyChange}%`;
      }

      // console.log(reportData)
    },
  },
});
