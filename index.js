const XLSX = require('xlsx');
const venom = require('venom-bot');

venom
  .create('blastWA',null,null,{
      disableWelcome: true,
      updatesLog: false,
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
    const workbook = XLSX.readFile('./list.xlsx');
    const sheet_name_list = workbook.SheetNames;
    const listContacts = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log('==========================');
    for (const contact of listContacts) {
        try {
        console.log('Sending Message To: ', contact.name);
        if (contact.image) {
            await client
            .sendImage(
                `${contact.phone_number}@c.us`,
                `upload/${contact.image}`,
                `${contact.image}`,
                contact.message,
            )
        } else {
            await client
            .sendText(`${contact.phone_number}@c.us`, contact.message)
        }
        console.log(`Message Sent Successfully`)
        } catch (error) {
            console.log('Sending Message Failed ')
        }
        
        console.log('==========================');
        sleep((Math.floor(Math.random() * 10) + 1) * 1000);
    }
    
    console.log('All Message Already Sent');
    console.log('Exit App');
    client.close();
    process.exit()
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms);
    });
}