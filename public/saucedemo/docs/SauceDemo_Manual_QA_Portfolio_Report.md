# SauceDemo — Manual QA Practice Project

**Project type:** Independent learning / simulated e-commerce testing (not client work)  
**Application:** https://www.saucedemo.com/  
**Environment:** Google Chrome; account `standard_user` for most flows; `locked_out_user` for negative login  
**Method:** Manual black-box functional testing; positive and negative scenarios; UI/data consistency; arithmetic verification  
**Execution date:** Not individually confirmed for every case  
**Evidence status:** Screenshot files are supplied separately in `docs/saucedemo/screenshots/`; they are not embedded in this report. Recorded executions remain tester-reported, and the screenshots do not independently verify every result.

## Executive summary

- Planned: **15** test cases
- Executed: **15** (100%)
- Passed: **14** (93.3% of executed)
- Failed: **1** (6.7% of executed)
- Blocked / not run: **0**
- Potential defects: **1**, pending triage and reproduction

Results reflect the tester's self-reported executions. The reported failure is an observed visual mismatch, not yet a confirmed application defect.

## Test execution register

| ID | Area | Scenario | Result | Key observed outcome |
|---|---|---|---|---|
| SD-TC-001 | Authentication | Valid login | PASS | Valid credentials opened inventory with six products. |
| SD-TC-002 | Authentication | Invalid login | PASS | Login rejected with username/password mismatch message. |
| SD-TC-003 | Authentication | Empty username | PASS | Login rejected: `Epic sadface: Username is required`. |
| SD-TC-004 | Authentication | Empty password | PASS | Login rejected: `Epic sadface: Password is required`. |
| SD-TC-005 | Authentication | Locked-out user | PASS | Login rejected: `Epic sadface: Sorry, this user has been locked out.` |
| SD-TC-006 | Inventory | Validate product details and images | FAIL | Tester reports red T-shirt listing displayed an orange long-sleeved top image. |
| SD-TC-007 | Inventory | Price sorting: low to high | PASS | Prices: $7.99, $9.99, $15.99, $15.99, $29.99, $49.99. |
| SD-TC-008 | Cart | Add one product | PASS | Backpack added, cart badge 1, quantity 1, price $29.99; button changed to Remove. |
| SD-TC-009 | Cart | Add three products | PASS | Backpack $29.99, Bike Light $9.99, Bolt T-Shirt $15.99; badge 3; each qty 1. |
| SD-TC-010 | Cart | Remove product | PASS | Removed Bike Light; badge changed 3 to 2; remaining items unchanged. |
| SD-TC-011 | Cart | Validate cart item quantities and prices | PASS | Backpack $29.99 and Bolt T-Shirt $15.99; quantity 1 each; badge 2. |
| SD-TC-012 | Checkout | Complete valid checkout | PASS | Checkout completed; confirmation displayed; item total $45.98, tax $3.68, total $49.66. |
| SD-TC-013 | Checkout | Missing required information | PASS | Missing first name, last name and postal code each blocked checkout with appropriate validation. |
| SD-TC-014 | Checkout | Verify calculations | PASS | $29.99 + $15.99 = $45.98; $45.98 + $3.68 = $49.66. Tax rate not independently validated. |
| SD-TC-015 | Session | Logout and protected-page access | PASS | Logout redirected to login; Back/refresh and direct inventory URL did not restore access; re-login succeeded. |

## SD-TC-015 — Final detailed execution record

**Title:** Verify Logout and Session Behavior  
**Type:** Functional / session management  
**Environment:** Google Chrome  
**Status:** PASS (tester-reported)

**Objective:** Confirm logout terminates authenticated access, protects inventory pages against unauthenticated navigation, and permits a fresh login.

**Preconditions:** User authenticated with valid SauceDemo credentials and can access the inventory page.

**Steps:**
1. Open the inventory page while logged in.
2. Open the menu and select Logout.
3. Verify redirection to the login page.
4. Try browser Back and refresh; verify protected content is not usable.
5. Navigate directly to `https://www.saucedemo.com/inventory.html`; verify authentication is required.
6. Log in again with valid credentials.

**Expected:** User returns to login after logout; the previous session no longer grants access; direct URL cannot bypass authentication; re-login works.

**Actual (professional wording):** Logout redirected the user to the login page and invalidated the authenticated session. Protected inventory content remained inaccessible using browser Back/refresh operations or direct URL navigation. A subsequent login with valid credentials successfully established a new authenticated session.

**Result:** PASS. All four reported checks met expectations.  
**Evidence files:** `SD-TC-015_Logout_Login_Page.png`, `SD-TC-015_Unauthorized_Access.png`, and `SD-TC-015_Relogin_Success.png`. The screenshots are separate files and do not by themselves establish all recorded checks.

## SD-BUG-001 — Potential defect (unverified)

**Title:** Product image appears inconsistent with red T-shirt listing  
**Linked case:** SD-TC-006  
**Area:** Inventory / product presentation  
**Status:** Pending Triage  
**Suggested severity:** Low / Minor (provisional)  
**Suggested priority:** Medium (provisional)

**Steps to reproduce:**
1. Log in as `standard_user`.
2. Locate `Test.allTheThings() T-Shirt (Red)` in the inventory.
3. Compare the product image with the name and description.
4. Open the product details page, compare images, refresh, and repeat.

**Expected:** Product image visually represents the named/described red T-shirt.  
**Observed (tester report):** Image appears to show an orange long-sleeved top.  
**Impact:** Potential customer confusion about the item's appearance.  
**Evidence:** Inventory and product-details screenshots are supplied in `screenshots/`. Independent reproduction and triage of whether the demo content is intentional remain outstanding.  
**Caution:** Do not publish this as a verified software defect until checked; demo applications may intentionally contain unusual test data.

## Evidence manifest — supplied filenames

| Test | Evidence |
|---|---|
| SD-TC-001 | `SD-TC-001_Valid_Login.png` |
| SD-TC-002 | `SD-TC-002_Invalid_Login.png` |
| SD-TC-003 | `SD-TC-003_Empty_Username.png` |
| SD-TC-004 | `SD-TC-004_Empty_Password.png` |
| SD-TC-005 | `SD-TC-005_Locked_Out_User.png` |
| SD-TC-006 | `SD-TC-006_Product_Image_Mismatch.png` |
| SD-TC-007 | `SD-TC-007_Price_Low_to_High.png` |
| SD-TC-008 | `SD-TC-008_Add_To_Cart.png`, `SD-TC-008_Cart_Details.png.png` |
| SD-TC-009 | `SD-TC-009_Cart_Three_Products.png` |
| SD-TC-010 | `SD-TC-010_Remove_Product.png` |
| SD-TC-011 | `SD-TC-011_Cart_Quantities_Prices.png` |
| SD-TC-012 | `SD-TC-012_Checkout_Information.png`, `SD-TC-012_Order_Confirmation.png` |
| SD-TC-013 | `SD-TC-013_Empty_First_Name.png`, `SD-TC-013_Empty_Last_Name.png`, `SD-TC-013_Empty_Postal_Code.png` |
| SD-TC-014 | `SD-TC-014_Checkout_Total_Validation.png` |
| SD-TC-015 | `SD-TC-015_Logout_Login_Page.png`, `SD-TC-015_Unauthorized_Access.png`, `SD-TC-015_Relogin_Success.png` |

Screenshots are stored separately in `docs/saucedemo/screenshots/`; no image files are embedded in this Markdown report.

## Portfolio case-study copy

### SauceDemo — Independent Manual QA Testing Practice

**Context:** Conducted a self-directed manual QA exercise on the publicly accessible SauceDemo e-commerce training application to practice functional testing, negative validation, cart workflows, checkout arithmetic, and session handling.

**Approach:** Planned and executed 15 manual test cases in Google Chrome, recording expected versus actual behavior and capturing screenshots for supporting evidence. Covered authentication, inventory, product sorting, cart state, checkout, and logout/session access.

**Outcome:** All 15 planned cases were executed; 14 passed and one inventory case failed based on the tester's observations. A possible product image mismatch was documented for further verification. Checkout calculations were checked independently against displayed amounts.

**Skills demonstrated:** Manual test design and execution, positive/negative testing, UI and data consistency checks, defect reporting, arithmetic validation, test evidence organization, and concise QA reporting.

**Disclosure:** This is independent practice on a demo application, not paid client work or an official audit of SauceDemo. Results are tester-reported, and the potential defect has not been independently verified.

## Publication checklist

- [ ] Cross-check the supplied screenshots against the recorded steps and outcomes.
- [ ] Reproduce and assess SD-BUG-001; label as potential/unverified if unresolved.
- [ ] Confirm exact execution dates if displaying dates.
- [ ] Remove demo credentials from public-facing evidence if not needed.
- [ ] Integrate case-study copy, dashboard, evidence gallery and clearly labeled defect draft into the portfolio.
