import { handleItem } from "../../../js/common.js"

const start = async () => {
    handleItem(
        {"name": ""}, 
        "create",
        "customer", 
        [],
        async (item) => {
            await eel.create_customer_py(item)

            alert("Заказчик успешно создан!")
        
            window.location.href = "http://localhost:8000/pages/customer/customers.html"
        }
    )
}

start()