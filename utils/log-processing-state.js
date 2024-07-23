const client = require('prom-client');
const pushgateway = new client.Pushgateway('http://localhost:9091', { timeout: 20000 });

const processingStateCounter = new client.Counter({
    name: 'get_ranking_processing_state_total',
    help: 'Total de estados de processamento',
    labelNames: ['bubbleId', 'step', 'status']
});

client.collectDefaultMetrics();

async function logProcessingState(bubbleId, step, status, message = '', extraData = {}) {
    processingStateCounter.labels(bubbleId, step, status).inc();

    const logData = {
        bubbleId,
        step,
        status,
        message,
        ...extraData,
        timestamp: new Date()
    };

    const requiredFields = ['bubbleId', 'step', 'status'];
    for (const field of requiredFields) {
        if (!logData[field]) {
            console.warn(`Skipping log due to missing required field: ${field}`);
            return;
        }
    }

    try {
        await pushgateway.pushAdd({ jobName: 'get_ranking_processing_state_total' }, (err, resp, body) => {
            if (err) {
                console.error('Error pushing to Pushgateway:', err);
            } else {
                console.log('Pushed to Pushgateway:', body);
            }
        });
        console.log(`Logged processing state for bubbleId ${bubbleId}:`, logData);
    } catch (error) {
        console.error('Error logging processing state:', error);
    }
}

module.exports = {
    logProcessingState
};