const dnd = function (selector) {
    return new dnd.prototype.init(selector)
}

dnd.prototype.init = function (selector) {
    if (!selector) {
        return this
    }

    this.length = document.querySelectorAll(selector).length

    if (this.length == 1) {
        this.elements = document.querySelector(selector)
    } else {
        this.elements = [...document.querySelectorAll(selector)]
    }

    return this
}

dnd.prototype.init.prototype = dnd.prototype

window.dnd = dnd

export default dnd
