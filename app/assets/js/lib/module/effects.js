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

dnd.prototype.fadeIn = function ({ duration, display = "block", finallyFunction }) {
    const _applyAnimate = (elem) => {
        const _fadeIn = (stepAnimate) => {
                elem.style.display = display
                elem.style.opacity = stepAnimate
            },
            ani = this.animateStart({
                duration,
                animateAction: _fadeIn,
                maxValue: 1,
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

    return this
}

dnd.prototype.fadeOut = function ({ duration, finallyFunction }) {
    const _applyAnimate = (elem) => {
        const _fadeOut = (stepAnimate) => {
                elem.style.opacity = 1 - stepAnimate

                if (stepAnimate === 1) {
                    elem.style.display = "none"
                }
            },
            ani = this.animateStart({
                duration,
                animateAction: _fadeOut,
                maxValue: 1,
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

    return this
}

dnd.prototype.widthIn = function ({ duration, display = "block", maxValue = 100, units = "", finallyFunction }) {
    const _applyAnimate = (elem) => {
        const _widthIn = (stepAnimate) => {
                elem.style.display = display
                elem.style.width = `${stepAnimate}${units}`
            },
            ani = this.animateStart({
                duration,
                animateAction: _widthIn,
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

    return this
}

dnd.prototype.widthOut = function ({ duration, maxValue = 100, units = "", finallyFunction }) {
    const _applyAnimate = (elem) => {
        const _widthOut = (stepAnimate) => {
                elem.style.width = `${maxValue - stepAnimate}${units}`

                if (stepAnimate === maxValue) {
                    elem.style.display = "none"
                }
            },
            ani = this.animateStart({
                duration,
                animateAction: _widthOut,
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

    return this
}
