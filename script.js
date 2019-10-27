/*[0.15, 0.35, 1./4, 0., 1./4, 0.],
    [0.5, 0.1, 0., 0.4, 0.0, 0.],
    [0., 0., 0., 1./4, 1./4, 1./2],
    [1./16, 0., 1./4+1./8, 1./4, 1./4, 1./16],
    [0., 0., 0.4, 1./4, 0.25, 0.1],
    [0., 0., 0., 1./4, 1./2, 1./4]*/

//number of notes
//button to init program
window.onload = function () {
    document.getElementById('play').addEventListener('click', () => initialise())
}


//main program
function initialise() {
    //add to timetracker till == timevar
    Tone.Transport.start();
    //init matrix with probabilities
    genmatrix = math.matrix([
        [0.21, 0.26, 0.16, 0.18, 0.19],
        [0.19, 0.24, 0.18, 0.18, 0.21],
        [0.25, 0.05, 0.50, 0.10, 0.10],
        [0.14, 0.10, 0.15, 0.50, 0.11],
        [0.50, 0.25, 0.12, 0.06, 0.07]
    ])
    genmatrix_t = math.matrix([
        [0.5, 0, 0.25, 0.25, 0],
        [0.05, 0.25, 0.35, 0.35 / 2, 0.35 / 2],
        [0.05, 0.15, 0.4, 0.2, 0.2],
        [0.1, 0.1, 0.2, 0.4, 0.2],
        [0.1, 0.1, 0.1, 0.2, 0.5]
    ])

    //idents = math.identity(5)
    //idents = math.multiply(1/2,idents)

    genmatrix = math.multiply(1/2,genmatrix)
    genmatrix_t = math.multiply(1/2,genmatrix_t)

    idents = genmatrix_t


    bigmat = []

    console.log(genmatrix)




    for(var i = 0;i<=4;i++){
        matrow = math.concat(genmatrix._data[i],idents._data[i])
        bigmat[i] = matrow
    }

    idents = genmatrix

    for(var i = 0; i<=4; i++){
        matrow = math.concat(idents._data[i],genmatrix_t._data[i])
        bigmat[5+i] = matrow
    }

    bigmat = math.matrix(bigmat)




    //get timevar amount of notes
    control_time = 0
    notes(0)

    //function that triggers notes
    function notes(a) {

        //init synth tone
        var toneNow = new Tone().now();
        var NoteDict = {
            0: "G3",
            1: "A#3",
            2: "C3",
            3: "D3",
            4: "F3",
            5: "G3",
            6: "A#3"
        }
        var NoteDict3 = {
            0: "G2",
            1: "A#2",
            2: "C2",
            3: "D2",
            4: "F2",
            5: "G2",
            6: "A#2"
        }
        var NoteDict2 = {
            0: "G1",
            1: "A#1",
            2: "C1",
            2: "D1",
            4: "F1",
            5: "G1",
            6: "A#1"
        }
        var TimeDict = {
            0: '1:0:0',
            1: '0:2:0',
            2: '0:1:0',
            3: '0:0:2',
            4: '0:0:1'
        }
        var masterCompressor = new Tone.Compressor({
            "threshold" : -8,
            "ratio" : 3,
            "attack" : 0.5,
            "release" : 0.1
        }); 
        var synth = new Tone.PolySynth(8, Tone.Synth, {
            "oscillator":{
                "partials": [0, 2, 3, 4]
            }
        }).toMaster()
        synth.set("detune", math.random(-25, 25));
        synth.volume.value= -5

        BPM = document.getElementById('rangevalue').innerHTML;
        BPM = 50
        BPD = document.getElementById('rvalinp')
        BPD.addEventListener('change',function(evt){
            BPM = document.getElementById('rangevalue').innerHTML
            Tone.Transport.bpm.value = BPM;
        })
        
        a = document.getElementById('left-move')
        //a.onclick = colPushLeft(bigmat)
        a.addEventListener("click",function(evt){
            console.log("sfa")
            bigmat = colPushLeft(bigmat)
            console.log(bigmat)
        });

        b = document.getElementById('right-move')

        b.addEventListener("click",function(evt){
            console.log("sfa")
            bigmat = colPushRight(bigmat)
            console.log(bigmat)
        });

        c = document.getElementById('up-move')
        c.addEventListener("click",function(evt){
            console.log("sfa")
            bigmat = rowPushUp(bigmat)
            console.log(bigmat)
        });

        d = document.getElementById('down-move')
        d.addEventListener("click",function(evt){
            console.log("sfa")
            bigmat = rowPushDown(bigmat)
            console.log(bigmat)
        });




        Tone.Transport.bpm.value = 65;
        var drum = new Tone.MembraneSynth({
            pitchDecay : 0.02 ,
            octaves : 5 ,
            oscillator : {
            type : 'sine'
            } ,
            envelope : {
            attack : 0.01 ,
            decay : 0.4 ,
            sustain : 0.1 ,
            release : 1.4     ,
            attackCurve : 'exponential'
            }
        }).toMaster()
        drum.volume.value=5

        var growl= new Tone.FMSynth({
            harmonicity : 5 ,
            modulationIndex : 10 ,
            detune : -10 ,
            oscillator : {
            type : 'sawtooth',
            } ,
            envelope : {
            attack : 1 ,
            decay : 0.3 ,
            sustain : 0.5 ,
            release : 0.3
            } ,
            modulation : {
            type : 'square'
            } ,
            modulationEnvelope : {
            attack : 1 ,
            decay : 0 ,
            sustain : 0.5 ,
            release : 0.5
            },
            modulation:{
                type: 'sine'
            },
            modulationEnvelope:{
                attack: 0.5,
                decay: 0.5,
                sustain: 0.1,
                release: 0.7
            }
            
        }).toMaster()
        growl.volume.value = 3;

        const synth2 = new Tone.Synth({
            oscillator : {
                type : 'sine'
                } ,
                envelope : {
                attack : 1 ,
                decay : 0.01 ,
                sustain : 0.01 ,
                release : 0.5
                },
                modulation:{
                    type: 'square'
                },
                modulationEnvelope:{
                    attack: 0.7,
                    decay: 0.02,
                    sustain:0.01,
                    release: 0.4
                }
        }).toMaster()
        synth2.volume.value = 1

        inittime = math.matrix([0, 0, 1, 0, 0])
        initvec = math.matrix([1., 0., 0., 0., 0.])
        biginit = math.concat(initvec,inittime)

        notevec = initvec
        timevec = inittime





        var loop = new Tone.Loop(function (time) {
            console.log(time)

            prodnew = math.multiply(biginit,bigmat)
            //assign value to array that plays note

            console.log(prodnew)

            console.log(math.subset(prodnew,math.index(math.range(0,5))))

            notevec = getnote(math.subset(prodnew, math.index(math.range(0,5))))
            timevec =  getnote(math.subset(prodnew, math.index(math.range(5,10))))
            var i
            for (i = 0; i <= 4; i++) {
                if (notevec._data[i] == 1) {
                    break
                }
                else{
                    notevec._data[i] = [1,0,0,0,0]
                }
            }
            var j = 0
            for (j = 0; j <= 4; j++) {
                if (timevec._data[j] == 1) {
                    break
                }
                else{
                    timevec._data[j] = [0,1,0,0,0]
                }
            }
            //console.log(TimeDict[j])
            entry_var = TimeDict[j]

            console.log('key syn')

            synth.triggerAttackRelease(NoteDict3[i], entry_var) //a/(j+1) + timetracker );
            loop.interval = entry_var;
        }, '1n').start(0);

        loop.humanize
        var loop2 = new Tone.Loop(function (time) {

            prod = math.multiply(biginit, bigmat)
            //assign value to array that plays note
            notevec = getnote(math.subset(prod, math.index(math.range(0,5))))
            timevec =  getnote(math.subset(prod, math.index(math.range(5,10))))

            var i
            for (i = 0; i <= 4; i++) {
                if (notevec._data[i] == 1) {
                    break
                }
            }
            for (j = 0; j <= 4; j++) {
                if (timevec._data[j] == 1) {
                    break
                }
            }
            entry_var = TimeDict[j]

            console.log('drum')

            drum.triggerAttackRelease(NoteDict2[i], '8n')
            //loop2.interval = entry_var;
        }, '4n').start(0);


        var loop3 = new Tone.Loop(function(time) {
            prod = math.multiply(biginit, bigmat)

            //assign value to array that plays note
            notevec = getnote(math.subset(prod, math.index(math.range(0,5))))
            timevec =  getnote(math.subset(prod, math.index(math.range(5,10))))

            trenote = []
            trenote_num = []

            for(var i=0;i<=2;i++){
                trenote[i] = getnote(math.subset(prod, math.index(math.range(0,5))))
                
                var j
                for (j = 0; j <= 4; j++) {
                    if (trenote[i]._data[j] == 1) {
                        break
                    }
                }
                trenote_num[i] = j
            }

            for (j = 0; j <= 4; j++) {
                if (timevec._data[j] == 1) {
                    break
                }
                else{
                    timevec._data[j] = [1,0,0,0,0]
                }
            }
            entry_var = TimeDict[j]

            Notes_chord = []
            for(var m=0;m<=2;m++){
                Notes_chord[m] = NoteDict[trenote_num[m]]
            }

            console.log('chord')

            growl.triggerAttackRelease(Notes_chord[0], '1n')
            growl.triggerAttackRelease(Notes_chord[1], '1n')
            growl.triggerAttackRelease(Notes_chord[2], '1n')
        }, '1n').start(0);
        loop3.humanize

        var loop4 = new Tone.Loop(function (time) {
    
            prod = math.multiply(biginit, bigmat)
            //assign value to array that plays note
            notevec = getnote(math.subset(prod, math.index(math.range(0,5))))
            timevec =  getnote(math.subset(prod, math.index(math.range(5,10))))

            var i
            for (i = 0; i <= 4; i++) {
                if (notevec._data[i] == 1) {
                    break
                }
            }
            for (j = 0; j <= 4; j++) {
                if (timevec._data[j] == 1) {
                    break
                }
            }
            entry_var = TimeDict[j]

            console.log('main synth')

            synth2.triggerAttackRelease(NoteDict[i], entry_var)
            loop4.interval = entry_var;
        }, '4n').start(0);

     
        

    }


    function getnote(v) {

        sumtot = math.sum(v)

        v = math.multiply(sumtot,v)

        randno = math.random()
        sel = 0
        sumfore = 0

        for (var i = 0; i <= v._size[0]; i++) {
            sumfore = sumfore + v._data[i]
            if (randno < sumfore) {
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

    keys_pressed = [0, 0]
    keys_reset_counter = 0
    function keysPressed(e) {
        // store an entry for every key pressed
        keys_reset_counter++
        if (keys_reset_counter % 2 == 0) {
            keys_pressed = [e, 0]
        }
        else {
            keys_pressed[1] = e
        }
        //assign keypress number to rowswitch function
        if (keys_reset_counter % 2 != 0) {
            if (keys_pressed[0].keyCode >= 48 && keys_pressed[0].keyCode <= 57 && keys_pressed[1].keyCode >= 48 && keys_pressed[1].keyCode <= 57) {
                bigmat = rowswitch(keys_pressed[0].keyCode - 48, keys_pressed[1].keyCode - 48, bigmat)
                console.log(bigmat)
                console.log(keys_pressed)

            }
        }
        if (keys_reset_counter % 2 != 0) {
            // if (keys_pressed[0].keyCode >= 54 && keys_pressed[0].keyCode <= 57 && keys_pressed[1].keyCode >= 54 && keys_pressed[1].keyCode <= 57) {
            //     genmatrix = colswitch(keys_pressed[0].keyCode - 54, keys_pressed[1].keyCode - 54, genmatrix)
            //     console.log(genmatrix)
            //     console.log(keys_pressed)
            //}
        }
    }

    //switching rows
    function rowswitch(i1, i2, mat) {
        //take mat, construct row switching mat.
        console.log(mat._size)
        rowswitcher = math.identity(mat._size)
        storage = rowswitcher[i2]
        rowswitcher[i2] = rowswitcher[i1]
        rowswitcher[i1] = storage
        return math.multiply(rowswitcher, mat)
    }

    //switching columns
    function colswitch(i1, i2, mat) {
        //take matrice, construct col seitching matrice
        colswitcher = math.identity(mat._size)
        storage = colswitcher[i2]
        colswitcher[i2] = colswitcher[i1]
        colswitcher[i1] = storage
        return math.multiply(mat, colswitcher)
    }
    function rowPushUp(mat){
        ide = math.identity(mat._size[0])
        storage = ide._data[mat._size[0]-1]
        for(var i = mat._size[0]-1; i>0 ;i--){
            console.log('sfa')
            ide._data[i] = ide._data[i-1]
        }
        ide._data[0] = storage
        console.log(ide)
        return math.multiply(ide,mat)
    }

    function rowPushDown(mat){
        ide = math.identity(mat._size[0])
        console.log(mat)
        storage = ide._data[0]
        for(var i = 0;i<(mat._size[0]-1);i++){
            ide._data[i] = ide._data[i+1]
        }
        ide._data[mat._size[0]-1] = storage
        console.log(ide)
        return math.multiply(ide,mat)
    }

    function colPushLeft(mat){
        ide = math.identity(mat._size[0])
        console.log(mat)
        storage = ide._data[0]
        for(var i = 0;i<(mat._size[0]-1);i++){
            ide._data[i] = ide._data[i+1]
        }
        ide._data[mat._size[0]-1] = storage
        console.log(ide)
        return math.multiply(mat,ide)
    }
    
    function colPushRight(mat){
        ide = math.identity(mat._size[0])
        storage = ide._data[mat._size[0]-1]
        for(var i = mat._size[0]-1; i>0 ;i--){
            console.log('sfa')
            ide._data[i] = ide._data[i-1]
        }
        ide._data[0] = storage
        console.log(ide)
        return math.multiply(mat,ide)
    }
}
