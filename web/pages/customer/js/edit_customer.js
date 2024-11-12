import { handleItem } from "../../../js/common.js";

const start = async () => {
    const customer = await eel.get_selected_customer_py()()

    handleItem(
        customer, 
        "edit",
        "customer", 
        [],
        async (item, id) => {
            await eel.save_customer_py(id, item)

            alert("Заказчик успешно сохранен!")

            window.location.href = "http://localhost:8000/pages/customer/customers.html"
        }
    )
}

start()