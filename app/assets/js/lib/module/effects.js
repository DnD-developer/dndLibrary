import dnd from "../core"

dnd.prototype.animateStart = function ({ duration, animateAction, maxValue, finallyFunction }) {
    // метод, который производит анимацию.
    let timeStart, stepAnimate

    function _animationMake(time) {
        if (!timeStart) {
            timeStart = time
            stepAnimate = 0
        }

        let timeProgress = time - timeStart,
            timeFraction = () => {
                return timeProgress / duration
            } // функция расчета шага анимации в зависимости от скорости анимации, он рассчитывается от 0 до 1, так как анимация линейная эта функция возвращает не модернизированное значение, при это можно подставлять другие уравнения, и тогда анимация будет идти не линейно по графику уравнения

        stepAnimate = Math.min(timeFraction(), 1) //  устанавливается шаг анимации, в зависимости от того перешел ли ghjuhtcc  timefraction выше единицы.
        animateAction(stepAnimate * maxValue) // шаг умножается на значение свойства эелемента, которое является либо конечным либо начальным, в зависимости от направления анимации(скрытия или раскрытия элемента)

        if (timeFraction() < 1) {
            requestAnimationFrame(_animationMake)
        } else {
            if (typeof finallyFunction === "function") {
                finallyFunction()
            }
        }
    }

    return _animationMake
}

dnd.prototype.applyAnimateIn = function ({ duration, display, finallyFunction, styleProperty, maxValue = 1, units = "", autoValue = false }) {
    const _applyAnimate = (elem) => {
        let triggerStart = true
        if (autoValue && triggerStart) {
            elem.style.display = display
            maxValue = +window.getComputedStyle(elem)[styleProperty].replace(/px/, "")
            units = "px"
            triggerStart = false
            elem.style.display = "none"
        }
        const _animateIn = (stepAnimate) => {
                elem.style.display = display
                elem.style[styleProperty] = `${stepAnimate}${units}`
            },
            ani = this.animateStart({
                duration,
                animateAction: _animateIn,
                maxValue,
                finallyFunction
            })

        requestAnimationFrame(ani)
    }

    if (this.length > 1) {
        this.elements.forEach((elem) => {
            _applyAnimate(elem)
        })
    } else {
        _applyAnimate(this.elements)
    }
}

dnd.prototype.applyAnimateOut = function ({ duration, finallyFunction, styleProperty, maxValue = 1, units = "", autoValue = false }) {
    const _applyAnimate = (elem) => {
        let triggerStart = true
        if (autoValue && triggerStart) {
            maxValue = +window.getComputedStyle(elem)[styleProperty].replace(/px/, "")
            units = "px"
            triggerStart = false
        }

        const _animateOut = (stepAnimate) => {
                elem.style[styleProperty] = `${maxValue - stepAnimate}${units}`

                if (stepAnimate === maxValue) {
                    elem.style.display = "none"
                }
            },
            ani = this.animateStart({
                duration,
                animateAction: _animateOut,
                maxValue,
                finallyFunction
            })

        requestAnimationFrame(ani)
    }

    if (this.length > 1) {
        this.elements.forEach((elem) => {
            _applyAnimate(elem)
        })
    } else {
        _applyAnimate(this.elements)
    }
}
// !Технические методы end

dnd.prototype.fadeIn = function ({ duration, display = "block", finallyFunction, maxValue = 1, units = "" }) {
    this.applyAnimateIn({
        duration,
        display,
        finallyFunction,
        styleProperty: "opacity",
        maxValue,
        units
    })

    return this
}

dnd.prototype.fadeOut = function ({ duration, finallyFunction, maxValue = 1, units = "" }) {
    this.applyAnimateOut({
        duration,
        finallyFunction,
        styleProperty: "opacity",
        maxValue,
        units
    })

    return this
}

dnd.prototype.fadeToogle = function ({ duration, display = "block", finallyFunction, maxValue = 1, units = "" }) {
    const _selectAnimate = (elem) => {
        if (window.getComputedStyle(elem).display === "none") {
            this.applyAnimateIn({
                duration,
                display,
                finallyFunction,
                styleProperty: "opacity",
                maxValue,
                units
            })
        } else {
            this.applyAnimateOut({
                duration,
                finallyFunction,
                styleProperty: "opacity",
                maxValue,
                units
            })
        }
    }
    if (this.length > 1) {
        this.elements.forEach((elem) => _selectAnimate(elem))
    } else {
        _selectAnimate(this.elements)
    }

    return this
}
// !прозрачность end

dnd.prototype.widthIn = function ({ duration, display = "block", maxValue = 100, units = "", finallyFunction, autoValue = false }) {
    this.applyAnimateIn({
        duration,
        display,
        finallyFunction,
        styleProperty: "width",
        maxValue,
        units,
        autoValue
    })

    return this
}

dnd.prototype.widthOut = function ({ duration, maxValue = 100, units = "", finallyFunction, autoValue = false }) {
    this.applyAnimateOut({
        duration,
        finallyFunction,
        styleProperty: "width",
        maxValue,
        units,
        autoValue
    })

    return this
}

// !Ширина end

dnd.prototype.heightIn = function ({ duration, display = "block", maxValue = 100, units = "", finallyFunction, autoValue = false }) {
    this.applyAnimateIn({
        duration,
        display,
        finallyFunction,
        styleProperty: "height",
        maxValue,
        units,
        autoValue
    })

    return this
}

dnd.prototype.heightOut = function ({ duration, maxValue = 100, units = "", finallyFunction, autoValue = false }) {
    this.applyAnimateOut({
        duration,
        finallyFunction,
        styleProperty: "height",
        maxValue,
        units,
        autoValue
    })

    return this
}

// !Высота end
