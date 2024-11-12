const start = async () => {
    const equipment_table = document.getElementById("equipment_table")
    const objects = await eel.get_all_objects_py()()
    const equipment = await eel.get_all_equipment_py()()

    captions = ['Код', 'Название', 'Операция']
    rows = []

    for (let eq of equipment) {
        rows.push([eq.id, eq.name])
    }

    drawTables(equipment_table, captions, rows)

    const selected_object = await eel.get_selected_object_py()()
    const objects_list = document.getElementById("document_object")

    const create_document_btn = document.getElementById("create_document_btn")

    create_document_btn.addEventListener("click", () => {
        create_document_handler()
    })

    if (objects.length) {
        for (let object of objects) {
            if (selected_object && object.id == selected_object.id) {
                result += `<option value="${object.id}" selected>${object.name}</option>`
            } else {
                result += `<option value="${object.id}">${object.name}</option>`
            }
        }

        objects_list.innerHTML = result
    } else {
        alert("Для работы с документами добавьте хотя бы один объект!")

        create_document_btn.disabled = true

        return
    }

    const document_type_list = document.getElementById("document_type")
    const document_type = await eel.get_document_type_py()()

    document_type_list.value = document_type

    const add_new_eq_btn = document.getElementById("add_new_eq_btn")

    add_new_eq_btn.addEventListener("click", () => {
        addEquipment("")
    })

    addHandlersToEquipment()
}

let current_equipment = []

async function create_document_handler() {
    if (!current_equipment.length) {
        alert("Сначало добавьте оборудование в список, чтобы создать документ!")
        return
    }

    if (current_equipment.some((eq, ind1) => current_equipment.some((eq1, ind2) => eq1.name != "" && eq.name != "" && eq1.name == eq.name && ind1 != ind2))) {
        alert("Не должно быть дубликатов!")
        return
    }

    const eqs = document.querySelectorAll('.eq-item')

    const equipment_list = []

    for (let eq of eqs) {
        const name = eq.querySelector(".eq-name").value
        const amount = parseInt(eq.querySelector(".eq-amount").value)

        if (name.trim() == "") {
            alert(`Введите имя для оборудования ${name}!`)
            return
        }

        if (Number.isNaN(amount)) {
            alert(`Количество должно быть числом для оборудования ${name}!`)
            return
        }

        if (amount < 0) {
            alert(`Количество не может быть меньше 0 для оборудования ${name}!`)
            return
        }

        equipment_list.push([name, amount])
    }

    const objects_list = document.getElementById("document_object")
    const document_type_list = document.getElementById("document_type")

    const object_id = objects_list.value
    const doc_type = document_type_list.value

    try {
        const result = await eel.create_document_py(object_id, equipment_list, doc_type)()

        alert(`Документ "${result}" успешно создан!"`)
    } catch (error) {
        alert(`Не удалось создать документ.`)
    }
}

function drawTables(table, captions, rows) {
    result = `<table class="table table-hover table-bordered">
              <thead class="bg-primary text-white"><tr>`

    for (let caption of captions) {
        result += `<th scope="col">${caption}</th>`
    }
    
    result += `</tr></thead>
               <tbody>`
    
    for (let row of rows) {
        result += "<tr>"

        for (let data of row) {
            result += `<td>${data}</td>`
        }

        result += `<td>
            <input type="button" value="Добавить в список" class="btn btn-info text-center add-equipment-btn" data-name='${row[1]}' data-id='${row[0]}'/><br>
        </td>`

        result += "</tr>"
    }

    result += `</tbody></table>` 
    
    table.innerHTML = result
}

function addHandlersToEquipment() {
    const eqBtns = document.querySelectorAll(".add-equipment-btn")

    for (let eqBtn of eqBtns) {
        eqBtn.addEventListener("click", () => {
            addEquipment(eqBtn.dataset.name)
        })
    }
}

function addEquipment(equipment_name) {
    if (current_equipment.some(eq => eq.name != "" && eq.name == equipment_name)) {
        alert("Вы уже добавили данное оборудование в список!")

        return
    }

    const eq = {
        name: equipment_name,
        amount: "",
        index: current_equipment.length ? current_equipment.at(-1).index + 1 : 1
    }

    current_equipment.push(eq)

    drawEquipment()
}

function deleteEquipment(index) {
    current_equipment = current_equipment.filter(eq => eq.index != index)

    drawEquipment()
}

function drawEquipment() {
    const eq_div = document.getElementById("equipment_list")

    let result = ""

    for (let eq of current_equipment) {
        result += `
            <hr class='w-100' style='color:black;' />   
            <div class="eq-item">

                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-column mr-3" style="flex-grow: 2;">
                        <label for="eq-name-${eq.index}">Название:</label>
                        <input type="text" id="eq-name-${eq.index}" class="form-control eq-name" data-index='${eq.index}' placeholder="Введите название оборудования" value="${eq.name}">
                    </div>
                    <div class="d-flex flex-column mr-3" style="flex-grow: 1;">
                        <label for="eq-amount-${eq.index}">Количество:</label>
                        <input type="text" id="eq-amount-${eq.index}" class="form-control eq-amount" data-index='${eq.index}' placeholder="Введите количество" value="${eq.amount}">
                    </div>
                    <div class="d-flex align-items-end">
                        <input type="btn" class="btn btn-danger btn-delete-equipment" value="Удалить из списка" data-index='${eq.index}'/>
                    </div>
                </div>
            </div>
        `
    }

    eq_div.innerHTML = result

    addHandlersToDeleteEquipment()
    addHandlersToInputNames()
    addHandlersToInputAmount()
}

function addHandlersToInputNames() {
    const eqBtns = document.querySelectorAll(".eq-name")

    for (let eqBtn of eqBtns) {
        eqBtn.addEventListener("input", (e) => {
            let ind = current_equipment.findIndex(eq => eq.index == eqBtn.dataset.index)

            if (ind != -1) {
                current_equipment[ind].name = eqBtn.value
            }
        })
    }
}

function addHandlersToInputAmount() {
    const eqBtns = document.querySelectorAll(".eq-amount")

    for (let eqBtn of eqBtns) {
        eqBtn.addEventListener("input", (e) => {
            let ind = current_equipment.findIndex(eq => eq.index == eqBtn.dataset.index)

            if (ind != -1) {
                current_equipment[ind].amount = eqBtn.value
            }
        })
    }
}


function addHandlersToDeleteEquipment() {
    const eqBtns = document.querySelectorAll(".btn-delete-equipment")

    for (let eqBtn of eqBtns) {
        eqBtn.addEventListener("click", () => {
            deleteEquipment(eqBtn.dataset.index)
        })
    }
}


start()