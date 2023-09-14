import { defineStore } from "pinia";
import { generateSentence } from "~/data/wordSample";
import { AxiosResult, ProfileData, SettingData } from "~/lib/DataType";
import { getLocalData } from "~/lib/LocalStorageManager";

import ApiUser from "~/lib/api/ApiUser";

export const usePracticeLessonStore = defineStore("practiceLesson", {
  // store the state
  state: () => {
    return {
      isLoaded: false,
      lesson: ""
    };
  },

  // getters
  getters: {
    // doubleCount: (state) => state.count * 2,
  },

  // setters
  actions: {
    updateLesson(lessonLength: number) {
      const settings = getLocalData<SettingData>("setting-data");
      if (settings == null) {
        this.lesson = generateSentence(lessonLength, false, false, false, false);
      } else {
        this.lesson = generateSentence(
          lessonLength,
          settings.isPunctuationEnabled,
          settings.isCapitalEnabled,
          settings.isBracketEnabled,
          settings.isNumberEnabled
        );
      }
    },

    async restartLesson(){
      const temp = this.lesson
      this.lesson = ""
      await nextTick()
      this.lesson = temp

    }
  },
});
