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
                usernameLabel.innerHTML = 'Enter Username: <code>*</code>'
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
            let validStep = true

            // check if username input is not empty
            const usernameInput = document.querySelector('input#username')
            if (!usernameInput.value) {
                validStep = false
            }

            myStepsForm.setStepCompleted(validStep)

            myStepsForm.gotoNextStep()
        },
        canGoToPreviousStep: false
    },
    {
        title: 'User Email',
        html: (_wizardForm) => {
            return new Promise((resolve) => {
                let divBox = document.createElement('div');

                // username
                const userNameDiv = document.createElement('div')
                userNameDiv.classList.add('form-group')
                const usernameLabel = document.createElement('label')
                usernameLabel.innerHTML = 'Enter Email: <code>*</code>'
                usernameLabel.setAttribute('for', 'email')
                const usernameInput = document.createElement('input')
                usernameInput.type = 'email'
                usernameInput.classList.add('form-control')
                usernameInput.id = 'email'

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
            let validStep = true

            // check if username input is not empty
            const emailInput = document.querySelector('input#email')
            const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!regex.test(emailInput.value)) {
                validStep = false
            }

            myStepsForm.setStepCompleted(validStep)

            myStepsForm.gotoNextStep()
        },
        canGoToPreviousStep: true
    },
    {
        title: 'Final',
        html: (_wizardForm) => {
            return new Promise((resolve) => {
                const divBox = document.createElement('div');
                divBox.classList.add('text-center')
                divBox.innerHTML = 'Final Step';

                const submitButtonDiv = document.createElement('div');
                submitButtonDiv.classList.add('mt-5')
                const submitButton = document.createElement('button')
                submitButton.classList.add('btn', 'btn-success')
                submitButton.innerText = 'Submit Data'
                submitButtonDiv.append(submitButton)

                submitButtonDiv.addEventListener('click', () => {
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    )
                })

                divBox.append(submitButtonDiv)

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