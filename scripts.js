var input = document.getElementById("input");

var answer = document.getElementById("answer");

var explanation = document.getElementById("explanation");

var resetButton = document.getElementById("button");

function reset(){
input.value = "";
  answer.textContent ="";
   explanation.textContent ="";
}

function convertToRoman() {
  var num = document.getElementById("input").value;
  function error(){
    answer.textContent = "Please enter a number between 0 and 4999."
    explanation.textContent = "";
  }
 if(num.length == 0 || num.length > 4 || num >= 5000 || num <= 0){
error();
 } else {
let vinculum = {
1: ["M", "MM", "MMM", "MMMM"], 
2: ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
3: ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
4: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
}
var result = [];
  var numArray = Array.from(num.toString()).map(function(x){
  return parseInt(x, 16);
  }); // This uses various methods to convert the full inputed number into an array of indiviual numbers.
  if(numArray[0] == 0){
    reset();
  }
    
  while (numArray.length != 4){
  numArray.unshift(0); //This while loop adds zeros to the front of the numArray array until it is always 4 values long.
  }  
  function checker (one, two){ //one is the (zero indexed) index number of numArray, two is the key/ property name of vinculum that this is accessing. 
if(numArray[one] !=0){ //If the value at the numArray index we are checking is 0 we just skip it.
result.push(vinculum[two][numArray[one]-1]); //Access the property of vinculum specified in second parameter then use the number itself found at the index number of numArray specified in first parameter to find the Roman number value you need in the vinculum property you are accessing. Since arrays are zero indexed, the -1 is necessary to get this right, push this value into result. If all this is too complicated just get rid of these comments to make it clearer. 
}}
 checker (0, 1); // Use recursion to call it 4 times for dryer code to create an array
checker (1, 2); 
checker (2, 3); 
checker (3, 4);
   
answer.textContent = result.toString().replace(/,/g, ""); //Turn result to a string then regex to cut out the commas.; 
 
var one = result[0] + " = " + num.split("")[0];
   
var ten = (num.split("")[1] == 0) ? "" : result[1] + " = " + num.split("")[1];
   
var hundred = (num.split("")[2] == 0) ? "" : (num.split("")[1] == 0 && num.split("")[2] > 0) ? result[1] + " = " + num.split("")[2] : result[2] + " = " + num.split("")[2];
     
var thousand = (num.split("")[3] == 0) ? "" : (num.split("")[1] > 0 && num.split("")[2] == 0 && num.split("")[3] > 0) ? result[2] + " = " + num.split("")[3] : (num.split("")[1] == 0 && num.split("")[2] > 0 && num.split("")[3] > 0) ? result[2] + " = " + num.split("")[3] : (num.split("")[1] == 0 && num.split("")[2] == 0 && num.split("")[3] > 0) ? result[1] + " = " + num.split("")[3] : result[3] + " = " + num.split("")[3]; //This group of complex ternary operators determine which parts of the roman numeral are matched up with which parts of the number to form the explanation in the third box, they look at all layouts to take zeroes into account.
   
var zeroCalcHundred = (ten == "") ? "" : "0";
   
var zeroCalcThousand = (ten == "") ? "" : "00";
   
var zeroCalcThousandTwo = (hundred == "") ? "" : "0";  //These 3 vars determine how many zeros are added to the numbers in the explanation row, taking into account all possibilities and positions of existing zeroes so there are not extra zeroes. 

if (num.split("").length == 1) {
explanation.textContent = one;
} else if (num.split("").length == 2) { 
explanation.textContent = one + "0" + " " + ten;
} else if (num.split("").length == 3) { 
explanation.textContent = one + "00" + " " + ten +  zeroCalcHundred + " " + hundred;
} else if (num.split("").length == 4) {
explanation.textContent = one + "000" + " " + ten +  zeroCalcThousand + " " + hundred + zeroCalcThousandTwo + " " + thousand;
}}}//This mass of ifs determines the contents of the third box using the above vars. 

