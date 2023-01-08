// inspired by an example from https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319

// binary addition in Javascript from:
// https://stackoverflow.com/questions/40353000/javascript-add-two-binary-numbers-returning-binary



let resetbutton = document.getElementById("resetbutton").addEventListener('click' , function(e){

    let inputnumbers = []
    let row1 = []
    let row2 = []
    let result = 000000000;
    let resultrow 

     checkboxes.forEach(function (checkbox) {
            checkbox.checked = false
     })


     document.querySelectorAll(".odometer").forEach(function (digit) {
        digit.innerText = 0
 })

})


function halfAdder(a, b) {
    const sum = xor(a, b);
    const carry = and(a, b);
    return [sum, carry];
}

function fullAdder(a, b, carry) {
    halfAdd = halfAdder(a, b);
    const sum = xor(carry, halfAdd[0]);
    carry = and(carry, halfAdd[0]);
    carry = or(carry, halfAdd[1]);
    return [sum, carry];
}

function xor(a, b) { return (a === b ? 0 : 1); }
function and(a, b) { return a == 1 && b == 1 ? 1 : 0; }
function or(a, b) { return (a || b); }

function addBinary(a, b) {

    let sum = '';
    let carry = '';

    for (var i = a.length - 1; i >= 0; i--) {
        if (i == a.length - 1) {
            //half add the first pair
            const halfAdd1 = halfAdder(a[i], b[i]);
            sum = halfAdd1[0] + sum;
            carry = halfAdd1[1];
        } else {
            //full add the rest
            const fullAdd = fullAdder(a[i], b[i], carry);
            sum = fullAdd[0] + sum;
            carry = fullAdd[1];
        }
    }

    return carry ? carry + sum : sum;
}

var checkboxes = document.querySelectorAll("input[type=checkbox]");
let inputnumbers = []
let row1 = []
let row2 = []
let result = 000000000;
let resultrow

let change = function (e) {

    if (e.target.checked == true) {
        e.target.previousElementSibling.innerText = '1'

    } else if (e.target.checked == false) {

        e.target.previousElementSibling.innerText = '0'
    } 

    inputnumbers = []
    row1 = []
    row2 = []

    checkboxes.forEach(function (checkbox2) {

       if (checkbox2.checked == true) {
            inputnumbers.push(1)
        } else if (checkbox2.checked == false) {
            inputnumbers.push(0)
        } 
    })

    row1 = inputnumbers.slice(0, 8)
    row2 = inputnumbers.slice(8)

     // calculate the result 
     result = addBinary(row1.join(""), row2.join(""))

     // pad result
     result = ('0' + result).slice(-9)

     // update the ui

     resultrow =  document.querySelectorAll(".reslamp")
     // console.log(resultrow)
     

     for (let index = 0; index < resultrow.length; index++) {
            resultrow[index].innerText = result[index]
     }

}

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', change )
});