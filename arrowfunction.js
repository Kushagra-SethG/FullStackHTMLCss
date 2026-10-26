const sum = (a, b) => a + b;
console.log(sum(10, 12));

let arr = [1, 2, 3, 4, 5];
console.log(arr.map(x => x*2));

let nArr = arr.map((n)=>{return n*2;});
console.log(nArr);

nArr = arr.filter( n => n>3);
console.log(nArr);

nArr = arr.reduce((acc, n) => acc + n, 0);
console.log(nArr);

nArr = arr.find(n => n>1);
console.log(nArr);