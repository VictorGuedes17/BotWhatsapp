import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./database.db');

const seedDB = async () => {
  return await new Promise((resolve2, reject) => {
    db.run("CREATE TABLE IF NOT EXISTS trackConsumer (step TEXT, consumer TEXT, stepType TEXT)", (err) => {
      if (err) reject(err);

      db.run("CREATE TABLE IF NOT EXISTS steps (orders INTEGER, identifier TEXT, description TEXT, parent TEXT, type TEXT, isLast INTEGER)", async (err) => {
        if (err) reject(err);
        
        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(1, '#in000', 'Ola, Tudo Bem! Eu sou a assistente virtual Marta da loja Manto do artilheiro em que posso ajudar?', null, 'msg', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          });
        })

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(1, '#in001', 'Status e rastrear pedido', null, 'option',0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(2, '#in002', 'Como comprar', null, 'option',0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(3, '#in003', 'Sobre o produto', null, 'option',0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(4, '#in004', 'Quem somos', null, 'option',0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(5, '#in005', 'Trocas e devolucoes', null, 'option',0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        // Fluxo da primeira opcao
        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(1, '#sub001', 'Para ver o status do seu pedido basta acessar o link:wwwe em meus pedidos era ter todos os detalhes', '#in001', 'msg', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(2, '#sub002', 'Para rastrear o seu pedido ?? so acessar o link atraves do site dos correios link:www e inserir o codigo de rastreio ?? e lembrando, o envio leva de 3 a 5 dias uteis corridos, sabado e domingo n??o conta como dia uteis.', '#in001', 'msg', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(3, '#sub003', 'Deseja falar com nossos atendetes. ( Sim / Nao )', '#in001', 'question', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });
        
        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(1, '#sub010', 'Ok, em breve um atendente irar lhe atender. Lembrando que o horario de atendimento ?? de seg a sex de 9hrs as 18:30hrs e aos sabados de 9 as 14hrs.', '#sub003', 'msg', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(1, '#sub004', 'opcao 1', '#in002', 'option', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(2, '#sub005', 'opcao 2', '#in002', 'option', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(1, '#sub020', 'Obrigado por clicar na opcao 2', '#sub005', 'msg', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        await new Promise((resolve, reject) => {
          db.run("INSERT INTO steps VALUES(1, '#sub020', 'Obrigado por clicar na opcao 1', '#sub004', 'msg', 0)", (err) => {
            if (err) reject(err);
            resolve(true);
          })
        });

        resolve2(true);
      })

    });
  })
}

seedDB();

// db.serialize(() => {
//   db.run("CREATE TABLE IF NOT EXISTS trackConsumer (step TEXT, consumer TEXT)");
//   db.run("CREATE TABLE IF NOT EXISTS steps (order INTEGER, identifier TEXT, description TEXT, parent TEXT, type TEXT, isLast INTEGER)", async (err) => {
//     if (err) console.log(err);

//     db.run("INSERT INTO steps VALUES(1, '#in000', 'Ola, Tudo Bem! Eu sou a assistente virtual Marta da loja Manto do artilheiro em que posso ajudar?', null, 'msg', 0)");
//     db.run("INSERT INTO steps VALUES(1, '#in001', 'Status e rastrear pedido', null, 'option',0)");
//     db.run("INSERT INTO steps VALUES(2, '#in002', 'Como comprar', null, 'option',0)");
//     db.run("INSERT INTO steps VALUES(3, '#in003', 'Sobre o produto', null, 'option',0)");
//     db.run("INSERT INTO steps VALUES(4, '#in004', 'Quem somos', null, 'option',0)");
//     db.run("INSERT INTO steps VALUES(5, '#in005', 'Trocas e devolucoes', null, 'option',0)");

//     // Fluxo da primeira opcao
//     db.run("INSERT INTO steps VALUES(1, '#sub001', 'Para ver o status do seu pedido basta acessar o link:wwwe em meus pedidos era ter todos os detalhes', '#in001', 'msg', 0)");
//     db.run("INSERT INTO steps VALUES(2, '#sub002', 'Para rastrear o seu pedido ?? so acessar o link atraves do site dos correios link:www e inserir o codigo de rastreio ?? e lembrando, o envio leva de 3 a 5 dias uteis corridos, sabado e domingo n??o conta como dia uteis.', '#in001', 'msg', 0)");
//     db.run("INSERT INTO steps VALUES(3, '#sub003', 'Deseja falar com nossos atendetes. ( Sim / Nao )', '#in001', 'question', 0)");
//     db.run("INSERT INTO steps VALUES(1, '#sub010', 'Ok, em breve um atendente irar lhe atender. Lembrando que o horario de atendimento ?? de seg a sex de 9hrs as 18:30hrs e aos sabados de 9 as 14hrs.', '#sub003', 'msg', 0)");
//   })
// });

// db.close();