var arr = [1,2,3,4,5]

// arr.forEach(function(val){
//     console.log(val + 2)
// })


// map is used when we want to perform operation but it should return the new array with operation 
// var new_arrr = arr.map(function(val){
    
//     return val;
    
// })

// console.log(new_arrr)



// filter also return the new array with operation not work on main copy 

// x = arr.filter(function(val){
//     if(val > 3){
//         return true;
//     }
//     else {
//         return false;
//     }
// })

// console.log(x)




//find is used to find the first elmenent of duplicate 

// var ans  = arr.find(function(val){
//     if (val === 2) return val;
// })

// console.log(ans)




// object in js 


// var name = "Aditya"
// var age = 20 

// var obj = {
//     name:name,
//     age:age
// }


// console.log(obj.name,obj.age)



async function abcd(){
    var blob = await fetch('https://randomuser.me/api/');
    var ans = await blob.json();


    console.log(ans)
}


abcd();