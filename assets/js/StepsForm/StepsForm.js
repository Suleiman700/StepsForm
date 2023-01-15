
export default class StepsForm {

    #parentId = ''
    #steps = []
    #currentStep = 0

    constructor() {

    }

    render() {
        // get parent
        const parent = document.querySelector(`#${this.#parentId}`)

        // get current step HTML
        const stepHTML = this.#steps[this.#currentStep]['html']

        const stepsShare = this.#buildStepsShape()

        parent.append(stepHTML)
        parent.append(stepsShare)
    }

    #buildStepsShape() {
        /*
            <div class="multisteps-form">
                <div class="row">
                    <div class="col-12 col-lg-8 ml-auto mr-auto mb-4">
                        <div class="multisteps-form__progress">
                            <button class="StepsForm-form__Progress js-active" type="button" title="User Info">User Info</button>
                            <button class="StepsForm-form__Progress" type="button" title="Address">Address</button>
                            <button class="StepsForm-form__Progress" type="button" title="Order Info1">Order1 Info</button>
                            <button class="StepsForm-form__Progress" type="button" title="Message">Message</button>
                        </div>
                    </div>
                </div>
            </div>

         */

        // generate steps circles
        const stepsButtons = document.createElement('div')
        stepsButtons.classList.add('multisteps-form__progress')
        this.#steps.forEach((step, stepIndex) => {
            const stepButton = document.createElement('button')
            stepButton.classList.add('StepsForm-form__Progress')
            stepButton.innerText = step['title']

            // set active step
            if (stepIndex == this.#currentStep) {
                stepButton.classList.add('js-active')
            }
            stepsButtons.append(stepButton)
        })

        const parent = document.createElement('div')
        parent.classList.add('multisteps-form')
        parent.innerHTML = `
            <div class="row">
                <div class="col-12 col-lg-8 ml-auto mr-auto mb-4">
                    <div class="multisteps-form__progress">
                        ${stepsButtons.innerHTML}
                    </div>
                </div>
            </div>
        `

        return parent
    }

    setParentId(_parentId) {
        this.#parentId = _parentId
    }

    setSteps(_steps) {
        this.#steps = _steps
    }
}