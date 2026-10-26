let arr = [1, 2, 3, 4, 5, 6 , 7, 8, 9, 10];
let primes = arr.filter(num => {
    if(num < 2) return false;
    for(let i = 2; i <= Math.sqrt(num); i++){
        if(num % i == 0) return false;
        else{
            return i;
        }
    }           
})