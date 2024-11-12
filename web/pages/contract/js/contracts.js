import { drawTables, addHandlers } from "../../../js/common.js"

function addHandlersToBtns() {
    addHandlers(".contract-edit-btn", (elem) => {
        eel.set_selected_contracts_py(elem.dataset.id)

        window.location.href = "http://localhost:8000/pages/contract/edit_contract.html"
    })

    addHandlers(".contract-delete-btn", (elem) => {
        let id = +elem.dataset.id

        const isDelete = confirm(`Вы действительно хотите удалить контракт №${id}?`)

        if (isDelete) {
            eel.delete_contracts_py(id)
            window.location.href = "http://localhost:8000/pages/contract/contracts.html"
        }
    })
}

const start = async () => {
    const contracts = await eel.get_all_contracts_py()()

    const customers = await eel.get_all_customers_py()()

    if (!customers.length) {
        const create_contract_btn = document.getElementById("create_contract_btn")

        create_contract_btn.href="javascript: void(0)"

        alert("Для работы с контрактами обязательно добавьте хотя бы одного заказчика!")
    }

    const table = document.getElementById("contracts_table")

    if (contracts.length) {

        let captions = ['Код', 'Номер', 'Заказчик', 'Операция']
        let rows = []

        for (let contract of contracts) {
            rows.push([contract.id, contract.contract_number, contract.customer.name])
        }

        drawTables(table, captions, rows, 'contract')

        addHandlersToBtns()
    } else {
        table.className = "table"
        table.innerHTML = "<p class='h3 text-info text-center'>Список контрактов пуст. Добавьте элементы для работы.</p>"
    }
}

start()