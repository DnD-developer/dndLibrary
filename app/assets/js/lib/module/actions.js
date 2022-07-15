import dnd from "../core"

dnd.prototype.eq = function (num) {
    if (this.length >= num - 1) {
        this.elements = this.elements[num - 1]
        this.length = 1
    }

    return this
}

dnd.prototype.closest = function (selector) {
    let i = 0
    const closestElements = []
    if (this.length > 1) {
        this.elements.forEach((item) => {
            if (item.closest(selector)) {
                closestElements[i] = item.closest(selector)
            }

            i++
        })

        if (closestElements.length) {
            this.elements = closestElements.filter((item, index) => {
                return closestElements.indexOf(item) == index
            })
            this.length = this.elements.length
        }
    } else {
        this.elements = this.elements.closest(selector)
    }

    return this
}
