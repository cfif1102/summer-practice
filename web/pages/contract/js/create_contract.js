import { handleItem } from "../../../js/common.js"

const start = async () => {
    const customers = await eel.get_all_customers_py()()

    handleItem(
        {"contract_number": "", "customer": {}, "customer_id": 1}, 
        "create",
        "contract", 
        [
            {"name": "customer", "items": customers, "id": "customer_id", "show_value": "name"}
        ],
        async (item) => {
            await eel.create_contracts_py(item)

            alert("Контракт успешно создан!")
        
            window.location.href = "http://localhost:8000/pages/contract/contracts.html"
        }
    )
}

start()