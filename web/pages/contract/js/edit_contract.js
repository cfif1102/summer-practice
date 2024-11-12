import { handleItem } from "../../../js/common.js"

const start = async () => {
    const customers = await eel.get_all_customers_py()()
    const contract = await eel.get_selected_contracts_py()()
    
    handleItem(
        contract, 
        "edit",
        "contract", 
        [
            {"name": "customer", "items": customers, "id": "customer_id", "show_value": "name"}
        ],
        async (item, item_id) => {
            await eel.save_contracts_py(item_id, item)

            alert("Контракт успешно сохранен!")
        
            window.location.href = "http://localhost:8000/pages/contract/contracts.html"
        }
    )
}

start()