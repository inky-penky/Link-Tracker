// Global and Constant Variables

let myLinks = [];

const inputEl = document.getElementById("input-el");
const buttonEl = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const tabBtnEl = document.getElementById("tab-el")
const deleteEl = document.getElementById("delete-btn")


// Get links from storage

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"));

if(linksFromLocalStorage === true) {
  myLinks = linksFromLocalStorage;
  render(myLinks);
}


// Get a tab link

tabBtnEl.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLinks.push(tabs[0].url);
    localStorage.setItem("myLinks", JSON.stringify(myLinks));
    render(myLinks);
  })

})


// Render links function


const render = (links) => {

  let listItems = "";
  for(let i = 0; i < links.length; i++) {
    listItems += `<li><a target='_blank' href='${links[i]}'>${links[i]}</a></li>`
  }
  ulEl.innerHTML = listItems;
}

// Save links function


buttonEl.addEventListener("click", () => {
  myLinks.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLinks", JSON.stringify(myLinks));
  render(myLinks);

})

// DeleteAll links function

deleteEl.addEventListener("dblclick", () => {
  localStorage.clear();
  myLinks = [];
  render(myLinks);
})
