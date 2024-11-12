import { handleItem } from "../../../js/common.js"

const start = async () => {
    const object = await eel.get_selected_object_py()()
    const customers = await eel.get_all_customers_py()()

    handleItem(
        object, 
        "edit",
        "object", 
        [
            {"name": "customer", "items": customers, "id": "customer_id", "show_value": "name"}
        ],
        async (item, item_id) => {
            await eel.save_object_py(item_id, item)

            alert("Объект успешно сохранен!")

            window.location.href = "http://localhost:8000/pages/object/objects.html"
        }
    )
}

start()