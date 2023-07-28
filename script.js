const sidebar = document.querySelector('.sidebar')
const sideindicators = sidebar.getElementsByTagName('button')
const form = document.getElementsByClassName("form-content")
const toggleArea = document.getElementsByClassName('toggle-area')[0]
let nav = document.getElementById('nav')
let btn =nav.children[1] 
const goBack =nav.children[0]
const toggle = document.getElementById('toggle')

console.log(sidebar)

let step = 0
btn.addEventListener('click', ()=>{
    if (step!=4){
        form[step].setAttribute('type','hidden') 
        form[++step].setAttribute('type','visible') 
    }else{
        nav.setAttribute('type','hidden')
    }
    if(step<4){
        sideindicators[step].setAttribute('current','true')
        sideindicators[step-1].setAttribute('current','false')
    }

})
goBack.addEventListener('click',()=>{
    console.log('hi')
    form[step].setAttribute('type','hidden') 
    form[--step].setAttribute('type','visible') 
})
toggle.addEventListener('click', ()=>{
    if(toggle.style.justifyContent == "flex-end"){
        toggle.style.justifyContent = "flex-start"
        toggleArea.childNodes[1].setAttribute('id','bold')
        toggleArea.childNodes[5].setAttribute('id','normal')
    }else{
        toggle.style.justifyContent = "flex-end"
        toggleArea.childNodes[1].setAttribute('id','normal')
        toggleArea.childNodes[5].setAttribute('id', 'bold')
    }
})

