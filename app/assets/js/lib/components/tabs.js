import dnd from "../core"

dnd.prototype.tabsCreate = function ({ tabsPanel, tabsContent }) {
    if (this.length > 1) {
        this.elements.forEach((elem) => {
            this.tabsInit(elem, { tabsPanel, tabsContent })
            this.tabsEvent(elem, { tabsPanel, tabsContent, styleProperty })
        })
    } else {
        this.tabsInit(this.elements, { tabsPanel, tabsContent })
        this.tabsEvent(this.elements, { tabsPanel, tabsContent })
    }
    return this
}

dnd.prototype.tabsInit = function (elem, { tabsPanel, tabsContent }) {
    elem.classList.add("dnd-tabs")
    elem.querySelector(tabsPanel).classList.add("dnd-tabs-panel")
    elem.querySelector(tabsContent).classList.add("dnd-tabs-content")
    const tabsItemsDocumentElements = [...elem.querySelector(tabsContent).children]
    const triggersDocumentElements = elem.querySelectorAll(`${tabsPanel} li`)

    tabsItemsDocumentElements.forEach((item) => item.classList.add("dnd-tabs-content__item"))

    tabsItemsDocumentElements[0].classList.add("active")
    triggersDocumentElements[0].classList.add("active")
}

dnd.prototype.tabsEvent = function (elem, { tabsPanel, tabsContent }) {
    const triggersDocumentElements = elem.querySelectorAll(`${tabsPanel} li`)
    const tabsItemsDocumentElements = [...elem.querySelector(tabsContent).children]

    triggersDocumentElements.forEach((trigger, indexTrigger) => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault()
            triggersDocumentElements.forEach((trigger) => {
                trigger.classList.remove("active")
            })
            trigger.classList.add("active")

            tabsItemsDocumentElements.forEach((item, indexItem) => {
                item.classList.remove("active")
                if (indexTrigger == indexItem) {
                    item.classList.add("active")
                }
            })
        })
    })
}
