const crypto = require("crypto");

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const blockString = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
        return crypto.createHash('sha256').update(blockString).digest('hex');
    }
}

// Create blockchain with 3 linked blocks
let genesisBlock = new Block(0, new Date().toISOString(), "Genesis Block", "0");
let block1 = new Block(1, new Date().toISOString(), "Second Block", genesisBlock.hash);
let block2 = new Block(2, new Date().toISOString(), "Third Block", block1.hash);

let blockchain = [genesisBlock, block1, block2];

// Print blockchain
console.log("Initial Blockchain:");
blockchain.forEach(block => console.log(JSON.stringify(block, null, 2)));

// Tamper block1
console.log("\nTampering Block 1...");
block1.data = "Hacked Data";
block1.hash = block1.calculateHash();

// Print after tampering
console.log("\nBlockchain After Tampering:");
blockchain.forEach(block => console.log(JSON.stringify(block, null, 2)));
