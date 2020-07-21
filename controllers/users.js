var users = {};
// var request = require('request-promise');
const axios = require('axios');

function getUsersByPage(pageno) {
    return new Promise((resolve, reject) => {
        // var options = {
        //     'uri': 'https://reqres.in/api/user?page='+ pageno,
        //     'method': 'GET',
        //     'body': {},
        //     "json": true
        // };
        // // console.log("Final url :: "+JSON.stringify(options));
        // axios(options)
        axios.get('https://reqres.in/api/user?page='+pageno)
        .then((apiResponse) => {
            tempdata = apiResponse;
            resolve(tempdata["data"]);
        })
        .catch(err => console.log('Error', err.message));  
    })
}

users.getUsers = function (req, res, next) {

    var pageCount;
    if(req.query.page !== undefined ) {
        getUsersByPage(req.query.page).then((result) => {
            res.send(result);
        })
    }
    else if(req.query.page === undefined) {
        
        getUsersByPage(1).then((result) => {
            pageCount = result.total_pages;
            getAllUsers(pageCount,result,res);
        })
    }
}

async function getAllUsers(total_pages,result,res) {
    
    var totaldata = await getTotalData(result,total_pages);
    res.send(totaldata);
}





users.getUserById = function (userid, req, res) {

    // var options = {
    // 'uri': 'https://reqres.in/api/users',
    // 'method': 'GET',
    // 'body': {},
    // "json": true
    // };
    // axios(options)
    axios.get('https://reqres.in/api/users')
    .then((apiResponse) => {
        searchUserById(apiResponse, userid, res);
    })
    .catch(err => console.log('Error', err.message));
}

async function searchUserById(apiResponse,uid, res) {
    var totalpages = apiResponse["data"]["total_pages"];
    var totaldata = await getTotalData(apiResponse,totalpages);
    var search_result;
    for (let index = 0; index < totalpages; index++) {
        const usersdata = totaldata[index];
        usersdata.forEach(element => {
            if(element["id"] === parseInt(uid)) 
                search_result = element;
        });
    }
    if(!search_result) {
        res.status(404).send("User doesn't exist with the given id");
    }
    res.send(search_result);
}

async function getTotalData(apiResponse,total_pages) {
    var data = [];
    for (let curr_page = 1; curr_page <= total_pages; curr_page++) {
        const ele = await getUsersByPage(curr_page);
        data.push(ele["data"]);
    }
    return data;
}

module.exports = users;