let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let submit = document.getElementById('submit');
let btn = document.getElementById('deleteall');
let mood = 'create';
let temp;

function getTotal() {
    if (price.value != '') {
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = "green";
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02";
    }
}
let mainArr;
if (localStorage.product != null) {
    mainArr = JSON.parse(localStorage.product);
} else {
    mainArr = [];
}

submit.onclick = function () {
    title.focus();
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (newPro.count < 100) {
        if (mood == 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    mainArr.push(newPro);
                }
            } else {
                mainArr.push(newPro);
            }
        } else {
            mainArr[temp] = newPro;
            count.style.display = 'block';
            mood = 'create';
            submit.innerHTML = mood.toUpperCase();
        }
    }
    localStorage.setItem('product', JSON.stringify(mainArr));
    showData();
    clearData();
    total.style.background = "#a00d02";
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

showData();
function showData() {
    let tabel = '';
    for (let i = 0; i < mainArr.length; i++) {
        tabel += `<tr>
            <td>${i + 1}</td>
            <td>${mainArr[i].title}</td>
            <td>${mainArr[i].price}</td>
            <td>${mainArr[i].taxes}</td>
            <td>${mainArr[i].ads}</td>
        <td>${mainArr[i].discount}</td>
        <td>${mainArr[i].total}</td>
        <td>${mainArr[i].category}</td>
        <td><button onclick="update(${i})" id="update">Update</button></td>
        <td><button onclick="deleted(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = tabel;
    if (mainArr.length > 1) {
        btn.innerHTML = `<button onclick="deleteAll()">DeleteAll(${mainArr.length})</button>`
    } else {
        btn.innerHTML = '';
    }
}

function deleteAll() {
    mainArr.splice(0);
    localStorage.clear();
    showData();
};

function deleted(i) {
    mainArr.splice(i, 1);
    localStorage.product = JSON.stringify(mainArr);
    showData();
}
function update(i) {
    mood = 'update';
    title.focus();
    title.value = mainArr[i].title;
    price.value = mainArr[i].price;
    taxes.value = mainArr[i].taxes;
    ads.value = mainArr[i].ads;
    discount.value = mainArr[i].discount;
    total.innerHTML = mainArr[i].total;
    count.value = mainArr[i].count;
    category.value = mainArr[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = mood.toUpperCase();
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
let searchMood = 'Title';
function getSearchMood(id) {
    search.focus();
    if (id == 'searchtitle') {
        searchMood = 'Title';
    } else {
        searchMood = 'Category';
    }
    search.placeholder = `Search By ${searchMood}`;
    search.value = '';
}

function searchData(value) {
    let tabel = '';
    for (let i = 0; i < mainArr.length; i++) {
        if (searchMood == 'Title') {
            if (mainArr[i].title.includes(value.toLowerCase())) {
                tabel += `<tr>
                <td>${i + 1}</td>
                <td>${mainArr[i].title}</td>
                <td>${mainArr[i].price}</td>
                <td>${mainArr[i].taxes}</td>
                <td>${mainArr[i].ads}</td>
            <td>${mainArr[i].discount}</td>
            <td>${mainArr[i].total}</td>
            <td>${mainArr[i].category}</td>
            <td><button onclick="update(${i})" id="update">Update</button></td>
            <td><button onclick="deleted(${i})" id="delete">Delete</button></td>
            </tr>
            `
            }
        } else {
            if (mainArr[i].category.includes(value.toLowerCase())) {
                tabel += `<tr>
                <td>${i + 1}</td>
                <td>${mainArr[i].title}</td>
                <td>${mainArr[i].price}</td>
                <td>${mainArr[i].taxes}</td>
                <td>${mainArr[i].ads}</td>
            <td>${mainArr[i].discount}</td>
            <td>${mainArr[i].total}</td>
            <td>${mainArr[i].category}</td>
            <td><button onclick="update(${i})" id="update">Update</button></td>
            <td><button onclick="deleted(${i})" id="delete">Delete</button></td>
            </tr>
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = tabel;
}



