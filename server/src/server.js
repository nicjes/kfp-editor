const express = require('express')
const { spawn } = require('child_process');

const app = express();

app.get('/api/kfp/compile', (req, res) => {
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
        if (code === 0) {
            res.sendFile('v1_pipeline.yaml', { root: 'out' });
        } else {
            res.status(500).json({ error: e });
        }
    });
});

app.listen(5000, () => console.log('Server running on port 5000'));