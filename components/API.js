export default {requestDBData}

import axios from 'axios'

const APIURI = 'http://localhost:8025'
const ENDPOINT = {
    rawSignal: '/rawdata',
    updateDateTime: '/updatedatetime',
};

function getUrl(which) {
    return APIURI + ENDPOINT[which];
}

async function requestDBData(which) {
    var res = await axios.get(getUrl(which));
    return res.data;
}