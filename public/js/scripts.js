let arr = []

const submit = function( e ){
    e.preventDefault();
    console.log("test")

    let feature = document.getElementById("feature-name"),
        notes = document.getElementById("notes-file"),
        deadline = document.getElementById("deadline"),
        json = {fname: feature.value, nfile: notes.name, dline: deadline.value},
        body = JSON.stringify(json);
    
    if(feature.value === ''){
        alert("Do not leave any field empty")
    }
    else if(deadline.value === ''){
        alert("Do not leave any field empty")
    }
    else if(notes.type !== 'text/plain'){
        alert("Notes file must be .txt")
    }
    else{
        fetch( '/add', {
            method:'POST',
            body,
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(response => response.text())
        .then( text => {
            arr.push(JSON.parse(text));
            tableData()
        })
    }

    return false
}

function data(){
    console.log("testing")
    const userSI = document.getElementById("userSI")
    userSI.innerHTML = ""

    const userCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('username='))
    .split('=')[1];
    
    userSI.innerHTML = `Welcome ${userCookie}!`
}

function tableData(){
    let index = arr.length - 1
    let table = document.getElementById("schedule-table")

    let newRow = table.insertRow(-1);

    let featureCell = newRow.insertCell(0);
    let notesCell = newRow.insertCell(1);
    let deadlineCell = newRow.insertCell(2);

    featureCell.innerHTML = arr[index].fname
    notesCell.innerHTML = arr[index].nfile
    deadlineCell.innerHTML = arr[index].dline
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
    document.getElementById("exp").style.width = "90%"
    alert('this button does not post yet, but you did earn some experience!')
}