var playLMCounter = 0
window.onload = function () {
    document.getElementById('play-button').onclick = function(){
        playLMCounter++
        initialise()
        if(playLMCounter%2 == 0){
        document.getElementById('play-button').innerHTML = '▶️'
        }else{
            document.getElementById('play-button').innerHTML = '⏸️'
        }
    }
    generate()
}
var growl = new Tone.Sampler({
			"A0" : "A0.mp3",
			"C1" : "C1.mp3",
			"D#1" : "Ds1.mp3",
			"F#1" : "Fs1.mp3",
			"A1" : "A1.mp3",
			"C2" : "C2.mp3",
			"D#2" : "Ds2.mp3",
			"F#2" : "Fs2.mp3",
			"A2" : "A2.mp3",
			"C3" : "C3.mp3",
			"D#3" : "Ds3.mp3",
			"F#3" : "Fs3.mp3",
			"A3" : "A3.mp3",
			"C4" : "C4.mp3",
			"D#4" : "Ds4.mp3",
			"F#4" : "Fs4.mp3",
			"A4" : "A4.mp3",
			"C5" : "C5.mp3",
			"D#5" : "Ds5.mp3",
			"F#5" : "Fs5.mp3",
			"A5" : "A5.mp3",
			"C6" : "C6.mp3",
			"D#6" : "Ds6.mp3",
			"F#6" : "Fs6.mp3",
			"A6" : "A6.mp3",
			"C7" : "C7.mp3",
			"D#7" : "Ds7.mp3",
			"F#7" : "Fs7.mp3",
			"A7" : "A7.mp3",
			"C8" : "C8.mp3"
		}, {
			"release" : 1,
			"baseUrl" : "./audio/"
        }).toMaster();
    growl.volume.value = -3;
    var synth2 = new Tone.Sampler({
        "G3": "Light_G3.wav",
        "A#3": "Light_As3.wav",
        "C3": "Light_C3.wav",
        "D3": "Light_D3.wav",
        "F3": "Light_F3.wav",
        "G4": "Light_G4.wav",
        "A#4": "Light_As4.wav"
    }, {
        "release" : 1,
		"baseUrl" : "./audio/"
    }).toMaster();
    synth2.volume.value = 7

    var synth3 = new Tone.Sampler({
        "G3": "PlongG3.wav",
        "A#3": "PlongAs3.wav",
        "C3": "PlongC3.wav",
        "D3": "PlongD3.wav",
        "F3": "PlongF3.wav",
        "G4": "PlongG4.wav",
        "A#4": "PlongAs4.wav"
    }, {
        "release" : 1,
		"baseUrl" : "./audio/"
    }).toMaster();
    synth3.volume.value = 3

Tone.Transport.bpm.value = 65;
var drum = new Tone.Sampler({
    "G3": "Drum01.wav",
    // "A#3": "Drum01.wav",
    // "C3": "Drum01.wav",
    // "D3": "Drum03.wav",
    // "F3": "Drum03.wav",
    // "G4": "Drum03.wav",
    // "A#4": "Drum01.wav"
}, {
    "release": 1,
    "baseUrl": "./audio/"
}).toMaster()
var drum2 = new Tone.Sampler({
    //"G3": "Drum01.wav",
    // "A#3": "Drum01.wav",
    // "C3": "Drum01.wav",
    "D3": "Drum03.wav",
    // "F3": "Drum03.wav",
    // "G4": "Drum03.wav",
    // "A#4": "Drum01.wav"
}, {
    "release": 1,
    "baseUrl": "./audio/"
}).toMaster()
drum2.volume.value = -5
//main program
function initialise() {

    //add to timetracker till == timevar
    // if (playSketch == true){
    //     Tone.Transport.toggle(0);
    // }else if(playSketch == false){
    //     Tone.Transport.off();
    // }
    Tone.Transport.cancel()
    Tone.Transport.toggle()
    //init matrix with probabilities
    genmatrix = math.matrix([
        [0.21, 0.26, 0.16, 0.18, 0.19],
        [0.19, 0.24, 0.18, 0.18, 0.21],
        [0.25, 0.05, 0.50, 0.10, 0.10],
        [0.14, 0.10, 0.15, 0.50, 0.11],
        [0.50, 0.25, 0.12, 0.06, 0.07]
    ])
    genmatrix_t = math.matrix([
        [0.25, 0.125, 0.25, 0.25, 0.125],
        [0.05, 0.25, 0.35, 0.35 / 2, 0.35 / 2],
        [0.05, 0.15, 0.4, 0.2, 0.2],
        [0.1, 0.1, 0.2, 0.4, 0.2],
        [0.1, 0.1, 0.1, 0.2, 0.5]
    ])

    genmatrix = math.multiply(1/2,genmatrix)
    genmatrix_t = math.multiply(1/2,genmatrix_t)

    idents = genmatrix_t

    bigmat = []
    var alpha = 1
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
            4: "F3"
        }
        var NoteDict3 = {
            0: "G2",
            1: "A#2",
            2: "C2",
            3: "D2",
            4: "F2"
        }
        var NoteDict2 = {
            0: "G1",
            1: "A#1",
            2: "C1",
            3: "D1",
            4: "F1"
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
        synth.volume.value = -7

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

        inittime = math.matrix([0, 0, 1, 0, 0])
        initvec = math.matrix([1., 0., 0., 0., 0.])
        biginit = math.concat(initvec,inittime)

        biginit = [1.,0,0,0,0,0,0,0,0,0]

        notevec = initvec
        timevec = inittime

        var loop = new Tone.Loop(function (time) {
            console.log(time)
            prod = math.multiply(biginit,bigmat)
            //assign value to array that plays note
            notevec = getnote(math.subset(prod, math.index(math.range(0,5))))
            timevec =  getnote(math.subset(prod, math.index(math.range(5,10))))
            var i
            for (i = 0; i <= 4; i++) {
                if (notevec._data[i] == 1) {
                    break
                }
               
            }
            var j = 0
            for (j = 0; j <= 4; j++) {
                if (timevec._data[j] == 1) {
                    break
                }
               
            }
            //console.log(TimeDict[j])
            entry_var = TimeDict[j]

            console.log(bigmat)

            var getButton = document.getElementById("row"+getUnityIndex(getnote(prod))).getElementsByTagName("button")
            for (const element of getButton){
                var orig = "#47a7f5";
                element.style.backgroundColor = "#0960b5"
                setTimeout(function(){
                element.style.backgroundColor = orig
            }, 500);
                //element.style.backgroundColor = "#0960b5"
            }

            synth3.triggerAttackRelease(NoteDict[i], entry_var)
            synth.triggerAttackRelease(NoteDict3[i], entry_var) //a/(j+1) + timetracker );
            loop.interval = entry_var;
            biginit = getnote(prod)
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
            var getButton = document.getElementById("row"+getUnityIndex(getnote(prod))).getElementsByTagName("button")
            for (const element of getButton){
                var orig = "#47a7f5";
                element.style.backgroundColor = "#F27B13"
                setTimeout(function(){
                element.style.backgroundColor = orig
            }, 500);
                //element.style.backgroundColor = "#F27B13"
            }
            drum.triggerAttackRelease(NoteDict[i], '8n')
            loop2.interval = entry_var;
            biginit = getnote(prod)
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
            }
            entry_var = TimeDict[j]

            Notes_chord = []
            for(var m=0;m<=2;m++){
                Notes_chord[m] = NoteDict[trenote_num[m]]
            }

            console.log('chord')
            var getButton = document.getElementById("row"+getUnityIndex(getnote(prod))).getElementsByTagName("button")
            for (const element of getButton){
                var orig = "#47a7f5";
                element.style.backgroundColor = "red"
                setTimeout(function(){
                element.style.backgroundColor = orig
            }, 500);
                //element.style.backgroundColor = "red"
            }

            growl.triggerAttackRelease(Notes_chord[0], '1n')
            growl.triggerAttackRelease(Notes_chord[1], '1n')
            growl.triggerAttackRelease(Notes_chord[2], '1n')

            biginit = getnote(prod)

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
            console.log(getnote(prod))
            argh = getnote(prod)
            console.log(prod)
            console.log(getUnityIndex(argh))
            var getButton = document.getElementById("row"+getUnityIndex(getnote(prod))).getElementsByTagName("button")
            for (const element of getButton){
                var orig = "#47a7f5";
                element.style.backgroundColor = "#9223FF"
                setTimeout(function(){
                element.style.backgroundColor = orig
            }, 500);
            }
            synth2.triggerAttackRelease(NoteDict[i], entry_var)
            drum2.triggerAttackRelease(NoteDict[i], entry_var)
            loop4.interval = entry_var;

            biginit = getnote(prod)

        }, '4n').start(0);
    }

    function getnote(v) {

        sumtot = math.sum(v)

        v = math.multiply(1/sumtot,v)

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

    function getUnityIndex(matarr){
        for(let m=0;m<matarr._size[0];m++){
            if(matarr._data[m]>=0.99){
                return m
            }
        }
    }
}
