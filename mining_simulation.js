const crypto = require("crypto");

class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.timestamp = new Date().toISOString();
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const blockString = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
        return crypto.createHash('sha256').update(blockString).digest('hex');
    }

    mineBlock(difficulty) {
        const target = Array(difficulty + 1).join("0");
        console.log(`Mining block with difficulty ${difficulty}...`);

        const startTime = Date.now();
        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        const endTime = Date.now();
        console.log(`✅ Block mined: ${this.hash}`);
        console.log(`Nonce: ${this.nonce}`);
        console.log(`⏱ Time taken: ${(endTime - startTime) / 1000}s`);
    }
}

// Example mining
let block = new Block(1, "Mining Simulation Block", "0");
block.mineBlock(4);
