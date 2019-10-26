const genmatrix = math.matrix([[0.15, 0.35, 1./4, 0., 1./4, 0.],
    [0.5, 0.1, 0., 0.4, 0.0, 0.],
    [0., 0., 0., 1./4, 1./4, 1./2],
    [1./16, 0., 1./4+1./8, 1./4, 1./4, 1./16],
    [0., 0., 0.4, 1./4, 0.25, 0.1],
    [0., 0., 0., 1./4, 1./2, 1./4]])


initvec = math.matrix([1.,0.,0.,0.,0.,0.])

prod = math.multiply(initvec,genmatrix)

console.log(prod)

console.log(getnote(prod))


function getnote(v){

    randno = math.random()
    console.log(randno)
    console.log(v)
    console.log(v._size[0])

    v_ind = [0,1,2,3,4,5]

    sel = 0 

    sumfore = 0

    for(var i=0;i<=v._size[0];i++){
        sumfore = sumfore + v._data[i]
        console.log(sumfore)
        if(randno<sumfore){
            sel = i
            break
        }
    }
    vret = math.zeros(v._size[0])
    vret._data[i] = 1

    return vret
}
