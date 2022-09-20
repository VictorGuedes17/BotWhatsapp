import venom from 'venom-bot';
import { stepMessage } from './src/services/messages';
import { getTrackConsumer } from './src/repositories';
// import { seedDB } from './src/seeds';
import prompts from 'prompts';
import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./database.db');


// venom
//   .create({
//     session: 'session-bot',
//     multidevice: true
//   })
//   .then((client) => start(client))
//   .catch((erro) => {
//     console.log(erro);
//   });


async function execute(phoneNumber, consumerMessage) {
  try {
    // await seedDB();

    const track = await getTrackConsumer(db, String(phoneNumber).split('@')[0]);
    if (!track) {
      const responseMessage = await stepMessage({ step: null, stepType: ''}, {
        consumerMessage: consumerMessage.trim(),
        consumerPhone: String(phoneNumber).split('@')[0],
        db: db
      });

      return responseMessage;
    }

    const responseMessage = await stepMessage(track, {
      consumerMessage: consumerMessage.trim(),
      consumerPhone: String(phoneNumber).split('@')[0],
      db: db
    });

    return responseMessage;
  } catch (error) {
    console.log('ERRO GENERICO: ', error)
    return null;
  }
}

// console.log(await execute('13212312-12312213@us.c', 'Hi'))

async function start(client) {
  client.onMessage(async (message) => {
    if (message.body && message.isGroupMsg === false) {
      const responseMessages = await execute(message.from, message.body);
      if (!responseMessages) return;

      for (const responseMessage of responseMessages) {
        client.sendText(message.from.split('-')[0], responseMessage.description);
      }

      return;
    }
  });
}

(async () => {
  const phoneNumber = await prompts({
    type: 'text',
    name: 'value',
    message: 'Digite o seu numero de telefone: ',
  });

  const message = await prompts({
    type: 'text',
    name: 'value',
    message: 'Digite a mensagem: ',
  });

  const responseMessages = await execute(phoneNumber.value, message.value);

  for (const responseMessage of responseMessages) {
    console.log(responseMessage);
  }
})();