document.addEventListener('DOMContentLoaded', function(){

var matrix = matrixCreator(3, 3)

function generate(matrix){
  var $table = document.getElementById("element");
  for(var i = 0; i < matrix.length; i++){
    var $newRow = document.createElement("tr");
    for(var j = 0; j < matrix[i].length; j++){
      var $newCell = document.createElement("td");
      $newCell.textContent = matrix[i][j];
      $newRow.appendChild($newCell);
    }
    $table.appendChild($newRow);
    console.log(matrix)
  }
}

function matrixCreator(x, y){
  var matrix = [];
  for(var i = 0; i < x; i++){
    matrix[i] = [];
    for(var j = 0; j < y; j++){
      matrix[i][j] = Math.round(Math.random())
    }
  }
  return matrix
}

generate(matrix);

});

// function createTabelVell(value){
//   var $td = document.createElement('td');
//   // $td.textContent=value;
//   //Apply alive or dead class
//   if(value === 1){
//     $td.classList.add('alive');
//   } else {
//     $td.classList.add('dead')
//   }
// }



// a. Create table element
// b. define a starting data structure
// c. function(matrix)
//   clear old state
//   update matrix
//   generate the tr and td
//     for(var i=0; i < matrix.length; i++)
//       generate tr element
//       for(var j=0; j < matrix[i].length)
//         generate td
//
//
//
// for each
// array.forEach(function(item){})
