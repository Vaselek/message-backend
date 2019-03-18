const fs = require('fs');
const fileName = './db.json'

let data = [];

module.exports = {
    init() {
        try {
            const fileContent = fs.readFileSync(fileName);
            data = JSON.parse(fileContent);
        } catch (e) {
            data = [];
        }
    },
    getItems(dateTime = null) {
        const messagesLength = 30;
        if (dateTime) {
            const dateTimeObj = new Date(dateTime);
            if (isNaN(dateTimeObj.getTime())) return res.status(404).send('Invalid Date')
            return this.getLastMessages(dateTime);
        }
        return data.sort((a, b)=> (new Date(b.dateTime)).getTime() - (new Date(a.dateTime)).getTime()).slice(0, messagesLength);
    },
    addItem(item) {
        data.push(item);
        this.save();
    },
    getLastMessages(dateTime) {
      return data.filter(message => message.dateTime > dateTime).sort((a, b) => (new Date(b.dateTime)).getTime() - (new Date(a.dateTime)).getTime());
    },
    save() {
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    }
};
