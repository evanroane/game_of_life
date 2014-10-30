document.addEventListener('DOMContentLoaded', function(){
  // var matrix = [[0, 0, 0], [1, 1, 1], [0, 0, 0]];

  // var matrix = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //               [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  //               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //               [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  //               [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
  //               [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  //               [0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
  //               [0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
  //               [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  //               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

var matrix = matrixCreator(100, 100)

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


  generateGrid(matrix);

  function generateGrid(matrix){
    var $table = document.querySelector('#grid');
    $table.innerHTML = '';
    matrix.forEach(function(row){ // first time, row => [0, 0, 0]
      // create a tr for the row
      var $tr = document.createElement('tr');
      row.forEach(function(cell){ // first time, cell => 0
        // cell goes into a new td
        // that td goes into a tr
        var $td = createTableCell(cell);
        //$td.textContent = cell;
        $tr.appendChild($td);
        // alternative:
        // $tr.appendChild( createTableCell(cell) );
      });
      // add that tr to the table
      $table.appendChild($tr);
    });
  }

  function createTableCell(value){
    var $td = document.createElement('td');
    // Apply alive or dead class to the td
    if(value === 1){
      $td.classList.add('alive');
    } else {
      $td.classList.add('dead');
    }
    return $td;
  }

  function neighbors(x, y){

    var pNeighbors = [[x-1, y-1], [x-1, y], [x-1, y+1], [x, y-1], [x, y+1], [x+1, y-1], [x+1, y], [x+1, y+1]];
    //Who are my neighbors?
    var realNeighbors = [];
    for (var i = 0; i < pNeighbors.length; i++){
      if (pNeighbors[i][0] >= 0 && pNeighbors[i][1] >= 0 && pNeighbors[i][0] < matrix.length && pNeighbors[i][1] < matrix[pNeighbors[i][0]].length){
          realNeighbors.push(matrix[pNeighbors[i][0]][pNeighbors[i][1]]);
      }
    }
    return neighborValues(realNeighbors);
  }

  function neighborValues(realNeighbors){
    var neighborVal = 0;
    for (var i = 0; i < realNeighbors.length; i++){
      if (realNeighbors[i] === 1){
        neighborVal += 1; //add each array element together
      }
    }
    return neighborVal;
  }

  function calculateNextState(currentState){
    var nextCellState;
    var nextState = [];
    currentState.forEach(function(currentRow, x){
      var nextRow = [];
      currentRow.forEach(function(currentCell, y){

        var aliveNeighbors = neighbors(x, y);
        if (aliveNeighbors < 2){  // Rule 1. Less than 2 neighbors = die of loneliness
          nextCellState = 0
        } else if (aliveNeighbors > 3) {  // Rule 3. More than 3 neighbors = death by overpopulation
          nextCellState = 0
          } else if (aliveNeighbors === 3){ // Rule 4. Exactly 3 neighbors = birth
            nextCellState = 1
            } else if (aliveNeighbors === 2){  // Rule 2. Things stay the same unless they change (inertia)
             nextCellState = currentCell;
              }
        nextRow.push(nextCellState);
      });
      nextState.push(nextRow);
    });
    return nextState;
  }

  document.querySelector("#tick").addEventListener('click', function(){

    matrix = calculateNextState(matrix);
    generateGrid(matrix);
  });

function nextCycle (){
  matrix = calculateNextState(matrix);
  generateGrid(matrix);

}
setInterval(nextCycle, 75);

});
