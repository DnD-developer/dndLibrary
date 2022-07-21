"use strict"
import dnd from "./lib/lib"

dnd(".menu_item-active").dropDownMenu()

dnd(".btnClick").elements.addEventListener("click", () => {
    dnd().modalDynamicCreate({
        headerText: "Тестовое модальное окно",
        bodyText: "привет мир, я вернулся",
        btnCloseFooterText: "Ок"
    })
})

const open = () => console.log("Открыто")
const close = () => console.log("Закрыто")

dnd(".modal2").modalCreate({
    triggers: ".test",
    btnClose: ".close",
    dialog: ".modal-dialog",
    content: ".modal-content"
})
