import { handleItem } from "../../../js/common.js";

const start = async () => {
    const eq = await eel.get_selected_equipment_py()()

    handleItem(
        eq, 
        "edit",
        "eq", 
        [],
        async (item, id) => {
            await eel.save_equipment_py(id, item)

            alert("Оборудование успешно сохранено!")

            window.location.href = "http://localhost:8000/pages/equipment/equipment.html"
        }
    )
}

start()