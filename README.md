# testautomation
Test assignment for summer trainee position
## Setup and Installation 
Check that [Node.js](https://nodejs.org/) is installed and a git folder has been initialized.
1. **Clone this repository:**
```bash
git clone <the-url-of-this-repo>
cd <the-created-folder>
```
2. **Install dependencies and Playwright:**
```bash
npm install
npx playwright install
```
## Running the tests from the terminal
**Running all tests:** 
```bash
npx playwright test
```
**Showing report after tests:**
```bash
npx playwright show-report
```
## Assignment description
I completed all three parts of the assignment. For parts 1 and 2, I used TypeScript and the Playwright test framework. I also implemented a GitHub Actions CI pipeline that runs my tests automatically. 
### Part 1: Core Test Automation
I implemented the Nikon search test following the given requirements. The test opens the website and searches for "Nikon", sorts the results from highest to lowest price, selects the second product, clicks on it and verifies that the product title includes the text "Nikon Z30". The URL in the test is a configurable parameter, which can be set as an environment variable, and I used verkkokauppa.com as a default URL.
* This test is in the file part1.spec.ts in the tests folder.
### Part 2: Test Design & Additional Automation
I identified and implemented four additional test scenarios for verkkokauppa.com
* The tests of part 2 are in the files part2_1.spec.ts to part2_4.spec.ts in the tests folder.
#### 1/4 Critical User Journey: Samsung galaxy S25 purchase path
* **Description:** The test searches a specific Samsung galaxy S25 product, adds it to the cart, verifies cart contents and proceeds to checkout.
* **Why did I select this and why this should be automated?** This one of the most critical paths of an e-commerce application because selling products is the main way the application makes money. Errors and crashes in the user experience of this path should be avoided, so this path should be automatically tested when changes are made.
#### 2/4 Robustness: Searches without results
* **Description:** This test searches for multiple non-existent strings and verifies the "No results" message appears instead of a crash
* **Why did I select this and why this should be automated?** This ensures that the application handles edge cases well, providing a professional user experience even when data isn't found. Compared to manual testing, this allows always checking multiple different edge cases efficiently.
#### 3/4 Sorting logic: Price-based sorting
* **Description:** This test performs a search and verifies that the "Sort by price" functionality works correctly for both ascending and descending orders by mathematically validating the prices of the results.
* **Why did I select this and why this should be automated?** Fully functional sorting is important for product discovery in an e-commerce application. Using automation ensures that the logic of ordering prices remains functional across updates. Manually checking this is slow, tedious and prone to human error.

