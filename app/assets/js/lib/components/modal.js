import dnd from "../core"

dnd.prototype.modalCreate = function ({ triggers, btnClose, dialog, content, isOpen, isClosed }) {
    if (this.length > 1) {
        this.elements.forEach((elem) => {
            this.modalInit(elem, btnClose)
        })
    } else {
        this.modalInit(this.elements, { btnClose, dialog, content })
    }

    dnd(triggers).elements.addEventListener("click", (e) => {
        e.preventDefault()
        this.animateIn({
            duration: 300,
            styleProperty: "opacity",
            display: "flex"
        })
        this.disableScroll(isClosed)
        document.body.style.overflow = "hidden"
        if (typeof isClosed == "function") {
            isOpen()
        }
    })

    return this
}

dnd.prototype.modalInit = function (elem, { btnClose, dialog, content }) {
    let modal = elem,
        modalDialog = modal.querySelector(dialog),
        modalContent = modalDialog.querySelector(content),
        modalClose = modal.querySelectorAll(btnClose)

    modal.classList.add("dnd-modal")
    modalDialog.classList.add("dnd-modal-dialog")
    modalContent.classList.add("dnd-modal-content")
    modalClose[0].classList.add("dnd-modal-close")

    modalClose.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault()
            this.animateOut({
                duration: 300,
                styleProperty: "opacity"
            })
            this.enableScroll()
            document.body.style.overflow = ""
        })
    })

    modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("dnd-modal")) {
            this.animateOut({
                duration: 300,
                styleProperty: "opacity"
            })
            this.enableScroll()
            document.body.style.overflow = ""
        }
    })
}

dnd.prototype.disableScroll = function (isClosed) {
    let child
    for (let index = 0; index < document.body.childNodes.length; index++) {
        if (document.body.childNodes[index].tagName != "SCRIPT" && document.body.childNodes[index] instanceof Element) {
            child = document.body.childNodes[index]
            break
        }
    }

    let paddingOffset = window.innerWidth - child.offsetWidth + "px"
    document.body.style.paddingRight = paddingOffset
    if (typeof isClosed == "function") {
        isClosed()
    }
}

dnd.prototype.enableScroll = function () {
    document.body.style.paddingRight = "0px"
}
