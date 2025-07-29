const fs = require('fs');
const path = require('path');
require('dotenv').config();

function parseCSV() {
    const filePath = path.resolve(process.env.CSV_PATH || '');
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(Boolean);

    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(v => v.trim());
        const flatObj = {};
        headers.forEach((header, index) => {
            flatObj[header] = row[index] || '';
        });
        data.push(nestObject(flatObj));
    }

    return data;
}

function nestObject(flat) {
    const nested = {};
    for (let key in flat) {
        const parts = key.split('.');
        let current = nested;
        parts.forEach((part, i) => {
            if (i === parts.length - 1) {
                current[part] = flat[key];
            } else {
                current[part] = current[part] || {};
                current = current[part];
            }
        });
    }
    return nested;
}

module.exports = { parseCSV };
