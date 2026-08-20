# Plan: Payment System and Order Approval Workflow

The current payment methods will be updated to prioritize "Pay Later" (manual processing) and a premium design for Credit Card/PayPal selection. The order workflow will be updated so that manual payments are marked as "Pending" and require admin approval to change status or mark as "Paid".

## User-facing changes

- **Redesigned Checkout**: The payment method selection will use a modern card-based design as shown in the reference image.
- **New "Pay Later" Option**: Added to the payment methods. This allows users to place an order without immediate payment.
- **Order Status Awareness**: Manual payment orders will clearly state that they are pending verification.

## Technical details

### Database Changes
- No schema changes required as `status` and `payment_status` already exist in the `orders` table.

### Frontend Changes

1.  **Redesign `PaymentMethodSelector.tsx`**:
    - Implement the card-based layout for Credit Card, PayPal, and Bank Transfer.
    - Add "Pay Later" as a primary option.
    - Update icons and styling to match the reference images (premium glassmorphic look).

2.  **Update `Checkout.tsx`**:
    - Adjust the order creation logic to handle the "Pay Later" method.
    - Ensure that orders with manual methods are initialized with `status: 'pending'` and `payment_status: 'unpaid'`.

3.  **Enhance `OrderManagement.tsx` (Admin)**:
    - Improve the UI for approving orders.
    - Add clear visual indicators for orders requiring payment verification.

4.  **Security/Auth**:
    - Ensure RLS allows users to see their own orders while admins can manage all.

## Technical Section
- **File to Edit**: `src/components/checkout/PaymentMethodSelector.tsx`
- **File to Edit**: `src/pages/Checkout.tsx`
- **File to Edit**: `src/pages/admin/OrderManagement.tsx`
- **Service Function**: `src/lib/services.functions.ts`
- **Hook**: `src/hooks/useOrders.ts`

The "Pay Later" method will help minimize bounce rates for high-value services ($2k-$6k+) where immediate card payment might not be feasible for all clients.
