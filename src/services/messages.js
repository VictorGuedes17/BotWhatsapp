import { addTrackConsumer, endCustomerService, getInitialStep, getNextStep, getCurrentStep } from "../repositories";
import { STEPS_TYPES, FINAL_MESSAGE } from "../utils/constants";
import { createMessages } from "../utils/createMessages";

export const stepMessage = async (step = null, restData) => {
  if (!step) return await defaultStep(restData);
  if (step === 'initial') return await initialStep(restData)
  return await commonStep(restData, step);
}

const defaultStep = async ({ consumerMessage, consumerPhone, db }) => {
  const steps = await getInitialStep(db);

  const messages = createMessages(steps);

  await addTrackConsumer(db, consumerPhone, 'initial', 'default');

  return messages;
}

const initialStep = async ({ consumerMessage, consumerPhone, db }) => {
  const initSteps = await getInitialStep(db);
  const nextStepMessages = await getNextStepMessages(initSteps, consumerMessage, db, consumerPhone);

  return nextStepMessages;
}

const commonStep = async ({ consumerMessage, consumerPhone, db }, stepIdentifier) => {
  const initSteps = await getCurrentStep(db, stepIdentifier);
  const nextStepMessages = await getNextStepMessages(initSteps, consumerMessage, db, consumerPhone);
  return nextStepMessages;
}

const getNextStepMessages = async (initSteps, consumerMessage, db, consumerPhone) => {
  console.log('INit: ', initSteps)
  const questionStep = initSteps.find(step => step.type === STEPS_TYPES.QUESTION);

  if (questionStep) {
    const message = consumerMessage.trim().toLowerCase();
    if (['não', 'nao'].includes(message)) {
      await endCustomerService(db, consumerPhone);
      return [FINAL_MESSAGE];
    }

    if (message === 'sim') {
      const nextStep = await getNextStep(db, questionStep.identifier);
      const responseMessages = createMessages(nextStep);

      await addTrackConsumer(db, consumerPhone, questionStep.identifier, 'question');

      return responseMessages;
    }
    return null;
  }

  const isOptionsStep = initSteps.some(step => step.type === STEPS_TYPES.OPTION);
  if (isOptionsStep) {

    const chosenOption = initSteps.find(step => step.orders === Number(consumerMessage) && step.type === STEPS_TYPES.OPTION);

    if (chosenOption) {
      console.log('Choosen: ', chosenOption)
      const nextStep = await getNextStep(db, chosenOption.identifier);
      console.log('Next: ', nextStep)
      const nextIdentifier = getIdentifierFromNextStep(nextStep);

      const responseMessages = createMessages(nextStep);

      await addTrackConsumer(db, consumerPhone, nextIdentifier, 'option');

      return responseMessages;
    }

    return null;
  }

  return null;
}


const getIdentifierFromNextStep = (nextStep) => {
  const questionStep = nextStep.find(step => step.type === STEPS_TYPES.QUESTION);
  if (questionStep) {
    return questionStep.identifier;
  }

  return nextStep[0].parent;
}