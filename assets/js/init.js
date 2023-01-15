
import StepsForm from './StepsForm/StepsForm.js';

const steps = [
    {
        title: 'Enter Name',
        html: await new Promise((resolve, reject) => {
            const container = document.createElement('div')

            const title = document.createElement('h4')
            title.innerText = 'Enter your name:' +
                ''
            const input = document.createElement('input')

            container.append(title)
            container.append(input)
            resolve(container)
        }),
        callback: (_callback) => {
            console.log(_callback)
        }
    }
]

const myStepsForm = new StepsForm()
myStepsForm.setParentId('myStepsForm')
myStepsForm.setSteps(steps)
myStepsForm.render()