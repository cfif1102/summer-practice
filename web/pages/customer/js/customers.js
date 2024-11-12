import {drawTables, addHandlers} from "../../../js/common.js"

const start = async () => {
    const customer_table = document.getElementById("customer_table")

    const customers = await eel.get_all_customers_py()()

    if (customers.length) {
        const captions = ['Код', "Имя", "Операции"]
        const rows = []

        for (let customer of customers) {
            rows.push([customer.id, customer.name])
        }

        drawTables(customer_table, captions, rows, 'customer')

        addHandlersToBtns()
    } else {
        customer_table.className = "table"
        customer_table.innerHTML = "<p class='h3 text-info text-center'>Список заказчиков пуст. Добавьте элементы для работы.</p>"
    }

    const create_customer_btn = document.getElementById("create_customer_btn")

    create_customer_btn.addEventListener("click", () => {
        window.location.href = "http://localhost:8000/pages/equipment/create_customer.html"
    })
}

function addHandlersToBtns() {
    addHandlers(".customer-edit-btn", (item) => {
        eel.set_selected_customer_py(item.dataset.id)

        window.location.href = "http://localhost:8000/pages/customer/edit_customer.html"
    })

    addHandlers(".customer-delete-btn", (item) => {
        let id = +item.dataset.id

        const isDelete = confirm(`Вы действительно хотите удалить заказчика №${id}?`)

        if (isDelete) {
            eel.delete_customer_py(id)
            window.location.href = "http://localhost:8000/pages/customer/customers.html"
        }
    })
}

start()