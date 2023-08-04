const sidebar = document.querySelector('.sidebar')
const sideindicators = sidebar.getElementsByTagName('button')
const form = document.getElementsByClassName("form-content")
const toggleArea = document.getElementsByClassName('toggle-area')[0]
let nav = document.getElementById('nav')
let nextBtn =nav.children[1] 
const goBack =nav.children[0]
const toggle = document.getElementById('toggle')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const checkButtonsStep2 = step2.getElementsByTagName('button')

console.log(sidebar)

let step = 0
// implementing navigation button
nextBtn.addEventListener('click', ()=>{
    if (step<4){
        form[step].setAttribute('type','hidden') 
        form[++step].setAttribute('type','visible') 
    }else if (step == 4){
        nav.style.display = 'none'
    }
    if(step<4){
        sideindicators[step].setAttribute('current','true')
        sideindicators[step-1].setAttribute('current','false')
    }

})
goBack.addEventListener('click',()=>{
    console.log('hi')
    if(step>0){
        form[step].setAttribute('type','hidden') 
        form[--step].setAttribute('type','visible') 
    }
    sideindicators[step].setAttribute('current','true')
    sideindicators[step+1].setAttribute('current','false')
})



//step 2 implementation
checkButtonsStep2[1].addEventListener('click',()=>{
    if(checkButtonsStep2[1].getAttribute('id')=="check"){
        checkButtonsStep2[1].setAttribute('id','checked')
    }else{
        checkButtonsStep2[1].setAttribute('id','check')
    }
})
checkButtonsStep2[2].addEventListener('click',()=>{
    if(checkButtonsStep2[2].getAttribute('id')=="check"){
        checkButtonsStep2[2].setAttribute('id','checked')
    }else{
        checkButtonsStep2[2].setAttribute('id','check')
    }
})
checkButtonsStep2[0].addEventListener('click',()=>{
    if(checkButtonsStep2[0].getAttribute('id')=="check"){
        checkButtonsStep2[0].setAttribute('id','checked')
    }else{
        checkButtonsStep2[0].setAttribute('id','check')
    }
})

//step3 button implementation
const checkButtonsStep3 = step3.getElementsByTagName('label')

checkButtonsStep3[0].addEventListener('click',()=>{
    if(checkButtonsStep3[0].getAttribute('id')=="labelcheck"){
        checkButtonsStep3[0].setAttribute('id','labelchecked')
    }else{
        checkButtonsStep3[0].setAttribute('id','labelcheck')
    }
})
checkButtonsStep3[1].addEventListener('click',()=>{
    if(checkButtonsStep3[1].getAttribute('id')=="labelcheck"){
        checkButtonsStep3[1].setAttribute('id','labelchecked')
    }else{
        checkButtonsStep3[1].setAttribute('id','labelcheck')
    }
})
checkButtonsStep3[2].addEventListener('click',()=>{
    if(checkButtonsStep3[2].getAttribute('id')=="labelcheck"){
        checkButtonsStep3[2].setAttribute('id','labelchecked')
    }else{
        checkButtonsStep3[2].setAttribute('id','labelcheck')
    }
})
const btnTexts = document.getElementsByClassName('interchangable')
function monthYearSwitch(){
    for(i=0;i<btnTexts.length;i++){
        if (btnTexts[i].getAttribute('type')=='hidden'){
            btnTexts[i].setAttribute('type','visible')
        }else{
            btnTexts[i].setAttribute('type','hidden')
        }
    }
}

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
    monthYearSwitch()
})

