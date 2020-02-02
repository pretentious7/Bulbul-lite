  
  function generate(){
    let buttonsToGenerate = 100
    var alpha = 1
    for(let i = 0; i < math.sqrt(buttonsToGenerate); i++){
        var row = document.createElement("div")
        row.setAttribute("id", "row"+i)
        document.getElementById('button-container').appendChild(row);
        for(let j = 0; j < math.sqrt(buttonsToGenerate); j++){
            var btn = document.createElement("button");
            btn.setAttribute("id", "button"+i+j)
            btn.setAttribute("class", "gridbutts")
            btn.style.backgroundColor= "revert"
            btn.addEventListener("click", function(evt){
                var x = i
                var y = j
                console.log("x: "+x + "\ny: "+y)

                indarr = [x,y]
                bigmat = incr(indarr, bigmat, 10)
            })
            var t = document.createTextNode(""+i+j);       
            btn.appendChild(t);                                
            // 
            row.appendChild(btn)
    } 
    }

      function multinormal(meanvec, cov, x) {
          k = x._size
          topboi = math.multiply(math.subtract(x, meanvec), math.multiply(math.inv(cov), math.subtract(x, meanvec)))
          dens = math.exp((-1 / 2) * topboi) / (math.sqrt((2 * 3.14159) ^ k * math.det(cov)))
          return dens
      }

      function softmax(arr) {
          return arr.map(function (value, index) {
              return Math.exp(value) / arr.map(function (y /*value*/) { return Math.exp(y) }).reduce(function (a, b) { return a + b })
          })
      }
      
      function incr(point,matrix,beta){
        var covmat = math.matrix([[ 1.0, 0.0],[0.0, 1.0]])
        var row = point[0]
        var matrcopy = []
        console.log(matrix._size)
        l = matrix._size[0]
        pointmat = math.matrix(point)
        matrix = matrix._data
        //change all values according to multigauss schema
        for(let i=0; i<l;i++){
          rowparam = math.add(math.log(matrix[i]),alpha)
          for(let j=0;j<l;j++){
            rowparam[j] += beta*multinormal(pointmat, covmat, math.matrix([i,j]))
          }
          rown = softmax(rowparam)
          matrcopy[i] = rown
        }


        console.log("sdfasd")

        console.log(math.matrix(matrcopy))
        return math.matrix(matrcopy)
      }

      function decr(point, matrix, beta) {
          var row = point[0]
          matrix = matrix._data
          console.log(matrix)
          rowparam = math.add(math.log(matrix[row]), alpha)
          rowparam[point[1]] -= beta
          rown = softmax(rowparam)
          matrix[row] = rown
          console.log(matrix)
          return matrix
      }
      // Fork & examples for the one-line version by @vladimir-ivanov:
      //let softmax = (arr) => (index) => Math.exp(arr[index]) / arr.map(y => Math.exp(y)).reduce((a, b) => a + b);
      //
      // Also see comments for improvements
      function softmax(arr) {
          return arr.map(function (value, index) {
              return Math.exp(value) / arr.map(function (y /*value*/) {
                  return Math.exp(y)
              }).reduce(function (a, b) { return a + b })
          })
      }
  }