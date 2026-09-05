import addContext from 'mochawesome/addContext.js';

// Fungsi helper untuk menyimpan response sementara di test context
export function setTestResponse(testContext: Mocha.Context, response: any) {
    (testContext.test as any).apiResponse = response;
}

// Hook yang mengecek apakah test gagal, jika gagal lampirkan response
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