import { defineStore } from "pinia";
import { nextTick } from "vue";
import { generateSentence } from "~/data/wordSample";
import  type{ AxiosResult, ProfileData, SettingData } from "~/lib/DataType";
import { getLocalData } from "~/lib/LocalStorageManager";
import ApiContent from "~/lib/api/ApiContents";

import ApiUser from "~/lib/api/ApiUser";

export const usePracticeLessonStore = defineStore("practiceLesson", {
  // store the state
  state: () => {
    return {
      isLoaded: false,
      lesson: "",
    };
  },

  // getters
  getters: {
    // doubleCount: (state) => state.count * 2,
  },

  // setters
  actions: {
    async updateLesson(lessonLength: number, isDummy: boolean) {


      // for practice it will generate dummy content
      if (isDummy) {
        const settings = getLocalData<SettingData>("setting-data");
        if (settings == null) {
          this.lesson = generateSentence(
            lessonLength,
            false,
            false,
            false,
            false
          );
        } else {
          this.lesson = generateSentence(
            lessonLength,
            settings.isPunctuationEnabled,
            settings.isCapitalEnabled,
            settings.isBracketEnabled,
            settings.isNumberEnabled
          );
        }
      } else {
        // generate fetch content from server
        const result = await ApiContent.getTypingContent(40);
        if (result.isOk) {
          this.lesson = result.data!!
        }
      }
    },

    async restartLesson() {
      const temp = this.lesson;
      this.lesson = "";
      await nextTick();
      this.lesson = temp;
    },
  },
});
