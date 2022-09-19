import lodash from "lodash";
import { STEPS_TYPES } from '../utils/constants';
const { orderBy } = lodash;

export const createMessages = (steps) => {
  const msgArray = orderBy(steps.filter(step => step.type === STEPS_TYPES.MESSAGE), 'orders', 'asc');
  const questionArray = orderBy(steps.filter(step => step.type === STEPS_TYPES.QUESTION), 'orders', 'asc');
  const optionsArray = orderBy(steps.filter(step => step.type === STEPS_TYPES.OPTION), 'orders', 'asc');

  const msgFormatedArray = msgArray.map(step => step.description);
  const questionFormatedArray = questionArray.map(step => step.description);
  const optionsFormatedArray = optionsArray.map(step => `${step.orders} - ${step.description} \n`).join().replaceAll(',', '');

  return [...msgFormatedArray, ...questionFormatedArray, optionsFormatedArray];
}