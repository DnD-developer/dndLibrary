export const dnd = function (selector) {
    return new dnd.prototype.init(selector)
}

dnd.prototype.init = function (selector) {
    if (!selector) {
        return this
    }

    Object.assign(this, document.querySelectorAll(selector))
    this.length = document.querySelectorAll(selector).length

    return this
}

dnd.prototype.init.prototype = dnd.prototype

window.dnd = dnd
