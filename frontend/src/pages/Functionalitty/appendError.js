
export default function appendError( errorMSG ) {
    const error_container = document.querySelector("[data-error-container]") // select Errors container 
    const div = document.createElement("div")
    div.className = "Error"
    div.innerText = errorMSG
    error_container.append(div)

    setTimeout(()=>{
        div.remove()
    },6000)
}
