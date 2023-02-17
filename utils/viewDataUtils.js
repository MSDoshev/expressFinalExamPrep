const {paymentMethodsMap} = require('../constants')

exports.getPaymentMethodViewData = (selectedPaymentMethod) =>{
    const paymentMethods = Object.keys(paymentMethodsMap).map(value => ({
        value, 
        label: paymentMethodsMap[value],
        isSelected: selectedPaymentMethod == value,
    }));

    return paymentMethods
}