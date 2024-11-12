import { drawTables, addHandlers } from "../../../js/common.js"

function addHandlersToBtns() {
    addHandlers(".object-edit-btn", (elem) => {
        eel.set_selected_object_id_py(elem.dataset.id)

        window.location.href = "http://localhost:8000/pages/object/edit_object.html"
    })

    addHandlers(".object-delete-btn", (elem) => {
        let id = +elem.dataset.id

        const isDelete = confirm(`Вы действительно хотите удалить объект №${id}?`)

        if (isDelete) {
            eel.delete_object_py(id)
            window.location.href = "http://localhost:8000/pages/object/objects.html"
        }
    })

    addHandlers(".object-document-btn", async (elem) => {
        const docType = elem.dataset.doc
        const id = +elem.dataset.id

        await eel.follow_document_py(id, docType)()

        window.location.href = "http://localhost:8000/pages/document/documents.html"
    })
}

const start = async () => {
    const objects = await eel.get_all_objects_py()()
    const customers = await eel.get_all_customers_py()()

    if (!customers.length) {
        const create_object_btn = document.getElementById("create_object_btn")

        create_object_btn.href="javascript: void(0)"

        alert("Для работы с объектами обязательно добавьте хотя бы одного заказчика!")
    }

    const table = document.getElementById("objects_table")

    if (objects.length) {
        let captions = ['Код', 'Название', 'Адрес', 'Заказчик', 'Операции', 'Документы']
        let rows = []

        for (let object of objects) {
            rows.push([object.id, object.name, object.address, object.customer.name,])
        }

        drawTables(table, captions, rows, 'object', (row) => {
            return (
                `<td>
                    <input type="button" value="Создать акт" class="btn btn-success object-document-btn" data-id='${row[0]}' data-doc='act'/><br>
                    <input type="button" value="Создать паспорт" class="btn btn-success mt-2 object-document-btn" data-id='${row[0]}' data-doc='passport'/>
                </td>`
                )
        })

        addHandlersToBtns()
    } else {
        table.className = "table"
        table.innerHTML = "<p class='h3 text-info text-center'>Список объектов пуст. Добавьте элементы для работы.</p>"
    }
}

start()