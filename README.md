# testautomation
Test assignment for summer trainee position
## Setup and Installation 
Check that [Node.js](https://nodejs.org/) is installed and a git folder has been initialized. I recommend using VS Code when working with this test suite.
1. **Clone this repository:**
```bash
git clone <the-url-of-this-repository>
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
**Running all tests in headed mode (to see the browser in action):**
```bash
npx playwright test --headed
```
**Showing report after tests:**
```bash
npx playwright show-report
```
## Assignment description
I completed all three parts of the assignment. I used TypeScript and the Playwright test framework. I also implemented a GitHub Actions CI pipeline that runs my tests automatically. 
### Part 1: Core Test Automation
I implemented the Nikon search test following the given requirements. The test opens the website and searches for "Nikon", sorts the results from highest to lowest price, selects the second product, clicks on it and verifies that the product title includes the text "Nikon Z30". The URL in the test is a configurable parameter, which can be set as an environment variable, and I used verkkokauppa.com as the default URL.
* This test is in the file part1.spec.ts in the tests folder.
### Part 2: Test Design & Additional Automation
I identified and implemented four additional test scenarios for verkkokauppa.com
* The tests of part 2 are in the files part2_1.spec.ts to part2_4.spec.ts in the tests folder.
#### 1/4 Critical User Journey: Purchase path
* **Description:** The test searches a specific product, adds it to the cart, verifies cart contents and proceeds to checkout.
* **Why did I select this and why this should be automated?** This is one of the most critical paths of an e-commerce application because selling products is the main way the application makes money. Errors and crashes in the user experience of this path should be avoided, so this path should be automatically tested when changes are made.
#### 2/4 Robustness: Searches without results
* **Description:** This test searches for multiple non-existent strings and verifies that the "No results" message appears instead of a crash.
* **Why did I select this and why this should be automated?** This ensures that the application handles edge cases well, providing a professional user experience even when data isn't found. Compared to manual testing, this allows always checking multiple different edge cases efficiently.
#### 3/4 Sorting logic: Price-based sorting
* **Description:** This test performs a search and verifies that the "Sort by price" functionality works correctly for both ascending and descending orders by mathematically validating the prices of the results.
* **Why did I select this and why this should be automated?** Fully functional sorting is important for product discovery in an e-commerce application. Using automation ensures that the logic of ordering prices remains functional across updates. Manually checking this is slow, tedious and prone to human error.
#### 4/4 Repetitive verification: Navigation and Footer links
* **Description:** This test verifies the visibility of essential navigation and footer links.
* **Why did I select this and why this should be automated?** These elements are expected to be present on the landing page of the application. Manually checking that the links have not disappeared during an update would be repetitive for a human, but it's highly efficient to automate this task with a test suite.
### Part 3: AI-Powered QA Agent
I designed and implemented an AI error analyzer agent.
* It is in file AIAnalyzer.ts in the reporters folder.
#### Description
* **What problem does my agent solve?** Maintenance is a big bottleneck in test automation. When a test fails, someone must manually read long error logs and stack traces to determine what caused the failure. This manual work is time-consuming and requires context. My AI error analyzer agent provides an immediate human-readable explanation and a suggested fix that can significantly reduce debugging time.
* **How does it work?** The agent is a custom Playwright reporter, which makes it a seamless part of the test automation lifecycle.
    * It is registered in the playwright.config.ts file, which allows it to listen to test results in real time.
    * Every time a test ends with a failed or timedOut status, the agent intercepts the error message. After that, it makes an LLM call (or processes it through a simple logic engine in my demo) that identifies common failure patterns such as timeouts or visibility issues.
    * The agent outputs a structured ANALYSIS and SUGGESTION directly to the terminal.
* **Demo/output:** The agent is commented out in the playwright.config.ts file, but it can be tested by removing the comment in the 'reporter' section of the file. Below is an output that I got from my AI agent demo when working with this assignment. 

--- AI AGENT: ANALYZING FAILURE ---
FAILED TEST: Find and verify Nikon Z30
ANALYSIS: The page or element took too long to load or might not exist. This is likely a performance issue or a network bottleneck.
SUGGESTION: Increase the step timeout or add a 'waitForLoadState' before this action. Also check that the element actually exists.
