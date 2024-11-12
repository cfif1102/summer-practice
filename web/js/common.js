
export function drawTables(table, captions, rows, editItem, extraBtns = "") {
    let result = `<table class="table table-hover table-bordered">
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
            <input type="button" value="Редактировать" class="btn btn-info text-center ${editItem}-edit-btn" data-id='${row[0]}'/>
            <input type="button" value="Удалить" class="btn btn-danger ${editItem}-delete-btn" data-id='${row[0]}'/>
        </td>`

        if (extraBtns) {
            result += extraBtns(row)
        }

        result += "</tr>"
    }

    result += `</tbody></table>` 
    
    table.innerHTML = result
}

export function addHandlers(selector, action, event = "click") {
    const items = document.querySelectorAll(selector)

    for (let item of items) {
        item.addEventListener(event, () => {
            action(item)
        })
    }
}

export async function handleItem(item, item_operation, item_name, list_items, action) {
    for (let prop in item) {
        const type = typeof item[prop]

        if (type == "object") {
            let list_item = list_items.find(list_item => list_item.name == prop)

            const field_list = document.getElementById(`${item_name}_${list_item.name}`)

            if (list_items) {
                let items_html = ""

                for (let el of list_item.items) {
                    if (el.id == item[list_item.id]) {
                        items_html += `<option value="${el.id}" selected>${el[list_item.show_value]}</option>`
                    } else {
                        items_html += `<option value="${el.id}">${el[list_item.show_value]}</option>`
                    }
                }
            
                field_list.innerHTML = items_html
            }
        } else {
            const field = document.getElementById(`${item_name}_${prop}`)

            if (!field) {
                continue
            }

            field.value = item[prop]
        }
    }

    const item_operation_btn = document.getElementById(`${item_operation}_${item_name}_btn`)

    item_operation_btn.addEventListener("click", () => {
        itemHandler(item, item_name, list_items, (item, item_id) => {
            if (item_operation == "create") {
                action(item)
            } else if (item_operation == "edit") {
                action(item, item_id)
            }
        })
    })
}

function itemHandler(item, item_name, list_items, action) {
    const fields = []

    for (let prop in item) {
        const field = document.getElementById(`${item_name}_${prop}`)

        if (!field) {
            continue
        }

        fields.push([field, prop])
    }

    let result = {}

    for (let [field, field_name] of fields) {
        const type = field.dataset.type

        if (type == "string") {
            if (field.value.trim() == "") {
                alert(`Поле ${field_name} не должно быть пустой строкой!`)
                return
            }

            result[field_name] = field.value
        } else if (type == "int") {
            const val = parseInt(field.value)

            if (Number.isNaN(val)) {
                alert(`Поле ${field_name} должно быть числом!`)
                return
            }

            result[field_name] = field.value
        } else if (type == "list") {
            if (!field.value) {
                alert(`Выберите ${field_name} в списке!`)
                return
            }

            const list_item = list_items.find(list_item => list_item.name == field_name)

            result[list_item.id] = field.value
        }

    }

    action(result, item.id)
}