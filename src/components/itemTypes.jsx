import ActionPointsElement from './ItemElements/ActionPointsElement';
import GenerateDocsElement from './ItemElements/GenerateDocsElement';
import GenerateEmailElement from './ItemElements/GenerateEmailElement';
import GenerateTasksElement from './ItemElements/GenerateTasksElement';
import InputAreaElement from './ItemElements/InputAreaElement';
import InputElement from './ItemElements/InputElement';
import SummarizeElement from './ItemElements/SummarizeElement';
import SimpleChat from './ItemElements/SimpleChat';
import InputFileElement from './ItemElements/InputFileElement';

export const ItemTypes = {
  INPUT: 'input',
  INPUT_AREA: 'input_area',
  INPUT_FILE: 'input_file',
  SUMMARIZE: 'summarize',
  ACTION_POINTS: 'action_points',
  GENERATE_DOCS: 'generate_docs',
  GENERATE_TASKS: 'generate_tasks',
  GENERATE_EMAIL: 'generate_email',
  CHAT: 'chat',
};

export const ItemElements = {
  [ItemTypes.INPUT]: InputElement,
  [ItemTypes.INPUT_AREA]: InputAreaElement,
  [ItemTypes.INPUT_FILE]: InputFileElement,
  [ItemTypes.SUMMARIZE]: SummarizeElement,
  [ItemTypes.ACTION_POINTS]: ActionPointsElement,
  [ItemTypes.GENERATE_DOCS]: GenerateDocsElement,
  [ItemTypes.GENERATE_TASKS]: GenerateTasksElement,
  [ItemTypes.GENERATE_EMAIL]: GenerateEmailElement,
  [ItemTypes.CHAT]: SimpleChat,
};
