import {stepsLine} from './styling.js';

// settings for requires steps params
import stepsParamsSettings from './StepsForm_ParamsSettings.js';

export default class StepsForm {

    #steps = []
    #progressStepIndex = 0
    #stepCompleted = 0
    #parentId = ''

    constructor() {}

    async render() {
        // set step incomplete
        this.setStepCompleted(false)

        // clear parent html
        document.querySelector(`#${this.#parentId}`).innerHTML = ''

        const container = document.createElement('div')

        container.append(await this.#steps[this.#progressStepIndex]['html'](this))
        container.append(this.#createStepsLine())
        container.append(this.#createNavigateButtons())

        document.querySelector(`#${this.#parentId}`).append(container)
    }

    /**
     * goto next step
     * @return void
     */
    gotoNextStep() {
        if (!this.#stepCompleted) {
            return
        }

        console.log('clicked next button')

        // increase step
        this.#increaseStep()

        // render
        this.render()
    }

    /**
     * goto previous step
     * @return void
     */
    gotoPreviousStep() {
        console.log('clicked previous button')

        // decrease step
        this.#decreaseStep()

        // render
        this.render()
    }

    #createStepsLine() {
        // get steps
        const steps = this.getSteps()

        // create steps parent container
        const container = document.createElement('div');
        container.classList.add('steps-bar');

        const ul = document.createElement('ul');
        ul.classList.add('steps-indicator');

        // create steps buttons
        steps.forEach((step, stepIndex) => {
            const li = document.createElement('li');

            // set step class
            let stepClass = 'default'
            if (this.#progressStepIndex == stepIndex) stepClass = 'current'
            else if (this.#progressStepIndex > stepIndex) stepClass = 'done'
            li.classList.add(stepClass);

            // create step button
            const stepButton = document.createElement('a');

            // set step title
            stepButton.innerText = steps[stepIndex]['title'];

            // add button to li
            li.append(stepButton);

            // add li to ul
            ul.append(li);
        });

        // add ul to container
        container.append(ul);

        return container;
    }

    #createNavigateButtons() {
        // get steps
        const steps = this.getSteps()

        // get current step
        const currentStep = steps[this.#progressStepIndex]

        const container = document.createElement('div')
        container.classList.add('navigation-buttons')

        // check if the current step is not the first step
        if (this.#progressStepIndex !== 0 && currentStep['canGoToPreviousStep']) {
            // create previous button
            const previousButton = document.createElement('button')
            previousButton.classList.add('btn', 'btn-info')
            previousButton.innerText = 'Previous'
            previousButton.addEventListener('click', () => {
                // access callback function within the step
                currentStep['CB_previousOnClick']()
            })

            container.append(previousButton)
        }

        // check if the current step is not the last step
        if (this.#progressStepIndex !== steps.length - 1) {
            // create next button
            const nextButton = document.createElement('button')
            nextButton.classList.add('btn', 'btn-success')
            nextButton.innerText = 'Next'
            nextButton.addEventListener('click', () => {
                currentStep['CB_nextOnClick']()
            })
            container.append(nextButton)
        }

        return container
    }

    /**
     * set parent id
     * @param _parentId {string} example: myStepForm
     */
    setParent(_parentId) {
        this.#parentId = _parentId
    }

    /**
     * set steps
     * @param _steps {[]} array of objects
     */
    setSteps(_steps) {
        this.#steps = _steps;

        // validate steps param
        this.#validateStepsParams()
    }

    /**
     * get steps
     * @return {[]} array of objects
     */
    getSteps() {
        return this.#steps;
    }

    /**
     * set step completed
     * @param _option {boolean}
     */
    setStepCompleted(_option) {
        this.#stepCompleted = (_option)? true:false
        console.log(`marked step ${this.#progressStepIndex+1} as ${_option}`)
    }

    #increaseStep() {
        this.#progressStepIndex++
    }

    #decreaseStep() {
        this.#progressStepIndex--
    }

    /**
     * validate steps params
     * @return {boolean}
     */
    #validateStepsParams() {
        // initialize a flag to true, which indicates that the steps are valid
        let isValid = true;

        // get steps
        const steps = this.getSteps()

        // iterate through each step in the array
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];

            // iterate through each parameter in the stepsParamsSettings
            for (let param in stepsParamsSettings) {
                // check if the step is missing the required parameter
                if (!step.hasOwnProperty(param)) {
                    // if so, set the flag to false
                    isValid = false;
                    console.error(`Step ${i+1} is missing required parameter [${param}]=${stepsParamsSettings[param].type}`);
                }
                // check if the step has incorrect type for the parameter
                else if(typeof step[param] !== stepsParamsSettings[param].type) {
                    // if so, set the flag to false
                    isValid = false;
                    console.error(`Step ${i+1} has incorrect type for parameter [${param}]\nCurrent param type [${typeof step[param]}] and the required type is [${stepsParamsSettings[param].type}]`);
                }
            }
        }

        if (!isValid) {
            throw 'The steps provided are invalid. Please check the error messages for more information on what is causing the problem.'
        }

        // return the flag which indicates the validity of the steps
        return isValid;
    }

    #isParentSet() {

    }

    #isParentFound() {

    }

}