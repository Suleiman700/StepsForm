import StepsForm from './StepsForm.js';

const myStepsForm = new StepsForm()

myStepsForm.setParent('MyWizardForm')

function validateStepOne() {

}

const steps = [
    {
        title: 'Username',
        html: (_wizardForm) => {
            return new Promise((resolve) => {
                let divBox = document.createElement('div');

                // username
                const userNameDiv = document.createElement('div')
                userNameDiv.classList.add('form-group')
                const usernameLabel = document.createElement('label')
                usernameLabel.innerText = 'Enter Username:'
                usernameLabel.setAttribute('for', 'username')
                const usernameInput = document.createElement('input')
                usernameInput.classList.add('form-control')
                usernameInput.id = 'username'

                userNameDiv.append(usernameLabel)
                userNameDiv.append(usernameInput)
                divBox.append(userNameDiv)

                resolve(divBox)
            })
        },
        CB_previousOnClick: () => {
            myStepsForm.gotoPreviousStep()
        },
        CB_nextOnClick: () => {
            const errors = []

            // check if username input is not empty
            const usernameInput = document.querySelector('input#username')
            if (!usernameInput.value) {
                errors.push({
                    'msg': 'Username field is required',
                    'element': usernameInput
                });
            }

            console.log(errors)

            myStepsForm.gotoNextStep()
        },
        canGoToPreviousStep: false
    },
    {
        title: 'User Email',
        html: (_wizardForm) => {
            return new Promise((resolve) => {
                let divBox = document.createElement('div');
                let btn = document.createElement('button');
                btn.innerHTML = 'Mark Step 2 Completed';
                divBox.innerHTML = 'step 2';
                btn.addEventListener('click', () => {
                    myStepsForm.setStepCompleted(true)
                })
                divBox.append(btn)

                resolve(divBox)
            })
        },
        CB_previousOnClick: () => {
            myStepsForm.gotoPreviousStep()
        },
        CB_nextOnClick: () => {
            myStepsForm.gotoNextStep()
        },
        canGoToPreviousStep: true
    },
    {
        title: 'User Address',
        html: (_wizardForm) => {
            return new Promise((resolve) => {
                let divBox = document.createElement('div');
                let btn = document.createElement('button');
                btn.innerHTML = 'המשך';
                divBox.innerHTML = 'step 2';
                resolve(divBox)
            })
        },
        CB_previousOnClick: () => {
            myStepsForm.gotoPreviousStep()
        },
        CB_nextOnClick: () => {
            myStepsForm.gotoNextStep()
        },
        canGoToPreviousStep: true
    },

]

myStepsForm.setSteps(steps)

myStepsForm.render()