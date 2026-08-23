(function() {
  // Each case study slides + fades into place once the scroll position
  // actually arrives at it, the same treatment Home/About use for their
  // two columns (see the slideLeft/slideRight rules in styles.css).
  // "pre-reveal" is baked directly into each section's markup in
  // portfolio.html (not added here in JS) so there's no gap between first
  // paint and this script running where the card would flash fully
  // visible before disappearing to wait for its reveal. A <noscript> rule
  // in the page's <head> covers the no-JS case; this script covers the
  // "JS runs but IntersectionObserver doesn't exist" case below.
  //
  // "Arrives at" is defined the same way the year spine below decides
  // which case study is current: the point 35% down from the top of the
  // viewport. rootMargin's bottom value pulls the observer's root up to
  // that same line (100% - 35% = 65% shrunk off the bottom), so a card
  // only starts intersecting once its top edge reaches it — not as soon
  // as it peeks up from the bottom of the screen.
  var studies = Array.prototype.slice.call(document.querySelectorAll('.case-study'));
  if (studies.length) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            entry.target.classList.remove('pre-reveal');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -65% 0px' });

      studies.forEach(function(el) { observer.observe(el); });
    } else {
      studies.forEach(function(el) { el.classList.remove('pre-reveal'); });
    }
  }
})();

(function() {
  // The tts-design-system graphic's 8 composed pieces (see .tts-node in
  // styles.css) get their own observer, separate from the one-time
  // .case-study reveal above — this one keeps watching and toggles
  // "tts-in-view" on/off every time the crossing happens (no unobserve),
  // so scrolling back up above the same 35%-down-the-viewport line
  // reverses the composition (pieces separate back out and fade to 0%
  // opacity) instead of staying composed once revealed.
  var comps = Array.prototype.slice.call(document.querySelectorAll('.tts-composition'));
  if (!comps.length) return;

  if ('IntersectionObserver' in window) {
    var ttsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        entry.target.classList.toggle('tts-in-view', entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '0px 0px -65% 0px' });

    comps.forEach(function(el) { ttsObserver.observe(el); });
  } else {
    comps.forEach(function(el) { el.classList.add('tts-in-view'); });
  }
})();

(function() {
  // Align the year spine's top with the top of "Gemini on Glasses"'s
  // title, and its left 160px out from where the page's body content
  // actually starts — both measured live (same reasoning as the gorilla
  // positioning above) so they land in the right spot regardless of which
  // fonts actually render or how wide the window is, rather than
  // approximating with a vw-based formula that can only match one window
  // size at a time.
  //
  // The spine starts hidden (opacity:0 in styles.css) instead of relying
  // on its CSS fallback position looking right. Fonts loading after this
  // script runs can reflow the title and shift where "top" should land —
  // positioning against a stale layout and then correcting once fonts
  // finish was exactly the glitch on initial load (the spine visibly
  // jumping to its real spot a beat after appearing). Now it only reveals
  // itself once, after fonts are ready and its position is final, so
  // there's nothing left to jump.
  var spine = document.querySelector('.year-spine');
  // :first-of-type, not :first-child — .gorilla-wrap now sits ahead of
  // every case study in the markup, so the first .case-study is no longer
  // .portfolio-inner's literal first child (same fix as .case-study's own
  // :first-of-type padding-top rule in styles.css).
  var titleEl = document.querySelector('.case-study:first-of-type .case-title');
  var inner = document.querySelector('.portfolio-inner');
  if (spine && titleEl) {
    // The container has 6px of padding on top and now also left/right
    // (see .year-spine in styles.css — the left/right pair was added so
    // the digits get the same clipping clearance horizontally as they
    // already had vertically) — back the container off by that much on
    // each axis so the visible text still lines up with the title's top
    // edge and the same horizontal offset as before the padding existed.
    var SPINE_TOP_BUFFER = 6;
    var SPINE_SIDE_BUFFER = 6;
    var SPINE_LEFT_OFFSET = 160;
    // The old floor here was a flat 16px from the viewport edge, with no
    // regard for where the content itself was — on a narrower (but still
    // desktop-width, pre-mobile-breakpoint) window, .portfolio-inner's own
    // left padding shrinks the gap between the viewport edge and the
    // content, and the spine got clamped to that same 16px floor with no
    // relationship to where the title text actually started. Below a
    // certain width the two could end up landing right on top of each
    // other. This keeps a real minimum clearance between the spine's own
    // right edge and the content's left edge instead, using the spine's
    // live rendered width, and hides the spine outright on any window too
    // narrow to fit both this clearance AND the 16px floor from the
    // viewport edge — the same call the mobile breakpoint already makes,
    // just extended to the narrow-desktop range .year-spine's own media
    // query doesn't cover.
    var SPINE_MIN_CONTENT_GAP = 24;
    // Manual nudge on top of the live-measured position above — purely a
    // stylistic offset from wherever the math above lands, not tied to any
    // measurement, so it stays a flat pixel shift regardless of viewport.
    var SPINE_NUDGE_Y = 4;
    var SPINE_NUDGE_X = -50;
    // Absolute floor: the spine's rendered left edge never goes closer than
    // this to the true viewport edge, full stop.
    var SPINE_EDGE_MIN = 16;
    var revealed = false;
    var positionSpine = function() {
      var rect = titleEl.getBoundingClientRect();
      spine.style.top = (rect.top + window.scrollY - SPINE_TOP_BUFFER + SPINE_NUDGE_Y) + 'px';

      if (inner) {
        var innerRect = inner.getBoundingClientRect();
        var paddingLeft = parseFloat(getComputedStyle(inner).paddingLeft) || 0;
        var contentLeft = innerRect.left + paddingLeft;
        var spineWidth = spine.getBoundingClientRect().width;

        // Four candidate positions, most spacious/stylistic first, each
        // giving up a little more breathing room than the last — per an
        // explicit request to keep the spine visible on any window
        // >=768px instead of hiding outright the moment the full 160px
        // stand-off plus the cosmetic nudge don't both fit. Each is
        // "contentLeft minus however much room that tier needs"; picking
        // the first one that still clears the true viewport-edge floor
        // means the spine only ever gives up exactly as much spacing as
        // the window actually forces it to:
        //   1. full stand-off + side buffer + the stylistic nudge (old
        //      behavior, used whenever there's plenty of room)
        //   2. same stand-off gap, but drop the cosmetic nudge
        //   3. shrink to the minimum content gap, nudge dropped too
        //   4. flush against the content with no gap at all (last resort)
        var candidates = [
          contentLeft - (SPINE_LEFT_OFFSET + SPINE_SIDE_BUFFER) + SPINE_NUDGE_X,
          contentLeft - (SPINE_MIN_CONTENT_GAP + spineWidth) + SPINE_NUDGE_X,
          contentLeft - (SPINE_MIN_CONTENT_GAP + spineWidth),
          contentLeft - spineWidth
        ];
        var left = null;
        for (var i = 0; i < candidates.length; i++) {
          // Never let a candidate overlap the content itself, even if its
          // own formula would otherwise place it that close.
          var candidate = Math.min(candidates[i], contentLeft - spineWidth);
          if (candidate >= SPINE_EDGE_MIN) {
            left = candidate;
            break;
          }
        }

        if (left === null) {
          // Not even a flush, zero-gap, un-nudged position clears the
          // viewport edge — there's genuinely no room for the spine at
          // all (in practice, only below the 768px breakpoint, where
          // .portfolio-inner's own padding collapses much further).
          if (revealed) spine.style.opacity = '0';
        } else {
          spine.style.left = left + 'px';
          if (revealed) spine.style.opacity = '1';
        }
      }
    };

    positionSpine();
    window.addEventListener('resize', positionSpine);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function() {
        revealed = true;
        positionSpine();
      });
    } else {
      revealed = true;
      positionSpine();
    }
  }
})();

(function() {
  // Case-title headers size via a responsive vw-based clamp, which is
  // tuned for short headers ("GLASSES", "SEARCH") — longer ones like
  // "VOICE SELECTION" and "DESIGN SYSTEM" can wrap to a second line at
  // some viewport widths. Rather than hardcode a smaller clamp (which,
  // per the gorilla/spine fixes above, would only be calibrated against
  // whichever font happens to render in whatever environment tested it),
  // measure each line2 live and shrink it just enough to stay on one
  // line, self-correcting to the actual rendered text/font/width.
  var line2s = Array.prototype.slice.call(document.querySelectorAll('.case-title .line2'));
  if (!line2s.length) return;

  function fitLine(el) {
    el.style.whiteSpace = 'nowrap';
    el.style.fontSize = '';
    var available = el.getBoundingClientRect().width;
    var natural = el.scrollWidth;
    if (natural > available + 0.5) {
      var current = parseFloat(getComputedStyle(el).fontSize);
      var next = Math.floor(current * (available / natural) * 0.98);
      el.style.fontSize = next + 'px';
    }
  }

  function fitAll() {
    line2s.forEach(fitLine);
  }

  fitAll();
  window.addEventListener('resize', fitAll);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitAll);
  }
})();

(function() {
  var sections = Array.prototype.slice.call(document.querySelectorAll('.case-study'));
  var spine = document.querySelector('.year-spine');
  var valueEl = document.getElementById('year-spine-value');
  if (!sections.length || !spine || !valueEl) return;

  var currentYear = null;
  var animating = false;
  var ticking = false;
  var lastScrollY = window.scrollY;
  var scrollingDown = true;

  function activeYear() {
    // Reference line a bit above the vertical center of the viewport —
    // whichever card's top has crossed that line is the "current" one.
    var refY = window.scrollY + window.innerHeight * 0.35;
    var active = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= refY) {
        active = sections[i];
      }
    }
    return active.dataset.year;
  }

  // Vertical carousel: the outgoing year slides out while the incoming
  // year slides in from the opposite side, through the spine's
  // overflow:hidden viewport. Direction follows scroll direction, not the
  // year value: scrolling down always brings the new year up from the
  // bottom (outgoing exits upward); scrolling up brings it down from the
  // top (outgoing exits downward).
  //
  // Both ends travel one full container-height PLUS this extra gap, in
  // the same direction — since they move together at the same rate, their
  // separation stays constant at exactly this gap for the whole
  // transition, instead of the two years touching as they cross. The
  // outgoing year fades out (1 -> 0) while the incoming year fades in
  // (0 -> 1), both alongside the slide.
  var SPINE_CAROUSEL_GAP = 16;

  function swap(newYear) {
    currentYear = newYear;
    animating = true;

    // "100%" here was meant to mean one full container height, but a CSS
    // percentage on translateY resolves against the moving element's OWN
    // border-box height — .year-spine-value's single line of text
    // (~21px) — not the spine container's height (~28px, padded taller
    // for the top/side glyph-clipping buffers). That mismatch meant every
    // transition fell several pixels short of clearing the container, so
    // the outgoing and incoming years overlapped instead of cleanly
    // swapping past each other — the "weird positioning glitch." Measuring
    // the container's real height live and using a pixel travel distance
    // (rather than a CSS percentage that resolves against the wrong box)
    // fixes it regardless of container height, font, or buffer sizing.
    var spineHeight = spine.getBoundingClientRect().height;
    var sign = scrollingDown ? 1 : -1;
    var dist = spineHeight + SPINE_CAROUSEL_GAP;
    var travel = (sign * dist) + 'px';
    var travelReverse = (-sign * dist) + 'px';

    // An absolutely positioned element's top/left of "0" lands at the
    // containing block's PADDING edge — but the outgoing element (still
    // normal in-flow, position:relative) renders from the CONTENT edge,
    // which sits padding-top/padding-left further in. Since .year-spine
    // has 6px of padding on top and on the sides (see styles.css), "0,0"
    // was landing the incoming clone 6px up and 6px left of where the
    // outgoing element actually sits — invisible before that padding
    // existed, but a real, visible offset ever since, throughout the
    // entire slide, that only snapped into correct alignment at the very
    // end. Matching the clone's start position to the container's real
    // padding (read live, so this stays correct if the padding ever
    // changes) removes that offset instead of just hiding when it snaps.
    var spinePad = getComputedStyle(spine);
    var padTop = parseFloat(spinePad.paddingTop) || 0;
    var padLeft = parseFloat(spinePad.paddingLeft) || 0;

    var outgoing = valueEl;
    var incoming = outgoing.cloneNode(true);
    incoming.id = '';
    incoming.textContent = newYear;
    incoming.style.position = 'absolute';
    incoming.style.top = padTop + 'px';
    incoming.style.left = padLeft + 'px';
    incoming.style.transition = 'none';
    incoming.style.transform = 'translateY(' + travel + ')';
    incoming.style.opacity = '0';
    spine.appendChild(incoming);

    // Force layout so the starting transform/opacity above are committed
    // before we transition to the end state below.
    incoming.getBoundingClientRect();

    // A single requestAnimationFrame isn't reliable here across browsers —
    // Safari in particular can coalesce the "from" state (set above) and
    // the "to" state (set below) into the same paint, so the opacity
    // transition never actually gets a frame to start from and just snaps
    // straight to 1 with no visible fade. Nesting two rAFs guarantees a
    // full frame renders with the starting opacity/transform before the
    // transition to the end state begins.
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        var easing = 'transform 0.45s cubic-bezier(0.65,0,0.35,1), opacity 0.45s ease';
        outgoing.style.transition = easing;
        incoming.style.transition = easing;
        outgoing.style.transform = 'translateY(' + travelReverse + ')';
        outgoing.style.opacity = '0';
        incoming.style.transform = 'translateY(0)';
        incoming.style.opacity = '1';
      });
    });

    window.setTimeout(function() {
      // Previously this reused the SAME node for every year: reset its
      // text, then force-snap its transform/transition straight back to
      // resting with "transition: none" the instant this timeout fired.
      // That meant hard-resetting a node's transform right as the browser
      // was tearing down the GPU-composited layer it had just been
      // animating on — a screen recording caught a single-frame corrupted
      // paint (the digits rendered rotated 180°) at exactly that instant,
      // reproducible at the same real timestamp from two independent
      // extractions of the recording, so it wasn't just a video artifact.
      // Removing the node that just finished exiting and keeping the node
      // that just finished ENTERING (whose transition arrived at rest
      // naturally, never force-reset) avoids ever touching a freshly-
      // animated layer's transform synchronously like that.
      spine.removeChild(outgoing);
      incoming.id = 'year-spine-value';
      incoming.style.transition = '';
      incoming.style.transform = '';
      incoming.style.opacity = '';
      incoming.style.position = '';
      incoming.style.top = '';
      incoming.style.left = '';
      valueEl = incoming;
      animating = false;

      // If the user kept scrolling through more years while this
      // transition was still running, catch up to wherever they are now.
      var latest = activeYear();
      if (latest !== currentYear) {
        swap(latest);
      }
    }, 460);
  }

  function update() {
    ticking = false;
    var y = window.scrollY;
    if (y !== lastScrollY) {
      scrollingDown = y > lastScrollY;
      lastScrollY = y;
    }
    if (animating) return;
    var year = activeYear();
    if (year === currentYear) return;
    swap(year);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  // Set the initial year immediately (no animation) so it's correct on
  // load, including when the page loads already scrolled (e.g. back
  // navigation).
  currentYear = activeYear();
  valueEl.textContent = currentYear;

  window.addEventListener('scroll', onScroll, { passive: true });
})();

(function() {
  // "Scroll down" cue: nudges the user to the next case study, then gets
  // out of the way for good. Shown at most once per browser session —
  // once dismissed (by scrolling past the first case study, or by
  // clicking it), it stays gone even if the user leaves Portfolio and
  // comes back later in the same session.
  var STORAGE_KEY = 'scrollArrowDismissed';
  if (sessionStorage.getItem(STORAGE_KEY)) return;

  var arrow = document.getElementById('scroll-arrow');
  var spine = document.querySelector('.year-spine');
  var sections = Array.prototype.slice.call(document.querySelectorAll('.case-study'));
  if (!arrow || !spine || sections.length < 2) return;

  // Horizontal position tracks the year spine's own live center — same
  // live-measurement approach as the spine/gorilla positioning above, so
  // this stays centered on the spine regardless of viewport width or
  // which fonts actually render, instead of a fixed pixel guess.
  var positionArrow = function() {
    var spineRect = spine.getBoundingClientRect();
    var arrowWidth = arrow.getBoundingClientRect().width;
    var center = spineRect.left + spineRect.width / 2;
    arrow.style.left = (center - arrowWidth / 2) + 'px';

    // The spine hides itself (opacity:0, see positionSpine above) on
    // narrow-desktop windows too tight to fit it without overlapping the
    // content. With nothing left to visually center on, hide the arrow
    // too rather than leaving it floating with no reference point.
    // Reads spine.style.opacity (the inline value positionSpine actually
    // sets) rather than getComputedStyle: .year-spine has a CSS
    // opacity *transition*, so immediately after positionSpine sets it,
    // getComputedStyle can still report the pre-transition value for a
    // tick (the animation hasn't advanced yet) — reading the inline
    // style is the authoritative, un-lagged source of what it's actually
    // set to.
    var spineHidden = spine.style.opacity === '0';
    arrow.style.visibility = spineHidden ? 'hidden' : '';
  };
  positionArrow();
  window.addEventListener('resize', positionArrow);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(positionArrow);
  }

  var dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    sessionStorage.setItem(STORAGE_KEY, '1');
    arrow.classList.remove('scroll-arrow-in', 'scroll-arrow-visible');
    arrow.classList.add('scroll-arrow-out');
  }

  arrow.addEventListener('click', function(e) {
    e.preventDefault();
    dismiss();
    sections[1].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Fades away as soon as the second case study becomes "current" — same
  // reference line (35% down the viewport) the spine/case-study reveals
  // above use to decide what counts as "arrived at."
  var arrowTicking = false;
  function checkScroll() {
    arrowTicking = false;
    var refY = window.scrollY + window.innerHeight * 0.35;
    if (sections[1].offsetTop <= refY) {
      dismiss();
      window.removeEventListener('scroll', onArrowScroll);
    }
  }
  function onArrowScroll() {
    if (arrowTicking) return;
    arrowTicking = true;
    window.requestAnimationFrame(checkScroll);
  }

  // If the page loads already scrolled past the first case study (e.g.
  // back navigation, or a deep link), there's nothing to cue toward —
  // skip the entrance entirely instead of animating in an arrow that's
  // already irrelevant.
  var refYNow = window.scrollY + window.innerHeight * 0.35;
  if (sections[1].offsetTop <= refYNow) {
    sessionStorage.setItem(STORAGE_KEY, '1');
    return;
  }

  window.addEventListener('scroll', onArrowScroll, { passive: true });

  // Timed to the first case study's own reveal (see the "in-view"
  // IntersectionObserver at the top of this file) rather than a flat
  // delay guessed at page-load time — a fixed timeout has no relationship
  // to when the card actually finishes sliding/fading in, so it either
  // shows up too early (overlapping that entrance) or, tuned to be safe,
  // too late. ANIMATION_SETTLE roughly matches the case study's own
  // 0.9s slideLeft duration plus an extra 1s pause after that, so the
  // arrow appears a beat after that card has actually settled, not
  // immediately alongside it.
  var ANIMATION_SETTLE = 1200;
  function startEntrance() {
    if (dismissed) return;
    arrow.classList.add('scroll-arrow-in');
    arrow.addEventListener('animationend', function handler() {
      arrow.removeEventListener('animationend', handler);
      if (dismissed) return;
      arrow.classList.remove('scroll-arrow-in');
      arrow.classList.add('scroll-arrow-visible');
    });
  }

  var firstCase = sections[0];
  if (firstCase.classList.contains('in-view')) {
    // Already revealed by the time this script ran (e.g. no
    // IntersectionObserver support, so the reveal above was synchronous).
    window.setTimeout(startEntrance, ANIMATION_SETTLE);
  } else {
    var revealObserver = new MutationObserver(function() {
      if (firstCase.classList.contains('in-view')) {
        revealObserver.disconnect();
        window.setTimeout(startEntrance, ANIMATION_SETTLE);
      }
    });
    revealObserver.observe(firstCase, { attributes: true, attributeFilter: ['class'] });
  }
})();

(function() {
  // "Case Study" buttons open their Figma deck in an on-page overlay
  // instead of a new tab, per an explicit request. Each button keeps its
  // real href (and target="_blank"/rel="noopener") as a no-JS fallback —
  // only intercepted here if the overlay markup actually exists and JS is
  // running at all.
  var overlay = document.getElementById('case-study-overlay');
  var iframe = document.getElementById('case-study-overlay-iframe');
  var closeBtn = document.getElementById('case-study-overlay-close');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.case-study-btn'));
  if (!overlay || !iframe || !closeBtn || !buttons.length) return;

  // Figma's public embed endpoint wraps any regular figma.com file/deck
  // URL — the exact same links these buttons already point to — into an
  // iframe-embeddable page. No API key or auth needed since these are
  // "Anyone with the link can view" shares.
  var EMBED_BASE = 'https://www.figma.com/embed?embed_host=share&url=';

  var lastFocused = null;
  var isOpen = false;

  function onKeydown(e) {
    if (e.key === 'Escape' || e.keyCode === 27) close();
  }

  function open(url, trigger) {
    if (!url) return;
    lastFocused = trigger || document.activeElement;
    iframe.src = EMBED_BASE + encodeURIComponent(url);
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    // Locks background scroll while the overlay is open — restored to
    // whatever it was (rather than a hardcoded '') on close, in case some
    // other script has its own opinion about body overflow.
    document.body.style.overflow = 'hidden';
    isOpen = true;
    document.addEventListener('keydown', onKeydown);
    closeBtn.focus();
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    // Blanks the iframe rather than leaving the last deck loaded — stops
    // any audio/video in the embedded presentation and frees the memory
    // instead of letting it sit hidden in the background.
    iframe.src = 'about:blank';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  }

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      open(btn.getAttribute('href'), btn);
    });
  });

  closeBtn.addEventListener('click', close);

  Array.prototype.slice.call(overlay.querySelectorAll('[data-overlay-close]')).forEach(function(el) {
    el.addEventListener('click', close);
  });
})();

(function() {
  // "Case Study" buttons were swapped for this disabled .construction-btn
  // placeholder (see styles.css/portfolio.html) while their decks aren't
  // ready — per an explicit request, clicking/tapping one still gives a
  // subtle "shake" as feedback rather than doing nothing at all.
  // Re-adds the class on every click rather than assuming it's already
  // off: .animationend already removes it once the shake finishes, but a
  // very fast repeat click (before that fires) would otherwise try to add
  // a class that's already present, which doesn't restart a CSS animation.
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.construction-btn'));
  if (!buttons.length) return;

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      btn.classList.remove('is-shaking');
      // Forces a reflow so the class removal above actually takes effect
      // before it's re-added — otherwise the browser can coalesce the
      // remove+add into a single style update and the animation never
      // restarts.
      void btn.offsetWidth;
      btn.classList.add('is-shaking');
    });
    btn.addEventListener('animationend', function() {
      btn.classList.remove('is-shaking');
    });
  });
})();
