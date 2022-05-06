const axios = require('axios');
const url = require('url');
require('dotenv').config()
const lineNotify = require('line-notify-nodejs')(process.env.LINETOKEN);

async function makeGetRequest() {
    try {
        let payload = { access_token: process.env.TOKEN, from: Date.now(), to: (Date.now()-(86400000*7)) };

        const params = new url.URLSearchParams(payload);

        let res = await axios.get(`https://internal-apigw.central.arubanetworks.com/aiops/v2/insights/global/list?${params}`);

        let data = res.data;
         console.log(data);
        _DataAnalyze(data);
    } catch (err) {
        console.log(err);
    }
}
function _DataAnalyze(data){
    console.log(data[0]['category'])
    let message = 'Aruba AIops: \n'+data[0]['category']+'\n'+data[0]['description']+'\n'+data[0]['impact']+'\n'+data[0]['insight']+'\nImpact Severity: '+data[0]['severity'] ;
    console.log(message);
    lineNotify.notify({
        message: message,
      }).then(() => {
        console.log('send completed!');
      });

}

function _Date(){
    const from = Date.now();
    const to = (Date.now()-(86400000*7));
}

makeGetRequest();