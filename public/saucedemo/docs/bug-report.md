# SD-BUG-001 — Product Image Does Not Match Product Description

**Project:** SauceDemo Manual QA Practice  
**Related Test Case:** SD-TC-006  
**Module:** Product Inventory / Product Details  
**Severity:** Low (Proposed)  
**Priority:** Medium (Proposed)  
**Status:** Pending Triage  
**Browser:** Google Chrome

## Description

The product "Test.allTheThings() T-Shirt (Red)" is displayed with an image depicting an orange/red-orange long-sleeved sweatshirt rather than the red T-shirt indicated by the product name and description.

## Steps to Reproduce

1. Log in to SauceDemo using `standard_user`.
2. Navigate to the Products page.
3. Locate "Test.allTheThings() T-Shirt (Red)".
4. Compare the product image against the product name and description.
5. Open the product details page and inspect the image.

## Expected Result

The displayed product image accurately represents the listed red T-shirt.

## Actual Result

The inventory and product details pages display an orange/red-orange long-sleeved sweatshirt.

## Evidence

- `screenshots/SD-TC-006_Product_Inventory.png`
- `screenshots/SD-TC-006_Product_Details.png`

## QA Assessment

The inconsistency is visible in the captured screenshots. Whether it represents an unintended application defect or intentionally configured demo content has not been established. Further triage is required.