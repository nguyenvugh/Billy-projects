import dayjs from "dayjs";
import {
  AnswerCheck,
  DetailSubmitedValue,
  DetailSubmittedAnswer,
  SubmittedAnswer,
} from "src/submitted-answer/interfaces";
import { S3_IMG_URL } from "../constants/common.constant";
import _ from "lodash";

export function isInclude(compareValue?: string | number, comparedValue?: string | number) {
  return (compareValue + "")
    .trim()
    ?.toLowerCase()
    .includes((comparedValue + "").trim()?.toLowerCase() || "");
}

export function formatDate(date: string, format?: string) {
  return dayjs(date).format(format || "DD/MM/YYYY HH:mm");
}

export function getLang() {
  return localStorage.getItem("i18nextLng") || "en";
}

export function toS3Url(imgKey: string = "") {
  return imgKey ? `${S3_IMG_URL}/${imgKey}` : "";
}

export function checkExistAnswer(
  answerCheck: AnswerCheck[] = [],
  listAnswer: SubmittedAnswer[] = [],
  value: DetailSubmitedValue,
) {
  if (_.isEmpty(answerCheck) || _.isEmpty(listAnswer) || _.isEmpty(value)) {
    return false;
  }
  const idValue = _.get(value, "id", "");
  const curAnswer = _.find(listAnswer, (item) => item.cbi_question_option_value_id === idValue);
  const idAnswer = _.get(curAnswer, "id", "");
  const objExist = _.find(answerCheck, (item) => item.id === idAnswer);
  if (objExist) {
    return objExist;
  }
  return false;
}

export function calNumOfAnswers(data: DetailSubmittedAnswer[]) {
  let done = 0,
    notDone = 0;
  data.forEach((item) => {
    const questions = _.get(item, "questions", []);
    questions.forEach((question) => {
      const options = _.get(question, "options", []);
      let hasAnswer = false;
      options.forEach((option) => {
        if (!_.isEmpty(option.answers)) {
          hasAnswer = true;
        }
      });
      if (hasAnswer) {
        done++;
      } else {
        notDone++;
      }
    });
  });
  return { done, notDone };
}

export function calTotalScore(data: DetailSubmittedAnswer[]) {
  let total = 0;
  data.forEach((item) => {
    const questions = _.get(item, "questions", []);
    questions.forEach((question) => {
      const options = _.get(question, "options", []);
      options.forEach((option) => {
        if (!_.isEmpty(option.answers)) {
          option.answers.forEach((answer) => {
            total += Number(answer.score);
          });
        }
      });
    });
  });
  return total;
}
