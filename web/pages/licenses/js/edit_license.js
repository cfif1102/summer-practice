import { handleItem } from "../../../js/common.js"

const start = async () => {
    const customers = await eel.get_all_customers_py()()
    const license = await eel.get_selected_licenses_py()()
    
    handleItem(
        license, 
        "edit",
        "license", 
        [
            {"name": "customer", "items": customers, "id": "customer_id", "show_value": "name"}
        ],
        async (item, item_id) => {
            await eel.save_licenses_py(item_id, item)

            alert("Лицензиат успешно сохранен!")
        
            window.location.href = "http://localhost:8000/pages/licenses/licenses.html"
        }
    )
}

start()