import { TYPE_QUESTION } from "@cbi/constants/index";
import {
  ItemQuizLevelI,
  optionQuestionI,
  QuestionsQuizLevelI,
  valuesOptionQuestionI,
} from "@cbi/services/cbi/cbi.interface";
export const customOptionQuestionOnChange = (
  el: optionQuestionI,
  itemChange: any,
  value: any
) => {
  let values_custom = el.values;
  if (el.type === TYPE_QUESTION.SINGLE_CHOICE) {
    values_custom = el.values.map((item_value: valuesOptionQuestionI) => {
      return {
        ...item_value,
        status_right_option_value: item_value.id === itemChange ? 1 : -1,
      };
    });
  } else if (
    el.type === TYPE_QUESTION.ENTER_ANSWER ||
    el.type === TYPE_QUESTION.UPLOAD_FILE
  ) {
    values_custom = el.values.map((item_value: valuesOptionQuestionI) => {
      return {
        ...item_value,
        status_right_option_value:
          item_value.id === itemChange
            ? value
            : item_value.status_right_option_value,
      };
    });
  } else if (el.type === TYPE_QUESTION.MULTI_CHOICE) {
    values_custom = el.values.map((item_value: valuesOptionQuestionI) => {
      return {
        ...item_value,
        status_right_option_value: value?.includes(item_value.id) ? 1 : -1,
      };
    });
  }
  return values_custom;
};

export const customOptionQuestion = (
  item_quiz: QuestionsQuizLevelI,
  isHasAnswer = false
) => {
  const options = item_quiz.options.map((item_option) => {
    let custom_values = item_option.values;
    if (item_option.answer?.length) {
      isHasAnswer = true;
    }
    if (item_option.type === TYPE_QUESTION.SINGLE_CHOICE) {
      const answers = item_option.answer && item_option.answer[0];
      if (item_option.answer?.length) {
        custom_values = custom_values.map((item_value) => {
          return {
            ...item_value,
            status_right_option_value:
              answers?.cbi_question_option_value_id === item_value.id ? 1 : -1,
          };
        });
      }
    } else if (item_option.type === TYPE_QUESTION.MULTI_CHOICE) {
      const answers = item_option.answer && item_option.answer;
      if (item_option.answer?.length) {
        custom_values = custom_values.map((item_value) => {
          return {
            ...item_value,
            status_right_option_value: answers?.some(
              (el) => el.cbi_question_option_value_id === item_value.id
            )
              ? 1
              : -1,
          };
        });
      }
    } else {
      const answers = item_option.answer && item_option.answer;
      if (item_option.answer?.length) {
        custom_values = custom_values.map((item_value) => {
          return {
            ...item_value,
            status_right_option_value:
              answers?.find(
                (el) => el.cbi_question_option_value_id === item_value.id
              )?.content_answer || "",
          };
        });
      }
    }
    return { ...item_option, values: custom_values };
  });
  return { options, isHasAnswer };
};
