//number of notes
timevar = 100
timetracker = -timevar
//button to init program
window.onload = function(){
    document.querySelector('button').addEventListener('click', () => initialise())
}
//main program
function initialise(){
//add to timetracker till == timevar
timetracker += timevar
//init matrix with probabilities
genmatrix = math.matrix([[0.15, 0.35, 1./4, 0., 1./4, 0.],
    [0.5, 0.1, 0., 0.4, 0.0, 0.],
    [0., 0., 0., 1./4, 1./4, 1./2],
    [1./16, 0., 1./4+1./8, 1./4, 1./4, 1./16],
    [0., 0., 0.4, 1./4, 0.25, 0.1],
    [0., 0., 0., 1./4, 1./2, 1./4]])
//array to determine notes
initvec = math.matrix([1.,0.,0.,0.,0.,0.])
//multiply matrices to get new probabilities
prod = math.multiply(initvec,genmatrix)
//assign value to array that plays note
notevec = initvec
//get timevar amount of notes
for (var i = 0; i <= timevar; i++){
    //new probabilities
    prod = math.multiply(notevec,genmatrix)
    //assign value to array that plays note
    notevec = getnote(prod)
    //function trigger notes
    notes(i)
}
//function that triggers notes
function notes(a){
    //init synth tone
    var synth = new Tone.Synth().toMaster()
    //log value of array
    console.log(notevec._data)
    //dict with notes
    var NoteDict = {
        0: "G3",
        1: "A#3",
        2: "C3",
        3: "D3",
        4: "F3",
        5: "G3",
        6: "A#3"
    }
//check which value is == 1
var i
for(i = 0; i <= 5; i++){
    if (notevec._data[i] == 1){
        break
    }
}
console.log(i)
//trigger note
synth.triggerAttackRelease(NoteDict[i], "8n", a/4+timetracker);
}

function getnote(v){

    randno = math.random()

    v_ind = [0,1,2,3,4,5]

    sel = 0 

    sumfore = 0

    for(var i=0;i<=v._size[0];i++){
        sumfore = sumfore + v._data[i]
        if(randno<sumfore){
            sel = i
            break
        }
    }
    vret = math.zeros(v._size[0])
    vret._data[i] = 1

    return vret
}
//keydown eventlistener
window.addEventListener("keydown", keysPressed, false);


keys_pressed=[0,0]
keys_reset_counter=0
function keysPressed(e) {
    // store an entry for every key pressed
    keys_reset_counter++
    if(keys_reset_counter%2==0){
        keys_pressed = [e,0]}
    else{
        keys_pressed[1] = e
    }
    //assign keypress number to rowswitch function
    if(keys_reset_counter%2!=0){
            if(keys_pressed[0].keyCode>=49 && keys_pressed[0].keyCode<=54 && keys_pressed[1].keyCode>=49 && keys_pressed[1].keyCode<=54){
               genmatrix = rowswitch(keys_pressed[0]-49,keys_pressed[1]-49,genmatrix)
               console.log(genmatrix)
            }
    }

}

function rowswitch(i1,i2,mat){
    //take mat, construct row switching mat.
    console.log(mat._size)
    rowswitcher = math.identity(mat._size)
    storage = rowswitcher[i2]
    rowswitcher[i2] = rowswitcher[i1]
    rowswitcher[i1] = storage
    return math.multiply(rowswitcher, mat)
}

function colswitch(i1,i2,mat){
    //take matrice, construct col seitching matrice
  colswitcher = math.identity(mat._size)
  storage = colswitcher[i2]
  colswitcher[i2] = colswitcher[i1]
  colswitcher[i1] = storage
  return math.multiply(mat,colswitcher)
}
}
