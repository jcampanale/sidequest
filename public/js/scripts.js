const submit = function( e ){
    e.preventDefault()
}

window.onload = function() {
    data()
}

function data(){
    const userSI = document.getElementById("userSI")
    userSI.innerHTML = ""

    const userCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('username='))
    .split('=')[1];
    
    userSI.innerHTML = `Welcome ${userCookie}!`
}
