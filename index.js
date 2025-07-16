const puppeteer = require('puppeteer');// Importa a biblioteca Puppeteer
function delay(time) {

  return new Promise(function (resolve) {

    setTimeout(resolve, time);

  });

}// Função para criar um atraso (delay) em milissegundos

(async () => {
  // Inicia o navegador com Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new', // Executa em modo "invisível", sem abrir a janela do navegador
    args: ['--window-size=1280,800'], // Define o tamanho da janela do navegador
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', //
    // Caminho para o executável do Chrome, necessário para o app do celular ler o qr code
  });

  
  const page = await browser.newPage();// Cria uma nova aba (página) no navegador

  page.setViewport({ width: 1280, height: 800 }); // Define o tamanho da área visível da página (viewport)// 

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'); // Define o user agent para simular um navegador real

  await page.goto('https://web.whatsapp.com');// Navega até o WhatsApp Web

  await page.waitForSelector('#app > div > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.x1nhvcw1.xdt5ytf.x1dr59a3.xw2csxc.x1odjw0f.xyinxu5.xp48ta0.x1g2khh7.xtssl2i.xp9ttsr.x6s0dn4.x9f619.xdounpk.x1hql6x6.xe4h88v.x1g96xxu.x1t470q2 > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xgpatz3.xeuugli.x2lwn1j.xl56j7k.xdt5ytf.x6s0dn4 > div:nth-child(2) > div > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xe93d63.xeuugli.x2lwn1j.x1nhvcw1.xdt5ytf.x1cy8zhl > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xeuugli.x2lwn1j.x1nhvcw1.x1q0g3np.x1cy8zhl.xkh2ocl.x6s0dn4.x1qughib.xi32cqo.x1qgv0r9.x18t01z2.xr3inr3 > div.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xeuugli.x2lwn1j.xl56j7k.xdt5ytf.x6s0dn4.x1n2onr6.x1y8v6su.x1eq81zi > div > div > canvas',); // Aguarda até que o seletor do QR Code esteja visível na página

  await page.screenshot({ path: 'myqrcode.png' }); // Tira uma captura de tela da página atual e salva como 'myqrcode.png'

  await page.waitForSelector('._ak8n'); // Fica esperando o chat aparecer

  // Aguarda alguns segundos
  await delay(3000);

  const nomeContatoOuGrupo = "nome do contato ou grupo"; // Substitua pelo nome do contato ou grupo desejado

  // Clica na conversa
  await page.waitForSelector(`span[title="${nomeContatoOuGrupo}"]`);
  await page.click(`span[title="${nomeContatoOuGrupo}"]`);
  await delay(2000);

  // Escreve a mensagem
  const campoMensagem = 'div[contenteditable="true"][data-tab="10"]';
  await page.waitForSelector(campoMensagem, { visible: true });
  await page.type(campoMensagem, 'Opa, isso é um teste automatizado com Puppeteer!'); //mensagem que deseja enviar
  await delay(500);

  // Clica no botão de enviar
  await page.click('span[data-icon="send"]');

  await delay(5000);

  console.log("✅ Mensagem enviada com sucesso!"); // confirma que a mensagem foi enviada no console

  browser.close(); // Fecha o navegador

  
})();