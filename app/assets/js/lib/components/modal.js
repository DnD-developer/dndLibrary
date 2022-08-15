import dnd from "../core"

dnd.prototype._openModal = function (elem, isOpen) {
    elem.addEventListener("click", (e) => {
        e.preventDefault()
        this.animateIn({
            duration: 300,
            styleProperty: "opacity",
            display: "flex",
            finallyFunction: () => {
                this.disableScroll(isOpen)
            }
        })
    })
}
dnd.prototype._closeBtnModal = function (elem, isClosed) {
    elem.addEventListener("click", (e) => {
        e.preventDefault()
        this.animateOut({
            duration: 300,
            styleProperty: "opacity",
            finallyFunction: () => {
                this.enableScroll(isClosed)
            }
        })
    })
}

dnd.prototype._closeWrapperModal = function (wrp, isClosed) {
    wrp.addEventListener("click", (e) => {
        if (e.target.classList.contains("dnd-modal")) {
            this.animateOut({
                duration: 300,
                styleProperty: "opacity",
                finallyFunction: () => {
                    this.enableScroll(isClosed)
                }
            })
        }
    })
}

dnd.prototype.disableScroll = function (isOpen) {
    let child
    for (let index = 0; index < document.body.childNodes.length; index++) {
        if (document.body.childNodes[index].tagName != "SCRIPT" && document.body.childNodes[index] instanceof Element) {
            child = document.body.childNodes[index]
            break
        }
    }

    let paddingOffset = window.innerWidth - child.offsetWidth + "px"
    document.body.style.paddingRight = paddingOffset
    document.body.style.overflow = "hidden"
    if (typeof isOpen == "function") {
        isOpen()
    }
}

dnd.prototype.enableScroll = function (isClosed) {
    document.body.style.paddingRight = "0px"
    document.body.style.overflow = ""
    if (typeof isClosed == "function") {
        isClosed()
    }
}

// !Технические функции end

dnd.prototype.modalCreate = function ({ triggers, btnClose, dialog, content, isOpen, isClosed }) {
    this.modalInit(this.elements, { btnClose, dialog, content, isClosed })

    if (dnd(triggers).length > 1) {
        dnd(triggers).elements.forEach((elem) => {
            this._openModal(elem, isOpen)
        })
    } else {
        this._openModal(dnd(triggers).elements, isOpen)
    }
    return this
}

dnd.prototype.modalInit = function (elem, { btnClose, dialog, content, isClosed }) {
    let modal = elem,
        modalDialog = modal.querySelector(dialog),
        modalContent = modalDialog.querySelector(content),
        modalClose = modal.querySelectorAll(btnClose)

    modal.classList.add("dnd-modal")
    modalDialog.classList.add("dnd-modal-dialog")
    modalContent.classList.add("dnd-modal-content")
    modalClose[0].classList.add("dnd-modal-close")

    modalClose.forEach((btn) => {
        this._closeBtnModal(btn, isClosed)
    })

    this._closeWrapperModal(modal, isClosed)
}
// !Статичные модалки end

dnd.prototype.modalDynamicInit = function (modal, { headerText, bodyText, btnCloseFooterText, isClosed }) {
    let modalDialog = document.createElement("div"),
        modalContent = document.createElement("div"),
        modalClose = document.createElement("button"),
        modalHeader = document.createElement("div"),
        modalTitle = document.createElement("h3"),
        modalBody = document.createElement("div"),
        modalText = document.createElement("p"),
        modalFooter = document.createElement("div"),
        modalCloseFooter = document.createElement("button")

    modal.classList.add("dnd-modal")
    modalDialog.classList.add("dnd-modal-dialog", "dnd-modal-dynamic-dialog")
    modalContent.classList.add("dnd-modal-content", "dnd-modal-dynamic-content")
    modalClose.classList.add("dnd-modal-close")
    modalHeader.classList.add("dnd-modal-header", "dnd-modal-dynamic-header")
    modalTitle.classList.add("dnd-modal-title")
    modalBody.classList.add("dnd-modal-body", "dnd-modal-dynamic-body")
    modalText.classList.add("dnd-modal-text")
    modalFooter.classList.add("dnd-modal-footer", "dnd-modal-dynamic-footer")
    modalCloseFooter.classList.add("dnd-modal-close-footer", "dnd-modal-dynamic-close-footer")

    modalTitle.textContent = headerText
    modalText.textContent = bodyText
    modalCloseFooter.textContent = btnCloseFooterText

    modal.appendChild(modalDialog)
    modalDialog.appendChild(modalContent)
    modalContent.appendChild(modalClose)
    modalContent.appendChild(modalHeader)
    modalHeader.appendChild(modalTitle)
    modalContent.appendChild(modalBody)
    modalBody.appendChild(modalText)
    modalContent.appendChild(modalFooter)
    modalFooter.appendChild(modalCloseFooter)

    document.body.appendChild(modal)

    this._closeBtnModal(modalClose, isClosed)

    this._closeBtnModal(modalCloseFooter, isClosed)

    this._closeWrapperModal(modal, isClosed)
}

dnd.prototype.modalDynamicCreate = function ({
    headerText,
    bodyText,
    btnCloseFooterText,
    isOpen,
    isClosed = () => {
        this.elements.remove()
    }
}) {
    let modal = document.createElement("div")
    this.elements = modal

    this.modalDynamicInit(modal, { headerText, bodyText, btnCloseFooterText, isClosed })

    this.animateIn({
        duration: 300,
        styleProperty: "opacity",
        display: "flex",
        finallyFunction: () => {
            this.disableScroll(isOpen)
        }
    })

    return this
}

// !Динамичные модалки end
