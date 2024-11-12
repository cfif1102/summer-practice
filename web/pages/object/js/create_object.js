import { handleItem } from "../../../js/common.js"

const start = async () => {
    const customers = await eel.get_all_customers_py()()

    handleItem(
        {"name": "", "address": "", "customer": {}, "customer_id": 1}, 
        "create",
        "object", 
        [
            {"name": "customer", "items": customers, "id": "customer_id", "show_value": "name"}
        ],
        async (item) => {
            await eel.create_object_py(item)

            alert("Объект успешно создан!")
        
            window.location.href = "http://localhost:8000/pages/object/objects.html"
        }
    )
}


start()