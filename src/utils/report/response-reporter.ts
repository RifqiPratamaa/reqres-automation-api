import addContext from 'mochawesome/addContext.js';

// Helper function to temporarily store responses
export function setTestResponse(testContext: Mocha.Context, response: any) {
    (testContext.test as any).apiResponse = response;
}

// Attach API Response if test failed
export function attachOnFailure(this: Mocha.Context) {
    const currentTest = this.currentTest as any;
    if (currentTest && currentTest.state === 'failed' && currentTest.apiResponse) {
        addContext(this, {
            title: 'Failed API Response',
            value: {
                status: currentTest.apiResponse.status,
                headers: currentTest.apiResponse.headers,
                body: currentTest.apiResponse.body || currentTest.apiResponse.text
            }
        });
    }
}