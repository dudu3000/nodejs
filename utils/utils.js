const fs = require('fs')


async function parseLogin(response){
    let res = {
        access_token: "",
        refresh_token: ""
    };
    res.access_token = response.access_token;
    res.refresh_token = response.refresh_token

    return res;
};


async function parsePatientData(response){
    let patientData = [];
}

function writeTokenInENVFile(token){
    let envFile = fs.readFileSync(".env", "utf8");
    let newEnvFile = envFile.substring(0, envFile.indexOf("TOKEN"));
    newEnvFile += "TOKEN=" + token;
    fs.writeFileSync(".env", newEnvFile, "utf8");

}


module.exports = {
    parseLogin: async(response)=>{
        return await parseLogin(response);
    },
    parsePatientData: async(response)=>{
        return await parsePatientData(response);
    },
    writeTokenInENVFile: function(token){
        return writeTokenInENVFile(token);
    }
};