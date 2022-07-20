import dnd from "../core"

dnd.prototype.dropDownMenu = function () {
    const _setEvent = (btn, toogleId) => {
        btn.addEventListener("click", () => {
            dnd(`[data-toogle-id = ${toogleId}]`).heightIn({
                duration: 300,
                autoValue: true
            })
        })
    }

    const _initAtributes = (elem, i) => {
        const menu = elem,
            btn = elem.querySelector("button"),
            list = elem.querySelector("ul"),
            item = elem.querySelectorAll("li")
        menu.classList.add("dnd-dropdown__menu")
        btn.setAttribute("id", `dnd-dropdown-btn-${elem.classList[0]}-${i}`)
        btn.classList.add("dnd-dropdown__btn")
        list.dataset.toogleId = `dnd-dropdown-list-${elem.classList[0]}-${i}`
        list.classList.add("dnd-dropdown__list")
        item.forEach((elem) => elem.classList.add("dnd-dropdown__item"))

        _setEvent(btn, `dnd-dropdown-list-${elem.classList[0]}-${i}`)
    }

    if (this.length > 1) {
        this.elements.forEach((elem, i) => {
            _initAtributes(elem, i)
        })
    } else {
        _initAtributes(this.elements, 0)
    }
}
