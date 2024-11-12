import {drawTables, addHandlers} from "../../../js/common.js"

const start = async () => {
    const eq_table = document.getElementById("equipment_table")

    const equipments = await eel.get_all_equipment_py()()

    if (equipments.length) {
        const captions = ['Код', "Имя", "Операции"]
        const rows = []

        for (let eq of equipments) {
            rows.push([eq.id, eq.name])
        }

        drawTables(eq_table, captions, rows, 'equipment')

        addHandlersToBtns()
    } else {
        eq_table.className = "table"
        eq_table.innerHTML = "<p class='h3 text-info text-center'>Список оборудования пуст. Добавьте элементы для работы.</p>"
    }

    const create_eq_btn = document.getElementById("create_equipment_btn")

    create_eq_btn.addEventListener("click", () => {
        window.location.href = "http://localhost:8000/pages/equipment/equipment.html"
    })
}

function addHandlersToBtns() {
    addHandlers(".equipment-edit-btn", (item) => {
        eel.set_selected_equipment_py(item.dataset.id)

        window.location.href = "http://localhost:8000/pages/equipment/edit_equipment.html"
    })

    addHandlers(".equipment-delete-btn", (item) => {
        let id = +item.dataset.id

        const isDelete = confirm(`Вы действительно хотите удалить оборудование №${id}?`)

        if (isDelete) {
            eel.delete_equipment_py(id)
            window.location.href = "http://localhost:8000/pages/equipment/equipment.html"
        }
    })
}

start()