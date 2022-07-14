import dnd from "../core"

dnd.prototype.hide = function () {
    for (let index = 0; index < this.length; index++) {
        if (this[index].style) {
            this[index].style.display = "none"
        } else {
            continue
        }
    }

    return this
}

dnd.prototype.show = function (value = "block") {
    for (let index = 0; index < this.length; index++) {
        if (this[index].style) {
            this[index].style.display = value
        } else {
            continue
        }
    }

    return this
}

dnd.prototype.toogle = function (value = "block") {
    for (let index = 0; index < this.length; index++) {
        if (this[index].style) {
            if (this[index].style.display === "none") {
                this[index].style.display = value
            } else {
                this[index].style.display = "none"
            }
        } else {
            continue
        }
    }

    return this
}
