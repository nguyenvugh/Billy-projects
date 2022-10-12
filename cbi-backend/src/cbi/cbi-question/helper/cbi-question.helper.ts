import {
  CbiQuestionOptionTypeEnum,
  MIN_NUMBER_ANSWER_SINGLE_CHOICE_TYPE,
  MAX_NUMBER_ANSWER_SINGLE_CHOICE_TYPE,
  MIN_NUMBER_ANSWER_MULTI_CHOICE_TYPE,
  MAX_NUMBER_ANSWER_MULTI_CHOICE_TYPE,
} from '../../cbi-question-option/constant';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { generateMapDataWithKeyFieldPair } from '../../../common/utils';
import { CreateOneCbiQuestionDto } from '../admin/dto/request/create-one-cbi-question.dto';
import { UpdateOneCbiQuestionDto } from '../admin/dto/request/update-one-cbi-question.dto';
import { UpdateOneCbiQuestionOptionDto } from '../../cbi-question-option/admin/dto/request/update-one-cbi-question-option.dto';
import { UpdateOneCbiQuestionOptionValueDto } from '../../cbi-question-option-value/admin/dto/request/update-one-cbi-question-option-value.dto';
import { CbiLevelEntity } from '../../cbi-level/entity/cbi-level.entity';
import { CbiQuestionEntity } from '../entity/cbi-question.entity';
import { CbiQuestionOptionEntity } from '../../cbi-question-option/entity/cbi-question-option.entity';
import { CbiQuestionOptionValueEntity } from '../../cbi-question-option-value/entity/cbi-question-option-value.entity';

export const validateDataAdminCreateCbiQuestion = (
  cbiLevel: CbiLevelEntity,
  data: CreateOneCbiQuestionDto | UpdateOneCbiQuestionDto,
) => {
  if (!cbiLevel || !data || !data.options.length) {
    return false;
  }

  let countOptionSingleChoice: number = 0;
  let countOptionMultiChoice: number = 0;
  for (const option of data.options) {
    if (!option.values.length) {
      return false;
    }
    const countValues = option.values.length;
    if (CbiQuestionOptionTypeEnum.SINGLE_CHOICE == option.type) {
      countOptionSingleChoice++;
    }
    if (CbiQuestionOptionTypeEnum.MULTI_CHOICE == option.type) {
      countOptionMultiChoice++;
    }
    let hasAtLeastOneOptionIsRight: boolean = false;
    let countOptionValueIsRight: number = 0;
    const contentAnswerOfQuestionTypeChoice: any = {};
    for (const value of option.values) {
      // Validate has not set score
      if (false == value.hasOwnProperty('score')) {
        return false;
      }
      // Question option type is choice type
      if (
        CbiQuestionOptionTypeEnum.SINGLE_CHOICE == option.type ||
        CbiQuestionOptionTypeEnum.MULTI_CHOICE == option.type
      ) {
        // Validate has not set status right option value
        if (false == value.hasOwnProperty('status_right_option_value')) {
          return false;
        }
        // Validate is right option value and score less than or equal 0
        if (
          BooleanStatusEnum.TRUE == value.status_right_option_value &&
          0 >= value.score
        ) {
          return false;
        }
        // Validate is not right option value and score is not 0
        /*
        if (
          BooleanStatusEnum.FALSE == value.status_right_option_value &&
          0 != value.score
        ) {
          return false;
        }*/
        // Validate content answer duplicate
        if (
          true == contentAnswerOfQuestionTypeChoice.hasOwnProperty(value.title)
        ) {
          return false;
        }
        // Is right option value
        if (BooleanStatusEnum.TRUE == value.status_right_option_value) {
          hasAtLeastOneOptionIsRight = true;
          countOptionValueIsRight++;
        }
        contentAnswerOfQuestionTypeChoice[value.title] = 1;
      } else {
        // Validate question type is enter answer or upload file and has set status right option value
        if (true == value.hasOwnProperty('status_right_option_value')) {
          return false;
        }
      }
    }
    // Validate question option type is choice type and has not set right option value
    if (
      (CbiQuestionOptionTypeEnum.SINGLE_CHOICE == option.type ||
        CbiQuestionOptionTypeEnum.MULTI_CHOICE == option.type) &&
      false == hasAtLeastOneOptionIsRight
    ) {
      return false;
    }
    // Option type is single choice
    if (CbiQuestionOptionTypeEnum.SINGLE_CHOICE == option.type) {
      // Validate has one more answer is right
      if (1 < countOptionValueIsRight) {
        return false;
      }
      // Validate answer items not in range 2,10
      if (
        countValues < MIN_NUMBER_ANSWER_SINGLE_CHOICE_TYPE ||
        countValues > MAX_NUMBER_ANSWER_SINGLE_CHOICE_TYPE
      ) {
        return false;
      }
    }
    // Validate multi choice type and answer items not in range 3,10
    if (
      CbiQuestionOptionTypeEnum.MULTI_CHOICE == option.type &&
      (countValues < MIN_NUMBER_ANSWER_MULTI_CHOICE_TYPE ||
        countValues > MAX_NUMBER_ANSWER_MULTI_CHOICE_TYPE)
    ) {
      return false;
    }
    // Validate question option type is enter answer or upload file and has one more option values
    if (
      (CbiQuestionOptionTypeEnum.ENTER_ANSWER == option.type ||
        CbiQuestionOptionTypeEnum.UPLOAD_FILE == option.type) &&
      1 < countValues
    ) {
      return false;
    }
  }
  // Validate has more than one single choice type
  if (1 < countOptionSingleChoice) {
    return false;
  }
  // Validate has more than one multi choice type
  if (1 < countOptionMultiChoice) {
    return false;
  }
  // Validate has single choice and multi choice in question
  if (0 < countOptionSingleChoice && 0 < countOptionMultiChoice) {
    return false;
  }

  // All data is ok
  return true;
};

export const extractCbiQuestionOptionIdsDeleteFromDataAdminUpdateCbiQuestion = (
  cbiQuestionUpdate: CbiQuestionEntity,
  data: UpdateOneCbiQuestionDto,
) => {
  const ids: any[] = [];
  if (!cbiQuestionUpdate || !data) {
    return ids;
  }
  if (!cbiQuestionUpdate.options.length) {
    return ids;
  }
  const newCbiQuestionOptionsDataMapByOptionId =
    generateMapDataWithKeyFieldPair('id', '', data.options);
  for (const option of cbiQuestionUpdate.options) {
    if (
      false == newCbiQuestionOptionsDataMapByOptionId.hasOwnProperty(option.id)
    ) {
      ids.push(option.id);
    }
  }

  return ids;
};

export const extractCbiQuestionOptionValueIdsDeleteFromDataAdminUpdateCbiQuestion =
  (cbiQuestionUpdate: CbiQuestionEntity, data: UpdateOneCbiQuestionDto) => {
    const ids: any[] = [];
    if (!cbiQuestionUpdate || !data) {
      return ids;
    }
    if (!cbiQuestionUpdate.options.length) {
      return ids;
    }
    const newCbiQuestionOptionsDataMapByOptionId =
      generateMapDataWithKeyFieldPair('id', '', data.options);
    for (const option of cbiQuestionUpdate.options) {
      if (
        true == newCbiQuestionOptionsDataMapByOptionId.hasOwnProperty(option.id)
      ) {
        const currentCbiQuestionOptionValues: CbiQuestionOptionValueEntity[] =
          option.values;
        const newCbiQuestionOption: UpdateOneCbiQuestionOptionDto =
          newCbiQuestionOptionsDataMapByOptionId[option.id];
        const newCbiQuestionOptionValues: UpdateOneCbiQuestionOptionValueDto[] =
          newCbiQuestionOption.values;
        const newCbiQuestionOptionValuesDataMapByValueId =
          generateMapDataWithKeyFieldPair('id', '', newCbiQuestionOptionValues);
        for (const value of currentCbiQuestionOptionValues) {
          if (
            false ==
            newCbiQuestionOptionValuesDataMapByValueId.hasOwnProperty(value.id)
          ) {
            ids.push(value.id);
          }
        }
      }
    }

    return ids;
  };

export const overrideUnEditableDataAdminUpdateCbiQuestion = (
  cbiQuestionUpdate: CbiQuestionEntity,
  data: UpdateOneCbiQuestionDto,
) => {
  if (!cbiQuestionUpdate || !data) {
    return data;
  }
  // Orverride cbi question data
  // Does not override id because we will check id exists later
  /*if (true == data.hasOwnProperty('id')) {
    data['id'] = cbiQuestionUpdate.id;
  }*/
  if (true == data.hasOwnProperty('order_display')) {
    data['order_display'] = cbiQuestionUpdate.order_display;
  }
  /*if (true == data.hasOwnProperty('total_scores')) {
    data['total_scores'] = cbiQuestionUpdate.total_scores;
  }*/
  if (true == data.hasOwnProperty('cbi_level_group_id')) {
    data['cbi_level_group_id'] = cbiQuestionUpdate.cbi_level_group_id;
  }
  if (data.options.length) {
    const mapCurrentCbiQuestionOptions = generateMapDataWithKeyFieldPair(
      'id',
      '',
      cbiQuestionUpdate.options,
    );
    for (let i = 0; i < data.options.length; i++) {
      const option = data.options[i];
      if (
        option.id &&
        true == mapCurrentCbiQuestionOptions.hasOwnProperty(option.id)
      ) {
        const currentCbiQuestionOption: CbiQuestionOptionEntity =
          mapCurrentCbiQuestionOptions[option.id];
        // Orverride cbi question option data
        // Does not override id because we will check id exists later
        //option['id'] = currentCbiQuestionOption.id;
        if (true == option.hasOwnProperty('cbi_question_id')) {
          option['cbi_question_id'] = currentCbiQuestionOption.cbi_question_id;
        }
        if (true == option.hasOwnProperty('order_display')) {
          option['order_display'] = currentCbiQuestionOption.order_display;
        }
        if (option.values.length) {
          const mapCurrentCbiQuestionOptionValues =
            generateMapDataWithKeyFieldPair(
              'id',
              '',
              currentCbiQuestionOption.values,
            );
          for (let j = 0; j < option.values.length; j++) {
            const value = option.values[j];
            if (
              value.id &&
              true == mapCurrentCbiQuestionOptionValues.hasOwnProperty(value.id)
            ) {
              const currentCbiQuestionOptionValue: CbiQuestionOptionValueEntity =
                mapCurrentCbiQuestionOptionValues[value.id];
              // Orverride cbi question option value data
              // Does not override id because we will check id exists later
              //value['id'] = currentCbiQuestionOptionValue.id;
              if (true == value.hasOwnProperty('cbi_question_option_id')) {
                value['cbi_question_option_id'] =
                  currentCbiQuestionOptionValue.cbi_question_option_id;
              }
              if (true == value.hasOwnProperty('order_display')) {
                value['order_display'] =
                  currentCbiQuestionOptionValue.order_display;
              }
            }
            data.options[i].values[j] = value;
          }
        }
      }
      data.options[i] = option;
    }
  }

  return data;
};

export const validateDataAdminUpdateCbiQuestion = (
  cbiLevel: CbiLevelEntity,
  cbiQuestionUpdate: CbiQuestionEntity,
  data: UpdateOneCbiQuestionDto,
  allowUpdateQuestionDetail: boolean = true,
) => {
  if (false == validateDataAdminCreateCbiQuestion(cbiLevel, data)) {
    return false;
  }

  // Validate update cbi question does not exists
  if (true == data.hasOwnProperty('id') && data['id'] != cbiQuestionUpdate.id) {
    return false;
  }
  // Validate update question detail when has user submit
  if (
    false == allowUpdateQuestionDetail &&
    cbiQuestionUpdate.status_answer_mandatory != data.status_answer_mandatory
  ) {
    return false;
  }
  const mapCurrentCbiQuestionOptions = generateMapDataWithKeyFieldPair(
    'id',
    '',
    cbiQuestionUpdate.options,
  );
  for (const option of data.options) {
    let mapCurrentCbiQuestionOptionValues = {};
    // Updating cbi question option
    if (option.id) {
      // Validate cbi question option does not exists
      if (false == mapCurrentCbiQuestionOptions.hasOwnProperty(option.id)) {
        return false;
      }
      const currentCbiQuestionOption: CbiQuestionOptionEntity =
        mapCurrentCbiQuestionOptions[option.id];
      mapCurrentCbiQuestionOptionValues = generateMapDataWithKeyFieldPair(
        'id',
        '',
        currentCbiQuestionOption.values,
      );
      // Can not change type of cbi question option. Need do follow order: delete -> add new
      if (option.type != currentCbiQuestionOption.type) {
        return false;
      }
    } else {
      // Add new cbi question option
      // Validate update question detail when has user submit
      if (false == allowUpdateQuestionDetail) {
        return false;
      }
    }
    for (const value of option.values) {
      // Update cbi question option value
      if (value.id) {
        // Validate cbi question option value does not exists
        if (
          false == mapCurrentCbiQuestionOptionValues.hasOwnProperty(value.id)
        ) {
          return false;
        }
        const currentCbiQuestionOptionValue: CbiQuestionOptionValueEntity =
          mapCurrentCbiQuestionOptionValues[value.id];
        // Validate update question detail when has user submit
        if (false == allowUpdateQuestionDetail) {
          if (value.score != currentCbiQuestionOptionValue.score) {
            return false;
          }
          if (
            value.status_right_option_value !=
            currentCbiQuestionOptionValue.status_right_option_value
          ) {
            return false;
          }
        }
      } else {
        // Add new cbi question option value
        // Validate update question detail when has user submit
        if (false == allowUpdateQuestionDetail) {
          return false;
        }
      }
    }
  }

  // All data is ok
  return true;
};

export const calculateTotalScoreOfQuestion = (
  data: CreateOneCbiQuestionDto | UpdateOneCbiQuestionDto,
) => {
  let totalScores: number = 0;
  if (!data.options.length) {
    return totalScores;
  }
  for (const option of data.options) {
    if (!option.values.length) {
      return totalScores;
    }
    for (const value of option.values) {
      if (true == value.hasOwnProperty('score')) {
        totalScores += Number(value.score);
      }
    }
  }
  return totalScores;
};

export const updateOrderDisplayToItemsInList = (list: any[]) => {
  if (!list.length) {
    return list;
  }
  let orderDisplay = 0;
  for (let index = 0; index < list.length; index++) {
    const item = list[index];
    // Item had set order display -> store
    if (true == item.hasOwnProperty('order_display')) {
      orderDisplay = item['order_display'];
    } else {
      // Item has not set order display -> set
      item['order_display'] = ++orderDisplay;
    }
    list[index] = item;
  }

  return list;
};
