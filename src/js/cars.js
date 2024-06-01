const h1 = document.querySelector("#welcome")
const logout = document.querySelector("#logout")
const url = "http://localhost:3000/carros"
const form = document.querySelector("#form")
const marca = document.querySelector("#marca")
const precio = document.querySelector("#price")
const img = document.querySelector("#imagen")
const table = document.querySelector("#table")

async function pintarTabla() {
    const response = await fetch(url)
    const data = await response.json()

    data.forEach(car => {
        table.innerHTML += `
        <tr>
                  <th>${car.id}</th>
                  <td>${car.marca}</td>
                  <td>$${car.precio}</td>
                  <td>
                  <img src="${car.img}" width="200px" alt="carro ${car.marca}"/>
                  </td>
        </tr>
        `
    });

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


const user = isLogged()

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

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await addCars(marca.value, precio.value, img.value, user.email);
    alert("se creo el carro")
})

