import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';


class AIAnalyzer implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed' || result.status === 'timedOut') {
      const errorMessage = result.error?.message || 'Unknown error';
      
      console.log('\n--- AI AGENT: ANALYZING FAILURE ---');
      console.log(`FAILED TEST: ${test.title}`);
      
      const analysis = await this.getAIAnalysis(errorMessage);
      
      console.log(`ANALYSIS: ${analysis.reason}`);
      console.log(`SUGGESTION: ${analysis.fix}`);
      console.log('---------------------------------------\n');
    }
  }

  private async getAIAnalysis(error: string) {
    // The agent could call actual artificial intelligence here (e.g. OpenAI API)
    // For this example, I vibe-coded a "smart" logic for identifying some basic errors with Google Gemini
    if (error.includes('timeout')) {
      return {
        reason: "The page or element took too long to load or might not exist. This is likely a performance issue or a network bottleneck.",
        fix: "Increase the step timeout or add a 'waitForLoadState' before this action. Also check that the element actually exists."
      };
    }  
    if (error.includes('locator.click') && error.includes('visible')) {
      return {
        reason: "The element was found in the DOM, but it's hidden or covered by another element (e.g., a cookie banner).",
        fix: "Ensure the cookie consent is accepted first, or use 'force: true' if the element is intentionally covered."
      };
    }
    return {
      reason: "General assertion failure or unexpected UI state.",
      fix: "Check the 'test-results' folder for a screenshot of the exact moment of failure."
    };
  }
}

export default AIAnalyzer;