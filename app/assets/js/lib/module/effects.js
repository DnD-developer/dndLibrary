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

dnd.prototype.applyAnimateIn = function ({ elem, duration, display, finallyFunction, styleProperty, maxValue, units, autoValue }) {
    const _applyAnimate = () => {
        let triggerStart = true
        if (autoValue && triggerStart) {
            elem.style.display = display
            elem.style[styleProperty] = "auto"
            maxValue = +window.getComputedStyle(elem)[styleProperty].replace(/px|%/, "")
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

    _applyAnimate()
}

dnd.prototype.applyAnimateOut = function ({ elem, duration, finallyFunction, styleProperty, maxValue, units, autoValue }) {
    const _applyAnimate = () => {
        let triggerStart = true
        if (autoValue && triggerStart) {
            maxValue = +window.getComputedStyle(elem)[styleProperty].replace(/px|%/, "")
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

    _applyAnimate()
}

dnd.prototype.selectAnimate = function ({ elem, duration, display, finallyFunction, styleProperty, maxValue, units, autoValue }) {
    if (window.getComputedStyle(elem).display === "none") {
        this.applyAnimateIn({
            elem,
            duration,
            display,
            finallyFunction,
            styleProperty,
            maxValue,
            units,
            autoValue
        })
    } else {
        this.applyAnimateOut({
            elem,
            duration,
            finallyFunction,
            styleProperty,
            maxValue,
            units,
            autoValue
        })
    }
}

dnd.prototype.callAnimate = function ({ animateFunction, duration, display, styleProperty, finallyFunction, maxValue, units, autoValue }) {
    if (this.length > 1) {
        this.elements.forEach((elem) =>
            this[animateFunction]({
                elem,
                duration,
                display,
                finallyFunction,
                styleProperty,
                maxValue,
                autoValue,
                units
            })
        )
    } else {
        this[animateFunction]({
            elem: this.elements,
            duration,
            display,
            finallyFunction,
            styleProperty,
            maxValue,
            autoValue,
            units
        })
    }
}

// !Технические методы end

dnd.prototype.animateIn = function ({ duration, display = "block", styleProperty, finallyFunction, maxValue = 1, units = "", autoValue = false }) {
    this.callAnimate({
        animateFunction: "applyAnimateIn",
        duration,
        display,
        finallyFunction,
        styleProperty,
        maxValue,
        autoValue,
        units
    })

    return this
}

dnd.prototype.animateOut = function ({ duration, finallyFunction, display = "block", styleProperty, maxValue = 1, units = "", autoValue = false }) {
    this.callAnimate({
        animateFunction: "applyAnimateOut",
        duration,
        display,
        finallyFunction,
        styleProperty,
        maxValue,
        autoValue,
        units
    })
    return this
}

dnd.prototype.animateToogle = function ({ duration, display = "block", styleProperty, finallyFunction, maxValue = 1, units = "", autoValue = false }) {
    this.callAnimate({
        animateFunction: "selectAnimate",
        duration,
        display,
        finallyFunction,
        styleProperty,
        maxValue,
        autoValue,
        units
    })

    return this
}
