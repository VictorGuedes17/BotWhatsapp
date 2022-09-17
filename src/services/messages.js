import { addTrackConsumer, endCustomerService, getInitialStep, getNextStep } from "../repositories";
import { STEPS, STEPS_TYPES, FINAL_MESSAGE } from "../utils/constants";
import { orderBy as _orderBy } from 'lodash';
import { createMessages } from "../utils/createMessages";

export const stepMessage = async (step, restData) => {
  if (!step) return await defaultStep(restData);
  if (step === 'initial') return await initialStep(restData)
}

const defaultStep = async ({ consumerMessage, consumerPhone, db }) => {
  const steps = await getInitialStep(db);
  const messages = createMessages(steps);
  await addTrackConsumer(db, consumerPhone, 'initial');

  return messages;
}

const initialStep = async ({ consumerMessage, consumerPhone, db }) => {
  const initSteps = await getInitialStep(db);
  const questionStep = initSteps.find(step => step.type === STEPS_TYPES.QUESTION);
  if (questionStep) {
    const message = consumerMessage.trim().toLowerCase();
    if (['não, nao'].includes(message)) {
      await endCustomerService(db, consumerPhone);
      return FINAL_MESSAGE;
    }

    if (message === 'sim') {
      const nextStep = await getNextStep(db, questionStep.identifier);
      const responseMessages = createMessages(nextStep);

      await addTrackConsumer(db, consumerPhone, questionStep.identifier);

      return responseMessages;
    }
  }

  const isOptionsStep = initSteps.some(step => step.type === STEPS_TYPES.OPTION);
  if (isOptionsStep) {
    const chosenOption = initSteps.find(step => step.order === Number(consumerMessage));
    if (chosenOption) {
      const nextStep = await getNextStep(db, chosenOption.identifier);
      const responseMessages = createMessages(nextStep);

      await addTrackConsumer(db, consumerPhone, questionStep.identifier);

      return responseMessages;
    }

    return null;
  }

  return null;
}

const commonStep = async () => {

}

const getNextStepMessages = () => {}

const linkStep = () => {
  return 'https://meuip.com.br'
}

const problemsStep = async (consumerMessage, consumerPhone, db) => {
  const validTexts = ['1, 2'];
  if (consumerMessage) {
    if (!validTexts.includes(consumerMessage)) return 'Opss.. opção não é valida';
    if (consumerMessage === '1') {
      await addTrackConsumer(db, consumerPhone, STEPS.PRODUCT_PROBLEM);
      return productProblemStep(null, consumerPhone, db);
    }

    await endCustomerService(db, consumerPhone);
    return siteProblemStep();
  }

  return `
    1 - Problema com um produto \n
    2 - Problema com o site
  `
}

const productProblemStep = async (consumerMessage = null, consumerPhone, db) => {
  if (consumerMessage) {
    console.log('pedido do cliente : ', consumerMessage);
    await endCustomerService(db, consumerPhone);
    return productProblemStepResponse();
  }

  return `Digite o numero do pedido.`
}

const productProblemStepResponse = () => {
  return `Seu pedido ja esta sendo enviado`
}

const siteProblemStep = () => {
  return `Site fora do ar no momento`;
}