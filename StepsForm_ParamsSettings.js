
/**
 * stepsParamsSettings.js
 *
 * This file contains the configuration settings for the steps in the steps form.
 * Each property in the object represents a step parameter and its respective settings.
 * These settings include whether the parameter is required and what type it should be.
 * This file should be imported and used as a reference when setting the steps.
 */

const stepsParamsSettings = {
    // step title
    title: {
        required: false,
        type: 'string'
    },
    // step html
    html: {
        required: true,
        type: 'function'
    },
    // previous button callback
    CB_previousOnClick: {
        required: true,
        type: 'function'
    },
    // next button callback
    CB_nextOnClick: {
        required: true,
        type: 'function'
    },
    // can go to previous step
    canGoToPreviousStep: {
        required: true,
        type: 'boolean'
    }
}

export default stepsParamsSettings