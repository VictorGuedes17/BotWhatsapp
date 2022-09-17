import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();
const db = new sqlite.Database('./database.db');



db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS trackConsumer (step TEXT, consumer TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS steps (order INTEGER, identifier TEXT, description TEXT, parent TEXT, type TEXT, isLast INTEGER)", async (err) => {
    if (err) console.log(err);

    db.run("INSERT INTO steps VALUES(1, '#in000', 'Ola, Tudo Bem! Eu sou a assistente virtual Marta da loja Manto do artilheiro em que posso ajudar?', null, 'msg', 0)");
    db.run("INSERT INTO steps VALUES(1, '#in001', 'Status e rastrear pedido', null, 'option',0)");
    db.run("INSERT INTO steps VALUES(2, '#in002', 'Como comprar', null, 'option',0)");
    db.run("INSERT INTO steps VALUES(3, '#in003', 'Sobre o produto', null, 'option',0)");
    db.run("INSERT INTO steps VALUES(4, '#in004', 'Quem somos', null, 'option',0)");
    db.run("INSERT INTO steps VALUES(5, '#in005', 'Trocas e devolucoes', null, 'option',0)");

    // Fluxo da primeira opcao
    db.run("INSERT INTO steps VALUES(1, '#sub001', 'Para ver o status do seu pedido basta acessar o link:wwwe em meus pedidos era ter todos os detalhes', '#in001', 'msg', 0)");
    db.run("INSERT INTO steps VALUES(2, '#sub002', 'Para rastrear o seu pedido é so acessar o link atraves do site dos correios link:www e inserir o codigo de rastreio á e lembrando, o envio leva de 3 a 5 dias uteis corridos, sabado e domingo não conta como dia uteis.', '#in001', 'msg', 0)");
    db.run("INSERT INTO steps VALUES(3, '#sub003', 'Deseja falar com nossos atendetes. ( Sim / Nao )', '#in001', 'question', 0)");
    db.run("INSERT INTO steps VALUES(1, '#sub010', 'Ok, em breve um atendente irar lhe atender. Lembrando que o horario de atendimento é de seg a sex de 9hrs as 18:30hrs e aos sabados de 9 as 14hrs.', '#sub003', 'msg', 0)");
  })
});

db.close();