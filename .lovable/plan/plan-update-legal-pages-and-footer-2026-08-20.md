# Plan - Update Legal Pages and Footer

Update the legal content pages (Privacy, Terms, Refund) based on the provided external URLs and refine the footer labels.

## Technical Details

- **Content Updates**:
    - `src/pages/PrivacyPolicy.tsx`: Replace default text with extracted content from `thenextonline.com/privacy-policy-2/`.
    - `src/pages/TermsOfService.tsx`: Replace default text with extracted content from `thenextonline.com/terms-condition/` and rename to "Terms & Condition".
    - `src/pages/RefundPolicy.tsx`: Replace default text with extracted content from `thenextonline.com/payment-refund-policy/` and rename to "Payment & Refund Policy".
- **Footer Updates**:
    - `src/components/Footer.tsx`:
        - Update bottom bar link labels:
            - "Privacy Policy" (stays)
            - "Terms of Service" -> "Terms & Condition"
            - "Refund Policy" -> "Payment & Refund Policy"
- **Company Name Adjustment**: Use "NextOnline Technology" (or "Next Online") as established in the site, even if external sources mention "Hello It LLC", to maintain brand consistency.

## User Review Required

> [!NOTE]
> The content is being adapted from the provided links while maintaining the project's visual theme (glassmorphic sections, premium typography).
