export default { init, shouldFetch, startManage, startManageV }

import * as API from './API.js'

var updateDateTimeInfo = undefined;
const ENDPOINT = 'updateDateTime';

function init() {
    API.requestDBData(ENDPOINT).then((res) => {
        updateDateTimeInfo = convertDateTime(res);
    });
}

async function shouldFetch(which) {
    return true;
    var lUpdateDateTimeInfo = convertDateTime(await API.requestDBData(ENDPOINT));
    which = API.ENDPOINT[which];
    var res = updateDateTimeInfo[which] < lUpdateDateTimeInfo[which]
    if (res) {
        updateDateTimeInfo[which] = lUpdateDateTimeInfo[which];
    }
    return res;
}

function convertDateTime(src) {
    var res = {};
    for (var key in src.data) {
        res[key] = new Date(src.data[key]);
    }
    return res;
}

function replaceAll(chart, which) {
    API.requestDBData(which).then((res) => {
        chart.data.labels = [];
        chart.data.datasets[0].data = [];
        for (var i = 0; i < res.data.length; i++) {
            chart.data.labels.push('');
            chart.data.datasets[0].data.push(res.data[i]);
        }
        chart.update();
    });
}

function startManage(chart, which, mode) {
    switch (mode) {
        case 'replaceAll':
            var updateFn = replaceAll;
            break;
        default:
            return;
    }
    updateFn(chart, which);
    window.setInterval(() => {
      shouldFetch(which).then((res) => {
        if (res) { 
            updateFn(chart, which);
        }
      });
    }, 5000);
}

// 一時措置
function replaceAllV(vueObj, member, which) {
    API.requestDBData(which).then((res) => {
        var data = [];
        if (res.data != undefined) {
            data.push(res.data.data);
        }
        vueObj.$set(member, 'data', data);
    });
}

function startManageV(vueObj, member, which, mode) {
    switch (mode) {
        case 'replaceAll':
            var updateFn = replaceAllV;
            break;
        default:
            return;
    }
    updateFn(vueObj, member, which);
    window.setInterval(() => {
      shouldFetch(which).then((res) => {
        if (res) { 
            updateFn(vueObj, member, which);
        }
      });
    }, 5000);
}