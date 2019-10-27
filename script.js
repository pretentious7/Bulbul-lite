/*[0.15, 0.35, 1./4, 0., 1./4, 0.],
    [0.5, 0.1, 0., 0.4, 0.0, 0.],
    [0., 0., 0., 1./4, 1./4, 1./2],
    [1./16, 0., 1./4+1./8, 1./4, 1./4, 1./16],
    [0., 0., 0.4, 1./4, 0.25, 0.1],
    [0., 0., 0., 1./4, 1./2, 1./4]*/

//number of notes
timevar = 100
timetracker = -timevar

//button to init program
window.onload = function () {
    document.getElementById('play').addEventListener('click', () => initialise())
}
//main program
function initialise() {
    //add to timetracker till == timevar
    
   
    //myKnob.setPeaks(150);
    
    Tone.Transport.start();
    timetracker += timevar
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
        var NoteDict2 = {
            0: "G1",
            1: "A#1",
            2: "C1",
            3: "D1",
            4: "F1",
            5: "G1",
            6: "A#1"
        }
        var TimeDict = {
            0: '2n',
            1: '4n',
            2: '8n',
            3: '16n',
            4: '32n'
        }
            
        var synth = new Tone.PolySynth(8, Tone.Synth, {
            "oscillator":{
                "partials": [0, 2, 3, 4]
            }
        }).toMaster()
        synth.set("detune", math.random(-25, 25));
        
        BPM = document.getElementById('rangevalue').innerHTML;
        BPD = document.getElementById('rvalinp')
        BPD.addEventListener('change', function (evt) {
            console.log('sfsdfsd')
            BPM = document.getElementById('rangevalue').innerHTML
        });
        console.log(BPM)
        Tone.Transport.bpm.value = BPM;
        var drum = new Tone.MembraneSynth().toMaster()
        var loop = new Tone.Loop(function (time) {
            console.log(time)
            inittime = math.matrix([0, 0, 1, 0, 0])
            //array to determine notes
            initvec = math.matrix([1., 0., 0., 0., 0.])
            //multiply matrices to get new probabilities
            prod = math.multiply(initvec, genmatrix)
            //assign value to array that plays note
            notevec = initvec
            timevec = inittime
            prod = math.multiply(notevec, genmatrix)
            prod_t = math.multiply(timevec, genmatrix_t)
            //assign value to array that plays note
            notevec = getnote(prod)
            timevec = getnote(prod_t)
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
            newvar = j + 1
            synth.triggerAttackRelease(NoteDict[i], entry_var) //a/(j+1) + timetracker );
            loop.interval = entry_var;
        }, '8n').start(0);
        loop.humanize
        var loop2 = new Tone.Loop(function (time) {
            inittime = math.matrix([0, 0, 1, 0, 0])
            //array to determine notes
            initvec = math.matrix([1., 0., 0., 0., 0.])
            //multiply matrices to get new probabilities
            prod = math.multiply(initvec, genmatrix)
            //assign value to array that plays note
            notevec = initvec
            var i
            for (i = 0; i <= 4; i++) {
                if (notevec._data[i] == 1) {
                    break
                }
            }
            drum.triggerAttackRelease(NoteDict2[i], '1n')
        }, '8n').start(0);
    }

    function getnote(v) {

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
            if (keys_pressed[0].keyCode >= 49 && keys_pressed[0].keyCode <= 53 && keys_pressed[1].keyCode >= 49 && keys_pressed[1].keyCode <= 53) {
                genmatrix = rowswitch(keys_pressed[0].keyCode - 49, keys_pressed[1].keyCode - 49, genmatrix)
                console.log(genmatrix)
                console.log(keys_pressed)

            }
        }
        if (keys_reset_counter % 2 != 0) {
            if (keys_pressed[0].keyCode >= 54 && keys_pressed[0].keyCode <= 57 && keys_pressed[1].keyCode >= 54 && keys_pressed[1].keyCode <= 57) {
                genmatrix = colswitch(keys_pressed[0].keyCode - 54, keys_pressed[1].keyCode - 54, genmatrix)
                console.log(genmatrix)
                console.log(keys_pressed)
            }
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
}
