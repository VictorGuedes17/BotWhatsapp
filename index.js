import venom from 'venom-bot';
import { stepMessage } from './src/services/messages';
import { getTrackConsumer } from './src/repositories';
import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./teste.db');

/*venom
  .create({
    session: 'session-bot',
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });*/

async function execute() {
  const mockNumber = "31984452944-1231231@us.c";
  const mockMsg = "Boa tarde"
  try {
    const responseMessage = await new Promise((resolve, reject) => {
      db.run("CREATE TABLE IF NOT EXISTS trackConsumer (step TEXT, consumer TEXT)", async (err) => {
        if (err) return resolve(null);

        const track = await getTrackConsumer(db, String(mockNumber).split('@')[0]);
        const responseMessage = await stepMessage(track, String(mockNumber).split('@')[0], mockMsg.trim(), db);
        resolve(responseMessage);
      });
    })
    return responseMessage;
  } catch (error) {
    console.log('ERRO GENERICO: ', error)
    return null;
  }
}

console.log(await execute());

/*function start(client) {
  //Executando bot
  client.onMessage(async (message) => {
    if (message.body && message.isGroupMsg === false) {
      const responseMessage = execute();
      if (responseMessage) return await client.sendText(message.from.split('-')[0], responseMessage);
    }
  });
}*/