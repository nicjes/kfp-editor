const express = require('express')
const { spawn } = require('child_process');

const app = express();

app.get('/', (req, res) => {
    const pythonProcess = spawn('python', ['./src/scripts/comparison.py']);
    var d = '';
    var e = '';

    pythonProcess.stdout.on('data', data => {
        d += data.toString();
    });

    pythonProcess.stderr.on('data', data => {
        e += data.toString();
    });

    pythonProcess.on('close', code => {
        res.json({ code: code, data: d, error: e });
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));