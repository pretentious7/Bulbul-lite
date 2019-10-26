window.onload = function(){
    document.querySelector('button').addEventListener('click', () => initialise())
}
// function initialise(){
//     var synth = new Tone.Synth().toMaster();

//     //play a middle 'C' for the duration of an 8th note
//     synth.triggerAttackRelease("C4", "8n");
// }
function initialise(){

const genmatrix = math.matrix([[0.15, 0.35, 1./4, 0., 1./4, 0.],
    [0.5, 0.1, 0., 0.4, 0.0, 0.],
    [0., 0., 0., 1./4, 1./4, 1./2],
    [1./16, 0., 1./4+1./8, 1./4, 1./4, 1./16],
    [0., 0., 0.4, 1./4, 0.25, 0.1],
    [0., 0., 0., 1./4, 1./2, 1./4]])

initvec = math.matrix([1.,0.,0.,0.,0.,0.])

prod = math.multiply(initvec,genmatrix)

notevec = initvec

for (var i = 0; i <= 20; i++){

    prod = math.multiply(notevec,genmatrix)

    notevec = getnote(prod)

    notes()
}
function notes(){
    var synth = new Tone.Synth().toMaster()
    console.log(notevec._data)
    var NoteDict = {
        0: "C3",
        1: "D3",
        2: "E3",
        3: "F3",
        4: "G3",
        5: "A3",
        6: "B3"
    }
var i
for(i = 0; i <= 5; i++){
    if (notevec._data[i] == 1){
        break
    }
}
console.log(i)
synth.triggerAttackRelease(NoteDict[i], "8n");
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
}
