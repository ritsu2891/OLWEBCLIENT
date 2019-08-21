export default {requestDBData}

import axios from 'axios'

const APIURI = 'http://localhost:8025'
const ENDPOINT = {
    rawSignal: '/rawdata',
};

function getUrl(which) {
    return APIURI + ENDPOINT[which];
}

function requestDBData(which, callback) {
    axios.get(getUrl(which)).then((res) => {
        callback(res.data);
    });
}