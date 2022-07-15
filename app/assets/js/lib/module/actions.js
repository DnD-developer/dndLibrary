import dnd from "../core"

dnd.prototype.eq = function (num) {
    if (this.length >= num - 1) {
        this.elements = this.elements[num - 1]
        this.length = 1
    }

    return this
}
