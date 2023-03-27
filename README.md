# StepsForm

This JavaScript repository contains a demo plugin that allows users to create step forms using vanilla JavaScript. The project serves as an excellent starting point for developers who wish to improve upon the plugin or create a more advanced version.

Feel free to use the code provided in the demo to improve upon the plugin and make it better.

![phpstorm64_jSgsVuErMO](https://user-images.githubusercontent.com/25286081/213615478-eb9185e4-1063-4fb7-afb4-e005a9f66390.gif)

---

### Usage

1. Create HTML div with a unique id:
```html
<div class="mt-5" id="MyWizardForm"></div>
```

2. import script file
```html
<script src="./init.js" type="module"></script>
```

3. import StepsForm
```javascript
import StepsForm from './StepsForm.js';
const myStepsForm = new StepsForm()
```

4. set `StepsForm` parent to the unique div id
```javascript
myStepsForm.setParent('MyWizardForm')
```

5. build your steps
```javascript
const steps = [
    {
        title: 'Step One',
        html: (_wizardForm) => {
            return new Promise((resolve) => {
                const divBox = document.createElement('div');
                divBox.innerText = 'This is step one';

                resolve(divBox);
            })
        },
        CB_previousOnClick: () => {
            myStepsForm.gotoPreviousStep()
        },
        CB_nextOnClick: () => {
            let validStep = true
            
            myStepsForm.setStepCompleted(validStep)

            myStepsForm.gotoNextStep()
        },
        canGoToPreviousStep: false
    },
    {
        title: 'Step Two',
        html: (_wizardForm) => {
            return new Promise((resolve) => {
                const divBox = document.createElement('div');
                divBox.innerText = 'This is step two';

                resolve(divBox);
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

                const submitButton = document.createElement('button')
                submitButton.classList.add('btn', 'btn-success')
                submitButton.innerText = 'Submit Data'
                divBox.append(submitButton)

                submitButton.addEventListener('click', () => {
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                    )
                })

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
```

6. pass steps to `StepsForm`
```javascript
myStepsForm.setSteps(steps)
```

7. render `StepsForm`
```javascript
myStepsForm.render()
```
