const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const glob = require('glob');




const dist = path.join(__dirname, 'app/messages/');


function csvToLangTs(file) {
    const name = path.basename(file, '.csv').concat('.messages.ts');
    console.log(name);
    const ff = path.join(dist, name)
    let messages = {};

    fastcsv.fromPath(file, {
        ignoreEmpty: true,
        delimiter: ";"
    }).on("data", function (data) {


        try {
            const id = parseInt(data[0]);
            //const desc = data[1];
            const message = (data.length === 3) ? data[2] : '';
            if (message) {
                messages[id] = message;
            }

        } catch (e) {
            console.log(e.message);
        }


    }).on("end", function () {
        try {
            let json = JSON.stringify(messages, null, 4);
            let content = `export const messages: { [propName: number]: string } = ${json}\n`;
            fs.writeFileSync(ff, content)
        } catch (e) {
            console.log(e.message);
        }

    });

}

const filename = path.join(__dirname, 'messages/*.csv');


glob(filename, function (errors, files) {
    files.forEach(file => csvToLangTs(file));
    //files.forEach(file => console.log(file));
});
//const contents = fs.readFileSync(filename, 'utf8');
//console.log(contents);