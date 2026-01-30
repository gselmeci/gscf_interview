const Tabs = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawl',
  TRANSACTIONS: 'transactions'
};

const testValue1 = 100;
const testValue2 = 10;
const testValue3 = 5; 

context ('GSCF interview', () => {

    beforeEach(() => {
        cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
    });

    it('checks total transaction amount after adding new deposits', () => {
        loginAsCustomer('Harry Potter');
        navigateToTab(Tabs.DEPOSIT);
        depositAmount(testValue1);
        depositAmount(testValue2);
        depositAmount(testValue3);
        checkBalance(testValue1 + testValue2 + testValue3);
        navigateToTab(Tabs.TRANSACTIONS);
        checkSumOfTransactions(testValue1 + testValue2 + testValue3);
    });

    function checkSumOfTransactions(expectedSum) {
        cy.get('tbody tr td:nth-child(2)').then(amounts => {
            let actualSum = 0;
            for (let i = 0; i < amounts.length; i++) {
                actualSum += Number(amounts[i].innerText);
            }
            expect(actualSum).to.equal(expectedSum);
        });
    }

    function checkBalance(expectedSum) {
        cy.get('div[ng-hide="noAccount"] strong:nth-child(2)')
            .should('have.text', expectedSum);
    }

    function navigateToTab(tabName) {
        cy.get(`button[ng-click="${tabName}()"]`).click();
    }

    function loginAsCustomer(customerName) {
        cy.get('button[ng-click="customer()"]').click();
        cy.get('#userSelect').select(customerName);
        cy.get('button[type="submit"]').click();
    }

    function depositAmount(amount) {
        cy.get('input[ng-model="amount"]').type(String(amount));
        cy.get('button[type="submit"]').click();
        cy.get('span').should('contains.text', 'Deposit Successful');
    }

});

// BUGS FOUND IN THE APPLICATION:
// 1. Withdrawal tab is misspelled as "withdrawl" in the application code.
// 2. After depositing money and navigating to the transactions Tab, the transaction table body
//    does not appear all the time. This terminates the test with an error causing this test to be flaky. 
//    No workaround found for this issue. The bug also happens when testing manually.
// 3. The date and time fields are too narrow. Time cannot be read fully.