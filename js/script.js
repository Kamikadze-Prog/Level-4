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

    makeTableHead(colNames, "th")

    if (config.apiUrl !== undefined && arguments.length === 1) {
        let data = makeJson(config.apiUrl);
        const arr = [];
        console.log(data)
        data.then(allData => {
            allData.forEach(element => {
                arr.push(element);
            })
            makeTableBody(arr, dataValues, "td");
        })
    } else {
        makeTableBody(data, dataValues, "td");
    }
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
}

function makeTableBody(dataObject, dataValues, tagName) {
    const tableBody = document.querySelector('tbody');

    dataObject.forEach((dataItem, index) => {
        const trBody = document.createElement("tr");
        tableBody.append(trBody);

        let bodyTr = tableBody.lastChild,
            typeRow = document.createElement(tagName);
        typeRow.textContent = index + 1;

        bodyTr.append(typeRow);
        dataValues.forEach(value => {
            makeTableElement(typeRow, tagName, bodyTr, dataItem[value]);
        })
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