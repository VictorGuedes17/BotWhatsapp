import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();

export const addTrackConsumer = async (db, consumerPhone, step = 'initial', stepType ) => {
  return await new Promise(async (resolve, reject) => {
    const alreadyExists = await getTrackConsumer(db, consumerPhone);
    if (alreadyExists) {
      db.run(`UPDATE trackConsumer SET step = '${step}', stepType = '${stepType}' WHERE consumer = ${String(consumerPhone)}`, (err) => {
        if (err) reject(err);
        resolve(true);
      })
    } else {
      db.run(`INSERT INTO trackConsumer VALUES ('initial', ${String(consumerPhone)}, '${String(stepType)}')`, (err) => {
        if (err) reject(err);
        resolve(true);
      })
    }
  })
}

export const getTrackConsumer = async (db, consumerPhone) => {
  return await new Promise((resolve, reject) => {
    db.get(`SELECT step, stepType FROM trackConsumer WHERE consumer = ${String(consumerPhone)}`, (err, row) => {
      if (err) reject(err);
      resolve(row ? { step: row.step, stepType: row.stepType } : null);
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
    db.all(`SELECT * FROM steps WHERE parent IS NULL`, (err, row) => {
      if (err) reject(err);
      resolve(row);
    })
  })
}

export const getNextStep = async (db, parent) => {
  return await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM steps WHERE parent = '${parent}'`, (err, row) => {
      if (err) reject(err);
      resolve(row);
    })
  })
}

export const getCurrentStep = async (db, identifier, type) => {
  if(type === 'question') {
    return await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM steps WHERE identifier = '${identifier}'`, (err, row) => {
        if (err) reject(err);
        resolve(row);
      })
    })
  }

  return await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM steps WHERE parent = '${identifier}'`, (err, row) => {
      if (err) reject(err);
      resolve(row);
    })
  })
  
}
