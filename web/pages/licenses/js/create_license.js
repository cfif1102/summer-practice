import { handleItem } from "../../../js/common.js"

const start = async () => {
    const customers = await eel.get_all_customers_py()()

    handleItem(
        {"name": "", "customer": {}, "customer_id": 1}, 
        "create",
        "license", 
        [
            {"name": "customer", "items": customers, "id": "customer_id", "show_value": "name"}
        ],
        async (item) => {
            await eel.create_licenses_py(item)

            alert("Лицензиат успешно создан!")
        
            window.location.href = "http://localhost:8000/pages/licenses/licenses.html"
        }
    )
}

start()