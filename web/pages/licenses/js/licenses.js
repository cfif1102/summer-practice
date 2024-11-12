import { drawTables, addHandlers } from "../../../js/common.js"

function addHandlersToBtns() {
    addHandlers(".license-edit-btn", (elem) => {
        eel.set_selected_licenses_py(elem.dataset.id)

        window.location.href = "http://localhost:8000/pages/licenses/edit_license.html"
    })

    addHandlers(".license-delete-btn", (elem) => {
        let id = +elem.dataset.id

        const isDelete = confirm(`Вы действительно хотите удалить лицензиата №${id}?`)

        if (isDelete) {
            eel.delete_licenses_py(id)
            window.location.href = "http://localhost:8000/pages/licenses/licenses.html"
        }
    })
}

const start = async () => {
    const lics = await eel.get_all_licenses_py()()

    const table = document.getElementById("license_table")

    const customers = await eel.get_all_customers_py()()

    if (!customers.length) {
        const create_license_btn = document.getElementById("create_license_btn")

        create_license_btn.href="javascript: void(0)"

        alert("Для работы с лицензиатами обязательно добавьте хотя бы одного заказчика!")
    }

    if (lics.length) {
        let captions = ['Код', 'Название', 'Заказчик', 'Операция']
        let rows = []

        for (let lic of lics) {
            rows.push([lic.id, lic.name, lic.customer.name])
        }

        drawTables(table, captions, rows, 'license')

        addHandlersToBtns()
    } else {
        table.className = "table"
        table.innerHTML = "<p class='h3 text-info text-center'>Список лицензиатов пуст. Добавьте элементы для работы.</p>"
    }
}

start()