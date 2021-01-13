function DataTable(config) {

    const usersTable = document.querySelector(config.parent);
    const table = document.createElement("table"),
        tHead = document.createElement("tHead"),
        tBody = document.createElement("tBody"),
        colNames = config.columns.map(col => col.title),
        dataValues = config.columns.map(col => col.value);

    usersTable.appendChild(table);
    const Table = document.querySelector('table');
    Table.appendChild(tHead);
    Table.appendChild(tBody);

    makeTableHead(colNames, "th");
    if (config.apiUrl !== undefined && arguments.length === 1) {
        makeNewTableBodyFromApi(usersTable, dataValues, tBody, config.apiUrl)
    } else {
        makeTableBodyFromData(data, dataValues, "td");
    }
}

function makeNewTableBodyFromApi(usersTable, dataValues, tBody, apiUrl) {
    makeAndRemoveTable(apiUrl, dataValues, usersTable);
    checkAndAddNewUser(usersTable, dataValues, tBody, apiUrl);
}

function checkAndAddNewUser(usersTable, dataValues, tBody, apiUrl) {
    const AddNewUserCol = document.getElementById('add_user');

    function addInputCl() {
        AddNewUserCol.removeEventListener("click", addInputCl)
        const firstTr = document.createElement("tr");
        firstTr.id = "inputTr"
        tBody.insertBefore(firstTr, tBody.firstChild);
        firstTr.append(makeAndAddLabel('№'));
        dataValues.forEach(el => firstTr.append(makeAndAddLabel(el)));

        const addUser = document.createElement("button");
        addUser.textContent = "Добавить";
        addUser.id = "add_new_user";
        firstTr.append(addUser);
        checkInputContent(apiUrl, dataValues, usersTable);
    }

    AddNewUserCol.addEventListener("click", addInputCl);
    removeColumn(apiUrl, dataValues)
}

function checkInputContent(apiUrl, dataValues, usersTable) {
    const allInput = document.querySelectorAll("input");
    let inputValueCounter = 0;

    function checkInput(e) {
        if (e.key === 'Enter') {
            allInput.forEach(e => {
                if (e.value.length > 0) {
                    inputValueCounter++;
                    e.style.borderColor = "white";
                } else {
                    e.style.borderColor = "red";
                }
            })
            if (inputValueCounter === (dataValues.length + 1)) {
                alert("All user information ready ty send api")
                postUserToApi(apiUrl, allInput, dataValues, usersTable).then();
            } else {
                inputValueCounter = 0;
            }
        }
    }

    allInput.forEach(e => {
        e.addEventListener('keypress', checkInput)
    });
}

async function postUserToApi(apiUrl, allInput, dataValues, usersTable) {
    const data = {
        "id": allInput[0].value
    };
    let position = 0;
    dataValues.forEach((element) => {
        data[element] = allInput[++position].value;
    })
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Успех:', JSON.stringify(json));
        let tBody = removeAndMakeTbody()
        makeNewTableBodyFromApi(usersTable, dataValues, tBody, apiUrl);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function makeAndAddLabel(startContent) {
    const label = document.createElement("label");
    const textInput = document.createElement("input");
    const td = document.createElement("td");
    textInput.type = "text";
    textInput.placeholder = startContent;
    label.append(textInput);
    td.append(label);
    return td;
}

function makeAndRemoveTable(apiUrl, dataValues, usersTable) {
    makeTableAndContent(apiUrl, dataValues)
        .then(() => removeColumn(apiUrl, dataValues, usersTable))
}

function removeColumn(apiUrl, dataValues, usersTable) {

    document.querySelectorAll(".removeButton").forEach(element => {
        element.addEventListener("click", function () {
            fetch(`https://5f34ff0d9124200016e1941b.mockapi.io/api/v1/friends/${element.id}`, {
                method: 'DELETE',
            }).then(function () {
                let tBody =removeAndMakeTbody();
                    makeNewTableBodyFromApi(usersTable, dataValues, tBody, apiUrl);
            });
        });
    });
}

function removeAndMakeTbody() {
    const tBody = document.querySelector("tbody");
    tBody.remove()
    const newTableBody = document.createElement("tBody")
    document.querySelector('table').append(newTableBody);
    return newTableBody;
}

function makeTableAndContent(apiUrl, dataValues) {
    let data = makeJson(apiUrl);
    let arr = [];
    data.then(allData => {
        allData.forEach(element => {
            arr.push(element);
        })
        makeTableBodyFromData(arr, dataValues, "td");
    })
    return data;
}

function makeJson(url) {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
}

function makeTableHead(object, tagName) {
    const trHead = document.createElement("tr"),
        tableHead = document.querySelector('thead');
    tableHead.append(trHead);

    const headTr = tableHead.lastChild,
        typeRow = document.createElement(tagName);
    typeRow.textContent = "№";
    headTr.append(typeRow);

    Object.keys(object).forEach(function eachKey(key) {
        makeTableElement(typeRow, tagName, headTr, object[key]);
    });
    makeTableElement(typeRow, tagName, headTr, "Действия");
}

function makeTableBodyFromData(dataObject, dataValues, tagName) {
    const tableBody = document.querySelector('tbody');

    dataObject.forEach((dataItem, index) => {
        const trBody = document.createElement("tr");
        tableBody.append(trBody);
        const bodyTr = tableBody.lastChild;
        let typeRow = document.createElement(tagName);
        typeRow.textContent = index + 1;

        bodyTr.append(typeRow);
        dataValues.forEach(value => {
            let dataValue = dataItem[value];
            if (value === "birthday") {
                const date = new Date(dataItem[value]);
                dataValue = `${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`;
            }
            makeTableElement(typeRow, tagName, bodyTr, dataValue);
        });
        typeRow = document.createElement("button");
        typeRow.textContent = "Удалить";
        typeRow.id = dataItem.id;
        typeRow.className = "removeButton"
        bodyTr.append(typeRow);
    });
}

function makeTableElement(typeRow, tagName, headTr, key) {
    typeRow = document.createElement(tagName);
    typeRow.textContent = key;
    headTr.append(typeRow);
}

const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Имя', value: 'name'},
        {title: 'Фамилия', value: 'surname'},
        {title: 'Возраст', value: 'birthday'},
    ],
    apiUrl: "https://5f34ff0d9124200016e1941b.mockapi.io/api/v1/friends"
};

DataTable(config1);