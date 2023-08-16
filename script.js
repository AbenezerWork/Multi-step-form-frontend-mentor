const sidebar = document.querySelector(".sidebar");
const preferenceCheck = document.getElementById("preference-check");
const sideindicators = sidebar.getElementsByTagName("button");
const form = document.getElementsByClassName("form-content");
const toggleArea = document.getElementsByClassName("toggle-area")[0];
const nav = document.getElementById("nav");
const nextBtn = nav.children[2];
const goBack = nav.children[0];
const toggle = document.getElementById("toggle");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const step3 = document.getElementById("step3");
const step4 = document.getElementById("step4");
const step1Fields = step1.getElementsByTagName("input");
const checkButtonsStep2 = step2.getElementsByTagName("button");
const inputTags = document.getElementsByTagName("input");
const inputAreaText = document.getElementsByClassName("input-area-text");
let pricing = {
  arcade: {
    monthly: "$9/mo",
    yearly: "$90/yr",
  },
  advanced: {
    monthly: "$12/mo",
    yearly: "$120/yr",
  },
  pro: {
    monthly: "$15/mo",
    yearly: "$150/yr",
  },
  onlineServices: {
    monthly: "$1/mo",
    yearly: "$10/yr",
  },
  largerStorage: {
    monthly: "$2/mo",
    yearly: "$20/yr",
  },
  customProf: {
    monthly: "$2/mo",
    yearly: "$20/yr",
  },
};

const userChoice = {
  yearly: false,
  arcade: false,
  advanced: false,
  pro: false,
  onlineServices: false,
  largerStorage: false,
  customProf: false,
  planPrice: 0,
  addonPrice: { OS: "0", LS: "0", CusP: "0" },
  totalPrice: 0,
  price: function () {
    this.totalPrice = 0;
    this.addonPrice = [];
    if (this.yearly == true) {
      if (this.arcade) {
        this.planPrice = pricing.arcade.yearly;
      }
      if (this.advanced) {
        this.planPrice = pricing.advanced.yearly;
      }
      if (this.pro) {
        this.planPrice = pricing.pro.yearly;
      }
      if (this.onlineServices) {
        this.addonPrice.OS = pricing.onlineServices.yearly;
        this.totalPrice += Number(this.addonPrice.OS.match(/\d+/)[0]);
      }
      if (this.largerStorage) {
        this.addonPrice.LS = pricing.largerStorage.yearly;
        this.totalPrice += Number(this.addonPrice.LS.match(/\d+/)[0]);
      }
      if (this.customProf) {
        this.addonPrice.CusP = pricing.customProf.yearly;
        this.totalPrice += Number(this.addonPrice.CusP.match(/\d+/)[0]);
      }
    } else {
      if (this.arcade) {
        this.planPrice = pricing.arcade.monthly;
      }
      if (this.advanced) {
        this.planPrice = pricing.advanced.monthly;
      }
      if (this.pro) {
        this.planPrice = pricing.pro.monthly;
      }
      if (this.onlineServices) {
        this.addonPrice.OS = pricing.onlineServices.monthly;
        this.totalPrice += Number(this.addonPrice.OS.match(/\d+/)[0]);
      }
      if (this.largerStorage) {
        this.addonPrice.LS = pricing.largerStorage.monthly;
        this.totalPrice += Number(this.addonPrice.LS.match(/\d+/)[0]);
      }
      if (this.customProf) {
        this.addonPrice.CusP = pricing.customProf.monthly;
        this.totalPrice += Number(this.addonPrice.CusP.match(/\d+/)[0]);
      }
    }
    this.totalPrice += Number(this.planPrice.match(/\d+/)[0]);
  },
};

console.log(sidebar);

let step = 0;

function finishingUp() {
  userChoice.price();
  console.log("finishingUp");
  const plan = document.getElementById("plan-check");
  plan.getElementsByTagName('h2')[0].innerHTML = userChoice.pro
    ? "Pro"
    : userChoice.arcade
    ? "Arcade"
    : "Advanced";

  preferenceCheck.getElementsByClassName("addons-check").innerHTML = "";
  preferenceCheck.getElementsByTagName("h2")[1].innerHTML = userChoice.planPrice;
  addons = "";
  if (userChoice.onlineServices) {
    addons += "<div id = 'addon-row'><p id = 'light'>Online Services</p><p>" +
      userChoice.addonPrice.OS + "</p></div>";
  }
  if (userChoice.largerStorage) {
    addons += "<div id = 'addon-row'><p id = 'light'>Larger storage</p><p>" +
      userChoice.addonPrice.LS + "</p></div>";
  }
  if (userChoice.customProf) {
    addons +=
      "<div id = 'addon-row'><p id = 'light'>Customizable profile</p><p>" +
      userChoice.addonPrice.CusP + "</p></div>";
  }
  const totalCheck = preferenceCheck.getElementsByClassName("total-check");
  total = "Total";
  total += userChoice.yearly ? "(per year)" : "(per month)";
  totalCheck[0].getElementsByClassName("total")[0].innerHTML = total;
  totalNum = preferenceCheck.getElementsByClassName('total-check')[0].childNodes[2]
  totalNum.innerHTML = "$" + userChoice.totalPrice
  totalNum.innerHTML +=  userChoice.yearly ? "/yr" : "/mo";
  console.log(userChoice.totalPrice);
  preferenceCheck.getElementsByClassName("addons-check")[0].innerHTML = addons;
}

// implementing navigation button
nextBtn.addEventListener("click", () => {
  if (step == 0) {
    let isFilled = false;
    for (i = 0; i < 3; i++) {
      if (
        inputTags[i].value.length === 0 &&
        inputTags[i].getAttribute("id") !== "error"
      ) {
        inputTags[i].setAttribute("id", "error");
        inputAreaText[i].innerHTML +=
          '<p id= "red"> This field is required!</p>';
      }
      if (inputTags[i].value.length === 0) {
        isFilled = true;
      }
    }
    if (isFilled) {
      return;
    }
    goBack.setAttribute("type", "visible");
  }
  if (step == 1) {
    if (!userChoice.pro && !userChoice.advanced && !userChoice.arcade) {
      alert("Please select one of the fields to continue!");
      return;
    }
  }
  if (step < 4) {
    form[step].setAttribute("type", "hidden");
    form[++step].setAttribute("type", "visible");
  }
  if (step == 3) {
    finishingUp();
    nextBtn.setAttribute("id", "confirm");
    nextBtn.style.backgroundColor = "hsl(243, 100%, 62%)";
    nextBtn.innerHTML = "confirm";
  } else {
  }
  if (step == 4) {
    nav.style.display = "none";
  }
  if (step < 4) {
    sideindicators[step].setAttribute("current", "true");
    sideindicators[step - 1].setAttribute("current", "false");
  }
  console.log(step);
});
goBack.addEventListener("click", () => {
  if (step == 3){

    nextBtn.setAttribute("id", "next-btn");
    nextBtn.style.backgroundColor = "hsl(213, 96%, 18%)";
    nextBtn.innerHTML = "Next Step";
  }
  console.log("hi");
  if (step == 1) {
    goBack.setAttribute("type", "hidden");
  }

  if (step > 0) {
    form[step].setAttribute("type", "hidden");
    form[--step].setAttribute("type", "visible");
  }
  sideindicators[step].setAttribute("current", "true");
  sideindicators[step + 1].setAttribute("current", "false");
});

//step 2 implementation
checkButtonsStep2[0].addEventListener("click", () => {
  if (checkButtonsStep2[0].getAttribute("id") == "check") {
    checkButtonsStep2[0].setAttribute("id", "checked");
    userChoice.arcade = true;
    userChoice.advanced = false;
    checkButtonsStep2[1].setAttribute("id", "check");
    userChoice.pro = false;
    checkButtonsStep2[2].setAttribute("id", "check");
  } else {
    checkButtonsStep2[0].setAttribute("id", "check");
    userChoice.arcade = false;
  }
});
checkButtonsStep2[1].addEventListener("click", () => {
  if (checkButtonsStep2[1].getAttribute("id") == "check") {
    checkButtonsStep2[1].setAttribute("id", "checked");
    userChoice.advanced = true;
    userChoice.arcade = false;
    checkButtonsStep2[0].setAttribute("id", "check");
    userChoice.pro = false;
    checkButtonsStep2[2].setAttribute("id", "check");
  } else {
    checkButtonsStep2[1].setAttribute("id", "check");
    userChoice.advanced = false;
  }
});
checkButtonsStep2[2].addEventListener("click", () => {
  if (checkButtonsStep2[2].getAttribute("id") == "check") {
    checkButtonsStep2[2].setAttribute("id", "checked");
    userChoice.pro = true;
    userChoice.arcade = false;
    checkButtonsStep2[0].setAttribute("id", "check");
    userChoice.advanced = false;
    checkButtonsStep2[1].setAttribute("id", "check");
  } else {
    checkButtonsStep2[2].setAttribute("id", "check");
    userChoice.pro = false;
  }
});
//step3 button implementation
const checkButtonsStep3 = step3.getElementsByTagName("label");
const checkButtonsStep3Length = checkButtonsStep3.length;
const step3checks = [
  userChoice.onlineServices,
  userChoice.largerStorage,
  userChoice.customProf,
];
for (let i = 0; i < checkButtonsStep3Length; i++) {
  checkButtonsStep3[i].addEventListener("click", function () {
    console.log(i + "listener");
    if (step3checks[i] == false) {
      checkButtonsStep3[i].setAttribute("id", "labelchecked");
      step3checks[i] = true;
    } else {
      checkButtonsStep3[i].setAttribute("id", "labelcheck");
      step3checks[i] = false;
    }
    userChoice.onlineServices = step3checks[0];
    userChoice.largerStorage = step3checks[1];
    userChoice.customProf = step3checks[2];
  });
}

//const checkButtonsStep3 = step3.getElementsByTagName("label");
//for (i=0;i<3;i++){
//
//  checkButtonsStep3[i].addEventListener("click", () => {
//    if (userChoice.onlineServices == false) {
//      checkButtonsStep3[i].setAttribute("id", "labelchecked");
//      userChoice.onlineServices = true;
//    } else {
//      checkButtonsStep3[i].setAttribute("id", "labelcheck");
//      userChoice.onlineServices = false;
//    }
//  });
//}
//checkButtonsStep3[1].addEventListener("click", () => {
//  if (userChoice.largerStorage == false) {
//    checkButtonsStep3[1].setAttribute("id", "labelchecked");
//    userChoice.largerStorage = true;
//  } else {
//    checkButtonsStep3[1].setAttribute("id", "labelcheck");
//    userChoice.largerStorage = false;
//  }
//});
//checkButtonsStep3[2].addEventListener("click", () => {
//  if (userChoice.customProf == false) {
//    checkButtonsStep3[2].setAttribute("id", "labelchecked");
//    userChoice.customProf = true;
//  } else {
//    checkButtonsStep3[2].setAttribute("id", "labelcheck");
//    userChoice.customProf = false;
//  }
//});
const btnTexts = document.getElementsByClassName("interchangable");
function monthYearSwitch() {
  for (i = 0; i < btnTexts.length; i++) {
    if (btnTexts[i].getAttribute("type") == "hidden") {
      btnTexts[i].setAttribute("type", "visible");
    } else {
      btnTexts[i].setAttribute("type", "hidden");
    }
  }
}

toggle.addEventListener("click", () => {
  if (userChoice.yearly == true) {
    toggle.style.justifyContent = "flex-start";
    toggleArea.childNodes[1].setAttribute("id", "bold");
    toggleArea.childNodes[5].setAttribute("id", "normal");
    userChoice.yearly = false;
  } else {
    toggle.style.justifyContent = "flex-end";
    toggleArea.childNodes[1].setAttribute("id", "normal");
    toggleArea.childNodes[5].setAttribute("id", "bold");
    userChoice.yearly = true;
  }
  monthYearSwitch();
  clearSelection();
});

document.getElementsByClassName("change")[0].addEventListener("click", () => {
  console.log("hi");
  form[step].setAttribute("type", "hidden");
  step = 1;
  form[step].setAttribute("type", "visible");

  nextBtn.setAttribute("id", "next-btn");
  nextBtn.style.backgroundColor = "hsl(213, 96%, 18%)";
  nextBtn.innerHTML = "Next Step";
});
