export type SauceDemoResult = 'PASS' | 'FAIL'

export type SauceDemoTestCase = {
  id: string
  area: string
  scenario: string
  result: SauceDemoResult
  outcome: string
}

export const sauceDemoSummary = {
  projectType: 'Independent Practice Project',
  application: 'https://www.saucedemo.com/',
  environment: 'Google Chrome',
  method: 'Manual black-box functional testing; positive and negative scenarios; UI/data consistency; arithmetic verification',
  planned: 15,
  executed: 15,
  passed: 14,
  failed: 1,
  blocked: 0,
  executionCoverage: 100,
  passRate: 93.3,
  disclosure: 'Independent Practice Project — self-directed testing of the public SauceDemo training application; not client work.',
} as const

export const sauceDemoTestCases: SauceDemoTestCase[] = [
  { id: 'SD-TC-001', area: 'Authentication', scenario: 'Valid login', result: 'PASS', outcome: 'Valid credentials opened inventory with six products.' },
  { id: 'SD-TC-002', area: 'Authentication', scenario: 'Invalid login', result: 'PASS', outcome: 'Login rejected with username/password mismatch message.' },
  { id: 'SD-TC-003', area: 'Authentication', scenario: 'Empty username', result: 'PASS', outcome: 'Login rejected: “Epic sadface: Username is required”.' },
  { id: 'SD-TC-004', area: 'Authentication', scenario: 'Empty password', result: 'PASS', outcome: 'Login rejected: “Epic sadface: Password is required”.' },
  { id: 'SD-TC-005', area: 'Authentication', scenario: 'Locked-out user', result: 'PASS', outcome: 'Login rejected: “Epic sadface: Sorry, this user has been locked out.”' },
  { id: 'SD-TC-006', area: 'Inventory', scenario: 'Validate product details and images', result: 'FAIL', outcome: 'Tester reports the red T-shirt listing displayed an orange long-sleeved top image; documented as SD-BUG-001 pending triage.' },
  { id: 'SD-TC-007', area: 'Inventory', scenario: 'Price sorting: low to high', result: 'PASS', outcome: 'Prices sorted as $7.99, $9.99, $15.99, $15.99, $29.99, $49.99.' },
  { id: 'SD-TC-008', area: 'Cart', scenario: 'Add one product', result: 'PASS', outcome: 'Backpack added, cart badge 1, quantity 1, price $29.99; button changed to Remove.' },
  { id: 'SD-TC-009', area: 'Cart', scenario: 'Add three products', result: 'PASS', outcome: 'Backpack $29.99, Bike Light $9.99, Bolt T-Shirt $15.99; badge 3; each quantity 1.' },
  { id: 'SD-TC-010', area: 'Cart', scenario: 'Remove product', result: 'PASS', outcome: 'Removed Bike Light; badge changed from 3 to 2; remaining items unchanged.' },
  { id: 'SD-TC-011', area: 'Cart', scenario: 'Validate cart item quantities and prices', result: 'PASS', outcome: 'Backpack $29.99 and Bolt T-Shirt $15.99; quantity 1 each; badge 2.' },
  { id: 'SD-TC-012', area: 'Checkout', scenario: 'Complete valid checkout', result: 'PASS', outcome: 'Checkout completed; confirmation displayed; item total $45.98, tax $3.68, total $49.66.' },
  { id: 'SD-TC-013', area: 'Checkout', scenario: 'Missing required information', result: 'PASS', outcome: 'Missing first name, last name, and postal code each blocked checkout with appropriate validation.' },
  { id: 'SD-TC-014', area: 'Checkout', scenario: 'Verify calculations', result: 'PASS', outcome: '$29.99 + $15.99 = $45.98; $45.98 + $3.68 = $49.66. Tax rate not independently validated.' },
  { id: 'SD-TC-015', area: 'Session', scenario: 'Verify logout and session behavior', result: 'PASS', outcome: 'Logout redirected to login; Back/refresh and direct inventory URL did not restore access; re-login succeeded.' },
]

export const sauceDemoTc015Detail = {
  type: 'Functional / session management',
  objective: 'Confirm logout terminates authenticated access, protects inventory pages against unauthenticated navigation, and permits a fresh login.',
  preconditions: 'User authenticated with valid SauceDemo credentials and can access the inventory page.',
  steps: [
    'Open the inventory page while logged in.',
    'Open the menu and select Logout.',
    'Verify redirection to the login page.',
    'Try browser Back and refresh; verify protected content is not usable.',
    'Navigate directly to https://www.saucedemo.com/inventory.html; verify authentication is required.',
    'Log in again with valid credentials.',
  ],
  expected: 'User returns to login after logout; the previous session no longer grants access; direct URL cannot bypass authentication; re-login works.',
  actual: 'Logout redirected the user to the login page and invalidated the authenticated session. Protected inventory content remained inaccessible using browser Back/refresh operations or direct URL navigation. A subsequent login with valid credentials successfully established a new authenticated session.',
}

export const sauceDemoBug = {
  id: 'SD-BUG-001',
  title: 'Product image does not match product description',
  project: 'SauceDemo Manual QA Practice',
  linkedTestCase: 'SD-TC-006',
  module: 'Product Inventory / Product Details',
  description: 'The product “Test.allTheThings() T-Shirt (Red)” is displayed with an image depicting an orange/red-orange long-sleeved sweatshirt rather than the red T-shirt indicated by the product name and description.',
  environment: 'Google Chrome',
  steps: [
    'Log in to SauceDemo using standard_user.',
    'Navigate to the Products page.',
    'Locate “Test.allTheThings() T-Shirt (Red)”.',
    'Compare the product image against the product name and description.',
    'Open the product details page and inspect the image.',
  ],
  expected: 'The displayed product image accurately represents the listed red T-shirt.',
  actual: 'The inventory and product details pages display an orange/red-orange long-sleeved sweatshirt.',
  severity: 'Low (proposed)',
  priority: 'Medium (proposed)',
  status: 'Pending Triage',
  assessment: 'The inconsistency is visible in the captured screenshots. Whether it represents an unintended application defect or intentionally configured demo content has not been established. Further triage is required.',
}

export type SauceDemoScreenshot = {
  filename: string
  testCaseId: string
  label: string
}

export const sauceDemoScreenshots: SauceDemoScreenshot[] = [
  { filename: 'SD-TC-001_Valid_Login.png', testCaseId: 'SD-TC-001', label: 'Valid login — inventory page' },
  { filename: 'SD-TC-002_Invalid_Login.png', testCaseId: 'SD-TC-002', label: 'Invalid login validation' },
  { filename: 'SD-TC-003_Empty_Username.png', testCaseId: 'SD-TC-003', label: 'Empty username validation' },
  { filename: 'SD-TC-004_Empty_Password.png', testCaseId: 'SD-TC-004', label: 'Empty password validation' },
  { filename: 'SD-TC-005_Locked_Out_User.png', testCaseId: 'SD-TC-005', label: 'Locked-out user validation' },
  { filename: 'SD-TC-006_Product_Inventory.png', testCaseId: 'SD-TC-006', label: 'Red T-shirt listing in product inventory' },
  { filename: 'SD-TC-006_Product_Details.png', testCaseId: 'SD-TC-006', label: 'Red T-shirt product details image' },
  { filename: 'SD-TC-006_Product_Image_Mismatch.png', testCaseId: 'SD-TC-006', label: 'Product image mismatch comparison' },
  { filename: 'SD-TC-007_Price_Low_to_High.png', testCaseId: 'SD-TC-007', label: 'Inventory sorted by price low to high' },
  { filename: 'SD-TC-008_Add_To_Cart.png', testCaseId: 'SD-TC-008', label: 'Add product to cart' },
  { filename: 'SD-TC-008_Cart_Details.png.png', testCaseId: 'SD-TC-008', label: 'Cart details after adding a product' },
  { filename: 'SD-TC-009_Cart_Three_Products.png', testCaseId: 'SD-TC-009', label: 'Cart with three products' },
  { filename: 'SD-TC-009_Multiple_Products_Added.png', testCaseId: 'SD-TC-009', label: 'Multiple products added' },
  { filename: 'SD-TC-010_Remove_Product.png', testCaseId: 'SD-TC-010', label: 'Product removed from cart' },
  { filename: 'SD-TC-010_Remove_Product_Availability.png', testCaseId: 'SD-TC-010', label: 'Remaining products after removal' },
  { filename: 'SD-TC-011_Cart_Quantities_Prices.png', testCaseId: 'SD-TC-011', label: 'Cart quantities and prices' },
  { filename: 'SD-TC-012_Checkout_Information.png', testCaseId: 'SD-TC-012', label: 'Checkout information step' },
  { filename: 'SD-TC-012_Order_Confirmation.png', testCaseId: 'SD-TC-012', label: 'Order confirmation' },
  { filename: 'SD-TC-013_Empty_First_Name.png', testCaseId: 'SD-TC-013', label: 'Checkout with empty first name' },
  { filename: 'SD-TC-013_Empty_Last_Name.png', testCaseId: 'SD-TC-013', label: 'Checkout with empty last name' },
  { filename: 'SD-TC-013_Empty_Postal_Code.png', testCaseId: 'SD-TC-013', label: 'Checkout with empty postal code' },
  { filename: 'SD-TC-014_Checkout_Total_Validation.png', testCaseId: 'SD-TC-014', label: 'Checkout total arithmetic validation' },
  { filename: 'SD-TC-015_Logout_Login_Page.png', testCaseId: 'SD-TC-015', label: 'Logout returns to login' },
  { filename: 'SD-TC-015_Relogin_Success.png', testCaseId: 'SD-TC-015', label: 'Successful login after logout' },
  { filename: 'SD-TC-015_Unauthorized_Access.png', testCaseId: 'SD-TC-015', label: 'Protected inventory URL requires login' },
]

const screenshotModules = [
  { module: 'Login', testCaseIds: ['SD-TC-001', 'SD-TC-002', 'SD-TC-003', 'SD-TC-004', 'SD-TC-005'] },
  { module: 'Inventory', testCaseIds: ['SD-TC-006', 'SD-TC-007'] },
  { module: 'Cart', testCaseIds: ['SD-TC-008', 'SD-TC-009', 'SD-TC-010', 'SD-TC-011'] },
  { module: 'Checkout', testCaseIds: ['SD-TC-012', 'SD-TC-013', 'SD-TC-014'] },
  { module: 'Session', testCaseIds: ['SD-TC-015'] },
]

export const sauceDemoScreenshotGroups = screenshotModules.map(({ module, testCaseIds }) => ({
  module,
  images: sauceDemoScreenshots.filter((image) => testCaseIds.includes(image.testCaseId)),
}))

export const sauceDemoDocuments = [
  {
    title: 'SauceDemo Manual QA Portfolio Report',
    description: 'Execution register, scope, summary metrics, and detailed SD-TC-015 record.',
    href: '/saucedemo/docs/SauceDemo_Manual_QA_Portfolio_Report.pdf',
    filename: 'SauceDemo_Manual_QA_Portfolio_Report.pdf',
  },
  {
    title: 'SD-BUG-001 Defect Report',
    description: 'Screenshot-supported product image inconsistency, proposed severity and priority, and pending triage assessment.',
    href: '/saucedemo/docs/SD-BUG-001_Defect_Report.pdf',
    filename: 'SD-BUG-001_Defect_Report.pdf',
  },
]
