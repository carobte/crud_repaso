const userName = document.querySelector("#name")
const lastName = document.querySelector("#last-name")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirm-password")
const registerForm = document.querySelector("#register-form")
const API = "http://localhost:3000/users"

// Validar contraseña

function validatePassword(password, confirmPassword) {
    if (password.value === confirmPassword.value) {
        return true
    } else {
        alert("Invalid password")
        return false
    }
}

// Validar si el usuario existe 

async function validateUser(email) {
    const response = await fetch(`${API}?email=${email.value}`)
    const data = await response.json()

    if (data.length === 0) {
        return true
    } else {
        alert("User already exists")
        return false
    }
}

// Crear usuario

async function createUser(name, lastName, email, password) {
    const newUser = {
        name: name.value,
        lastName: lastName.value,
        email: email.value,
        password:  password.value
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
}    


registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    const samePassword = validatePassword(password, confirmPassword)
    const userExists = await validateUser(email)
    if (samePassword && userExists) {
        await createUser(userName, lastName, email, password)
        alert("User created successfully")
    }
})