import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();

export const addTrackConsumer = async (db, consumerPhone, step = 'initial') => {
  return await new Promise(async (resolve, reject) => {
    const alreadyExists = await getTrackConsumer(db, consumerPhone);
    if (alreadyExists) {
      db.run(`UPDATE trackConsumer SET step = '${step}' WHERE consumer = ${String(consumerPhone)}`, (err) => {
        if (err) reject(err);
        resolve(true);
      })
    } else {
      db.run(`INSERT INTO trackConsumer VALUES ('initial', ${String(consumerPhone)})`, (err) => {
        if (err) reject(err);
        resolve(true);
      })
    }
  })
}

export const getTrackConsumer = async (db, consumerPhone) => {
  return await new Promise((resolve, reject) => {
    db.get(`SELECT step FROM trackConsumer WHERE consumer = ${String(consumerPhone)}`, (err, row) => {
      if (err) reject(err);
      resolve(row ? row.step : null);
    })
  })
}

export const endCustomerService = async (db, consumerPhone) => {
  return await new Promise((resolve, reject) => {
    db.get(`DELETE FROM trackConsumer WHERE consumer = ${String(consumerPhone)}`, (err) => {
      if (err) reject(err);
      resolve(true);
    })
  })
}

export const getInitialStep = async (db) => {
  return await new Promise((resolve, reject) => {
    db.get(`SELECT * FROM steps WHERE parent = null`, (err, row) => {
      if (err) reject(err);
      resolve(row);
    })
  })
}

export const getNextStep = async(db, parent) => {
  return await new Promise((resolve, reject) => {
    db.get(`SELECT * FROM steps WHERE parent = ${parent}`, (err, row) => {
      if (err) reject(err);
      resolve(row);
    })
  })
}
