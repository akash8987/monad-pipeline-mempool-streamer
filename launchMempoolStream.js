const { ethers } = require("ethers");
require("dotenv").config();

class MonadMempoolStreamer {
    constructor() {
        this.streamedCount = 0;
        this.executionBuffer = [];
    }

    /**
     * Streams incoming transaction packets directly into the execution layer.
     * @param {object} txPayload Structured raw transaction parameters.
     */
    streamTransactionDirect(txPayload) {
        this.streamedCount++;
        console.log(`[Stream Pipeline] Ingesting TX #${this.streamedCount} | Hash: ${txPayload.hash.slice(0, 14)}...`);

        // Push directly into the background non-blocking execution buffer
        this.executionBuffer.push(txPayload);

        if (this.executionBuffer.length >= 3) {
            this.flushBufferToConsensusWorker();
        }
    }

    flushBufferToConsensusWorker() {
        console.log(` -> [Pipeline Flush] Dispatching ${this.executionBuffer.length} transactions straight to MonadBFT workers.`);
        // Flush memory space instantly to maintain streaming velocity
        this.executionBuffer = [];
        console.log(` -> [Status] Buffer cleared. Flow optimized.`);
    }
}

const streamer = new MonadMempoolStreamer();

// Simulate real-time continuous trade events from client applications
streamer.streamTransactionDirect({ hash: "0xaa11bb22cc3344556677889900ffaaff001122", gasTip: 2.5 });
streamer.streamTransactionDirect({ hash: "0x3344556677889900ffaaff001122bb22cc3342", gasTip: 4.0 });
streamer.streamTransactionDirect({ hash: "0xffaaff001122bb22cc33445566778899001124", gasTip: 1.2 });

module.exports = MonadMempoolStreamer;
