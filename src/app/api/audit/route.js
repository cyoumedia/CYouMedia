import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ─── WEIGHTS for GEO score ────────────────────────────────────────────────────
// Signals are NOT equal — weight them by actual AI/SEO impact
const SIGNAL_WEIGHTS = {
  "JSON-LD / Schema.org":        2.0,   // highest: entity clarity for LLMs
  "robots.txt AI Allow-list":    1.8,   // critical: gate for AI crawlers
  "XML Sitemap":                 1.5,   // important: discoverability
  "Meta Tags":                   1.4,   // important: SERP representation
  "Semantic HTML":               1.2,   // moderate: structure parsing
  "Alt Text Coverage":           1.1,   // moderate: multimodal indexing
  "Text-to-Code Ratio":          1.0,   // baseline
  "Internal Linking":            0.9,   // baseline
  "Mobile Viewport":             0.8,   // lower: PSI already catches this
};

// ─── HTML PARSER ────────────────────────────────────────────────────────────
function parseHtml(html, targetOrigin) {
  // JSON-LD: presence AND @type validation
  const jsonLdMatches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let jsonLdPresent = false;
  let jsonLdHasType = false;
  let jsonLdTypes = [];
  for (const match of jsonLdMatches) {
    try {
      const parsed = JSON.parse(match[1].trim());
      const entries = Array.isArray(parsed) ? parsed : [parsed];
      for (const entry of entries) {
        if (entry["@type"]) {
          jsonLdHasType = true;
          jsonLdTypes.push(entry["@type"]);
        }
      }
      jsonLdPresent = true;
    } catch {
      // malformed JSON-LD — present but invalid
      jsonLdPresent = true;
    }
  }

  // Meta tags: check both presence AND non-empty content
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const hasTitle = !!titleMatch;
  const titleContent = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "").trim() : "";
  const titleLength = titleContent.length;
  const titleValid = titleLength >= 10 && titleLength <= 70;

  const metaDescMatch =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
  const metaDescContent = metaDescMatch ? metaDescMatch[1].trim() : "";
  const metaDescValid = metaDescContent.length >= 50 && metaDescContent.length <= 165;

  const ogTitleMatch =
    html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
  const ogTitleValid = !!(ogTitleMatch && ogTitleMatch[1].trim().length > 0);

  const ogImageMatch =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  const ogImageValid = !!(ogImageMatch && ogImageMatch[1].trim().length > 0);

  // Semantic HTML: count unique tag TYPES (not occurrences)
  const semanticTagList = ["header", "footer", "main", "nav", "article", "section"];
  const foundSemantic = semanticTagList.filter((tag) =>
    new RegExp(`<${tag}[\\s>]`, "i").test(html)
  );

  // Alt text: handle empty alt="" correctly (decorative images are valid)
  const allImgTags = html.match(/<img[^>]*>/gi) || [];
  const totalImgs = allImgTags.length;
  // Count images that have alt attribute at all (empty = decorative, non-empty = described)
  const imgsWithAltAttr = allImgTags.filter(tag => /\balt=/i.test(tag)).length;
  // Count images with NON-EMPTY alt (for coverage score)
  const imgsWithDescriptiveAlt = allImgTags.filter(tag =>
    /\balt=["'][^"']+["']/i.test(tag)
  ).length;
  // Images without any alt attribute are the real problem
  const imgsMissingAlt = allImgTags.filter(tag => !/\balt=/i.test(tag)).length;

  // Internal links
  const allHrefs = [...html.matchAll(/href=["']([^"'#?]+)["']/gi)].map(m => m[1]);
  const internalLinks = allHrefs.filter(h =>
    (h.startsWith("/") && !h.startsWith("//")) || h.startsWith(targetOrigin)
  );
  // Deduplicate
  const uniqueInternalLinks = [...new Set(internalLinks)];

  // Text-to-code ratio: strip <script> and <style> blocks first
  const htmlWithoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
  const strippedText = htmlWithoutScripts
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const cleanHtmlLength = htmlWithoutScripts.length;
  const textToCodeRatio = cleanHtmlLength > 0 ? (strippedText.length / cleanHtmlLength) * 100 : 0;

  // Viewport: check for proper value too
  const viewportMatch = html.match(/<meta[^>]+name=["']viewport["'][^>]+content=["']([^"']+)["']/i) ||
                        html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']viewport["']/i);
  const viewportContent = viewportMatch ? viewportMatch[1].toLowerCase() : "";
  const hasViewport = viewportContent.includes("width=device-width");
  const viewportBlocksZoom = viewportContent.includes("maximum-scale=1") ||
    viewportContent.includes("user-scalable=no");

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const h2Count = (html.match(/<h2[\s>]/gi) || []).length;

  return {
    jsonLdPresent,
    jsonLdHasType,
    jsonLdTypes,
    hasTitle,
    titleContent,
    titleLength,
    titleValid,
    metaDescContent,
    metaDescValid,
    ogTitleValid,
    ogImageValid,
    foundSemantic,
    semanticCount: foundSemantic.length,
    totalImgs,
    imgsWithAltAttr,
    imgsWithDescriptiveAlt,
    imgsMissingAlt,
    internalLinkCount: uniqueInternalLinks.length,
    textToCodeRatio,
    hasViewport,
    viewportBlocksZoom,
    h1Count,
    h2Count,
  };
}

// ─── ROBOTS.TXT FETCHER ──────────────────────────────────────────────────────
async function fetchRobots(origin) {
  try {
    const res = await fetch(`${origin}/robots.txt`, {
      headers: { "User-Agent": "CYouMedia-Audit-Bot/1.0" },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return {
        exists: false, status: "failed", score: 0,
        value: "robots.txt not found (404)",
        note: "Search bots cannot find crawl instructions. Add a robots.txt file.",
        allowsAiBots: false, sitemapDeclared: false, isBlockingAll: false,
        aiBotStatus: {}, breakdown: { exists: false, notBlockingAll: false, allowsAiBots: false, sitemapDeclared: false },
      };
    }

    const text = await res.text();
    const lines = text.split("\n").map(l => l.trim()).filter(l => l && !l.startsWith("#"));

    // Parse properly: build user-agent → directives map
    const agentDirectives = {};
    let currentAgents = [];
    for (const line of lines) {
      if (/^user-agent:/i.test(line)) {
        const agent = line.replace(/^user-agent:\s*/i, "").trim().toLowerCase();
        currentAgents.push(agent);
        if (!agentDirectives[agent]) agentDirectives[agent] = { allow: [], disallow: [] };
      } else if (/^disallow:/i.test(line)) {
        const path = line.replace(/^disallow:\s*/i, "").trim();
        currentAgents.forEach(a => {
          if (agentDirectives[a]) agentDirectives[a].disallow.push(path);
        });
      } else if (/^allow:/i.test(line)) {
        const path = line.replace(/^allow:\s*/i, "").trim();
        currentAgents.forEach(a => {
          if (agentDirectives[a]) agentDirectives[a].allow.push(path);
        });
      } else if (/^sitemap:/i.test(line)) {
        currentAgents = []; // reset on non-directive line
      } else {
        currentAgents = []; // reset on blank or unrecognised directive
      }
    }

    // Is Disallow: / set for *
    const wildcard = agentDirectives["*"] || { allow: [], disallow: [] };
    const isBlockingAll = wildcard.disallow.includes("/") &&
      !wildcard.allow.includes("/");

    // AI bots: check proper User-agent entries
    const AI_BOTS = [
      { name: "GPTBot", agent: "gptbot" },
      { name: "ClaudeBot", agent: "claudebot" },
      { name: "anthropic-ai", agent: "anthropic-ai" },
      { name: "PerplexityBot", agent: "perplexitybot" },
      { name: "GoogleOther", agent: "googleother" },
    ];

    const aiBotStatus = {};
    for (const bot of AI_BOTS) {
      const directives = agentDirectives[bot.agent];
      if (directives) {
        // Explicitly configured — check if allowed or blocked
        const isBlocked = directives.disallow.includes("/") && !directives.allow.includes("/");
        aiBotStatus[bot.name] = isBlocked ? "blocked" : "allowed";
      } else if (isBlockingAll) {
        aiBotStatus[bot.name] = "blocked_by_wildcard";
      } else {
        // Inherits wildcard — not blocked unless wildcard blocks all
        aiBotStatus[bot.name] = "inherits_wildcard";
      }
    }

    const explicitlyAllowedAiBots = Object.values(aiBotStatus).filter(v => v === "allowed").length;
    const allowsAiBots = explicitlyAllowedAiBots >= 2; // at least 2 major AI bots explicitly allowed

    // Sitemap line (re-scan raw lines including comments)
    const sitemapLines = text.split("\n")
      .map(l => l.trim())
      .filter(l => /^sitemap:/i.test(l));
    const sitemapDeclared = sitemapLines.length > 0;
    const sitemapUrl = sitemapDeclared
      ? sitemapLines[0].replace(/^sitemap:\s*/i, "").trim()
      : null;

    // Score breakdown (out of 100)
    const breakdown = {
      exists: true,         // +25
      notBlockingAll: !isBlockingAll, // +35
      allowsAiBots,         // +25
      sitemapDeclared,      // +15
    };

    let score = 0;
    if (breakdown.exists) score += 25;
    if (breakdown.notBlockingAll) score += 35;
    if (breakdown.allowsAiBots) score += 25;
    if (breakdown.sitemapDeclared) score += 15;
    score = Math.max(0, Math.min(100, score));

    const status = isBlockingAll ? "failed" : score >= 75 ? "passed" : "warning";

    const valueStr = isBlockingAll
      ? "All crawlers blocked (Disallow: /)"
      : `${explicitlyAllowedAiBots}/5 AI bots explicitly configured · ${sitemapDeclared ? "Sitemap declared" : "No sitemap"}`;

    return {
      exists: true, score, status,
      value: valueStr,
      note: isBlockingAll
        ? "robots.txt is blocking all automated crawlers — this prevents Google, ChatGPT and Claude from indexing your site."
        : !allowsAiBots
        ? "AI crawlers (GPTBot, ClaudeBot) are not explicitly allowed. Add User-agent blocks with Allow: / for major AI indexers."
        : "robots.txt correctly configured with explicit AI crawler access.",
      allowsAiBots, sitemapDeclared, sitemapUrl, isBlockingAll,
      aiBotStatus, breakdown,
    };
  } catch {
    return {
      exists: false, score: 0, status: "failed",
      value: "Could not fetch robots.txt",
      note: "robots.txt is unreachable. Ensure the file exists at the root of your domain.",
      allowsAiBots: false, sitemapDeclared: false, isBlockingAll: false,
      aiBotStatus: {}, breakdown: {},
    };
  }
}

// ─── SITEMAP FETCHER ─────────────────────────────────────────────────────────
async function fetchSitemap(origin) {
  const candidates = [
    `${origin}/sitemap.xml`,
    `${origin}/sitemap_index.xml`,
    `${origin}/sitemap/sitemap.xml`,
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "CYouMedia-Audit-Bot/1.0" },
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) continue;
      const text = await res.text();

      const urlCount = (text.match(/<loc>/gi) || []).length;
      const isSitemapIndex = text.includes("<sitemapindex");
      const isValid = text.includes("<urlset") || isSitemapIndex;

      if (!isValid) {
        return {
          exists: true, score: 20, status: "failed",
          value: "Sitemap found but invalid XML structure",
          note: "The sitemap.xml exists but does not follow standard <urlset> or <sitemapindex> format.",
          urlCount: 0, foundAt: url, breakdown: { exists: true, validXml: false, hasUrls: false, hasTenPlus: false },
        };
      }

      const hasLastMod = text.includes("<lastmod>");
      const breakdown = {
        exists: true,          // +25
        validXml: true,        // +30
        hasUrls: urlCount > 0, // +25
        hasTenPlus: urlCount >= 10, // +20 (replaces hasUrls bonus)
      };

      let score = 25; // exists
      score += 30;    // valid XML
      if (urlCount > 0) score += 25;
      if (urlCount >= 10) score += 20;
      score = Math.min(100, score);

      return {
        exists: true, score,
        status: score >= 80 ? "passed" : score >= 50 ? "warning" : "failed",
        value: isSitemapIndex
          ? `Sitemap index found · ${urlCount} sitemaps referenced`
          : `Valid sitemap.xml · ${urlCount} URLs indexed${hasLastMod ? " · lastmod present" : ""}`,
        note: urlCount === 0
          ? "Sitemap is empty — no URLs are listed for bots to crawl."
          : `${urlCount} page(s) submitted for indexing.`,
        urlCount, foundAt: url, isSitemapIndex, hasLastMod, breakdown,
      };
    } catch { continue; }
  }

  return {
    exists: false, score: 0, status: "failed",
    value: "No sitemap.xml found",
    note: "Create a sitemap.xml at your domain root. Next.js can auto-generate one via next-sitemap.",
    urlCount: 0, foundAt: null,
    breakdown: { exists: false, validXml: false, hasUrls: false, hasTenPlus: false },
  };
}

// ─── PSI FETCHER ─────────────────────────────────────────────────────────────
async function fetchPSI(targetUrl, strategy) {
  const apiKey = process.env.PSI_API_KEY;
  if (!apiKey) {
    throw new Error("API configuration issue: PageSpeed Insights API Key (PSI_API_KEY) is missing in environment variables.");
  }

  const psiUrl =
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
    `?url=${encodeURIComponent(targetUrl)}` +
    `&key=${apiKey}` +
    `&category=performance&category=accessibility&category=best-practices&category=seo` +
    `&strategy=${strategy}`;

  try {
    const res = await fetch(psiUrl, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) {
      let errData = {};
      try {
        errData = await res.json();
      } catch (e) {
        // failed to parse
      }

      const errMsg = errData?.error?.message || "";
      const errStatus = res.status;

      if (errStatus === 429 || errMsg.toLowerCase().includes("quota") || errMsg.toLowerCase().includes("rate limit")) {
        throw new Error("Quota exceeded: PageSpeed Insights rate limits reached. Please try again in a few minutes.");
      } else if (errStatus === 400 && (errMsg.toLowerCase().includes("invalid") || errMsg.toLowerCase().includes("could not resolve") || errMsg.toLowerCase().includes("unreachable") || errMsg.toLowerCase().includes("lighthouse returned error"))) {
        throw new Error("Target site unreachable: Google Lighthouse crawler could not reach or resolve the target website. Ensure the URL is correct, public, and not blocking automated audits.");
      } else if (errStatus === 403) {
        throw new Error("Access denied: Invalid PSI API key or forbidden request. Please verify the PSI_API_KEY configuration.");
      } else if (errStatus >= 500) {
        throw new Error(`Google API error: PageSpeed Insights server returned a temporary internal error (${errStatus}).`);
      } else {
        throw new Error(errMsg || `PSI API error ${errStatus}`);
      }
    }

    const data = await res.json();
    const lh = data.lighthouseResult;
    if (!lh || !lh.categories) {
      throw new Error("API failure: PageSpeed Insights did not return complete audit categories.");
    }

    const cats = lh.categories || {};
    const audits = lh.audits || {};

    return {
      scores: {
        performance:   Math.round((cats.performance?.score   ?? 0) * 100),
        accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
        bestPractices: Math.round((cats["best-practices"]?.score ?? 0) * 100),
        seo:           Math.round((cats.seo?.score           ?? 0) * 100),
      },
      metrics: {
        fcp:  audits["first-contentful-paint"]?.displayValue   || "N/A",
        lcp:  audits["largest-contentful-paint"]?.displayValue || "N/A",
        tbt:  audits["total-blocking-time"]?.displayValue      || "N/A",
        cls:  audits["cumulative-layout-shift"]?.displayValue  || "N/A",
        ttfb: audits["server-response-time"]?.displayValue     || "N/A",
        si:   audits["speed-index"]?.displayValue              || "N/A",
      },
    };
  } catch (err) {
    if (err.name === "TimeoutError" || err.message.includes("timeout") || err.message.includes("AbortSignal")) {
      throw new Error("Timeout limit exceeded: The Google PageSpeed request timed out after 20 seconds.");
    }
    throw err;
  }
}

// ─── PSI RETRY ENGINE ────────────────────────────────────────────────────────
async function fetchPSIWithRetry(targetUrl, strategy, retries = 2) {
  let attempt = 0;
  while (true) {
    try {
      return await fetchPSI(targetUrl, strategy);
    } catch (err) {
      attempt++;
      if (attempt > retries) {
        throw err;
      }
      console.warn(`⚠️ PSI ${strategy} audit failed (attempt ${attempt}/${retries + 1}). Retrying in ${1000 * attempt}ms... Error:`, err.message);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// ─── SCORE SIGNAL BUILDERS ────────────────────────────────────────────────────
function buildSignals(p, robotsResult, sitemapResult, fetchSuccess) {

  // ── 1. JSON-LD (0-100, 3 tiers)
  let jsonLdScore, jsonLdStatus, jsonLdValue, jsonLdNote;
  if (!fetchSuccess) {
    jsonLdScore = 50; jsonLdStatus = "warning";
    jsonLdValue = "Could not fetch page HTML";
    jsonLdNote = "Page HTML could not be fetched for analysis.";
  } else if (!p.jsonLdPresent) {
    jsonLdScore = 0; jsonLdStatus = "failed";
    jsonLdValue = "No JSON-LD blocks found";
    jsonLdNote = "ChatGPT & Gemini cannot identify your business type without Schema.org tags. Add LocalBusiness or Organization schema.";
  } else if (!p.jsonLdHasType) {
    jsonLdScore = 35; jsonLdStatus = "failed";
    jsonLdValue = "JSON-LD present but missing @type — invalid schema";
    jsonLdNote = "A JSON-LD block was found but has no @type property. Malformed schema is ignored by search engines.";
  } else {
    // Valid JSON-LD with @type — bonus for recognised rich types
    const richTypes = ["LocalBusiness", "Organization", "Product", "Article", "FAQPage", "BreadcrumbList", "WebSite", "Person", "Event"];
    const hasRichType = p.jsonLdTypes.some(t => richTypes.includes(t));
    jsonLdScore = hasRichType ? 100 : 80;
    jsonLdStatus = "passed";
    jsonLdValue = `Valid schema · @type: ${p.jsonLdTypes.join(", ")}`;
    jsonLdNote = `Core entity mapping verified — AI models can understand your business structure.`;
  }

  // ── 2. Meta Tags (0-100, compound 4×25 but with content validation)
  let metaScore = 0;
  const metaBreakdown = { title: 0, description: 0, ogTitle: 0, ogImage: 0 };
  if (fetchSuccess) {
    if (p.hasTitle && p.titleValid) { metaScore += 25; metaBreakdown.title = 25; }
    else if (p.hasTitle) { metaScore += 12; metaBreakdown.title = 12; } // present but bad length
    if (p.metaDescValid) { metaScore += 25; metaBreakdown.description = 25; }
    else if (p.metaDescContent.length > 0) { metaScore += 10; metaBreakdown.description = 10; }
    if (p.ogTitleValid) { metaScore += 25; metaBreakdown.ogTitle = 25; }
    if (p.ogImageValid) { metaScore += 25; metaBreakdown.ogImage = 25; }
  } else {
    metaScore = 50;
  }
  const metaStatus = !fetchSuccess ? "warning" : metaScore >= 75 ? "passed" : metaScore >= 40 ? "warning" : "failed";

  // ── 3. Semantic HTML (0-100 proportional, unique tag types)
  const semanticScore = !fetchSuccess ? 50 : Math.round((p.semanticCount / 6) * 100);
  const semanticStatus = !fetchSuccess ? "warning" : semanticScore >= 67 ? "passed" : semanticScore >= 33 ? "warning" : "failed";

  // ── 4. Alt Text (0-100 proportional, ignores empty alt correctly)
  let altScore = 100, altStatus = "passed", altValue = "No images found";
  if (fetchSuccess && p.totalImgs > 0) {
    // Score based on images that have ANY alt attribute (empty is valid for decorative)
    altScore = Math.round((p.imgsWithAltAttr / p.totalImgs) * 100);
    altStatus = altScore === 100 ? "passed" : altScore >= 70 ? "warning" : "failed";
    altValue = `${p.imgsWithAltAttr}/${p.totalImgs} images have alt attribute · ${p.imgsMissingAlt} missing`;
  }

  // ── 5. Internal Linking (stepped, deduplicated)
  const linkCount = fetchSuccess ? p.internalLinkCount : 0;
  let linkScore;
  if (linkCount >= 20) linkScore = 100;
  else if (linkCount >= 10) linkScore = 85;
  else if (linkCount >= 5) linkScore = 65;
  else if (linkCount >= 2) linkScore = 40;
  else if (linkCount >= 1) linkScore = 20;
  else linkScore = 0;
  const linkStatus = linkScore >= 65 ? "passed" : linkScore >= 40 ? "warning" : "failed";

  // ── 6. Text-to-Code Ratio (stepped, scripts/styles excluded)
  const tcr = fetchSuccess ? p.textToCodeRatio : 0;
  let tcrScore;
  if (!fetchSuccess) { tcrScore = 50; }
  else if (tcr >= 30) tcrScore = 100;
  else if (tcr >= 20) tcrScore = 80;
  else if (tcr >= 12) tcrScore = 60;
  else if (tcr >= 6)  tcrScore = 35;
  else               tcrScore = 10;
  const tcrStatus = !fetchSuccess ? "warning" : tcrScore >= 60 ? "passed" : tcrScore >= 35 ? "warning" : "failed";

  // ── 7. Mobile Viewport (binary, but penalises blocking zoom)
  let vpScore, vpStatus, vpValue, vpNote;
  if (!fetchSuccess) {
    vpScore = 50; vpStatus = "warning";
    vpValue = "Could not fetch page HTML";
    vpNote = "Page HTML could not be fetched.";
  } else if (!p.hasViewport) {
    vpScore = 0; vpStatus = "failed";
    vpValue = "No width=device-width viewport found";
    vpNote = "Missing viewport meta tag. Mobile users see a zoomed-out desktop layout.";
  } else if (p.viewportBlocksZoom) {
    vpScore = 60; vpStatus = "warning";
    vpValue = "Viewport set but blocks user zoom (maximum-scale or user-scalable=no)";
    vpNote = "Blocking pinch-to-zoom is penalised by Google and harms accessibility. Remove maximum-scale or user-scalable=no.";
  } else {
    vpScore = 100; vpStatus = "passed";
    vpValue = "Responsive viewport correctly configured";
    vpNote = "width=device-width correctly set, zoom not blocked.";
  }

  // ── 8. robots.txt — already calculated
  // ── 9. XML Sitemap — already calculated

  return [
    {
      title: "JSON-LD / Schema.org",
      status: jsonLdStatus, score: jsonLdScore,
      value: jsonLdValue, note: jsonLdNote,
      breakdown: { present: p.jsonLdPresent, hasType: p.jsonLdHasType, types: p.jsonLdTypes },
    },
    {
      title: "Meta Tags",
      status: metaStatus, score: metaScore,
      value: !fetchSuccess ? "Could not fetch page HTML"
        : `${metaScore}/100 · Title: ${metaBreakdown.title}/25 · Desc: ${metaBreakdown.description}/25 · OG Title: ${metaBreakdown.ogTitle}/25 · OG Image: ${metaBreakdown.ogImage}/25`,
      note: !fetchSuccess ? "Page HTML could not be fetched." :
        `Title length: ${p.titleLength}ch (ideal 10-70) · Desc length: ${p.metaDescContent.length}ch (ideal 50-165)`,
      breakdown: metaBreakdown,
    },
    {
      title: "Semantic HTML",
      status: semanticStatus, score: semanticScore,
      value: !fetchSuccess ? "Could not fetch page HTML" : `${p.semanticCount}/6 unique semantic elements`,
      note: !fetchSuccess ? "Page HTML could not be fetched."
        : p.semanticCount >= 4 ? `Elements found: ${p.foundSemantic.join(", ")}`
        : `Missing: ${["header","footer","main","nav","article","section"].filter(t=>!p.foundSemantic.includes(t)).join(", ")}`,
      breakdown: { found: p.foundSemantic, total: 6 },
    },
    {
      title: "Alt Text Coverage",
      status: altStatus, score: altScore,
      value: !fetchSuccess ? "Could not fetch page HTML" : altValue,
      note: !fetchSuccess ? "Page HTML could not be fetched."
        : p.totalImgs === 0 ? "No images detected on page."
        : altScore === 100 ? "All images have alt attributes. Empty alt on decorative images is valid."
        : `${p.imgsMissingAlt} image(s) missing alt attribute entirely — invisible to AI vision indexing.`,
      breakdown: { total: p.totalImgs, withAlt: p.imgsWithAltAttr, missingAlt: p.imgsMissingAlt, descriptiveAlt: p.imgsWithDescriptiveAlt },
    },
    {
      title: "Internal Linking",
      status: linkStatus, score: linkScore,
      value: !fetchSuccess ? "Could not fetch page HTML" : `${linkCount} unique internal links detected`,
      note: !fetchSuccess ? "Page HTML could not be fetched."
        : linkCount >= 20 ? "Strong internal link structure with good crawl depth."
        : linkCount >= 10 ? "Solid linking. Consider adding more contextual body links."
        : linkCount >= 5 ? "Moderate linking. Add more in-content links to deepen crawl paths."
        : linkCount >= 1 ? "Very few internal links. Site may be a crawl dead-end."
        : "No internal links found. Bots cannot navigate beyond this page.",
      breakdown: { uniqueLinks: linkCount, thresholds: { poor: 5, moderate: 10, good: 20 } },
    },
    {
      title: "Text-to-Code Ratio",
      status: tcrStatus, score: tcrScore,
      value: !fetchSuccess ? "Could not fetch page HTML" : `${tcr.toFixed(1)}% visible text (scripts/styles excluded)`,
      note: !fetchSuccess ? "Page HTML could not be fetched."
        : tcr >= 20 ? "Good content density — AI models can extract meaningful text signals."
        : tcr >= 12 ? "Moderate text ratio. Increase body copy to improve AI readability."
        : "Very low text content. Heavy on markup — AI systems have little content to index.",
      breakdown: { ratio: parseFloat(tcr.toFixed(1)), thresholds: { poor: 6, moderate: 12, good: 20, excellent: 30 } },
    },
    {
      title: "Mobile Viewport",
      status: vpStatus, score: vpScore,
      value: vpValue, note: vpNote,
      breakdown: { hasViewport: p.hasViewport, blocksZoom: p.viewportBlocksZoom },
    },
    {
      title: "robots.txt AI Allow-list",
      status: robotsResult.status, score: robotsResult.score,
      value: robotsResult.value, note: robotsResult.note,
      breakdown: robotsResult.breakdown,
    },
    {
      title: "XML Sitemap",
      status: sitemapResult.status, score: sitemapResult.score,
      value: sitemapResult.value, note: sitemapResult.note,
      breakdown: sitemapResult.breakdown,
    },
  ];
}

// ─── MAIN ROUTE ───────────────────────────────────────────────────────────────
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: corsHeaders,
  });
}

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400, headers: corsHeaders });

    let targetUrl;
    try {
      targetUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400, headers: corsHeaders });
    }

    const origin = targetUrl.origin;

    // ── 1. Fetch HTML
    let parsedResults = null;
    let fetchSuccess = false;
    try {
      const htmlRes = await fetch(targetUrl.href, {
        headers: { "User-Agent": "CYouMedia-Audit-Bot/1.0 (+https://cyoumedia.com)" },
        signal: AbortSignal.timeout(8000),
      });
      if (htmlRes.ok) {
        const html = await htmlRes.text();
        parsedResults = parseHtml(html, origin);
        fetchSuccess = true;
      }
    } catch { /* blocked bot fetch — continue with partial data */ }

    // ── 2. Fetch robots.txt & sitemap in parallel
    const [robotsResult, sitemapResult] = await Promise.all([
      fetchRobots(origin),
      fetchSitemap(origin),
    ]);

    // ── 3. Fetch PSI mobile & desktop in parallel with graceful fallback and retries
    let mobile = null, desktop = null, psiError = null;
    let mobileError = null, desktopError = null;

    const [mobileRes, desktopRes] = await Promise.allSettled([
      fetchPSIWithRetry(targetUrl.href, "mobile"),
      fetchPSIWithRetry(targetUrl.href, "desktop"),
    ]);

    if (mobileRes.status === "fulfilled") {
      mobile = mobileRes.value;
    } else {
      mobileError = mobileRes.reason.message;
      console.warn("⚠️ PSI mobile audit failed:", mobileError);
    }

    if (desktopRes.status === "fulfilled") {
      desktop = desktopRes.value;
    } else {
      desktopError = desktopRes.reason.message;
      console.warn("⚠️ PSI desktop audit failed:", desktopError);
    }

    if (!mobile && !desktop) {
      const combinedError = [mobileError, desktopError].filter(Boolean).join(" | ");
      return NextResponse.json(
        { error: `Google Lighthouse API failed: ${combinedError || "Unknown API failure"}. Google Lighthouse API temporarily unavailable or target website blocked the audit.` },
        { status: 502, headers: corsHeaders }
      );
    }

    // Graceful single profile fallback: use the successful audit as a safe fallback for the failed one
    if (!mobile && desktop) {
      mobile = { ...desktop };
      psiError = `Mobile audit fell back to desktop data. Mobile error: ${mobileError}`;
    } else if (mobile && !desktop) {
      desktop = { ...mobile };
      psiError = `Desktop audit fell back to mobile data. Desktop error: ${desktopError}`;
    }

    // ── 4. Build 9 signals with proper scoring
    const p = parsedResults || {
      jsonLdPresent: false, jsonLdHasType: false, jsonLdTypes: [],
      hasTitle: false, titleContent: "", titleLength: 0, titleValid: false,
      metaDescContent: "", metaDescValid: false, ogTitleValid: false, ogImageValid: false,
      foundSemantic: [], semanticCount: 0,
      totalImgs: 0, imgsWithAltAttr: 0, imgsWithDescriptiveAlt: 0, imgsMissingAlt: 0,
      internalLinkCount: 0, textToCodeRatio: 0,
      hasViewport: false, viewportBlocksZoom: false, h1Count: 0, h2Count: 0,
    };

    const signals = buildSignals(p, robotsResult, sitemapResult, fetchSuccess);

    // ── 5. Weighted GEO score
    let weightedSum = 0, totalWeight = 0;
    for (const sig of signals) {
      const w = SIGNAL_WEIGHTS[sig.title] || 1.0;
      weightedSum += sig.score * w;
      totalWeight += w;
    }
    const geoScore = Math.round(weightedSum / totalWeight);

    // ── 6. SEO & Overall scores
    const seoScore = mobile.scores.seo;
    const desktopOverallScore = Math.round(
      (desktop.scores.performance + desktop.scores.accessibility +
       desktop.scores.bestPractices + desktop.scores.seo + geoScore) / 5
    );
    const overallScore = Math.round(
      (mobile.scores.performance + mobile.scores.accessibility +
       mobile.scores.bestPractices + mobile.scores.seo + geoScore) / 5
    );

    // ── 7. Dynamic issues & quick wins
    const failedSignals = signals.filter(s => s.status === "failed");
    const warnSignals = signals.filter(s => s.status === "warning");
    const topIssues = [
      ...failedSignals.map(s => `${s.title}: ${s.value}`),
      ...warnSignals.map(s => `${s.title}: ${s.value}`),
    ].slice(0, 4);

    const quickWins = [
      !robotsResult.allowsAiBots && "Add explicit GPTBot, ClaudeBot, PerplexityBot User-agent blocks with Allow: / to robots.txt",
      !sitemapResult.exists && "Create sitemap.xml — use next-sitemap package for automatic generation",
      fetchSuccess && !p.jsonLdHasType && "Add valid JSON-LD with @type (LocalBusiness or Organization) to your homepage",
      fetchSuccess && !p.metaDescValid && `Write a meta description (50-165 chars) — currently ${p.metaDescContent.length}ch`,
      fetchSuccess && p.imgsMissingAlt > 0 && `Add alt attribute to ${p.imgsMissingAlt} image(s) missing it entirely`,
    ].filter(Boolean).slice(0, 4);

    // ── 8. SEO & GEO audit tables
    const seoAudit = {
      crawlability: robotsResult.isBlockingAll ? "Failed — All crawlers blocked in robots.txt" : "Passed — Standard crawl access permitted",
      indexability: sitemapResult.exists ? `Passed — ${sitemapResult.urlCount} URLs in sitemap` : "Failed — No sitemap found",
      metadata: p.metaDescValid ? "Passed — Meta description within ideal length" : p.metaDescContent.length > 0 ? "Warning — Meta description present but wrong length" : "Failed — Meta description absent",
      structuredData: p.jsonLdHasType ? `Passed — JSON-LD @type: ${p.jsonLdTypes.join(", ")}` : p.jsonLdPresent ? "Failed — JSON-LD present but missing @type" : "Failed — No structured data found",
      internalLinking: p.internalLinkCount >= 10 ? `Passed — ${p.internalLinkCount} unique internal links` : `Warning — Only ${p.internalLinkCount} unique internal link(s)`,
      mobileReadiness: p.hasViewport && !p.viewportBlocksZoom ? "Passed — Responsive viewport, zoom permitted" : p.viewportBlocksZoom ? "Warning — Viewport blocks user zoom" : "Failed — No viewport meta tag",
      titleTag: p.titleValid ? `Passed — Title ${p.titleLength}ch (ideal range)` : p.hasTitle ? `Warning — Title ${p.titleLength}ch (ideal 10-70ch)` : "Failed — No title tag found",
    };

    const geoAudit = {
      aiReadability: p.semanticCount >= 4 ? "Highly structured — semantic HTML detected" : "Poorly structured — missing semantic landmarks",
      entityClarity: p.jsonLdHasType ? `Explicit entity via JSON-LD (@type: ${p.jsonLdTypes.join(", ")})` : p.jsonLdPresent ? "Ambiguous — JSON-LD block lacks @type" : "Ambiguous — no schema entity mapping",
      answerReadiness: tcrScoreToLabel(signals.find(s => s.title === "Text-to-Code Ratio")?.score),
      aiCrawlerAccess: robotsResult.allowsAiBots ? "AI bots explicitly permitted in robots.txt" : "AI agents not explicitly allowed — may be blocked",
      sitemapIndexed: sitemapResult.exists ? `Yes — ${sitemapResult.urlCount} URL(s) submitted` : "No — sitemap.xml missing",
      imageOptimization: p.totalImgs === 0 ? "No images found" : p.imgsMissingAlt === 0 ? "All images indexed for AI vision" : `${p.imgsMissingAlt} image(s) invisible to AI (missing alt)`,
      contentExtractability: p.textToCodeRatio >= 20 ? "Good content density" : p.textToCodeRatio >= 12 ? "Moderate — increase body copy" : "Heavy markup — low content signal",
    };

    // ── 9. Recommendations
    const recommendations = [
      !robotsResult.allowsAiBots && {
        priority: "Critical",
        fix: "Update robots.txt with explicit AI crawler rules",
        impact: "Allows ChatGPT (GPTBot), Claude (ClaudeBot), and Perplexity to crawl and recommend your pages.",
        time: "10 mins",
        codeExample: "User-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /",
      },
      !sitemapResult.exists && {
        priority: "Critical",
        fix: "Create XML sitemap",
        impact: "Ensures all your pages are discoverable by search engines and AI crawlers.",
        time: "15 mins",
        codeExample: "npm install next-sitemap",
      },
      fetchSuccess && !p.jsonLdHasType && {
        priority: "High",
        fix: p.jsonLdPresent ? "Fix JSON-LD — add @type property to existing block" : "Add JSON-LD Structured Schema markup",
        impact: "Tells AI search models your business type, location, and services with precision.",
        time: "20 mins",
        codeExample: `<script type="application/ld+json">\n{"@context":"https://schema.org","@type":"LocalBusiness","name":"Your Business"}\n</script>`,
      },
      fetchSuccess && !p.metaDescValid && {
        priority: "High",
        fix: `Fix meta description (currently ${p.metaDescContent.length}ch — need 50-165ch)`,
        impact: "Required for rich snippets in Google, Bing, and AI-powered search results.",
        time: "20 mins",
      },
      fetchSuccess && p.imgsMissingAlt > 0 && {
        priority: "Medium",
        fix: `Add alt attribute to ${p.imgsMissingAlt} image(s)`,
        impact: "Enables GPT-4o and Gemini Vision to index and surface your images in AI search.",
        time: "30 mins",
      },
      fetchSuccess && p.semanticCount < 4 && {
        priority: "Medium",
        fix: "Add missing semantic HTML5 landmarks",
        impact: "Allows AI parsing systems to correctly isolate main content from navigation and footers.",
        time: "1 hour",
        codeExample: `Missing: ${["header","footer","main","nav","article","section"].filter(t=>!p.foundSemantic.includes(t)).join(", ")}`,
      },
    ].filter(Boolean);

    const report = {
      targetUrl: targetUrl.href,
      timestamp: new Date().toISOString(),
      fetchSuccess,
      realLighthouseActive: true,
      executiveSummary: {
        overallScore, seoScore, geoScore,
        desktopOverallScore,
        topIssues: topIssues.length > 0 ? topIssues : ["No critical issues detected."],
        quickWins: quickWins.length > 0 ? quickWins : ["Your site is well optimised — keep monitoring."],
        lighthouse: {
          performance:   mobile.scores.performance,
          accessibility: mobile.scores.accessibility,
          bestPractices: mobile.scores.bestPractices,
          seo:           mobile.scores.seo,
        },
        mobileMetrics: mobile.metrics,
        desktopLighthouse: {
          performance:   desktop.scores.performance,
          accessibility: desktop.scores.accessibility,
          bestPractices: desktop.scores.bestPractices,
          seo:           desktop.scores.seo,
        },
        desktopMetrics: desktop.metrics,
      },
      signals,
      signalWeights: SIGNAL_WEIGHTS,
      seoAudit,
      geoAudit,
      recommendations,
    };

    return NextResponse.json(report, { headers: corsHeaders });
  } catch (error) {
    console.error("Audit API Error:", error);
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500, headers: corsHeaders });
  }
}

function tcrScoreToLabel(score) {
  if (!score) return "Unknown — fetch failed";
  if (score >= 60) return "Good — sufficient text for AI extraction";
  if (score >= 35) return "Low — increase body copy for AI readability";
  return "Very low — heavy markup, minimal content signal";
}