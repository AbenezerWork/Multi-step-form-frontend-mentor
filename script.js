const sidebar = document.querySelector('.sidebar')
const sideindicators = sidebar.getElementsByTagName('button')
const form = document.getElementsByClassName("form-content")
const toggleArea = document.getElementsByClassName('toggle-area')[0]
const nav = document.getElementById('nav')
const nextBtn =nav.children[2] 
const goBack =nav.children[0]
const toggle = document.getElementById('toggle')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const step4 = document.getElementById('step4')
const step1Fields = step1.getElementsByTagName('input')
const checkButtonsStep2 = step2.getElementsByTagName('button')
const inputTags = document.getElementsByTagName('input')
const inputAreaText = document.getElementsByClassName('input-area-text')
let pricing = {
    arcade: {
        monthly:"$9/mo",
        yearly:"$90/yr"
    },
    advanced: {
        monthly:"$12/mo",
        yearly:"$120/yr"
    },
    pro: {
        monthly:"$15/mo",
        yearly:"$150/yr"
    },
    onlineServices: {
        monthly:"$1/mo",
        yearly:"$10/yr"
    },
    largerStorage: {
        monthly:"$2/mo",
        yearly:"$20/yr"
    },
    customProf: {
        monthly:"$2/mo",
        yearly:"$20/yr"
    }
}


const userChoice = {
    yearly: false,
    arcade:false,
    advanced:false,
    pro:false,
    onlineServices: false,
    largerStorage: false,
    customProf: false,
    planPrice: 0,
    addonPrice:{OS:"0",LS:"0",CusP:"0"},
    totalPrice: 0,
    price: function(){
        this.totalPrice=0
        this.addonPrice=[]
        if(this.yearly==true){
            if(this.arcade){
                this.planPrice=pricing.arcade.yearly;
            }
            if(this.advanced){
                this.planPrice=pricing.advanced.yearly;
            }
            if(this.pro){
                this.planPrice=pricing.pro.yearly;
            }
            if(this.onlineServices){
                this.addonPrice.OS = (pricing.onlineServices.yearly)
                this.totalPrice+=Number(this.addonPrice.OS.match(/\d+/)[0])
            }
            if(this.largerStorage){
                this.addonPrice.LS = (pricing.largerStorage.yearly)
                this.totalPrice+=Number(this.addonPrice.LS.match(/\d+/)[0])
            }
            if(this.customProf){
                this.addonPrice.CusP = (pricing.customProf.yearly)
                this.totalPrice+=Number(this.addonPrice.CusP.match(/\d+/)[0])
            }
        }else{
            if(this.arcade){
                this.planPrice=pricing.arcade.monthly;
            }
            if(this.advanced){
                this.planPrice=pricing.advanced.monthly;
            }
            if(this.pro){
                this.planPrice=pricing.pro.monthly;
            }
            if(this.onlineServices){
                this.addonPrice.OS = (pricing.onlineServices.monthly)
                this.totalPrice+=Number(this.addonPrice.OS.match(/\d+/)[0])
            }
            if(this.largerStorage){
                this.addonPrice.LS = (pricing.largerStorage.monthly)
                this.totalPrice+=Number(this.addonPrice.LS.match(/\d+/)[0])
            }
            if(this.customProf){
                this.addonPrice.CusP = (pricing.customProf.monthly)
                this.totalPrice+=Number(this.addonPrice.CusP.match(/\d+/)[0])
            }
        }
        this.totalPrice+=Number(this.planPrice.match(/\d+/)[0])
    }
}

console.log(sidebar)

let step = 0
function finishingUp(){

    userChoice.price();
    const preferenceCheck = document.getElementById('preference-check')
    let plan = '<div id = "plan-row">'
    let addons = ''
    let total = ''
    if(userChoice.arcade == true){
        plan+='<h2 id = "bold">Arcade</h2><h2 id = "bold">';
    }else if(userChoice.advanced){
        plan+='<h2 id = "bold">Advanced</h2><h2 id = "bold">';
    }else if(userChoice.pro){
        plan+='<h2 id = "bold">Pro</h2><h2 id = "bold">';
    }
    plan+=userChoice.planPrice+'</h2></div>'
    if (userChoice.onlineServices){
        addons+="<div id = 'addon-row'><p id = 'light'>Online Services</p><p>"+userChoice.addonPrice.OS+"</p></div>"
    }
    if (userChoice.largerStorage){
        addons+="<div id = 'addon-row'><p id = 'light'>Larger storage</p><p>"+userChoice.addonPrice.LS+"</p></div>"
    }
    if (userChoice.customProf){
        addons+="<div id = 'addon-row'><p id = 'light'>Customizable profile</p><p>"+userChoice.addonPrice.CusP+"</p></div>"
    }
    total="<div id='total-row'><p>Total"
    total+=userChoice.yearly?"(per year)":"(per month)"
    total+="<h2 id='blue'>"+userChoice.totalPrice
    total+=userChoice.yearly?"/yr":"/mo"
    total += "</h2></div>"
    preferenceCheck.innerHTML=plan+addons+total
}
// implementing navigation button
nextBtn.addEventListener('click', ()=>{
    if(step == 0){
        let isFilled = false
        for(i = 0; i<3;i++){
            if(inputTags[i].value.length === 0 && inputTags[i].getAttribute('id')!=='error'){
                inputTags[i].setAttribute('id','error')
                inputAreaText[i].innerHTML+='<p id= "red"> This field is required!</p>'
            }
            if(inputTags[i].value.length===0){
                isFilled=true
            }
        }
        if(isFilled){
            return;
        }
        goBack.setAttribute("type","visible")
    }
    if(step == 1){
        if(!userChoice.pro && !userChoice.advanced && !userChoice.arcade){
            alert('Please select one of the fields to continue!')
            return;
        }
    }
    if (step<4){
        form[step].setAttribute('type','hidden') 
        form[++step].setAttribute('type','visible') 
    } 
    if(step == 3){
        finishingUp()
        nextBtn.setAttribute('id','confirm')
        nextBtn.style.backgroundColor = 'hsl(243, 100%, 62%)'
        nextBtn.innerHTML = 'confirm'
    }
    if (step == 4){
        nav.style.display = 'none'
    }
    if(step<4){
        sideindicators[step].setAttribute('current','true')
        sideindicators[step-1].setAttribute('current','false')
    }
    console.log(step)

})
goBack.addEventListener('click',()=>{
    console.log('hi')
    if(step==1){
        goBack.setAttribute("type","hidden")
    }

    if(step>0){
        form[step].setAttribute('type','hidden') 
        form[--step].setAttribute('type','visible') 
    }
    sideindicators[step].setAttribute('current','true')
    sideindicators[step+1].setAttribute('current','false')
})



//step 2 implementation
checkButtonsStep2[0].addEventListener('click',()=>{
    if(checkButtonsStep2[0].getAttribute('id')=="check"){
        checkButtonsStep2[0].setAttribute('id','checked')
        userChoice.arcade=true
        userChoice.advanced=false
        checkButtonsStep2[1].setAttribute('id','check')
        userChoice.pro=false
        checkButtonsStep2[2].setAttribute('id','check')
    }else{
        checkButtonsStep2[0].setAttribute('id','check')
        userChoice.arcade=false
    }
})
checkButtonsStep2[1].addEventListener('click',()=>{
    if(checkButtonsStep2[1].getAttribute('id')=="check"){
        checkButtonsStep2[1].setAttribute('id','checked')
        userChoice.advanced=true
        userChoice.arcade=false
        checkButtonsStep2[0].setAttribute('id','check')
        userChoice.pro=false
        checkButtonsStep2[2].setAttribute('id','check')
    }else{
        checkButtonsStep2[1].setAttribute('id','check')
        userChoice.advanced=false
    }
})
checkButtonsStep2[2].addEventListener('click',()=>{
    if(checkButtonsStep2[2].getAttribute('id')=="check"){
        checkButtonsStep2[2].setAttribute('id','checked')
        userChoice.pro=true
        userChoice.arcade=false
        checkButtonsStep2[0].setAttribute('id','check')
        userChoice.advanced=false
        checkButtonsStep2[1].setAttribute('id','check')
    }else{
        checkButtonsStep2[2].setAttribute('id','check')
        userChoice.pro=false
    }
})
//step3 button implementation
const checkButtonsStep3 = step3.getElementsByTagName('label')

checkButtonsStep3[0].addEventListener('click',()=>{
    if(userChoice.onlineServices==false){
        checkButtonsStep3[0].setAttribute('id','labelchecked')
        userChoice.onlineServices=true
    }else{
        checkButtonsStep3[0].setAttribute('id','labelcheck')
        userChoice.onlineServices=false
    }
})
checkButtonsStep3[1].addEventListener('click',()=>{
    if(userChoice.largerStorage==false){
        checkButtonsStep3[1].setAttribute('id','labelchecked')
        userChoice.largerStorage=true
    }else{
        checkButtonsStep3[1].setAttribute('id','labelcheck')
        userChoice.largerStorage=false
    }
})
checkButtonsStep3[2].addEventListener('click',()=>{
    if(userChoice.customProf==false){
        checkButtonsStep3[2].setAttribute('id','labelchecked')
        userChoice.customProf=true
    }else{
        checkButtonsStep3[2].setAttribute('id','labelcheck')
        userChoice.customProf=false
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

function clearSelection(){
    for (i=0; i<3; i++){
        checkButtonsStep2[i].setAttribute('id','check')
        checkButtonsStep3[i].setAttribute('id','labelcheck')
    }
}

toggle.addEventListener('click', ()=>{
    if(userChoice.yearly==true){
        toggle.style.justifyContent = "flex-start"
        toggleArea.childNodes[1].setAttribute('id','bold')
        toggleArea.childNodes[5].setAttribute('id','normal')
        userChoice.yearly=false
    }else{
        toggle.style.justifyContent = "flex-end"
        toggleArea.childNodes[1].setAttribute('id','normal')
        toggleArea.childNodes[5].setAttribute('id', 'bold')
        userChoice.yearly=true
    }
    monthYearSwitch()
    clearSelection()

})

