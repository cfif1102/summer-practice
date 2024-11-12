import { handleItem } from "../../../js/common.js"

const start = async () => {
    handleItem(
        {"name": ""}, 
        "create",
        "eq", 
        [],
        async (item) => {
            await eel.create_equipment_py(item)

            alert("Оборудование успешно создано!")
        
            window.location.href = "http://localhost:8000/pages/equipment/equipment.html"
        }
    )
}

start()