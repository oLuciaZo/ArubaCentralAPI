const axios = require('axios');
const url = require('url');
require('dotenv').config()

async function makeGetRequest() {
    try {
        let payload = { access_token: process.env.TOKEN, network: 'Sucha_Home', site: 'AOSX' };

        const params = new url.URLSearchParams(payload);

        let res = await axios.get(`https://internal-apigw.central.arubanetworks.com/monitoring/v2/networks/bandwidth_usage?${params}`);

        let data = res.data;
        ///console.log(data);
        dataanalyze(data);
    } catch (err) {
        console.log(err);
    }
}
function dataanalyze(data){
    let params = data['samples'][35];
    console.log(params);

}

makeGetRequest();