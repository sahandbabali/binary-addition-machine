// inspired by an example from https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319 book

// binary addition in Javascript from:
// https://stackoverflow.com/questions/40353000/javascript-add-two-binary-numbers-returning-binary


var a = "000010100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101"
var b = "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011"
var answer = "110111101100010011000101110110100000011101000101011001000011011000001100011110011010010011000000000";

//var row1 = "01100101"
//var row2 = "10110110"
//var result = "100011011";


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




//console.log(addBinary(a, b) == answer); //true

//console.log(addBinary(row1, row2) == result); //true

var checkboxes = document.querySelectorAll("input[type=checkbox]");
let inputnumbers = []
let row1 = []
let row2 = []
let result;


checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        inputnumbers = []
        row1 = []
        row2 = []

        checkboxes.forEach(function (checkbox) {



            if (checkbox.checked == true) {
                inputnumbers.push(1)
            } else if (checkbox.checked == false) {
                inputnumbers.push(0)

            }
        })

        row1 = inputnumbers.slice(0, 8)
        row2 = inputnumbers.slice(8)


        // console.log(inputnumbers)
       //  console.log(row1 , row2)
         console.log(row1.join(""));
         console.log(row2.join(""));


         // calculate the result 
         result = addBinary(row1.join(""), row2.join(""))
         console.log(result)
         console.log("_______________")



         // update the ui



    })
});