Users = [];
Transactions = [];

Template.registrationForm.events({
  'click button'(event, instance) {
    const email = $('#email').val();
    const role = $('#role').val();
    
    Users.push({ email, role, dashboard: [] });
    showDashboard(role);
  },
});

Template.borrowerDashboard.helpers({
  borrowerLoans() {
    const user = Users.find(user => user.role === 'borrower');
    return user ? user.dashboard : [];
  },
});

Template.lenderDashboard.helpers({
  lenderPayments() {
    const user = Users.find(user => user.role === 'lender');
    return user ? user.dashboard : [];
  },
});

Template.adminDashboard.helpers({
  adminTransactions() {
    return Transactions;
  },
});

function requestLoan() {
  const loanAmount = prompt('Enter loan amount:');
  if (loanAmount) {
    const loanRequest = `Loan Requested: $${loanAmount}`;
    alert(loanRequest);

    const user = Users.find(user => user.role === 'borrower');
    if (user) {
      user.dashboard.push(loanRequest);
      Transactions.push({ user: user.email, action: 'Loan Request', amount: loanAmount });
    }
  }
}

function confirmPayment() {
  const paymentAmount = prompt('Enter payment amount:');
  if (paymentAmount) {
    const paymentConfirmation = `Payment Confirmed: $${paymentAmount}`;
    alert(paymentConfirmation);

    const user = Users.find(user => user.role === 'lender');
    if (user) {
      user.dashboard.push(paymentConfirmation);
      Transactions.push({ user: user.email, action: 'Payment Confirmed', amount: paymentAmount });
    }
  }
}

function showDashboard(role) {
  $('#registrationForm').hide();
  $('#borrowerDashboard').toggle(role === 'borrower');
  $('#lenderDashboard').toggle(role === 'lender');
  $('#adminDashboard').toggle(role === 'admin');
}
