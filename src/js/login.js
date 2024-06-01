const form = document.querySelector("#form-login")
const password = document.querySelector("#password")
const email = document.querySelector("#email")
const API = "http://localhost:3000/users"

async function validateEmail(email) {
    const response = await fetch(`${API}?email=${email.value}`)
    const data = await response.json()
    if (data.length === 1) {
        return data[0]
    } else {
        return false
    }
}

form.addEventListener("submit", async (event) => {
    event.preventDefault()
    const user = await validateEmail(email)
    if (!user){
        alert("User not registred")
    } else {
        if (user.password === password.value) {
            localStorage.setItem("user", JSON.stringify(user))
            alert("Logged in successfully")
            window.location.href="./cars.html"
        }
    }
})