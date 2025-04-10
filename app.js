const BASE_URL =
"https://currency-rate-exchange-api.onrender.com";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for(select of dropdowns){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newoption.selected = "selected";
        } else if(select.name === "to" && currcode ==="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};  

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;   
    if(amtval === "" || amtval<=0){
        amtval = 1;
        amount.value = "1";
    }         
   
   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data.rates[fromCurr.value.toLowerCase()]?.[toCurr.value.toLowerCase()];
   let msg = document.querySelector(".msg");
   msg.innerText = `${amtval} ${fromCurr.value.toUpperCase()} = ${amtval*rate} ${toCurr.value.toUpperCase()}`;
}); 