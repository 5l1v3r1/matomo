/*!
 * Piwik - free/libre analytics platform
 *
 * JS tracker UI tests.
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

describe("JSTracker", function () {
    this.fixture = 'Piwik\\Tests\\Fixtures\\JSTrackingUIFixture';

    var testWebsiteUrl = 'tests/resources/overlay-test-site-real/index.html';
    var generalParams = 'idSite=1&period=day&date=today',
        widgetizeParams = "module=Widgetize&action=iframe",
        visitorLogUrl = "?" + widgetizeParams + "&" + generalParams + "&moduleToWidgetize=Live&actionToWidgetize=getVisitorLog";

    it.only("run correctly on a website and correctly track visits in the visitor log", async function () {
        await page.goto(testWebsiteUrl);

        // view another page
        await page.evaluate(() => $('a:contains(Page 3)')[0].click());
        await page.waitForNetworkIdle();
        await page.waitFor(500);
        await page.waitForNetworkIdle();

        // visit visitor log for correct date
        await page.goto(visitorLogUrl);

        expect(await page.screenshot({ fullPage: true })).to.matchImage('visitor_log');
    });
});