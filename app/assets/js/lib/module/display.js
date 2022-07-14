import dnd from "../core"

dnd.prototype.hide = function () {
    if (this.length > 1) {
        this.elements.forEach((element) => {
            element.style.display = "none"
        })
    } else {
        this.elements.style.display = "none"
    }

    return this
}

dnd.prototype.show = function (value = "block") {
    if (this.length > 1) {
        this.elements.forEach((element) => {
            element.style.display = value
        })
    } else {
        this.elements.style.display = value
    }

    return this
}

dnd.prototype.toogle = function (value = "block") {
    if (this.length > 1) {
        this.elements.forEach((element) => {
            if (element.style.display === "none") {
                element.style.display = value
            } else {
                element.style.display = "none"
            }
        })
    } else {
        if (this.elements.style.display === "none") {
            this.elements.style.display = value
        } else {
            this.elements.style.display = "none"
        }
    }

    return this
}
