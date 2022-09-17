import { orderBy as _orderBy } from "lodash";

export const createMessages = (steps) => {
  const msgArray = _orderBy(steps.filter(step => step.type === STEPS_TYPES.MESSAGE), 'order', 'asc');
  const questionArray = _orderBy(steps.filter(step => step.type === STEPS_TYPES.QUESTION), 'order', 'asc');
  const optionsArray = _orderBy(steps.filter(step => step.type === STEPS_TYPES.OPTION), 'order', 'asc');
  return [...msgArray, ...questionArray, ...optionsArray];
}