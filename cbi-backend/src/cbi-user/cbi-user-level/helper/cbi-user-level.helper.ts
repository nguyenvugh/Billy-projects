import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { CbiQuestionOptionTypeEnum } from '../../../cbi/cbi-question-option/constant';
import { GetCbiLevelGroupFullQuestionsResultDto } from '../../../cbi/cbi-level-group/admin/dto/response/get-cbi-level-group-full-questions-result.dto';
import { SubmitOneCbiUserQuestionAnswerDto } from '../../cbi-user-question-answer/user/dto/request/submit-one-cbi-user-question-answer.dto';
import { CbiUserQuestionAnswerEntity } from '../../cbi-user-question-answer/entity/cbi-user-question-answer.entity';
import { ConfirmScoreOneCbiUserQuestionAnswerDto } from '../../cbi-user-question-answer/admin/dto/request/confirm-score-one-cbi-user-question-answer.dto';
import { CbiLevelEntity } from '../../../cbi/cbi-level/entity/cbi-level.entity';
import { CbiUserLevelEntity } from '../entity/cbi-user-level.entity';
import { GetCbiQuestionResultDto } from '../../../cbi/cbi-question/admin/dto/response/get-cbi-question-result.dto';
import { GetCbiQuestionOptionResultDto } from '../../../cbi/cbi-question-option/admin/dto/response/get-cbi-question-option-result.dto';
import { GetCbiQuestionOptionValueResultDto } from '../../../cbi/cbi-question-option-value/admin/dto/response/get-cbi-question-option-value-result.dto';
import { generateMapDataWithKeyFieldPair } from '../../../common/utils';

export const validateUserCanSubmitOneCbiLevelAnswer = (
  cbiLevelsInCbi: CbiLevelEntity[],
  cbiUserLevelsSubmitted: CbiUserLevelEntity[],
  cbiLevelIdNeedValidate: any,
) => {
  if (!cbiLevelsInCbi.length || !cbiLevelIdNeedValidate) {
    return false;
  }
  const mapCbiLevelsInCbiById = generateMapDataWithKeyFieldPair(
    'id',
    '',
    cbiLevelsInCbi,
  );
  const mapCbiLevelsInCbiByLevel = generateMapDataWithKeyFieldPair(
    'level',
    '',
    cbiLevelsInCbi,
  );
  const mapCbiUserLevelsSubmittedByCbiLevelId = generateMapDataWithKeyFieldPair(
    'cbi_level_id',
    '',
    cbiUserLevelsSubmitted,
  );
  // Validate cbi level not exists
  if (false == mapCbiLevelsInCbiById.hasOwnProperty(cbiLevelIdNeedValidate)) {
    return false;
  }
  // Validate cbi level submitted
  if (
    true ==
    mapCbiUserLevelsSubmittedByCbiLevelId.hasOwnProperty(cbiLevelIdNeedValidate)
  ) {
    const cbiUserLevelSubmitted: CbiUserLevelEntity =
      mapCbiUserLevelsSubmittedByCbiLevelId[cbiLevelIdNeedValidate];
    if (BooleanStatusEnum.TRUE == cbiUserLevelSubmitted.status_finish) {
      return false;
    }
  }
  // Get level of cbi level need validate
  const cbiLevelNeedValidate: CbiLevelEntity =
    mapCbiLevelsInCbiById[cbiLevelIdNeedValidate];
  const levelOfCbiLevelNeedValidate = cbiLevelNeedValidate.level;
  if (1 < levelOfCbiLevelNeedValidate) {
    const prevLevelOfCbiLevelNeedValidate = levelOfCbiLevelNeedValidate - 1;
    // Validate previous level not exists
    if (
      false ==
      mapCbiLevelsInCbiByLevel.hasOwnProperty(prevLevelOfCbiLevelNeedValidate)
    ) {
      return false;
    }
    const prevCbiLevelOfCbiLevelNeedValidate: CbiLevelEntity =
      mapCbiLevelsInCbiByLevel[prevLevelOfCbiLevelNeedValidate];
    // Validate previous cbi level not submit
    if (
      false ==
      mapCbiUserLevelsSubmittedByCbiLevelId.hasOwnProperty(
        prevCbiLevelOfCbiLevelNeedValidate.id,
      )
    ) {
      return false;
    }
    const preCbiUserLevelSubmitted: CbiUserLevelEntity =
      mapCbiUserLevelsSubmittedByCbiLevelId[
        prevCbiLevelOfCbiLevelNeedValidate.id
      ];
    if (BooleanStatusEnum.FALSE == preCbiUserLevelSubmitted.status_finish) {
      return false;
    }
  }

  // All is ok
  return true;
};

export const validateDataUserSubmitOneCbiLevelAnswer = (
  cbiLevelGroups: GetCbiLevelGroupFullQuestionsResultDto[],
  dataQuestionsAnswerSubmit: SubmitOneCbiUserQuestionAnswerDto[],
) => {
  if (!cbiLevelGroups.length || !dataQuestionsAnswerSubmit.length) {
    return false;
  }

  let cbiQuestions: GetCbiQuestionResultDto[] = [];
  for (const group of cbiLevelGroups) {
    cbiQuestions = [...cbiQuestions, ...group.questions];
  }
  const mapCbiQuestionsById = generateMapDataWithKeyFieldPair(
    'id',
    '',
    cbiQuestions,
  );
  for (const dataQuestionAnswerSubmit of dataQuestionsAnswerSubmit) {
    // Validate cbi question id not exists
    if (
      false ==
      mapCbiQuestionsById.hasOwnProperty(
        dataQuestionAnswerSubmit.cbi_question_id,
      )
    ) {
      return false;
    }
    const cbiQuestion: GetCbiQuestionResultDto =
      mapCbiQuestionsById[dataQuestionAnswerSubmit.cbi_question_id];
    const mapCbiQuestionOptionsById = generateMapDataWithKeyFieldPair(
      'id',
      '',
      cbiQuestion.options,
    );
    // Validate cbi question option id not exists
    if (
      false ==
      mapCbiQuestionOptionsById.hasOwnProperty(
        dataQuestionAnswerSubmit.cbi_question_option_id,
      )
    ) {
      return false;
    }

    const cbiQuestionOption: GetCbiQuestionOptionResultDto =
      mapCbiQuestionOptionsById[
        dataQuestionAnswerSubmit.cbi_question_option_id
      ];
    const cbiQuestionOptionType = cbiQuestionOption.type;
    const mapCbiQuestionOptionValuesById = generateMapDataWithKeyFieldPair(
      'id',
      '',
      cbiQuestionOption.values,
    );
    // Validate cbi question option value id not exists
    if (
      false ==
      mapCbiQuestionOptionValuesById.hasOwnProperty(
        dataQuestionAnswerSubmit.cbi_question_option_value_id,
      )
    ) {
      return false;
    }

    const cbiQuestionOptionValue: GetCbiQuestionOptionValueResultDto =
      mapCbiQuestionOptionValuesById[
        dataQuestionAnswerSubmit.cbi_question_option_value_id
      ];
    // Cbi question option type is choice
    if (
      CbiQuestionOptionTypeEnum.SINGLE_CHOICE == cbiQuestionOptionType ||
      CbiQuestionOptionTypeEnum.MULTI_CHOICE == cbiQuestionOptionType
    ) {
      // Validate cbi question option value score not match
      if (dataQuestionAnswerSubmit.score != cbiQuestionOptionValue.score) {
        return false;
      }

      // Validate has pass answer content
      if (true == dataQuestionAnswerSubmit.hasOwnProperty('content_answer')) {
        return false;
      }
    } else {
      // Cbi question option type is upload file or enter answer
      // Validate has answer and score not match
      if (
        dataQuestionAnswerSubmit.content_answer &&
        dataQuestionAnswerSubmit.score != cbiQuestionOptionValue.score
      ) {
        return false;
      }
      // Validate has not answer and score not equal 0
      if (
        !dataQuestionAnswerSubmit.content_answer &&
        0 != dataQuestionAnswerSubmit.score
      ) {
        return false;
      }
    }
  }
  const cbiQuestionsRequired: GetCbiQuestionResultDto[] = cbiQuestions.filter(
    (item) => {
      return BooleanStatusEnum.TRUE == item.status_answer_mandatory;
    },
  );
  if (cbiQuestionsRequired.length) {
    const mapDataQuestionsAnswerSubmitByCbiQuestionId =
      generateMapDataWithKeyFieldPair(
        'cbi_question_id',
        '',
        dataQuestionsAnswerSubmit,
      );
    for (const cbiQuestionRequired of cbiQuestionsRequired) {
      // Validate cbi question require answer but not in data submit
      if (
        false ==
        mapDataQuestionsAnswerSubmitByCbiQuestionId.hasOwnProperty(
          cbiQuestionRequired.id,
        )
      ) {
        return false;
      }
    }
  }

  // All is ok
  return true;
};

export const validateDataAdminConfirmScoreOneCbiLevelAnswer = (
  currentCbiLevelAnswer: CbiUserQuestionAnswerEntity[],
  dataAdminConfirmScoreOneCbiLevelAnswer: ConfirmScoreOneCbiUserQuestionAnswerDto[],
) => {
  if (
    !currentCbiLevelAnswer.length ||
    !dataAdminConfirmScoreOneCbiLevelAnswer.length
  ) {
    return false;
  }
  const mapCurrentCbiLevelAnswerById = generateMapDataWithKeyFieldPair(
    'id',
    '',
    currentCbiLevelAnswer,
  );
  const dataAdminConfirmScoreOneCbiLevelAnswerById: any = {};
  for (const item of dataAdminConfirmScoreOneCbiLevelAnswer) {
    // Validate data submit not in current data
    if (false == mapCurrentCbiLevelAnswerById.hasOwnProperty(item.id)) {
      return false;
    }
    // Validate duplicate data submit
    if (
      true == dataAdminConfirmScoreOneCbiLevelAnswerById.hasOwnProperty(item.id)
    ) {
      return false;
    }
    dataAdminConfirmScoreOneCbiLevelAnswerById[item.id] = 1;
  }

  // All is ok
  return true;
};

export const calculateTotalScoreOfDataUserSubmitOneCbiLevelAnswer = (
  dataQuestionsAnswerSubmit: SubmitOneCbiUserQuestionAnswerDto[],
) => {
  let totalScores = 0;
  if (!dataQuestionsAnswerSubmit.length) {
    return totalScores;
  }
  for (const dataQuestionAnswerSubmit of dataQuestionsAnswerSubmit) {
    totalScores += dataQuestionAnswerSubmit.score;
  }

  return totalScores;
};

export const calculateTotalScoreOfDataAdminConfirmScoreOneCbiLevelAnswer = (
  dataQuestionsAnswerSubmit: ConfirmScoreOneCbiUserQuestionAnswerDto[],
) => {
  let totalScores = 0;
  if (!dataQuestionsAnswerSubmit.length) {
    return totalScores;
  }
  for (const dataQuestionAnswerSubmit of dataQuestionsAnswerSubmit) {
    totalScores += dataQuestionAnswerSubmit.score;
  }

  return totalScores;
};
