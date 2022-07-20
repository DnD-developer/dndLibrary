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

dnd.prototype.applyAnimateIn = function ({ duration, display, finallyFunction, styleProperty, maxValue = 1, units = "" }) {
    const _applyAnimate = (elem) => {
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

dnd.prototype.applyAnimateOut = function ({ duration, finallyFunction, styleProperty, maxValue = 1, units = "" }) {
    const _applyAnimate = (elem) => {
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

dnd.prototype.fadeIn = function ({ duration, display = "block", finallyFunction }) {
    this.applyAnimateIn({
        duration,
        display,
        finallyFunction,
        styleProperty: "opacity"
    })

    return this
}

dnd.prototype.fadeOut = function ({ duration, finallyFunction }) {
    this.applyAnimateOut({
        duration,
        finallyFunction,
        styleProperty: "opacity"
    })

    return this
}

dnd.prototype.fadeToogle = function ({ duration, display = "block", finallyFunction }) {
    const _selectAnimate = (elem) => {
        if (window.getComputedStyle(elem).display === "none") {
            this.applyAnimateIn({
                duration,
                display,
                finallyFunction,
                styleProperty: "opacity"
            })
        } else {
            this.applyAnimateOut({
                duration,
                finallyFunction,
                styleProperty: "opacity"
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

dnd.prototype.widthIn = function ({ duration, display = "block", maxValue = 100, units = "", finallyFunction }) {
    this.applyAnimateIn({
        duration,
        display,
        finallyFunction,
        styleProperty: "width",
        maxValue,
        units
    })

    return this
}

dnd.prototype.widthOut = function ({ duration, maxValue = 100, units = "", finallyFunction }) {
    this.applyAnimateOut({
        duration,
        finallyFunction,
        styleProperty: "width",
        maxValue,
        units
    })

    return this
}

// !Ширина end
