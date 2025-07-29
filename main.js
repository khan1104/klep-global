const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { parseCSV } = require('./utils/csv_to_json');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const PORT=3000
app.get('/upload', async (req, res) => {
    const users = parseCSV();

    const ageGroups = {
        '<20': 0,
        '20-40': 0,
        '40-60': 0,
        '>60': 0,
    };

    for (const user of users) {
        const fullName = `${user.name?.firstName || ''} ${user.name?.lastName || ''}`;
        const age = parseInt(user.age);

        const { name, age: _a, address, ...additionalInfo } = user;

        if (age < 20) ageGroups['<20']++;
        else if (age <= 40) ageGroups['20-40']++;
        else if (age <= 60) ageGroups['40-60']++;
        else ageGroups['>60']++;

        await prisma.user.create({
            data: {
                name: fullName.trim(),
                age: age,
                address: address || {},
                additionalInfo: additionalInfo || {},
            },
        });
    }

    const total = Object.values(ageGroups).reduce((a, b) => a + b, 0);

    console.log('Age Group % Distribution:');
    for (const [group, count] of Object.entries(ageGroups)) {
        const percent = ((count / total) * 100).toFixed(2);
        console.log(`${group}: ${percent}%`);
    }

    res.status(201).send('task is completed');
});

app.listen(PORT, () => {
    console.log(`Server running on port number ${PORT}`);
});
