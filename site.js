(function() {
  // Populate footer date line
  var months = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
  var now = new Date();
  var footerEl = document.getElementById('footer-text');
  if (footerEl) {
    footerEl.textContent = months[now.getMonth()] + ' ' + now.getFullYear()
      + '. Based in the Bay Area, California where we get hyphy.';
  }

  // Set email link (assembled in JS to avoid scrapers)
  var user = 'hello';
  var domain = 'jeffreyperonaboyce.com';
  var addr = user + '@' + domain;
  var linkEl = document.getElementById('email-link');
  var textEl = document.getElementById('email-text');
  if (linkEl) linkEl.href = 'mailto:' + addr;
  if (textEl) textEl.textContent = addr;

  // The plain gorilla (styles.css: .gorilla-wrap — the only kind there is
  // now, identical markup and positioning on all three pages) used to
  // start hidden and only reveal once this script confirmed the footer's
  // real content was in and .page's height had settled. That was
  // defense-in-depth against .footer-text collapsing to 0 height before
  // this script populated it. .footer-text now reserves its own height
  // via CSS (min-height), so .footer-bar — and this gorilla's position
  // within .page — is correct from the very first paint, with nothing
  // left to wait for. Removed the reveal-gate entirely: it was itself
  // causing a visible fade-in on every navigation once real network/font
  // timing (slower than local testing) made that fade noticeable, which
  // read as a recurring "gorilla reload" glitch.
})();

(function() {
  // Every page's gorilla is `position: absolute`, anchored to .page (see
  // styles.css) rather than fixed to the viewport, so it's part of the
  // normal document flow and scrolls away with the page's content — the
  // same position, computed the same way, on all three pages now.
  //
  // The vertical anchor is the fixed nav's own bottom edge (measured
  // live, so it tracks if the nav/banner's height ever changes) — the one
  // structural element that's genuinely identical on all three pages.
  // This used to anchor to each page's own content container top instead
  // (.inner / .about-inner / .portfolio-inner), which seemed like the
  // more "correct" reference at the time, but those containers sit at
  // different heights BY DESIGN on each page — Home's is flex-centered in
  // whatever space is left, About's is pinned near the top to match
  // Home's typical centered position, and Portfolio's sits in normal
  // block flow right below the nav — so computing "top" from each one
  // produced a genuinely different on-screen position per page, not
  // matching ones. Anchoring to the nav instead is what actually makes
  // the position identical, per an explicit request for that consistency.
  //
  // A footer-driven formula (window height minus footer height minus the
  // gorilla's own ~670px-tall box) went negative — pushing the gorilla's
  // top edge above the viewport, behind the fixed nav — on any window
  // short enough that footer + gorilla height didn't leave room to spare.
  // The clamps below don't have that problem:
  //   - Floor: never above the fixed nav+banner plus a small buffer.
  //   - Ceiling: never so low the gorilla's own height would run into the
  //     footer.
  // Whichever of container-top / floor / ceiling ends up governing, this
  // sets `top` (not `bottom`) — `bottom` is measured from the containing
  // block's bottom edge, so freezing a bottom pixel value does NOT hold
  // the gorilla's position relative to the content steady if that box's
  // own height ever changes. `top` doesn't have that problem.
  //
  // `top` for an absolute element is measured from .page's own top edge,
  // not the viewport's, so the math below measures the target position in
  // viewport coordinates (the natural coordinate system for nav/footer/
  // window-height math) and then subtracts .page's own viewport-relative
  // top to convert it to the .page-relative offset `top` actually needs.
  var wrap = document.querySelector('.gorilla-wrap');
  var container = document.querySelector('.inner, .about-inner, .portfolio-inner');
  var page = document.querySelector('.page');
  var nav = document.querySelector('.site-nav');
  var footer = document.querySelector('.footer-bar');
  if (!wrap || !container || !page) return;
  // Gap below the nav's bottom edge. Mildly width-scaled in the same
  // fluid style as the rest of this site rather than a single flat
  // number, but otherwise just a chosen, comfortable resting distance —
  // not derived from a Figma mockup the way the old content-relative
  // offset was, since that number doesn't carry over to a nav-relative
  // anchor. 150px at 1200px width, tightening toward 134px at 768px and
  // opening up to 172px by 1800px.
  var gorillaNavGap = function(w) {
    var cw = Math.min(Math.max(w, 768), 1800);
    return 150 + 0.0365 * (cw - 1200);
  };
  // The gorilla's resting .page-relative top — a fixed document position,
  // read by the parallax handler below on every scroll event rather than
  // recomputing the full layout each time.
  var baseTop = 0;
  // Home, About, and Portfolio: top-align with that page's own header (the
  // "Product Design" role title on Home, the "Hello!" heading on About,
  // the "Gemini on Glasses" case title on Portfolio) instead of the shared
  // nav-gap resting spot Gorilla alone still uses (per explicit requests
  // scoped to each page). None of the three selectors matches on any other
  // page, so this is naturally a no-op there — and since at most one of
  // the three ever exists on a given page, this always resolves to that
  // page's own header. Portfolio's is a dedicated `.gorilla-align-title`
  // class on that one case title specifically (rather than plain
  // `.case-title`, which every case study has) so this doesn't accidentally
  // latch onto whichever case study happens to render first.
  var alignHeader = document.querySelector('.role-title, .hello-heading, .gorilla-align-title');
  // Aligning `wrap`'s own top (its CSS box, at the full 716x800 aspect
  // ratio) with the header looked wrong once checked against the actual
  // animation: the Lottie source has a lot of dead canvas above the
  // character (same padding issue as the "too small" fix above), and the
  // 1.5x scale transform — anchored bottom-center per that same fix —
  // pushes the visible artwork's top edge UP past the box's own top edge
  // rather than down. Net effect at each page's typical/idle pose (Home's
  // only clip barely moves — bbox top 169-177 of 800 across its whole
  // loop; About's subtle-movement clip, which is what it's showing most
  // of the time, measures almost identically at 169-177; Portfolio's
  // talk-3 clip sits essentially fixed at 176 the same way): the visible
  // head sits roughly 17.6% of the wrap's own height ABOVE the box's
  // nominal top. Left uncorrected, that shows up as the gorilla's head
  // floating well above the header instead of level with it. This
  // constant folds that measured offset in so `top` continues to target
  // the wrap's own CSS box (matching how every other calc in this
  // function works, and staying correct if the box's own height changes
  // across viewport widths), while the visible artwork is what actually
  // lands level with the header during each page's resting pose.
  var GORILLA_VISIBLE_TOP_INSET_FRAC = -0.176;
  // Same padding problem at the bottom of the canvas: the character's own
  // feet sit at bbox-bottom ~655 of 800 (81.9%), not at the canvas's own
  // 800. Scaled from that same bottom-center origin, the visible bottom
  // ends up at ~72.85% of the wrap's own height — meaning the maxTop
  // "keep clear of the footer" clamp below, if left measuring against the
  // full (mostly empty) box height, is more conservative than it needs to
  // be: it refuses to push the gorilla down near the footer well before
  // the actual artwork would get anywhere close to it. That's exactly the
  // gap that was silently overriding the role-title alignment target
  // above on any viewport short enough for the clamp to bind (ordinary
  // laptop window heights, not just small ones). Folding this in lets the
  // clamp key off where the visible feet actually are instead.
  var GORILLA_VISIBLE_BOTTOM_FRAC = 0.7285;
  // How close the VISIBLE gorilla is allowed to get to the navbar. On
  // Home/About/Portfolio the target above is normally the header
  // alignment, but on a short enough viewport that target can sit closer
  // to the nav than this — so this floor overrides it. Expressed the same
  // way as the maxTop clamp below: converted from a visible-content
  // distance into a `top` (the wrap's own CSS box) via a top-inset
  // constant, so it's the actual artwork — not the mostly-empty box —
  // that respects the 150px gap. Other pages target navBottom +
  // gorillaNavGap() directly, which is already comfortably clear of the
  // nav, so they keep the old flat floor.
  //
  // About's sequencer cycles through gorilla-wave-1/2.json too, and those
  // raise an arm well above the idle pose used for GORILLA_VISIBLE_TOP_-
  // INSET_FRAC above (measured bbox top low point: 150.85 of 800 for
  // wave-1, vs ~169-177 for the idle/subtle clip and for Home's only
  // clip). Using the idle-pose inset for the clearance floor would let a
  // raised arm swing to within ~127px of the nav on a short viewport —
  // comfortably under the 150px requirement. This separate, more
  // conservative inset is calibrated off that measured worst-case wave
  // frame instead, so the floor holds through the biggest gesture either
  // page's sequencer ever plays. Home's single clip never approaches that
  // extreme, so reusing the tighter idle inset for Home's own floor is
  // fine as-is.
  //
  // Portfolio's talk-2 clip also has a speech-bubble icon that pops up
  // above the gorilla's head mid-clip, whose own top briefly overshoots
  // the 800-tall canvas's own y:0 edge (measured bbox top: -85.63, i.e.
  // -10.7%). Calibrating this floor off that bubble frame (a prior version
  // of this constant) pinned the resting position so far down that it read
  // as "way too low" against "Gemini on Glasses" — per explicit follow-up
  // feedback that there should be room to sit higher, this floor protects
  // the character's own body/gesture extent only, same as every other
  // page's floor. The worst BODY-only frame across all three clips is
  // talk-1's arm-raised-holding-glasses pose (bbox top 113.39 of 800, i.e.
  // 14.2% — real visible content, unlike a couple of frames elsewhere in
  // these clips that momentarily report an empty/degenerate 0-by-0 bbox,
  // which aren't visible content and were excluded from this measurement).
  //
  // Net effect: the gorilla's own body always keeps 150px+ clear of the
  // nav, and sits markedly closer to "Gemini on Glasses" than the
  // bubble-inclusive version did — but the speech-bubble icon itself is no
  // longer specifically protected, so on a short enough viewport it could
  // in principle swing to within less than 150px of the nav during that
  // one transient moment in talk-2. Flagging this rather than silently
  // re-deciding it, since this exact tradeoff has been weighed both ways
  // already in this file's history.
  //
  // The Gorilla page itself (talking/thinking clips, detected the same
  // window-global way the sequencer below tells clips apart — those
  // scripts load before this one runs, so the globals already exist here)
  // turns out to need this too: both clips share a thought-bubble/speech
  // icon whose worst frame measures bbox top 36.67 of 800 (4.6%) — well
  // past what the old flat navBottom+24 floor (sized for the previous
  // static PNG, which never overflowed the canvas) was ever checked
  // against. Sampling the live page confirmed it: with the old floor, that
  // bubble frame actually crossed above the nav's own bottom edge
  // (measured clearance: -41.6px, i.e. overlapping the nav) at a short
  // viewport. Gorilla has no header to align to, so it keeps its usual
  // navBottom + gorillaNavGap() target, but now gets the same kind of
  // clearance floor as the other pages layered under that target.
  //
  // Keyed off GORILLA_TALK_THINKING_DATA — exclusive to the Gorilla page and
  // itself the source of the 36.67-of-800 bubble overshoot, so it stays a
  // reliable page marker regardless of which clip is paired with it in the
  // other slot (talking, then gorilla-talk-talk, share that same slot).
  var GORILLA_PAGE_TALK_INSET_FRAC = -0.43124;
  var GORILLA_NAV_CLEARANCE_INSET_FRAC = document.querySelector('.portfolio-inner')
    ? -0.28739
    : document.querySelector('.about-inner')
    ? -0.2171
    : window.GORILLA_TALK_THINKING_DATA
    ? GORILLA_PAGE_TALK_INSET_FRAC
    : GORILLA_VISIBLE_TOP_INSET_FRAC;
  // Padded 10px above the requested 150: even the worst-case inset above
  // is a sampled measurement, not an exact analytic bound, so a floor
  // computed exactly at 150 could still let an in-between frame the
  // sampling missed dip a px or two under it. This margin absorbs that
  // sampling slop so the real on-screen clearance never drops below 150
  // at any point in either page's animation.
  var GORILLA_NAV_CLEARANCE = 160;
  // Gorilla page has no alignHeader (nothing on that page to align to) but
  // still needs the clearance floor, per the thought-bubble measurement
  // above — so this checks for its clip globals directly rather than
  // gating on alignHeader the way About/Portfolio/Home do. Hoisted out of
  // positionGorillaY (rather than a local var recomputed each call) so the
  // resize-listener setup below can also read it.
  var needsClearanceFloor = alignHeader || window.GORILLA_TALK_THINKING_DATA;
  // Gorilla page only: true when this is the page with no header to align
  // to, running the talking/thinking clips (see needsClearanceFloor above).
  var isGorillaPage = !alignHeader && !!window.GORILLA_TALK_THINKING_DATA;
  // The reveal-mask feature (see gorilla.html/styles.css) crops that page's
  // box down to its own top half on load — only that top slice is ever
  // actually painted, the rest is masked away. GORILLA_VISIBLE_BOTTOM_FRAC
  // above (0.7285) was measured against the OLD, unmasked artwork, where
  // real visible content really did run most of the way down the box; using
  // it here would treat the masked-away bottom portion as if it still
  // needed footer clearance, making the ceiling below far more conservative
  // than the actual on-screen artwork requires — which is exactly what let
  // the box get positioned low enough to overlap the footer. 0.56 matches
  // the mask's own 55% window plus a small buffer for the entrance
  // animation/antialiasing.
  var GORILLA_PAGE_VISIBLE_BOTTOM_FRAC = 0.56;
  // Per an explicit "anchor him to the very bottom of the browser window,
  // crossing over the footer" request scoped to this page only: every
  // other page's maxTop below keeps the visible-bottom target flush above
  // the footer bar (window height minus footerHeight minus a cushion), but
  // the Gorilla page's own maxTop (further down, in positionGorillaY)
  // targets the viewport's bottom edge DIRECTLY, ignoring footerHeight
  // entirely — so the visible artwork lands right at the bottom of the
  // browser window and overlaps the footer bar rather than stopping above
  // it. That's a safe overlap: .footer-bar's z-index (20) already beats
  // .gorilla-wrap's (10), so the footer's links/text always render on top
  // where the two intersect, and .gorilla-wrap is pointer-events:none, so
  // nothing about the footer's clickability changes.
  // "Animate up from the bottom" only on this page's first load in a given
  // browser session — a reload or a return visit within the same session
  // should show him already in his resting position, per an explicit
  // request. This runs synchronously while the script parses (this
  // <script> tag sits after .gorilla-body in the HTML, but before the
  // browser paints anything — scripts without async/defer block parsing,
  // and nothing upstream forces a paint mid-parse), so there's no flash of
  // the rise-up animation starting before this cancels it — the class is
  // already present by the time the page is first shown.
  // sessionStorage (not localStorage) is what makes this "per session" —
  // it clears when the tab/browser closes, so the very next fresh session
  // sees the animation again, matching "first time this page loads during
  // a session" rather than "only ever once on this device." Wrapped in
  // try/catch since sessionStorage can throw in some restricted/embedded
  // contexts (e.g. a locked-down iframe) — if that happens, the entrance
  // animation just plays every time instead of breaking the page.
  if (isGorillaPage) {
    try {
      var GORILLA_REVEAL_SESSION_KEY = 'gorillaChestRevealPlayed';
      if (window.sessionStorage.getItem(GORILLA_REVEAL_SESSION_KEY)) {
        var gorillaBody = wrap.querySelector('.gorilla-body');
        if (gorillaBody) { gorillaBody.classList.add('no-entrance-anim'); }
      } else {
        window.sessionStorage.setItem(GORILLA_REVEAL_SESSION_KEY, '1');
      }
    } catch (e) {}
  }
  var positionGorillaY = function() {
    var navBottom = nav ? nav.getBoundingClientRect().bottom : 130;
    var footerHeight = footer ? footer.getBoundingClientRect().height : 0;
    var bottomFrac = isGorillaPage ? GORILLA_PAGE_VISIBLE_BOTTOM_FRAC : GORILLA_VISIBLE_BOTTOM_FRAC;
    var footerGap = 20;
    // Gorilla-page-only, desktop-only fit check. The corrected bottomFrac
    // above already reduces how often minTop (nav/thought-bubble clearance)
    // and maxTop (viewport-bottom clearance) conflict, but on a short
    // enough viewport this page's box can still be too tall for both to
    // hold fully at once. Rather than let that conflict push the box down
    // past the nav (see the hardFloor branch below), shrink the box itself
    // down to whatever height DOES let both hold — solving
    // minTop(H) = maxTop(H) for H gives that tallest conflict-free height —
    // by scaling .gorilla-wrap's own width (aspect-ratio keeps height in
    // step). Scoped to isGorillaPage only, and to width>767 (desktop) only
    // — mobile stays in normal document flow (position:relative with all
    // offsets forced to auto, see styles.css), where none of this
    // absolute-position fit math ever applies, so shrinking width here
    // would only wrongly shrink the in-flow mobile layout for no reason.
    // No footerHeight/footerGap term here (unlike the old version): the
    // Gorilla page's own maxTop below no longer keeps clear of the footer
    // at all (it deliberately crosses over it), so there's nothing footer-
    // related left for this fit check to protect against.
    if (isGorillaPage && window.innerWidth > 767) {
      // Resets to the CSS-natural width first, every call — not just once
      // — so a previous shrink doesn't stick around and stop the gorilla
      // from growing back to full size if the window is later resized
      // taller/wider again.
      wrap.style.width = '';
      var natWidth = wrap.getBoundingClientRect().width;
      var natHeight = wrap.getBoundingClientRect().height;
      var GORILLA_PAGE_FIT_MARGIN = 16;
      var hMax = (window.innerHeight - navBottom
        - GORILLA_NAV_CLEARANCE - GORILLA_PAGE_FIT_MARGIN)
        / (bottomFrac - GORILLA_NAV_CLEARANCE_INSET_FRAC);
      if (hMax > 0 && natHeight > hMax) {
        wrap.style.width = (natWidth * (hMax / natHeight)) + 'px';
      }
    } else if (isGorillaPage) {
      // Mobile: undo any desktop-viewport shrink from a previous resize
      // rather than leaving a stale inline width behind.
      wrap.style.width = '';
    }
    var gorillaHeight = wrap.getBoundingClientRect().height;
    var minTop = needsClearanceFloor
      ? navBottom + GORILLA_NAV_CLEARANCE - GORILLA_NAV_CLEARANCE_INSET_FRAC * gorillaHeight
      : navBottom + 24;
    // Gorilla page: maxTop targets the viewport's own bottom edge directly
    // — no footerHeight/footerGap subtraction — per the "anchor to the very
    // bottom, crossing over the footer" request (see the comment on
    // GORILLA_PAGE_VISIBLE_BOTTOM_FRAC above for why that overlap is safe).
    // Every other page keeps its original footer-relative ceiling,
    // completely untouched.
    var maxTop = isGorillaPage
      ? window.innerHeight - gorillaHeight * bottomFrac
      : window.innerHeight - footerHeight - footerGap - gorillaHeight * bottomFrac;
    var top;
    if (isGorillaPage) {
      // Bottom-anchored by default (target = maxTop, the largest safe top
      // — flush against the viewport's own bottom edge, crossing over the
      // footer, with the fit-shrink above keeping this conflict-free in
      // practice), stepping up to minTop instead only if
      // the box is still too tall for that to also clear the nav/thought
      // bubble — protecting the animation from ever being cut off takes
      // priority over sitting perfectly flush, floored at hardFloor (just
      // past the nav) so the box can never end up off-screen or behind it
      // either. Scoped to this page only — every other page keeps its
      // original nav-gap/header-aligned target and the original, unmodified
      // Math.max(maxTop, minTop) priority below, completely untouched by
      // this.
      var hardFloor = navBottom + 24;
      var gorillaTarget = maxTop;
      top = Math.min(Math.max(gorillaTarget, minTop), Math.max(maxTop, hardFloor));
    } else {
      var target = alignHeader
        ? alignHeader.getBoundingClientRect().top - GORILLA_VISIBLE_TOP_INSET_FRAC * gorillaHeight
        : navBottom + gorillaNavGap(window.innerWidth);
      top = Math.min(Math.max(target, minTop), Math.max(maxTop, minTop));
    }
    // Everything above is viewport-relative; convert to .page-relative
    // before writing it, since that's what `top` means on a
    // position:absolute element anchored to .page.
    //
    // page.getBoundingClientRect().top is ALSO viewport-relative, and it
    // moves with scroll (it's however far .page's own top edge currently
    // sits above/below the top of the window) — so on its own it doesn't
    // cancel out into a scroll-invariant .page-relative offset the way the
    // comment here used to claim. Subtracting just that left a scroll-
    // dependent leftover of exactly window.scrollY baked into baseTop: a
    // page reload with the scroll position already restored partway down
    // Portfolio computed a baseTop offset by however far down that was,
    // which visibly put the gorilla wherever the page happened to be
    // scrolled to on load, rather than pinned up at its resting spot
    // beside the first case study. Adding window.scrollY back cancels
    // that leftover, so baseTop always lands on the same document
    // position (the nav-relative resting spot) no matter what the scroll
    // position was at the moment this ran.
    baseTop = top - page.getBoundingClientRect().top - window.scrollY;
    wrap.style.top = baseTop + 'px';
    wrap.style.bottom = 'auto';
  };
  positionGorillaY();
  // Deliberately NOT re-run on resize on pages using the nav-gap resting
  // spot with no clearance floor: that target is just a fixed offset below
  // the nav, so recomputing it on resize would only fight the parallax
  // scroll-offset math above for no visible benefit. Still re-measured
  // once fonts finish loading, since that's a one-time correction to the
  // *real* final render, not an ongoing response to resizing.
  //
  // Home, About, and Portfolio are different: their target actively
  // tracks that page's own header position (see `target` above), and both
  // that position and the 150px nav-clearance floor genuinely change as
  // the window is resized — the header reflows to a new line count/font
  // size at various widths, and the clearance floor depends on the nav's
  // own height. Freezing baseTop at load would leave the gorilla visibly
  // misaligned (i.e. "stuck" at an absolute page position) after any
  // resize, so these pages keep recomputing it live.
  //
  // Gorilla joins them for the same clearance-floor reason even though its
  // target itself doesn't move: `needsClearanceFloor` above makes minTop
  // depend on gorillaHeight, which does change with window width (the
  // wrap's CSS width is fluid) — leaving that stale after a resize could
  // let the thought-bubble frame drift back under 150px from the nav on a
  // window resized narrower after load.
  if (needsClearanceFloor) {
    window.addEventListener('resize', function() {
      positionGorillaY();
      applyParallax();
    });
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionGorillaY);
  }

  // Parallax: being in normal document flow (see above) already means the
  // gorilla scrolls away with the page — at the same 1:1 rate as the
  // content around it, since its `top` is just a fixed offset within
  // .page. To make it drift upward at a visibly SLOWER rate instead (a
  // requested parallax effect, not just "it happens to scroll"), each
  // scroll event nudges `top` back down by a fraction of how far the page
  // has scrolled, partially counteracting the natural 1:1 movement so the
  // NET on-screen movement is smaller. At the default rate of 0.5, the
  // gorilla moves at half the page's scroll speed — scroll 400px and it
  // only travels 200px, so it lingers on screen roughly twice as long as
  // the content around it before scrolling out of view.
  //
  // Portfolio gets a faster 0.75 rate specifically (per an explicit
  // request scoped to that page only) — with six case studies stacked
  // below it, a slower drift there meant the gorilla stayed anchored near
  // the top for a very long scroll before catching up; 0.75 still lags
  // the content but clears out of the way sooner. Detected via
  // .portfolio-inner rather than a page-name check, consistent with how
  // this file already tells pages apart elsewhere (see `container`
  // above).
  //
  // About gets a slightly faster 0.6 rate (per an explicit request scoped
  // to that page only) — still a noticeably slower drift than the
  // content, just a bit brisker than the site's 0.5 default. Detected via
  // .about-inner, same pattern as the portfolio check above.
  // Applied directly against the absolute scroll position (not a delta
  // from whatever scroll position happened to be current when baseTop was
  // last computed) — baseTop is already the scroll-invariant resting
  // position for scrollY=0, so scaling window.scrollY itself by (1-rate)
  // is what reproduces that same "target" position at scrollY=0 and the
  // correct slowed drift at any other scroll position. Deriving this from
  // a delta against a captured baseline instead (the previous approach)
  // only produced the right answer when that baseline happened to be 0 —
  // a page reload with the scroll position already restored partway down
  // Portfolio captured a nonzero baseline, and every parallax update
  // after that carried a leftover constant offset, visibly displacing the
  // gorilla from where the 1:1 baseTop positioning had just placed it.
  var PARALLAX_RATE = document.querySelector('.portfolio-inner') ? 0.8
    : document.querySelector('.about-inner') ? 0.75
    : 0.5;
  var parallaxTicking = false;
  var applyParallax = function() {
    parallaxTicking = false;
    wrap.style.top = (baseTop + window.scrollY * (1 - PARALLAX_RATE)) + 'px';
  };
  var onParallaxScroll = function() {
    if (parallaxTicking) { return; }
    parallaxTicking = true;
    window.requestAnimationFrame(applyParallax);
  };
  window.addEventListener('scroll', onParallaxScroll, { passive: true });
})();

(function() {
  // Pins the gorilla's horizontal position to the page's own content
  // container instead of the viewport, so it holds the same spot
  // relative to the text at any window width. Runs on every page (this
  // script is shared) — whichever container element the current page
  // actually has (.inner on Home, .about-inner on About, .portfolio-inner
  // on Portfolio) is used as the reference; Gorilla's own page has no
  // visible text to align to, so it carries a hidden, zero-height .inner
  // purely so this has the same 1200px-capped column to measure against
  // there too, keeping all four pages consistent.
  var gorilla = document.querySelector('.gorilla-wrap');
  var container = document.querySelector('.inner, .about-inner, .portfolio-inner');
  if (!gorilla || !container) return;

  // Where the gorilla's right edge sits, horizontally. Derived from TWO
  // real Figma anchors — a "1200px (768-1200 optimized)" mockup and a
  // "1400px (1201px+ optimized)" mockup — but both of those mockups draw
  // their content inside the SAME fixed 1200px-wide container rectangle
  // (matching this site's own .inner max-width:1200 cap): at the 1200px
  // anchor the gorilla's right edge sits 36px INSIDE the container's own
  // right edge; at the 1400px anchor it's 89px PAST it. Past 1200px
  // viewport width that maps directly to real pixels, since the live
  // container is ALSO pinned at 1200px there too — a straight line
  // through those two points, bleed(w) = -36 + 0.625*(w - 1200), clamped
  // at a chosen extrapolation point of 1800px (past the last real mockup,
  // not something the mockups specify).
  //
  // Below 1200px, though, the live container ISN'T pinned — .inner is
  // width:100% down there, so it shrinks with the viewport — and both
  // Figma anchors were drawn against the fixed-at-1200 rectangle, not
  // against a container that's actually shrinking. Reusing the same
  // raw-pixel bleed formula down to 768px would extrapolate it to roughly
  // -300px (deep inside a container that, unlike in the mockups, is
  // ITSELF hundreds of pixels narrower there too) — verified via
  // Playwright to genuinely hide the company list behind the gorilla at
  // ~900px width, not merely a bounding-box false positive. Below 1200px
  // this instead holds the gorilla's right edge at the same FRACTION of
  // the container's own (now shrinking) width that the 1200px anchor
  // established — 1165/1200 = 0.9708 — so it scales down in step with
  // the real container instead of racing ahead of it.
  var gorillaRightEdgeX = function(containerRect, w) {
    if (w <= 1200) {
      return containerRect.left + 0.9708 * containerRect.width;
    }
    var cw = Math.min(w, 1800);
    var bleed = -36 + 0.625 * (cw - 1200);
    return containerRect.right + bleed;
  };

  // Belt-and-suspenders on top of the formula above: measures the REAL
  // rendered right edge of the text this gorilla sits next to, and never
  // lets the gorilla's left edge creep past it. This matters because the
  // formula above was solved from Figma's own vector geometry, which
  // isn't guaranteed to survive real browser text layout unchanged (line
  // wrapping, a font that renders wider than the mockup's, a future copy
  // edit that makes "PRODUCT DESIGNER" longer) — measuring what's
  // actually on screen catches all of those, not just the one Figma
  // geometry mismatch already found. Uses Range.getBoundingClientRect()
  // rather than each element's own box: several of these elements
  // (.company-item in particular) are deliberately stretched wider than
  // their text for an unrelated reason — a full-width underline — so the
  // element's own box overstates how far the actual glyphs reach.
  var GORILLA_TEXT_CLEARANCE = 24;
  var measureTextRight = function(el) {
    if (!el) { return 0; }
    var range = document.createRange();
    range.selectNodeContents(el);
    var rects = range.getClientRects();
    var maxRight = 0;
    for (var i = 0; i < rects.length; i++) {
      if (rects[i].right > maxRight) { maxRight = rects[i].right; }
    }
    return maxRight;
  };
  var textSafeRightEdge = function() {
    // On Portfolio, .portfolio-inner holds every case study stacked down
    // the page, not just the one near the gorilla at the top — measuring
    // all of them would let text hundreds of pixels below (in an
    // unrelated case study) push the gorilla off to the side for no
    // visible reason. Scope to just the first case study when one
    // exists; Home/About have no .case-study at all, so this falls back
    // to the whole container there, same as before.
    var scope = container.querySelector('.case-study') || container;
    var candidates = scope.querySelectorAll(
      '.role-title, .company-item, .bio-text, .case-title, .case-desc, .case-role-title, .case-role-sub, .case-tag'
    );
    var maxRight = 0;
    for (var i = 0; i < candidates.length; i++) {
      maxRight = Math.max(maxRight, measureTextRight(candidates[i]));
    }
    // .email-btn/.case-study-btn/.construction-btn are already sized to
    // their own content (width: fit-content), so their real box is
    // trustworthy as-is. .construction-btn added alongside .case-study-btn
    // (not instead of it) since the "Case Study" buttons were swapped for
    // .construction-btn ones, but leaving the old selector in place is
    // harmless and keeps this working again if that ever swaps back.
    var btn = scope.querySelector('.email-btn, .case-study-btn, .construction-btn');
    if (btn) { maxRight = Math.max(maxRight, btn.getBoundingClientRect().right); }
    return maxRight;
  };

  // The page margins (.inner/.about-inner/.portfolio-inner side padding)
  // were widened from 56px to 100px as part of applying the "Variant A /
  // Spacious Reading" layout (Figma's actual 100px value, ported directly
  // rather than scaled). That pushes every child's left edge — and so the
  // text textSafeRightEdge() measures — 44px further right than before,
  // which would otherwise carry straight through into the gorilla's clamp
  // and shift its resting spot. Per an explicit request to keep the
  // gorilla's size and position exactly as they were across all pages,
  // back that 44px out here rather than letting the new margin silently
  // relocate it.
  var MARGIN_WIDEN_COMPENSATION = 44;

  var positionGorillaX = function() {
    var containerRect = container.getBoundingClientRect();
    var rightEdgeX = gorillaRightEdgeX(containerRect, window.innerWidth);
    var gorillaWidth = gorilla.getBoundingClientRect().width || (rightEdgeX - containerRect.left);
    var minRightEdgeX = textSafeRightEdge() - MARGIN_WIDEN_COMPENSATION + GORILLA_TEXT_CLEARANCE + gorillaWidth;
    if (rightEdgeX < minRightEdgeX) {
      rightEdgeX = minRightEdgeX;
    }
    gorilla.style.right = (window.innerWidth - rightEdgeX) + 'px';

    // Base CSS's "right: 64px" is just a rough pre-JS fallback — far
    // enough from the real, container-anchored value above (especially
    // now the gap is hundreds of pixels) that painting at the fallback
    // first and jumping to the real value here read as a visible flicker
    // on load/navigation. Starting hidden and revealing only once this
    // has run at least once removes that: same pattern already used for
    // the year spine.
    gorilla.classList.add('gorilla-ready');
  };
  positionGorillaX();
  window.addEventListener('resize', positionGorillaX);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionGorillaX);
  }
})();

(function() {
  // The gorilla is a Lottie animation rather than a static image — same
  // 716x800 source dimensions as the old PNG(s), so it drops into the
  // exact same .gorilla-wrap box (sizing/position handled entirely by the
  // two IIFEs above; this only fills the box's content).
  //
  // Loaded via `animationData` (plain objects, supplied by the
  // src/*.data.js script tags as window globals) rather than lottie's
  // `path` option. `path` fetches the JSON with an XHR, which browsers
  // block outright for file:// pages — this site is opened straight from
  // disk as often as it's served over http, and the animation just
  // silently never appeared under file://. A plain <script src="..."> tag
  // isn't subject to that restriction, so baking the JSON into a .js file
  // that assigns it to a global sidesteps the fetch entirely.
  var target = document.querySelector('.gorilla-lottie');
  if (!target || !window.lottie) return;

  // About, Portfolio, and Gorilla each get their own multi-clip loop
  // instead of one continuous clip (per explicit requests scoped to each
  // page) — detected via which page-specific globals are present, same
  // page-detection pattern already used for the parallax rate and
  // .about-inner/.portfolio-inner checks elsewhere in this file. Home
  // falls through to the single GORILLA_ANIMATION_DATA clip as before.
  // loopStartIndex marks where the repeat cycle begins once the sequence
  // reaches its end; clips before it (index 0..loopStartIndex-1) play once
  // on initial load and are never revisited. Stays 0 (the whole sequence
  // repeats from the top) for every page except Portfolio, which opens on
  // talk-1 once and then loops only between talk-2 and talk-3.
  var loopStartIndex = 0;
  var sequence;
  if (window.GORILLA_WAVE1_DATA && window.GORILLA_WAVE2_DATA && window.GORILLA_SUBTLE_DATA) {
    // Always open on a wave (randomly which one), then the subtle-movement
    // clip, then the other wave — then repeat from the top. Picking the
    // start randomly rather than always the same wave keeps repeat visits
    // from feeling identical every time.
    var waves = [window.GORILLA_WAVE1_DATA, window.GORILLA_WAVE2_DATA];
    var startIdx = Math.random() < 0.5 ? 0 : 1;
    sequence = [waves[startIdx], window.GORILLA_SUBTLE_DATA, waves[1 - startIdx]];
  } else if (window.GORILLA_PORTFOLIO_TALK1_DATA && window.GORILLA_PORTFOLIO_TALK2_DATA && window.GORILLA_PORTFOLIO_TALK3_DATA) {
    // Portfolio opens on talk-1 once (per an explicit request), then loops
    // forever between talk-2 and talk-3 only — talk-1 is never replayed
    // after the initial pass.
    sequence = [window.GORILLA_PORTFOLIO_TALK1_DATA, window.GORILLA_PORTFOLIO_TALK2_DATA, window.GORILLA_PORTFOLIO_TALK3_DATA];
    loopStartIndex = 1;
  } else if (window.GORILLA_TALK_TALK_DATA && window.GORILLA_TALK_THINKING_DATA && window.GORILLA_SUBTLE_DATA) {
    // Gorilla page's three clips play in a fixed order (originally
    // talking, then thinking, then subtle-movement last; talking was later
    // swapped for gorilla-talk-talk per an explicit request, same
    // slot/order otherwise) per an explicit request for that specific
    // order, same fixed-order pattern as Portfolio above rather than
    // About's randomized-start pair. Reuses the same GORILLA_SUBTLE_DATA
    // global About's sequencer loads (same underlying clip file) rather
    // than a separate copy.
    sequence = [window.GORILLA_TALK_TALK_DATA, window.GORILLA_TALK_THINKING_DATA, window.GORILLA_SUBTLE_DATA];
  } else if (window.GORILLA_TALK_TALKING_DATA && window.GORILLA_TALK_THINKING_DATA) {
    // Gorilla page's two clips also play in a fixed order (talking, then
    // thinking) per an explicit request for that specific order, same
    // fixed-order pattern as Portfolio above rather than About's
    // randomized-start pair.
    sequence = [window.GORILLA_TALK_TALKING_DATA, window.GORILLA_TALK_THINKING_DATA];
  } else if (window.GORILLA_TALK_TALKING_DATA) {
    // Thinking clip removed from this page per an explicit request — just
    // the talking clip left, looping on its own like Home's single clip.
    sequence = [window.GORILLA_TALK_TALKING_DATA];
  } else if (window.GORILLA_ANIMATION_DATA) {
    sequence = [window.GORILLA_ANIMATION_DATA];
  } else {
    return;
  }

  var index = 0;
  var anim = null;
  var playNext = function() {
    // Everything before loopStartIndex plays exactly once, in order; once
    // index reaches it, playback wraps only within the loopStartIndex..end
    // slice forever. For loopStartIndex === 0 (every page but Portfolio)
    // this reduces to the original "wrap the whole array" behavior.
    var loopLength = sequence.length - loopStartIndex;
    var data = index < loopStartIndex
      ? sequence[index]
      : sequence[loopStartIndex + ((index - loopStartIndex) % loopLength)];
    index++;
    // Old instance is torn down and the new one built in the same
    // synchronous pass — both animationData objects are already in memory
    // (no network round-trip), so the swap happens within a single frame
    // and there's no blank/frozen gap between clips.
    if (anim) { anim.destroy(); }
    anim = window.lottie.loadAnimation({
      container: target,
      renderer: 'svg',
      loop: sequence.length === 1,
      autoplay: true,
      animationData: data
    });
    if (sequence.length > 1) {
      anim.addEventListener('complete', playNext);
    }
  };
  playNext();
})();
