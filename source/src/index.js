import '../assets/css/style.css';

const app = document.getElementById('app');

// 1-5
app.innerHTML = `asdfasdfasdf`;
// console.log("inner")
// console.log(document)
// console.dir(document)

// console.log(document.body.nodeType)
// console.log(document.head.nodeType)
// console.log(document.nodeType)

// console.log(document.body.nodeName)
// console.log(document.body.tagName)

// console.log(document.nodeName)
// console.log(document.tagName)

// document.addEventListener("DOMContentLoaded", () => console.log("loaded"))


// 6-7
// const div = document.createElement("div")
// const text = document.createTextNode("Some text")
// const comment = document.createComment("Some random comment")

// comment.textContent = "Naaah! I like this text more"

// div.append(text)
// app.append(div, comment)



// console.log("🚀 ~ text:", text)
// console.log("🚀 ~ div:", app, div)
// console.log("🚀 ~ comment:", comment)


// 8
// function createInputDOM({label, type = "text", ...props}) {
//   const labelEl = document.createElement("label")
//   const inputEl = document.createElement('input')

//   labelEl.textContent = label
//   inputEl.type = type

//   labelEl.append(inputEl)

//   return labelEl
// }

// const someInput = createInputDOM({ label: "Some Label"})
// console.log("🚀 ~ someInput:", someInput)
// app.append(someInput)

// function createInputTemplate({ label, type ="text"}) {
// return `
// <label>
//   ${label}
//   <input type="${type}">
// </label>
// `
// }

// const otherInput = createInputTemplate({ label: "Email", type: "email"})
// app.innerHTML += otherInput

// 9
// const data = [1,2,3,4,5,6]


// // const fragment = document.createDocumentFragment()
// const fragment = new DocumentFragment()
// console.dir("🚀 ~ fragment:", fragment)

// data.forEach(item => {
//   const li = document.createElement("li")
//   li.innerText = item
//   fragment.append(li)
// })

// console.dir("🚀 ~ fragment:", fragment)
// app.append(fragment)


// 10

// const div = document.createElement("div")
// const span = document.createElement("span")
// const p = document.createElement("p")
// const aside = document.createElement("aside")


// div.append(span)
// div.prepend(p)
// p.after(aside)

// console.log(div)

// 11

// app.innerHTML = `<div>Some<div>
// <ul>
//   <li>ORiginal</li>
// </ul>`;

// const ul  = app.querySelector("ul")

// ul.insertAdjacentHTML("beforebegin", '<p>beforebegin</p>')
// ul.insertAdjacentHTML("afterbegin", '<li>beforebegin</li>')
// ul.insertAdjacentHTML("beforeend", '<li>beforebegin</li>')
// ul.insertAdjacentHTML("afterend", '<p>afterend</p>')

const div = document.createElement("div")

div.innerText = "Some text"

app.append(div)
setTimeout(() => div.remove(), 2000)
// old way
// setTimeout(() => div.parentNode.removeChild(div), 2000)

// 