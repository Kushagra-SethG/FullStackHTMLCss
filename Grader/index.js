const testScores = [85, 92, 78, 96, 88];
const total = testScores.reduce((sum, score) => sum + score, 0);
const average = total / testScores.length;

console.log(`Average test score: ${average}`);