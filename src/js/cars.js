const h1 = document.querySelector("#welcome")
const logout = document.querySelector("#logout")
const url = "http://localhost:3000/carros"
const form = document.querySelector("#form")
const marca = document.querySelector("#marca")
const precio = document.querySelector("#price")
const img = document.querySelector("#imagen")
const tbody = document.querySelector("#tbody")
const user = isLogged()
let id

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (!id) {
        await addCars(marca.value, precio.value, img.value, user.email)
        alert("se creo el carro")
    } else {
        await editarCarro(id, marca.value, precio.value, img.value, user.email)
        alert("Se edito el carro")
        id = undefined
        await pintarTabla()
    }
    form.reset()
})

tbody.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-editar")) {
        id = event.target.getAttribute("data-id")
        let car = await getCar(id)
        marca.value = car.marca,
            precio.value = car.precio,
            img.value = car.img
    } else if (event.target.classList.contains("btn-eliminar")) {
        id = event.target.getAttribute("data-id")
        let confirmacion = confirm("¿Está seguro que desea eliminar el carro?")
        if (confirmacion) {
            await eliminarCarro(id)
            await pintarTabla()
        }
    }
})

async function pintarTabla() {
    const response = await fetch(url)
    const data = await response.json()
    tbody.innerHTML = ""
    data.forEach(car => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <th>${car.id}</th>
            <td>${car.marca}</td>
            <td>$${car.precio}</td>
            <td>
                <img src="${car.img}" width="200px" alt="carro ${car.marca}"/>
            </td>
            <td>
                <button data-id=${car.id} class="btn btn-primary btn-editar"> Editar </button>
                <button data-id=${car.id} class="btn btn-danger btn-eliminar"> Eliminar </button>
            </td>
        `
        tbody.appendChild(tr)
    })
}

async function getCar(id) {
    const response = await fetch(`${url}/${id}`)
    const data = await response.json()
    return data
}

async function addCars(marca, precio, img, owner) {
    const newCar = {
        "marca": marca,
        "precio": precio,
        "img": img,
        "owner": owner
    }

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar)
    })
    pintarTabla()
}

async function editarCarro(id, marca, precio, img, owner) {
    const carUpdated = {
        "marca": marca,
        "precio": precio,
        "img": img,
        "owner": owner
    }

    await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(carUpdated)
    })
}

async function eliminarCarro(id) {
    await fetch(`${url}/${id}`,{
        method:"DELETE"
    })
}

function isLogged() {
    const userLocalStorage = localStorage.getItem("user")
    const user = JSON.parse(userLocalStorage)
    if (!user) {
        window.location.href = "./login.html"
    } else {
        h1.innerHTML = `Bienvenido ${user.name}`
        return user
    }
}

logout.addEventListener("click", () => {
    localStorage.removeItem("user")
})


pintarTabla()