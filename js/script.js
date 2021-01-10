async function DataTable(config) {
    // const url = 'https://5f34ff0d9124200016e1941b.mockapi.io/api/v1/friends';
    // const data = {
    //     "id": "53",
    //     "createdAt": "10 01 2021",
    //     "name": "Post from test",
    //     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/osmanince/128.jpg",
    //     "surname": "Eva  eva",
    //     "birthday": "2020-04-04T19"
    // };
    //
    // try {
    //     const response = await fetch(url, {
    //         method: 'POST', // или 'PUT'
    //         body: JSON.stringify(data),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     const json = await response.json();
    //     console.log('Успех:', JSON.stringify(json));
    // } catch (error) {
    //     console.error('Ошибка:', error);
    // }

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

    makeTableHead(colNames, "th")
    if (config.apiUrl !== undefined && arguments.length === 1) {
        makeAndRemoveTable(config.apiUrl, dataValues, tBody, Table);
    } else {
        makeTableBody(data, dataValues, "td");
    }
}

function makeAndRemoveTable(apiUrl, dataValues, tBody, Table) {
    makeTableAndContent(apiUrl, dataValues)
        .then(function removeColumn() {
            document.querySelectorAll("button").forEach(element => {
                element.addEventListener("click", ev => {
                    fetch(`https://5f34ff0d9124200016e1941b.mockapi.io/api/v1/friends/${element.id}`, {
                        method: 'DELETE',
                    }).then(function () {
                        tBody.remove();
                        const newTableBody = document.createElement("tBody")
                        Table.append(newTableBody);
                        makeAndRemoveTable(apiUrl, dataValues, newTableBody, Table);
                    });
                });
            });
        })
}

function makeTableAndContent(apiUrl, dataValues) {
    let data = makeJson(apiUrl);
    let arr = [];
    data.then(allData => {
        allData.forEach(element => {
            arr.push(element);
            console.log(element);
        })
        makeTableBody(arr, dataValues, "td");
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

function makeTableBody(dataObject, dataValues, tagName) {
    const tableBody = document.querySelector('tbody');

    dataObject.forEach((dataItem, index) => {
        const trBody = document.createElement("tr");
        tableBody.append(trBody);

        const bodyTr = tableBody.lastChild;
        let typeRow = document.createElement(tagName);
        typeRow.textContent = index + 1;

        bodyTr.append(typeRow);
        dataValues.forEach(value => {
            makeTableElement(typeRow, tagName, bodyTr, dataItem[value]);
        });
        typeRow = document.createElement("button");
        typeRow.textContent = "Удалить";
        typeRow.id = dataItem.id;
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