"use strict"
import dnd from "./lib/lib"

dnd(".menu_item-active").dropDownMenu()

dnd(".modal").modalCreate({
    triggers: ".test",
    btnClose: ".close",
    dialog: ".modal-dialog",
    content: ".modal-content"
})

dnd(".modal2").modalCreate({
    triggers: ".btnClick",
    btnClose: ".close",
    dialog: ".modal-dialog",
    content: ".modal-content"
})
