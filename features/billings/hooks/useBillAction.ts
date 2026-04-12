export const useBillAction = () => {
    const handlePay = (billId: number) => {
        // implement paymongo using test GCash API
        console.log('Pay', billId);
    }
    return { handlePay };
}