const miner = { name: "Miner1", power: Math.floor(Math.random() * 100) };
const staker = { name: "Staker1", stake: Math.floor(Math.random() * 100) };
const votes = {
    Alice: "Validator1",
    Bob: "Validator2",
    Charlie: "Validator1"
};

console.log("=== Proof of Work ===");
console.log(`Miner power: ${miner.power}`);
console.log("Selected: Validator with highest computational power.\n");

console.log("=== Proof of Stake ===");
console.log(`Staker stake: ${staker.stake}`);
console.log("Selected: Validator with highest token stake.\n");

console.log("=== Delegated Proof of Stake ===");
let voteCounts = {};
for (let voter in votes) {
    let selected = votes[voter];
    voteCounts[selected] = (voteCounts[selected] || 0) + 1;
}
let maxVotes = 0;
let selectedValidator = null;
for (let validator in voteCounts) {
    if (voteCounts[validator] > maxVotes) {
        maxVotes = voteCounts[validator];
        selectedValidator = validator;
    }
}
console.log("Votes:", voteCounts);
console.log(`Selected Delegate: ${selectedValidator} (most votes)\n`);
