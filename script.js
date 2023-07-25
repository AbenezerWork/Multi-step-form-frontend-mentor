const form = document.getElementsByClassName("form-content")
const toggleArea = document.getElementsByClassName('toggle-area')[0]
const toggle = document.getElementById('toggle')
const sidebar = document.getElementsByClassName("sidebar")
let sideBtn = document.querySelectorAll('.sidebar button')

for(i=0; i<4;i++){
	let btn = sideBtn[i]
	console.log(i)
	btn.addEventListener('click', ()=>{
		if(btn.getAttribute("current") != "true"){
			for(j=0; j<sideBtn.length;j++){
				if(sideBtn[j].getAttribute("current") == "true"){
					sideBtn[j].setAttribute("current", false)
					form[j].setAttribute("type","hidden")
					console.log(j)
				}
			}
			btn.setAttribute("current", true)
			form[btn.innerText-1].setAttribute("type","visible")
			console.log(form[j].getAttribute("type"), j)
		}
	})
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
})

