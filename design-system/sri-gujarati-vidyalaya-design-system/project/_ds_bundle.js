/* @ds-bundle: {"format":3,"namespace":"SriGujaratiVidyalayaDesignSystem_89aa2a","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"1e0dd559994c","components/core/Badge.jsx":"d8a5c0551900","components/core/Button.jsx":"37552fabd534","components/core/Card.jsx":"ade176d30744","components/core/SectionHeading.jsx":"e8a57df36156","components/core/Stat.jsx":"0bf017289fc0","components/feedback/Accordion.jsx":"6b475602d96f","components/forms/Checkbox.jsx":"87bccec21d5f","components/forms/Input.jsx":"64dd89c1b029","components/forms/Select.jsx":"90e47e82a9ae","ui_kits/website/AcademicsPage.jsx":"df56a2e9ee40","ui_kits/website/AdmissionsPage.jsx":"d5ef5726878a","ui_kits/website/ContactPage.jsx":"9129a96bc78f","ui_kits/website/GalleryPage.jsx":"77ced80c7843","ui_kits/website/HeritagePage.jsx":"5cad5db6e06a","ui_kits/website/HomePage.jsx":"f196733d2a2f","ui_kits/website/HomeParts1.jsx":"68533a9cf56c","ui_kits/website/HomeParts2.jsx":"b5d64c32de66","ui_kits/website/shared.jsx":"02c63fdebbaa"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SriGujaratiVidyalayaDesignSystem_89aa2a = window.SriGujaratiVidyalayaDesignSystem_89aa2a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 36,
  md: 48,
  lg: 64,
  xl: 88
};

/**
 * Avatar — circular portrait for faculty, principal, testimonials and alumni.
 * Falls back to initials on a maroon tint when no image is given.
 */
function Avatar({
  src,
  alt = "",
  name = "",
  size = "md",
  ring = false,
  style,
  ...rest
}) {
  const px = typeof size === "number" ? size : SIZES[size] || SIZES.md;
  const initials = name.split(" ").map(w => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      width: px,
      height: px,
      borderRadius: "50%",
      overflow: "hidden",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--maroon-100)",
      color: "var(--maroon-700)",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: px * 0.38,
      flex: "none",
      boxShadow: ring ? "0 0 0 2px var(--surface-card), 0 0 0 4px var(--gold-400)" : "var(--shadow-inset-hairline)",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt || name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  brand: {
    background: "var(--maroon-100)",
    color: "var(--maroon-800)"
  },
  gold: {
    background: "var(--gold-100)",
    color: "var(--gold-800)"
  },
  neutral: {
    background: "var(--cream-200)",
    color: "var(--ink-700)"
  },
  success: {
    background: "var(--green-100)",
    color: "var(--green-600)"
  },
  info: {
    background: "var(--blue-100)",
    color: "var(--blue-600)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-brand)",
    border: "1px solid var(--border-strong)"
  }
};

/**
 * Badge — small status / category label (e.g. "Est. 1869", "Admissions Open", "CBSE").
 */
function Badge({
  children,
  tone = "brand",
  dot = false,
  style,
  ...rest
}) {
  const t = TONES[tone] || TONES.brand;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.4rem",
      fontFamily: "var(--font-sans)",
      fontSize: "0.75rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
      padding: "0.3rem 0.65rem",
      borderRadius: "var(--radius-pill)",
      lineHeight: 1.1,
      whiteSpace: "nowrap",
      ...t,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    fontSize: "0.8125rem",
    padding: "0.5rem 0.9rem",
    height: 38,
    gap: "0.4rem"
  },
  md: {
    fontSize: "0.9375rem",
    padding: "0.7rem 1.25rem",
    height: 46,
    gap: "0.5rem"
  },
  lg: {
    fontSize: "1.0625rem",
    padding: "0.9rem 1.6rem",
    height: 56,
    gap: "0.6rem"
  }
};
const VARIANTS = {
  primary: {
    background: "var(--brand)",
    color: "var(--text-on-brand)",
    border: "1px solid var(--brand)",
    boxShadow: "var(--shadow-sm)",
    hoverBg: "var(--brand-hover)",
    hoverShadow: "var(--shadow-brand)"
  },
  accent: {
    background: "var(--gold-500)",
    color: "var(--ink-900)",
    border: "1px solid var(--gold-500)",
    boxShadow: "var(--shadow-sm)",
    hoverBg: "var(--gold-400)",
    hoverShadow: "var(--shadow-md)"
  },
  secondary: {
    background: "transparent",
    color: "var(--text-brand)",
    border: "1px solid var(--border-strong)",
    hoverBg: "var(--maroon-50)",
    hoverBorder: "var(--maroon-300)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-brand)",
    border: "1px solid transparent",
    hoverBg: "var(--maroon-50)"
  },
  inverse: {
    background: "var(--cream-50)",
    color: "var(--maroon-900)",
    border: "1px solid var(--cream-50)",
    boxShadow: "var(--shadow-md)",
    hoverBg: "var(--white)",
    hoverShadow: "var(--shadow-lg)"
  }
};

/**
 * Button — primary call-to-action across the site (Apply Now, Enquire, Book a Visit).
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  as = "button",
  href,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const Tag = as === "a" || href ? "a" : "button";
  const {
    hoverBg,
    hoverShadow,
    hoverBorder,
    ...vStyle
  } = v;
  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: s.fontSize,
    lineHeight: 1,
    letterSpacing: "0.01em",
    padding: s.padding,
    minHeight: s.height,
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    whiteSpace: "nowrap",
    opacity: disabled ? 0.5 : 1,
    transition: "transform var(--dur-fast) var(--ease-out), background var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out)",
    ...vStyle,
    ...style
  };
  const enter = e => {
    if (disabled) return;
    const el = e.currentTarget;
    el.style.transform = "translateY(-2px)";
    if (hoverBg) el.style.background = hoverBg;
    if (hoverShadow) el.style.boxShadow = hoverShadow;
    if (hoverBorder) el.style.borderColor = hoverBorder;
  };
  const reset = e => {
    const el = e.currentTarget;
    el.style.transform = "translateY(0)";
    el.style.background = vStyle.background;
    if (vStyle.boxShadow) el.style.boxShadow = vStyle.boxShadow;
    el.style.borderColor = "";
    el.style.border = base.border;
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: Tag === "button" ? disabled : undefined,
    style: base,
    onMouseEnter: enter,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = "translateY(1px)";
    },
    onMouseUp: enter,
    onMouseLeave: reset
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — flexible content surface used for facilities, programmes, news, faculty, etc.
 * Pass `image` (url) for a media card; `interactive` adds hover lift.
 */
function Card({
  children,
  image,
  imageAlt = "",
  imageHeight = 200,
  eyebrow,
  title,
  meta,
  footer,
  variant = "elevated",
  interactive = false,
  padding = "1.5rem",
  style,
  ...rest
}) {
  const variants = {
    elevated: {
      background: "var(--surface-card)",
      boxShadow: "var(--shadow-md)",
      border: "1px solid transparent"
    },
    outline: {
      background: "var(--surface-card)",
      boxShadow: "none",
      border: "1px solid var(--border-subtle)"
    },
    soft: {
      background: "var(--surface-raised)",
      boxShadow: "none",
      border: "1px solid var(--border-subtle)"
    }
  };
  const v = variants[variant] || variants.elevated;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: "var(--radius-lg)",
      transform: hover ? "translateY(-4px)" : "translateY(0)",
      boxShadow: hover ? "var(--shadow-lg)" : v.boxShadow,
      transition: "transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)",
      ...v,
      ...style
    }
  }, rest), image && /*#__PURE__*/React.createElement("div", {
    style: {
      height: imageHeight,
      overflow: "hidden",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: hover ? "scale(1.05)" : "scale(1)",
      transition: "transform var(--dur-slow) var(--ease-out)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding,
      display: "flex",
      flexDirection: "column",
      gap: "0.6rem",
      flex: 1
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--text-xl)",
      fontWeight: 600
    }
  }, title), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.8125rem",
      color: "var(--text-muted)",
      fontFamily: "var(--font-sans)"
    }
  }, meta), children && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "0.9375rem",
      color: "var(--text-secondary)",
      lineHeight: 1.6,
      fontFamily: "var(--font-sans)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "0.75rem"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionHeading — eyebrow + display title + optional lead, used to open every section.
 */
function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "default",
  maxWidth = "52ch",
  style,
  ...rest
}) {
  const onDark = tone === "inverse";
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.85rem",
      alignItems: align === "center" ? "center" : "flex-start",
      textAlign: align,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: onDark ? {
      color: "var(--gold-400)"
    } : undefined
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 1.5,
      background: "currentColor",
      display: "inline-block"
    }
  }), eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--text-section)",
      fontWeight: 500,
      lineHeight: 1.08,
      letterSpacing: "-0.02em",
      maxWidth,
      color: onDark ? "var(--cream-50)" : "var(--text-primary)"
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--text-lead)",
      lineHeight: 1.55,
      maxWidth,
      fontFamily: "var(--font-sans)",
      color: onDark ? "var(--cream-100)" : "var(--text-secondary)"
    }
  }, lead));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stat — a single "at a glance" figure (Years of Excellence, Students, Board Results %).
 * Animated count-up when `animate` and scrolled into view.
 */
function Stat({
  value,
  suffix = "",
  prefix = "",
  label,
  align = "center",
  tone = "default",
  animate = true,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  // Initialise to the FINAL value so the credibility-critical number is always
  // correct even if no scroll/IntersectionObserver event ever fires. The
  // count-up from 0 is purely an enhancement that plays when triggered.
  const [display, setDisplay] = React.useState(value);
  React.useEffect(() => {
    if (!animate) return;
    const node = ref.current;
    if (!node) return;
    let raf,
      done = false;
    const run = () => {
      if (done) return;
      done = true;
      setDisplay(0);
      const start = performance.now();
      const dur = 1400;
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(tick);else setDisplay(value);
      };
      raf = requestAnimationFrame(tick);
    };
    const inView = () => {
      const r = node.getBoundingClientRect();
      return r.height > 0 && r.top < (window.innerHeight || 0) - 40 && r.bottom > 0;
    };
    const onScroll = () => {
      if (inView()) {
        run();
        cleanup();
      }
    };
    function cleanup() {
      window.removeEventListener("scroll", onScroll, true);
      io.disconnect();
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          run();
          cleanup();
        }
      });
    }, {
      threshold: 0.35
    });
    io.observe(node);
    window.addEventListener("scroll", onScroll, true);
    if (inView()) {
      run();
      cleanup();
    }
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, animate]);
  const onDark = tone === "inverse";
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      fontSize: "clamp(2.25rem, 1.4rem + 2.6vw, 3.25rem)",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: onDark ? "var(--gold-300)" : "var(--text-brand)",
      display: "flex",
      alignItems: "baseline",
      justifyContent: align === "center" ? "center" : "flex-start",
      gap: "0.05em"
    }
  }, prefix, display.toLocaleString("en-IN"), suffix), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "0.5rem",
      fontFamily: "var(--font-sans)",
      fontSize: "0.9375rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      color: onDark ? "var(--cream-100)" : "var(--text-secondary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Accordion — collapsible items for fees, FAQs, affiliation details and long content.
 */
function Accordion({
  items = [],
  defaultOpen = 0,
  allowMultiple = false,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(() => new Set(defaultOpen === null ? [] : [defaultOpen]));
  const toggle = i => setOpen(prev => {
    const next = new Set(allowMultiple ? prev : []);
    if (prev.has(i)) next.delete(i);else next.add(i);
    return next;
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      ...style
    }
  }, rest), items.map((it, i) => {
    const isOpen = open.has(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: isOpen ? "var(--shadow-sm)" : "none",
        transition: "box-shadow var(--dur-fast)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1.1rem 1.25rem",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-lg)",
        fontWeight: 500,
        color: "var(--text-primary)"
      }
    }, it.q || it.title, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true,
      style: {
        flex: "none",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: isOpen ? "var(--brand)" : "var(--cream-200)",
        color: isOpen ? "var(--cream-50)" : "var(--maroon-700)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        lineHeight: 1,
        transition: "all var(--dur-fast) var(--ease-out)",
        transform: isOpen ? "rotate(45deg)" : "rotate(0)"
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows var(--dur) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 1.25rem 1.25rem",
        fontFamily: "var(--font-sans)",
        fontSize: "0.9375rem",
        lineHeight: 1.65,
        color: "var(--text-secondary)"
      }
    }, it.a || it.content))));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — consent and multi-select option (e.g. "I agree to be contacted").
 */
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  id,
  style,
  ...rest
}) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: "flex",
      gap: "0.7rem",
      alignItems: "flex-start",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: "checkbox",
    checked: on,
    onChange: e => {
      if (!isControlled) setInternal(e.target.checked);
      onChange && onChange(e);
    },
    style: {
      position: "absolute",
      opacity: 0,
      width: 1,
      height: 1
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      flex: "none",
      width: 22,
      height: 22,
      borderRadius: "var(--radius-xs)",
      border: `1.5px solid ${on ? "var(--brand)" : "var(--border-strong)"}`,
      background: on ? "var(--brand)" : "var(--surface-card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all var(--dur-fast) var(--ease-out)",
      marginTop: 1
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--cream-50)",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "0.9375rem",
      color: "var(--text-primary)",
      fontWeight: 500
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "0.8125rem",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — labelled text field for admissions enquiry, contact and search forms.
 */
function Input({
  label,
  hint,
  error,
  id,
  required = false,
  icon,
  type = "text",
  style,
  containerStyle,
  ...rest
}) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--red-600)" : focus ? "var(--brand)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem",
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.8125rem",
      fontWeight: 600,
      color: "var(--text-primary)",
      letterSpacing: "0.01em"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--red-600)"
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      background: "var(--surface-card)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      padding: "0 0.9rem",
      boxShadow: focus ? "0 0 0 3px rgba(122,52,20,0.12)" : "none",
      transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      display: "flex"
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "0.9375rem",
      color: "var(--text-primary)",
      padding: "0.75rem 0",
      minWidth: 0,
      ...style
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.75rem",
      color: error ? "var(--red-600)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Select — labelled dropdown for grade, stream and enquiry-type fields.
 */
function Select({
  label,
  hint,
  error,
  id,
  required = false,
  options = [],
  placeholder,
  style,
  containerStyle,
  ...rest
}) {
  const autoId = React.useId();
  const fieldId = id || autoId;
  const [focus, setFocus] = React.useState(false);
  const borderColor = error ? "var(--red-600)" : focus ? "var(--brand)" : "var(--border-strong)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "0.4rem",
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.8125rem",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--red-600)"
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "var(--surface-card)",
      border: `1px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "0 0 0 3px rgba(122,52,20,0.12)" : "none",
      transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    required: required,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    defaultValue: "",
    style: {
      width: "100%",
      appearance: "none",
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: "0.9375rem",
      color: "var(--text-primary)",
      padding: "0.8rem 2.4rem 0.8rem 0.9rem",
      cursor: "pointer",
      ...style
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const val = typeof o === "string" ? o : o.value;
    const lab = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lab);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: "0.9rem",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)",
      fontSize: "0.7rem"
    }
  }, "\u25BC")), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.75rem",
      color: error ? "var(--red-600)" : "var(--text-muted)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AcademicsPage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   Academics page — stages, streams, faculty directory preview,
   achievement dashboard.
   ============================================================ */
(function () {
  const {
    useState
  } = React;
  const {
    Img,
    Icon,
    Reveal,
    Kicker,
    PageHero,
    IMG
  } = window;
  const {
    Button,
    Badge,
    Stat,
    Avatar
  } = window.SriGujaratiVidyalayaDesignSystem_89aa2a;
  function Streams() {
    const streams = [{
      icon: "atom",
      t: "Higher Secondary — Science",
      d: "Physics, Chemistry, Biology & Mathematics for aspiring doctors, engineers and researchers.",
      tags: ["Physics", "Chemistry", "Biology", "Maths"]
    }, {
      icon: "chart-line-up",
      t: "Higher Secondary — Commerce",
      d: "Accountancy, Business Studies & Economics for future leaders in business and finance.",
      tags: ["Accountancy", "Business", "Economics"]
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement(Kicker, null, "Higher Secondary streams"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        marginTop: "0.8rem",
        maxWidth: "18ch"
      }
    }, "Choose the path that fits the future")), /*#__PURE__*/React.createElement("div", {
      className: "cards-2",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "var(--space-6)"
      }
    }, streams.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: s.t,
      delay: i * 100,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        borderRadius: "var(--radius-xl)",
        padding: "2.2rem",
        height: "100%",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: "var(--radius-md)",
        background: "var(--maroon-700)",
        color: "var(--cream-50)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.3rem"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 30
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.5rem",
        fontWeight: 500,
        marginBottom: "0.7rem"
      }
    }, s.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "1rem",
        lineHeight: 1.7,
        color: "var(--text-secondary)",
        marginBottom: "1.4rem"
      }
    }, s.d), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "0.5rem",
        flexWrap: "wrap"
      }
    }, s.tags.map(t => /*#__PURE__*/React.createElement(Badge, {
      key: t,
      tone: "neutral"
    }, t)))))))));
  }
  function Achievements() {
    const stats = [{
      value: 98,
      suffix: "%",
      label: "Higher Secondary Pass"
    }, {
      value: 45,
      suffix: "+",
      label: "A+ Scorers / Year"
    }, {
      value: 30,
      suffix: "+",
      label: "Clubs & Activities"
    }, {
      value: 15,
      suffix: "+",
      label: "Sports Disciplines"
    }];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--maroon-900)",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/crest-cream.png",
      alt: "",
      style: {
        position: "absolute",
        left: "-50px",
        top: "50%",
        transform: "translateY(-50%)",
        height: "150%",
        opacity: 0.05
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "container container--wide",
      style: {
        paddingBlock: "var(--space-16)",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        textAlign: "center",
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement(Kicker, {
      tone: "inverse"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        margin: "0 auto"
      }
    }, "Achievement dashboard")), /*#__PURE__*/React.createElement("h2", {
      style: {
        color: "var(--cream-50)",
        fontWeight: 500,
        fontSize: "var(--text-section)",
        marginTop: "0.8rem"
      }
    }, "Results that speak quietly")), /*#__PURE__*/React.createElement("div", {
      className: "glance-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--space-8)"
      }
    }, stats.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: s.label,
      delay: i * 90
    }, /*#__PURE__*/React.createElement(Stat, _extends({}, s, {
      tone: "inverse"
    })))))));
  }
  function Faculty() {
    const people = [{
      n: "Vimala Jayaraj",
      r: "Principal",
      img: IMG.principal
    }, {
      n: "Suresh Kumar",
      r: "Vice Principal"
    }, {
      n: "Lakshmi Menon",
      r: "HoD — Science"
    }, {
      n: "Anil Raghavan",
      r: "HoD — Commerce"
    }, {
      n: "Fathima Beevi",
      r: "Senior Faculty, English"
    }, {
      n: "Deepa Nair",
      r: "Primary Coordinator"
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "Faculty directory"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        marginTop: "0.8rem"
      }
    }, "Teachers who know every child"))), /*#__PURE__*/React.createElement("div", {
      className: "cards-6",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "var(--space-6)"
      }
    }, people.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: p.n,
      delay: i % 3 * 80
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "1.1rem 1.3rem",
        boxShadow: "var(--shadow-sm)"
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: p.n,
      src: p.img,
      size: "lg"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "1.1rem"
      }
    }, p.n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.85rem",
        color: "var(--text-muted)"
      }
    }, p.r))))))));
  }
  function AcademicsPage({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
      onNavigate: onNavigate,
      crumb: "Academics",
      eyebrow: "Academics",
      title: "Rigour, balance and joy in learning",
      lead: "From play-based early years to Higher Secondary streams, our academics develop confident, curious and grounded young people.",
      image: IMG.program
    }), /*#__PURE__*/React.createElement(Streams, null), /*#__PURE__*/React.createElement(Achievements, null), /*#__PURE__*/React.createElement(Faculty, null));
  }
  window.AcademicsPage = AcademicsPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AcademicsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/AdmissionsPage.jsx
try { (() => {
/* ============================================================
   Admissions page — digital journey, enquiry form, fees.
   ============================================================ */
(function () {
  const {
    useState
  } = React;
  const {
    Img,
    Icon,
    Reveal,
    Kicker,
    PageHero,
    IMG
  } = window;
  const DS = window.SriGujaratiVidyalayaDesignSystem_89aa2a;
  const {
    Button,
    Badge,
    Input,
    Select,
    Checkbox,
    Accordion
  } = DS;
  function Journey() {
    const steps = [{
      n: "01",
      icon: "paper-plane-tilt",
      t: "Submit an Enquiry",
      d: "Tell us about your child in a two-minute form."
    }, {
      n: "02",
      icon: "chats-circle",
      t: "Personal Interaction",
      d: "A warm conversation with our admissions team and a child-friendly interaction."
    }, {
      n: "03",
      icon: "files",
      t: "Registration",
      d: "Complete the registration with the required documents."
    }, {
      n: "04",
      icon: "confetti",
      t: "Welcome to Gujarati",
      d: "Receive your offer and join the family — orientation follows."
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        textAlign: "center",
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement(Kicker, null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        margin: "0 auto"
      }
    }, "The admissions journey")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        marginTop: "0.8rem"
      }
    }, "Four simple, guided steps")), /*#__PURE__*/React.createElement("div", {
      className: "cards-4",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--space-6)"
      }
    }, steps.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: s.n,
      delay: i * 90,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "1.7rem 1.5rem",
        height: "100%",
        boxShadow: "var(--shadow-sm)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 16,
        right: 18,
        fontFamily: "var(--font-display)",
        fontSize: "2.4rem",
        color: "var(--cream-200)",
        fontWeight: 600,
        lineHeight: 1
      }
    }, s.n), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 50,
        height: 50,
        borderRadius: "var(--radius-md)",
        background: "var(--maroon-700)",
        color: "var(--cream-50)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.1rem"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 26
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.2rem",
        fontWeight: 600,
        marginBottom: "0.5rem"
      }
    }, s.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.9rem",
        lineHeight: 1.6,
        color: "var(--text-secondary)"
      }
    }, s.d)))))));
  }
  function EnquiryForm() {
    const [sent, setSent] = useState(false);
    return /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        background: "var(--surface-raised)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide enq-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: "var(--space-16)",
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Kicker, null, "Admission enquiry"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        margin: "0.8rem 0 1.2rem",
        maxWidth: "16ch"
      }
    }, "Let's start the conversation"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "1.02rem",
        lineHeight: 1.7,
        color: "var(--text-secondary)",
        marginBottom: "1.8rem"
      }
    }, "Share a few details and our admissions team will reach out within one working day with next steps and a prospectus."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }
    }, [{
      i: "phone",
      t: "Call us",
      d: "0495 236 5215"
    }, {
      i: "envelope-simple",
      t: "Email",
      d: "admissions@srigujaratividyalaya.com"
    }, {
      i: "map-pin",
      t: "Visit",
      d: "Beach Rd, Mananchira, Kozhikode"
    }].map(c => /*#__PURE__*/React.createElement("div", {
      key: c.t,
      style: {
        display: "flex",
        gap: "0.9rem",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: "var(--radius-md)",
        background: "var(--maroon-50)",
        color: "var(--maroon-700)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: c.i,
      size: 22
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--text-muted)"
      }
    }, c.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        color: "var(--text-primary)"
      }
    }, c.d)))))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 120
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        borderRadius: "var(--radius-xl)",
        padding: "clamp(1.5rem, 3vw, 2.4rem)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--border-subtle)"
      }
    }, sent ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "2rem 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "var(--green-100)",
        color: "var(--green-600)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.2rem"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      weight: "fill",
      size: 40
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.5rem",
        fontWeight: 600,
        marginBottom: "0.5rem"
      }
    }, "Thank you!"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        color: "var(--text-secondary)"
      }
    }, "Your enquiry is in. We'll be in touch within one working day."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      style: {
        marginTop: "1.4rem"
      },
      onClick: () => setSent(false)
    }, "Submit another")) : /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
      },
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.1rem"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Parent / Guardian name",
      required: true,
      placeholder: "Full name"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Student name",
      required: true,
      placeholder: "Child's name"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.1rem"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Mobile",
      required: true,
      placeholder: "10-digit number",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "phone",
        size: 16
      })
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Email",
      type: "email",
      placeholder: "you@email.com",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "envelope-simple",
        size: 16
      })
    })), /*#__PURE__*/React.createElement(Select, {
      label: "Applying for",
      required: true,
      placeholder: "Select a grade",
      options: ["Pre-KG", "LKG", "UKG", "Class I", "Class V", "Class IX", "Class XI — Science", "Class XI — Commerce"]
    }), /*#__PURE__*/React.createElement(Checkbox, {
      label: "I agree to be contacted about admissions",
      description: "We'll only use your details to respond to this enquiry.",
      defaultChecked: true
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      size: "lg",
      fullWidth: true,
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Submit Enquiry"))))));
  }
  function Fees() {
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--narrow"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        textAlign: "center",
        marginBottom: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement(Kicker, null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        margin: "0 auto"
      }
    }, "Good to know")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        marginTop: "0.8rem"
      }
    }, "Fees & frequently asked")), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Accordion, {
      defaultOpen: 0,
      items: [{
        q: "What is the fee structure?",
        a: "Fees vary by grade and are kept deliberately accessible as a community institution. Download the brochure or speak to our office for the current year's structure and payment schedule."
      }, {
        q: "Are there sibling or community concessions?",
        a: "Yes. As a charitable society managed by the linguistic minority, the school offers considerations for siblings and community members. Please enquire with the admissions office."
      }, {
        q: "What documents are required for admission?",
        a: "Birth certificate, transfer certificate (for transfers), recent photographs, and previous report cards where applicable."
      }, {
        q: "Is transport included?",
        a: "Transport is optional and charged separately, with routes covering Kozhikode and nearby areas."
      }]
    }))));
  }
  function AdmissionsPage({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
      onNavigate: onNavigate,
      crumb: "Admissions",
      eyebrow: "Admissions 2026-27",
      title: "A warm welcome begins here",
      lead: "A guided, parent-friendly admissions experience \u2014 from first enquiry to your child's first day.",
      image: IMG.a2
    }), /*#__PURE__*/React.createElement(Journey, null), /*#__PURE__*/React.createElement(EnquiryForm, null), /*#__PURE__*/React.createElement(Fees, null));
  }
  window.AdmissionsPage = AdmissionsPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AdmissionsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactPage.jsx
try { (() => {
/* ============================================================
   Contact page — info cards, map, book-a-visit form, newsletter.
   ============================================================ */
(function () {
  const {
    useState
  } = React;
  const {
    Img,
    Icon,
    Reveal,
    Kicker,
    PageHero,
    IMG
  } = window;
  const {
    Button,
    Input,
    Select
  } = window.SriGujaratiVidyalayaDesignSystem_89aa2a;
  function ContactPage({
    onNavigate
  }) {
    const [sent, setSent] = useState(false);
    const cards = [{
      i: "map-pin",
      t: "Visit us",
      lines: ["Beach Road, Mananchira", "Kozhikode, Kerala 673032"]
    }, {
      i: "phone",
      t: "Call us",
      lines: ["0495 236 5215", "Mon–Sat, 9am – 4pm"]
    }, {
      i: "envelope-simple",
      t: "Email",
      lines: ["info@srigujaratividyalaya.com", "admissions@srigujaratividyalaya.com"]
    }];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
      onNavigate: onNavigate,
      crumb: "Contact",
      eyebrow: "Get in touch",
      title: "We'd love to hear from you",
      lead: "Questions about admissions, a campus visit, or careers at Gujarati Vidyalaya \u2014 reach out and we'll respond promptly.",
      image: IMG.campus
    }), /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cards-3",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "var(--space-6)",
        marginBottom: "var(--space-12)"
      }
    }, cards.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: c.t,
      delay: i * 80
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "1.8rem",
        boxShadow: "var(--shadow-sm)",
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 50,
        height: 50,
        borderRadius: "var(--radius-md)",
        background: "var(--maroon-50)",
        color: "var(--maroon-700)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.1rem"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: c.i,
      size: 26
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.2rem",
        fontWeight: 600,
        marginBottom: "0.6rem"
      }
    }, c.t), c.lines.map(l => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.95rem",
        color: "var(--text-secondary)",
        lineHeight: 1.6
      }
    }, l)))))), /*#__PURE__*/React.createElement("div", {
      className: "contact-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "var(--space-12)",
        alignItems: "stretch"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        borderRadius: "var(--radius-xl)",
        padding: "clamp(1.5rem, 3vw, 2.4rem)",
        boxShadow: "var(--shadow-lg)",
        border: "1px solid var(--border-subtle)",
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement(Kicker, null, "Book a campus visit"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "1.8rem",
        fontWeight: 500,
        margin: "0.8rem 0 1.4rem"
      }
    }, "Come and see our campus"), sent ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "1.5rem 0"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "var(--green-100)",
        color: "var(--green-600)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      weight: "fill",
      size: 36
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.4rem",
        fontWeight: 600
      }
    }, "Visit requested"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        color: "var(--text-secondary)",
        marginTop: "0.4rem"
      }
    }, "We'll confirm your slot by phone shortly.")) : /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setSent(true);
      },
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Your name",
      required: true,
      placeholder: "Full name"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.1rem"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Mobile",
      required: true,
      placeholder: "10-digit number",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "phone",
        size: 16
      })
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Preferred date",
      type: "date"
    })), /*#__PURE__*/React.createElement(Select, {
      label: "Reason for visit",
      placeholder: "Select",
      options: ["Admission enquiry", "Campus tour", "Meet the principal", "Careers / other"]
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      size: "lg",
      fullWidth: true,
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Request a Visit")))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 120
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--border-subtle)",
        height: "100%",
        minHeight: 360,
        position: "relative",
        background: "var(--surface-sunken)"
      }
    }, /*#__PURE__*/React.createElement("iframe", {
      title: "Map",
      src: "https://www.openstreetmap.org/export/embed.html?bbox=75.77%2C11.24%2C75.80%2C11.27&layer=mapnik&marker=11.2588%2C75.7804",
      style: {
        width: "100%",
        height: "100%",
        border: 0,
        filter: "saturate(0.85) sepia(0.08)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 18,
        bottom: 18,
        background: "var(--surface-card)",
        borderRadius: "var(--radius-md)",
        padding: "0.9rem 1.1rem",
        boxShadow: "var(--shadow-md)",
        display: "flex",
        gap: "0.7rem",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      weight: "fill",
      size: 22,
      style: {
        color: "var(--maroon-700)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.85rem",
        fontWeight: 600
      }
    }, "Mananchira, Kozhikode"))))))), /*#__PURE__*/React.createElement(Newsletter, null));
  }
  function Newsletter() {
    const [done, setDone] = useState(false);
    return /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-2xl)",
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        padding: "clamp(2rem, 4vw, 3.5rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-12)",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "34ch"
      }
    }, /*#__PURE__*/React.createElement(Kicker, null, "Stay in the loop"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        margin: "0.8rem 0 0.6rem"
      }
    }, "School newsletter"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        color: "var(--text-secondary)",
        fontSize: "1rem",
        lineHeight: 1.6
      }
    }, "Events, results and stories from campus \u2014 a few times a term, never spam.")), /*#__PURE__*/React.createElement("form", {
      onSubmit: e => {
        e.preventDefault();
        setDone(true);
      },
      style: {
        display: "flex",
        gap: "0.7rem",
        flex: 1,
        minWidth: 280,
        maxWidth: 460,
        alignItems: "flex-start"
      }
    }, done ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        color: "var(--green-600)",
        fontWeight: 600,
        display: "flex",
        gap: "0.5rem",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      weight: "fill",
      size: 22
    }), " You're subscribed \u2014 thank you!") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
      containerStyle: {
        flex: 1
      },
      type: "email",
      required: true,
      placeholder: "Your email address",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "envelope-simple",
        size: 16
      })
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      size: "md"
    }, "Subscribe")))))));
  }
  window.ContactPage = ContactPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/GalleryPage.jsx
try { (() => {
/* ============================================================
   Gallery page — category filters, masonry, lightbox.
   ============================================================ */
(function () {
  const {
    useState
  } = React;
  const {
    Img,
    Icon,
    Reveal,
    Kicker,
    PageHero,
    IMG
  } = window;
  const {
    Badge
  } = window.SriGujaratiVidyalayaDesignSystem_89aa2a;
  const PHOTOS = [{
    src: IMG.campus,
    cat: "Campus",
    t: "The main campus"
  }, {
    src: IMG.news_yoga,
    cat: "Celebrations",
    t: "International Yoga Day"
  }, {
    src: IMG.a1,
    cat: "Academics",
    t: "In the classroom"
  }, {
    src: IMG.news_ocean,
    cat: "Arts",
    t: "World Ocean Day"
  }, {
    src: IMG.faculty,
    cat: "Campus",
    t: "Facilities"
  }, {
    src: IMG.news_env,
    cat: "Celebrations",
    t: "World Environment Day"
  }, {
    src: IMG.a2,
    cat: "Academics",
    t: "Learning together"
  }, {
    src: IMG.news_mla,
    cat: "Sports",
    t: "Excellence Award"
  }, {
    src: IMG.program,
    cat: "Arts",
    t: "Activities & programs"
  }, {
    src: IMG.n1,
    cat: "Sports",
    t: "On the field"
  }, {
    src: IMG.news_plusone,
    cat: "Academics",
    t: "Plus One"
  }, {
    src: IMG.n2,
    cat: "Celebrations",
    t: "School event"
  }];
  const CATS = ["All", "Campus", "Academics", "Sports", "Celebrations", "Arts"];
  function GalleryPage({
    onNavigate
  }) {
    const [cat, setCat] = useState("All");
    const [box, setBox] = useState(null);
    const shown = cat === "All" ? PHOTOS : PHOTOS.filter(p => p.cat === cat);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
      onNavigate: onNavigate,
      crumb: "Campus & Gallery",
      eyebrow: "Campus life",
      title: "Moments from our campus",
      lead: "A glimpse of everyday life at Gujarati Vidyalaya \u2014 classrooms, celebrations, sport and the green campus our students call home.",
      image: IMG.faculty
    }), /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        display: "flex",
        gap: "0.6rem",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: "var(--space-10)"
      }
    }, CATS.map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setCat(c),
      style: {
        padding: "0.55rem 1.1rem",
        borderRadius: "var(--radius-pill)",
        cursor: "pointer",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "0.88rem",
        border: `1px solid ${cat === c ? "var(--maroon-700)" : "var(--border-strong)"}`,
        background: cat === c ? "var(--maroon-700)" : "transparent",
        color: cat === c ? "var(--cream-50)" : "var(--ink-700)",
        transition: "all var(--dur-fast)"
      }
    }, c))), /*#__PURE__*/React.createElement("div", {
      className: "masonry",
      style: {
        columnCount: 3,
        columnGap: "var(--space-5)"
      }
    }, shown.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: p.t + i,
      delay: i % 6 * 60,
      style: {
        breakInside: "avoid",
        marginBottom: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setBox(p),
      style: {
        display: "block",
        width: "100%",
        padding: 0,
        border: "none",
        cursor: "pointer",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        position: "relative",
        boxShadow: "var(--shadow-md)",
        background: "var(--surface-card)"
      }
    }, /*#__PURE__*/React.createElement(Img, {
      src: p.src,
      alt: p.t,
      style: {
        width: "100%",
        aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/3" : "1/1"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, transparent 55%, rgba(58,22,7,0.75))",
        display: "flex",
        alignItems: "flex-end",
        padding: "1rem",
        opacity: 0,
        transition: "opacity var(--dur)"
      },
      onMouseEnter: e => e.currentTarget.style.opacity = 1,
      onMouseLeave: e => e.currentTarget.style.opacity = 0
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--cream-50)",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "0.9rem",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
      }
    }, p.t, /*#__PURE__*/React.createElement(Icon, {
      name: "arrows-out-simple",
      size: 16
    }))))))))), box && /*#__PURE__*/React.createElement("div", {
      onClick: () => setBox(null),
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 900,
        background: "rgba(22,15,9,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--gutter)",
        backdropFilter: "blur(4px)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setBox(null),
      "aria-label": "Close",
      style: {
        position: "absolute",
        top: 24,
        right: 24,
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "1px solid var(--border-on-dark)",
        background: "rgba(252,249,243,0.08)",
        color: "var(--cream-50)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 24
    })), /*#__PURE__*/React.createElement("figure", {
      onClick: e => e.stopPropagation(),
      style: {
        margin: 0,
        maxWidth: 980,
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(Img, {
      src: box.src,
      alt: box.t,
      style: {
        width: "100%",
        maxHeight: "76vh",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-xl)"
      }
    }), /*#__PURE__*/React.createElement("figcaption", {
      style: {
        marginTop: "1rem",
        display: "flex",
        gap: "0.8rem",
        alignItems: "center",
        color: "var(--cream-50)"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      style: {
        background: "rgba(248,240,220,0.16)",
        color: "var(--gold-300)"
      }
    }, box.cat), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-serif)",
        fontSize: "1.2rem",
        fontStyle: "italic"
      }
    }, box.t)))));
  }
  window.GalleryPage = GalleryPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/GalleryPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HeritagePage.jsx
try { (() => {
/* ============================================================
   Heritage / About page — story, vision-mission-philosophy,
   vertical timeline, affiliation.
   ============================================================ */
(function () {
  const {
    Img,
    Icon,
    Reveal,
    Kicker,
    PageHero,
    IMG
  } = window;
  const {
    Button,
    Badge
  } = window.SriGujaratiVidyalayaDesignSystem_89aa2a;
  function Story() {
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide about-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "var(--space-16)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Kicker, null, "About the school"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        margin: "1rem 0 1.2rem",
        maxWidth: "20ch"
      }
    }, "Quality and learning, brought together since 1869"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "1.05rem",
        lineHeight: 1.75,
        color: "var(--text-secondary)",
        marginBottom: "1rem"
      }
    }, "Sri Gujarati Vidyalaya was established in 1869 to impart quality education to the children of the Gujarati community. Managed by the Sri Gujarati Vidyalaya Association \u2014 a charitable welfare society registered under the Societies Act, 1860 \u2014 it remains a Kerala Government recognised, unaided English-medium co-educational school."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "1.05rem",
        lineHeight: 1.75,
        color: "var(--text-secondary)"
      }
    }, "Today it stands among the institutions that bring quality and learning together \u2014 with excellent faculty and facilities set in a serene, eco-friendly and sustainable campus near Mananchira.")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 120
    }, /*#__PURE__*/React.createElement(Img, {
      src: IMG.campus,
      alt: "Heritage campus",
      style: {
        borderRadius: "var(--radius-xl)",
        aspectRatio: "4/5",
        boxShadow: "var(--shadow-lg)"
      }
    }))));
  }
  function VMP() {
    const cards = [{
      icon: "compass",
      t: "Vision",
      d: "To provide quality leadership along with all-round development and academic growth — grooming students to face tomorrow with confidence, as leaders from a very young age."
    }, {
      icon: "target",
      t: "Mission",
      d: "To provide a disciplined, overall growing environment that encourages every child to bring out the best in oneself."
    }, {
      icon: "heart",
      t: "Philosophy",
      d: "Every child is born with infinite potential. We follow a child-centred approach in an eco-friendly, serene environment, attending to each child as a unique individual."
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        background: "var(--surface-raised)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cards-3",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "var(--space-6)"
      }
    }, cards.map((c, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: c.t,
      delay: i * 90,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        padding: "2rem 1.8rem",
        height: "100%",
        boxShadow: "var(--shadow-sm)",
        borderTop: "3px solid var(--gold-500)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: c.icon,
      size: 32,
      style: {
        color: "var(--maroon-700)",
        marginBottom: "1rem",
        display: "block"
      }
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.5rem",
        fontWeight: 500,
        marginBottom: "0.7rem"
      }
    }, c.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.96rem",
        lineHeight: 1.7,
        color: "var(--text-secondary)"
      }
    }, c.d)))))));
  }
  function VTimeline() {
    const ms = [{
      year: "1869",
      t: "Founded",
      d: "The Gujarati community establishes the school to educate its children in Kozhikode."
    }, {
      year: "1860s–1900s",
      t: "Roots take hold",
      d: "Registered under the Societies Act, 1860, the SGVA builds a lasting institution."
    }, {
      year: "Mid-1900s",
      t: "Recognition",
      d: "Becomes a Kerala Government recognised English-medium school."
    }, {
      year: "1990s",
      t: "A serene campus",
      d: "Grows into its eco-friendly campus, balancing heritage with modern facilities."
    }, {
      year: "Today",
      t: "Higher Secondary",
      d: "Science & Commerce streams, modern labs, swimming pools and a 150-year legacy."
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--narrow"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        textAlign: "center",
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement(Kicker, null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        margin: "0 auto"
      }
    }, "Our journey")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        marginTop: "0.8rem"
      }
    }, "A living timeline")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        paddingLeft: "2.4rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 9,
        top: 6,
        bottom: 6,
        width: 2,
        background: "var(--sand-300)"
      }
    }), ms.map((m, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: m.year,
      delay: i * 60,
      style: {
        position: "relative",
        paddingBottom: i === ms.length - 1 ? 0 : "2.2rem"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: "-2.4rem",
        top: 4,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "var(--maroon-700)",
        border: "3px solid var(--surface-page)",
        boxShadow: "0 0 0 2px var(--maroon-200)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "0.95rem",
        color: "var(--gold-700)",
        letterSpacing: "0.04em"
      }
    }, m.year), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.3rem",
        fontWeight: 500,
        margin: "0.3rem 0 0.4rem"
      }
    }, m.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.96rem",
        lineHeight: 1.65,
        color: "var(--text-secondary)"
      }
    }, m.d))))));
  }
  function Affiliation({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        background: "var(--maroon-950)",
        color: "var(--cream-50)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide",
      style: {
        display: "flex",
        gap: "var(--space-12)",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        maxWidth: "40ch"
      }
    }, /*#__PURE__*/React.createElement(Kicker, {
      tone: "inverse"
    }, "Recognition & affiliation"), /*#__PURE__*/React.createElement("h2", {
      style: {
        color: "var(--cream-50)",
        fontWeight: 500,
        fontSize: "var(--text-section)",
        margin: "0.9rem 0 1rem"
      }
    }, "Recognised, trusted, accountable"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        color: "var(--maroon-100)",
        fontSize: "1.02rem",
        lineHeight: 1.7
      }
    }, "A Kerala Government recognised institution managed by a registered charitable society \u2014 combining the assurance of heritage governance with modern educational standards.")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 120,
      style: {
        display: "flex",
        gap: "0.8rem",
        flexWrap: "wrap"
      }
    }, ["Kerala Govt. Recognised", "English Medium", "Co-Educational", "Higher Secondary", "Est. 1869"].map(b => /*#__PURE__*/React.createElement(Badge, {
      key: b,
      tone: "gold",
      style: {
        background: "rgba(248,240,220,0.14)",
        color: "var(--gold-300)",
        fontSize: "0.82rem",
        padding: "0.5rem 0.9rem"
      }
    }, b)))));
  }
  function HeritagePage({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHero, {
      onNavigate: onNavigate,
      crumb: "Heritage",
      eyebrow: "Since 1869",
      title: "A prestigious heritage, a modern education",
      lead: "For over 150 years, Sri Gujarati Vidyalaya has shaped generations of learners in Kozhikode \u2014 rooted in humility, reaching for excellence.",
      image: IMG.a1
    }), /*#__PURE__*/React.createElement(Story, null), /*#__PURE__*/React.createElement(VMP, null), /*#__PURE__*/React.createElement(VTimeline, null), /*#__PURE__*/React.createElement(Affiliation, {
      onNavigate: onNavigate
    }));
  }
  window.HeritagePage = HeritagePage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HeritagePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
/* Home page composition */
(function () {
  const {
    Hero,
    TrustBar,
    About,
    Glance,
    Academics,
    Facilities
  } = window.HomeParts1;
  const {
    Timeline,
    Principal,
    Testimonials,
    News,
    AdmissionsCTA
  } = window.HomeParts2;
  function HomePage({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(About, {
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement(Glance, null), /*#__PURE__*/React.createElement(Academics, {
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement(Facilities, null), /*#__PURE__*/React.createElement(Timeline, null), /*#__PURE__*/React.createElement(Principal, {
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(News, {
      onNavigate: onNavigate
    }), /*#__PURE__*/React.createElement(AdmissionsCTA, {
      onNavigate: onNavigate
    }));
  }
  window.HomePage = HomePage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeParts1.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ============================================================
   Home page — heritage hero, trust bar, about, at-a-glance,
   academics, facilities, timeline, principal, testimonials,
   news, admissions CTA.
   ============================================================ */
(function () {
  const {
    useState,
    useEffect,
    useRef
  } = React;
  const {
    Img,
    Icon,
    Reveal,
    Kicker,
    IMG
  } = window;
  const {
    Button,
    Badge,
    Stat,
    Card,
    Avatar
  } = window.SriGujaratiVidyalayaDesignSystem_89aa2a;

  /* ---------- HERO ---------- */
  function Hero({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: "relative",
        minHeight: "min(92vh, 820px)",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-bg",
      style: {
        position: "absolute",
        inset: 0
      }
    }, /*#__PURE__*/React.createElement(Img, {
      src: IMG.campus,
      alt: "Sri Gujarati Vidyalaya campus",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, rgba(58,22,7,0.58) 0%, rgba(58,22,7,0.18) 32%, rgba(58,22,7,0.86) 100%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "container container--wide",
      style: {
        position: "relative",
        paddingBottom: "var(--space-12)",
        paddingTop: "var(--space-16)",
        width: "100%"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      dot: true,
      style: {
        marginBottom: "1.4rem",
        background: "rgba(248,240,220,0.16)",
        color: "var(--gold-300)",
        backdropFilter: "blur(6px)"
      }
    }, "Established 1869 \xB7 Kozhikode")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 80
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        color: "var(--cream-50)",
        fontWeight: 500,
        fontSize: "var(--text-hero)",
        lineHeight: 1.02,
        maxWidth: "16ch",
        letterSpacing: "-0.02em"
      }
    }, "A heritage of learning, ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontStyle: "italic",
        color: "var(--gold-300)",
        fontWeight: 400
      }
    }, "for every child."))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 160
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--cream-100)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-lead)",
        maxWidth: "46ch",
        marginTop: "1.4rem",
        lineHeight: 1.6,
        opacity: 0.95
      }
    }, "For over 150 years, Sri Gujarati Vidyalaya has nurtured the total development of the child \u2014 where wisdom, humility and joy grow together.")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 240
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "0.85rem",
        marginTop: "2.2rem",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      onClick: () => onNavigate("admissions"),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Apply for Admission"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "inverse",
      onClick: () => onNavigate("gallery"),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "play-circle",
        weight: "fill",
        size: 20
      })
    }, "Take a Campus Tour"))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 340
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-strip",
      style: {
        marginTop: "var(--space-12)",
        display: "grid",
        gridTemplateColumns: "repeat(3, max-content)",
        gap: "clamp(1.5rem, 4vw, 3.5rem)",
        padding: "1.3rem 1.7rem",
        borderRadius: "var(--radius-lg)",
        background: "rgba(36,26,17,0.34)",
        backdropFilter: "blur(14px) saturate(150%)",
        border: "1px solid rgba(248,240,220,0.18)",
        width: "max-content",
        maxWidth: "100%"
      }
    }, [{
      v: "156+",
      l: "Years of Legacy"
    }, {
      v: "2,400+",
      l: "Students"
    }, {
      v: "98%",
      l: "Board Results"
    }].map(s => /*#__PURE__*/React.createElement("div", {
      key: s.l
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 500,
        fontSize: "clamp(1.6rem, 1.2rem + 1vw, 2.1rem)",
        lineHeight: 1,
        color: "var(--gold-300)"
      }
    }, s.v), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.78rem",
        letterSpacing: "0.04em",
        color: "var(--cream-100)",
        marginTop: "0.35rem"
      }
    }, s.l)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        bottom: "1.4rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.4rem",
        color: "var(--cream-100)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.66rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        opacity: 0.7
      }
    }, "Scroll"), /*#__PURE__*/React.createElement(Icon, {
      name: "caret-down",
      size: 18,
      className: "scroll-cue"
    })));
  }

  /* ---------- TRUST BAR ---------- */
  function TrustBar() {
    const items = [{
      icon: "seal-check",
      label: "Kerala Govt. Recognised"
    }, {
      icon: "translate",
      label: "English Medium"
    }, {
      icon: "users-three",
      label: "Co-Educational"
    }, {
      icon: "tree",
      label: "Eco-Friendly Campus"
    }];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-card)",
        borderBottom: "1px solid var(--border-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide trust-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "1rem",
        padding: "1.6rem 0"
      }
    }, items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.label,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.7rem",
        color: "var(--maroon-700)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 26,
      weight: "regular"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "0.92rem",
        color: "var(--ink-800)"
      }
    }, it.label)))));
  }

  /* ---------- ABOUT / PREAMBLE ---------- */
  function About({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide about-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--space-16)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Kicker, null, "Welcome to Gujarati Vidyalaya"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        margin: "1rem 0 1.2rem",
        maxWidth: "18ch"
      }
    }, "Education that develops the ", /*#__PURE__*/React.createElement("em", {
      style: {
        color: "var(--maroon-700)"
      }
    }, "whole"), " child"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "1.05rem",
        lineHeight: 1.7,
        color: "var(--text-secondary)",
        marginBottom: "1rem"
      }
    }, "Sri Gujarati Vidyalaya Higher Secondary School aims at the total development of the child through education \u2014 where the child acquires the wisdom of humility and radiates happiness and contentment around."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "1.05rem",
        lineHeight: 1.7,
        color: "var(--text-secondary)",
        marginBottom: "1.8rem"
      }
    }, "A Kerala Government recognised unaided English-medium co-educational school, managed by the Sri Gujarati Vidyalaya Association \u2014 a charitable welfare society established to bring quality and learning together."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => onNavigate("about"),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Our story since 1869")), /*#__PURE__*/React.createElement(Reveal, {
      delay: 120
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(Img, {
      src: IMG.a1,
      alt: "Students at Gujarati Vidyalaya",
      style: {
        borderRadius: "var(--radius-xl)",
        aspectRatio: "4/5",
        boxShadow: "var(--shadow-lg)"
      }
    }), /*#__PURE__*/React.createElement(Img, {
      src: IMG.a2,
      alt: "Campus life",
      style: {
        position: "absolute",
        width: "52%",
        aspectRatio: "1",
        right: "-6%",
        bottom: "-10%",
        borderRadius: "var(--radius-lg)",
        border: "6px solid var(--surface-page)",
        boxShadow: "var(--shadow-lg)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: "-22px",
        left: "-22px",
        background: "var(--maroon-900)",
        color: "var(--cream-50)",
        borderRadius: "var(--radius-lg)",
        padding: "1rem 1.2rem",
        boxShadow: "var(--shadow-brand)",
        display: "flex",
        alignItems: "center",
        gap: "0.8rem"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/crest-cream.png",
      alt: "",
      style: {
        height: 44
      }
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "1.6rem",
        lineHeight: 1,
        color: "var(--gold-300)"
      }
    }, "156"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.72rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }
    }, "Years")))))));
  }

  /* ---------- AT A GLANCE ---------- */
  function Glance() {
    const stats = [{
      value: 156,
      suffix: "+",
      label: "Years of Legacy"
    }, {
      value: 2400,
      suffix: "+",
      label: "Students"
    }, {
      value: 120,
      suffix: "+",
      label: "Faculty Members"
    }, {
      value: 98,
      suffix: "%",
      label: "Board Results"
    }];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--maroon-900)",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/crest-cream.png",
      alt: "",
      style: {
        position: "absolute",
        right: "-60px",
        top: "50%",
        transform: "translateY(-50%)",
        height: "150%",
        opacity: 0.05
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "container container--wide",
      style: {
        paddingBlock: "var(--space-16)",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        textAlign: "center",
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement(Kicker, {
      tone: "inverse"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        margin: "0 auto"
      }
    }, "School at a glance")), /*#__PURE__*/React.createElement("h2", {
      style: {
        color: "var(--cream-50)",
        fontWeight: 500,
        fontSize: "var(--text-section)",
        marginTop: "0.8rem"
      }
    }, "A legacy you can measure")), /*#__PURE__*/React.createElement("div", {
      className: "glance-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--space-8)"
      }
    }, stats.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: s.label,
      delay: i * 90
    }, /*#__PURE__*/React.createElement(Stat, _extends({}, s, {
      tone: "inverse"
    })))))));
  }

  /* ---------- ACADEMICS ---------- */
  function Academics({
    onNavigate
  }) {
    const stages = [{
      icon: "baby",
      t: "Pre-Primary",
      d: "Play-based early years where curiosity is the first lesson."
    }, {
      icon: "pencil-simple-line",
      t: "Primary",
      d: "Strong foundations in language, numeracy and values."
    }, {
      icon: "books",
      t: "Secondary",
      d: "Rigorous academics balanced with sport, arts and service."
    }, {
      icon: "graduation-cap",
      t: "Higher Secondary",
      d: "Science & Commerce streams that open every future."
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "Academics"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        marginTop: "0.8rem",
        maxWidth: "16ch"
      }
    }, "A continuous journey, Pre-KG to Plus Two")), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => onNavigate("academics"),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Explore academics")), /*#__PURE__*/React.createElement("div", {
      className: "cards-4",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--space-6)"
      }
    }, stages.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: s.t,
      delay: i * 80,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onMouseEnter: e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        e.currentTarget.style.borderColor = "var(--maroon-200)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.borderColor = "var(--border-subtle)";
      },
      style: {
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "1.6rem",
        height: "100%",
        boxShadow: "var(--shadow-sm)",
        transition: "transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out), border-color var(--dur)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: "var(--radius-md)",
        background: "var(--maroon-50)",
        color: "var(--maroon-700)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.1rem"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 28
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.25rem",
        fontWeight: 600,
        marginBottom: "0.5rem"
      }
    }, s.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.92rem",
        lineHeight: 1.6,
        color: "var(--text-secondary)"
      }
    }, s.d)))))));
  }

  /* ---------- FACILITIES ---------- */
  function Facilities() {
    const fac = [{
      icon: "desktop",
      t: "Computer Lab"
    }, {
      icon: "flask",
      t: "Science Labs"
    }, {
      icon: "books",
      t: "Library"
    }, {
      icon: "bus",
      t: "Transportation"
    }, {
      icon: "fork-knife",
      t: "Canteen"
    }, {
      icon: "first-aid-kit",
      t: "Medical Care"
    }, {
      icon: "swimming-pool",
      t: "Swimming Pools"
    }, {
      icon: "basketball",
      t: "Play Courts"
    }, {
      icon: "microphone-stage",
      t: "Open-Air Auditorium"
    }, {
      icon: "tree",
      t: "Green Campus"
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        background: "var(--surface-raised)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement("div", {
      className: "fac-layout",
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: "var(--space-16)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Img, {
      src: IMG.faculty,
      alt: "Campus facilities",
      style: {
        borderRadius: "var(--radius-xl)",
        aspectRatio: "5/4",
        boxShadow: "var(--shadow-lg)"
      }
    })), /*#__PURE__*/React.createElement(Reveal, {
      delay: 100
    }, /*#__PURE__*/React.createElement(Kicker, null, "Campus & Facilities"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        margin: "0.8rem 0 1.6rem",
        maxWidth: "18ch"
      }
    }, "Everything a young mind needs to flourish"), /*#__PURE__*/React.createElement("div", {
      className: "fac-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: "0.8rem"
      }
    }, fac.map(f => /*#__PURE__*/React.createElement("div", {
      key: f.t,
      onMouseEnter: e => {
        e.currentTarget.style.background = "var(--maroon-700)";
        e.currentTarget.style.borderColor = "var(--maroon-700)";
        e.currentTarget.querySelector(".fac-i").style.color = "var(--gold-300)";
        e.currentTarget.querySelector(".fac-t").style.color = "var(--cream-50)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.background = "var(--surface-card)";
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.querySelector(".fac-i").style.color = "var(--gold-700)";
        e.currentTarget.querySelector(".fac-t").style.color = "var(--text-primary)";
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        padding: "0.85rem 1rem",
        cursor: "default",
        transition: "background var(--dur), border-color var(--dur)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: f.icon,
      size: 22,
      className: "fac-i",
      style: {
        color: "var(--gold-700)",
        transition: "color var(--dur)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "fac-t",
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 500,
        fontSize: "0.92rem",
        color: "var(--text-primary)",
        transition: "color var(--dur)"
      }
    }, f.t))))))));
  }
  window.HomeParts1 = {
    Hero,
    TrustBar,
    About,
    Glance,
    Academics,
    Facilities
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeParts1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeParts2.jsx
try { (() => {
/* ============================================================
   Home page parts 2 — heritage timeline, principal, testimonials,
   news & events, admissions CTA.
   ============================================================ */
(function () {
  const {
    useState
  } = React;
  const {
    Img,
    Icon,
    Reveal,
    Kicker,
    IMG
  } = window;
  const {
    Button,
    Badge,
    Avatar
  } = window.SriGujaratiVidyalayaDesignSystem_89aa2a;

  /* ---------- HERITAGE TIMELINE ---------- */
  function Timeline() {
    const milestones = [{
      year: "1869",
      t: "The school is founded",
      d: "Established by the Gujarati community to bring quality education to Kozhikode."
    }, {
      year: "1950s",
      t: "Recognition & growth",
      d: "Becomes a recognised institution, expanding from primary to secondary."
    }, {
      year: "1990s",
      t: "A serene new campus",
      d: "The school grows into its eco-friendly campus near Mananchira."
    }, {
      year: "Today",
      t: "Higher Secondary excellence",
      d: "Science & Commerce streams, modern labs and a 150-year living legacy."
    }];
    const [active, setActive] = useState(0);
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        textAlign: "center",
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement(Kicker, null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        margin: "0 auto"
      }
    }, "Since 1869")), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        marginTop: "0.8rem"
      }
    }, "One hundred and fifty years, one purpose")), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        margin: "0 auto 2.6rem",
        maxWidth: 880
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 13,
        left: "6%",
        right: "6%",
        height: 2,
        background: "var(--sand-300)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 13,
        left: "6%",
        width: `${active / (milestones.length - 1) * 88}%`,
        height: 2,
        background: "var(--gold-500)",
        transition: "width var(--dur-slow) var(--ease-out)"
      }
    }), milestones.map((m, i) => /*#__PURE__*/React.createElement("button", {
      key: m.year,
      onClick: () => setActive(i),
      style: {
        position: "relative",
        zIndex: 1,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.6rem",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: i <= active ? "var(--gold-500)" : "var(--surface-card)",
        border: `2px solid ${i <= active ? "var(--gold-500)" : "var(--sand-400)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all var(--dur)"
      }
    }, i === active && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "var(--maroon-900)"
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "1.05rem",
        color: i === active ? "var(--maroon-800)" : "var(--text-muted)"
      }
    }, m.year))))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 680,
        margin: "0 auto",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "1.7rem",
        fontWeight: 500,
        marginBottom: "0.7rem"
      }
    }, milestones[active].t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "1.05rem",
        lineHeight: 1.7,
        color: "var(--text-secondary)"
      }
    }, milestones[active].d)))));
  }

  /* ---------- PRINCIPAL'S MESSAGE ---------- */
  function Principal({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        background: "var(--maroon-950)",
        color: "var(--cream-50)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide principal-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "0.8fr 1.2fr",
        gap: "var(--space-16)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: 360
      }
    }, /*#__PURE__*/React.createElement(Img, {
      src: IMG.principal,
      alt: "Vimala Jayaraj, Principal",
      style: {
        borderRadius: "var(--radius-xl)",
        aspectRatio: "4/5",
        boxShadow: "var(--shadow-xl)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        bottom: "-18px",
        left: "-18px",
        background: "var(--gold-500)",
        color: "var(--ink-900)",
        borderRadius: "var(--radius-md)",
        padding: "0.7rem 1rem",
        fontFamily: "var(--font-display)",
        boxShadow: "var(--shadow-lg)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "1.05rem",
        fontWeight: 600,
        lineHeight: 1.1
      }
    }, "Vimala Jayaraj"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.72rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }
    }, "Principal")))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 120
    }, /*#__PURE__*/React.createElement(Kicker, {
      tone: "inverse"
    }, "Principal's Desk"), /*#__PURE__*/React.createElement(Icon, {
      name: "quotes",
      weight: "fill",
      size: 44,
      style: {
        color: "var(--gold-400)",
        margin: "1.2rem 0 0.5rem",
        display: "block"
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(1.3rem, 1rem + 1.2vw, 1.85rem)",
        lineHeight: 1.5,
        fontWeight: 400,
        fontStyle: "italic",
        color: "var(--cream-50)",
        marginBottom: "1.6rem",
        maxWidth: "34ch"
      }
    }, "I am honoured to lead an institution that has been a beacon of education for over 153 years \u2014 nurturing the total development of each child in a serene, eco-friendly home of learning."), /*#__PURE__*/React.createElement(Button, {
      variant: "inverse",
      onClick: () => onNavigate("about"),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "Read the full message"))));
  }

  /* ---------- TESTIMONIALS ---------- */
  function Testimonials() {
    const {
      useEffect
    } = React;
    const quotes = [{
      q: "The teachers know my daughter as an individual. She has grown in confidence and kindness in equal measure.",
      n: "Meera Nair",
      r: "Parent, Class VI"
    }, {
      q: "Gujarati gave me roots and wings — discipline, friendships and the curiosity that carried me to medical college.",
      n: "Arjun Menon",
      r: "Alumnus, 2016"
    }, {
      q: "A green, calm campus where my son actually looks forward to going to school every morning.",
      n: "Priya Shah",
      r: "Parent, Class III"
    }];
    const [i, setI] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setI(p => (p + 1) % quotes.length), 6000);
      return () => clearInterval(t);
    }, []);
    return /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--narrow",
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Kicker, null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        margin: "0 auto"
      }
    }, "In their words")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        marginTop: "2rem",
        minHeight: 200
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(1.4rem, 1.1rem + 1.4vw, 2.1rem)",
        lineHeight: 1.45,
        color: "var(--text-primary)",
        fontStyle: "italic",
        marginBottom: "1.8rem"
      }
    }, "\u201C", quotes[i].q, "\u201D"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.8rem"
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: quotes[i].n,
      size: "md",
      ring: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "left"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
        fontSize: "0.95rem"
      }
    }, quotes[i].n), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.82rem",
        color: "var(--text-muted)"
      }
    }, quotes[i].r)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        marginTop: "2rem"
      }
    }, quotes.map((_, k) => /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => setI(k),
      "aria-label": `Quote ${k + 1}`,
      style: {
        width: k === i ? 28 : 10,
        height: 10,
        borderRadius: "var(--radius-pill)",
        border: "none",
        cursor: "pointer",
        background: k === i ? "var(--maroon-700)" : "var(--sand-400)",
        transition: "all var(--dur)"
      }
    }))))));
  }

  /* ---------- NEWS & EVENTS ---------- */
  function News({
    onNavigate
  }) {
    const items = [{
      img: IMG.news_plusone,
      d: "27",
      m: "Jun",
      t: "Plus One Admission 2024-25",
      c: "Admissions"
    }, {
      img: IMG.news_mla,
      d: "03",
      m: "Jul",
      t: "MLA's Excellence Award 2023",
      c: "Achievement"
    }, {
      img: IMG.news_yoga,
      d: "21",
      m: "Jun",
      t: "International Yoga Day",
      c: "Event"
    }, {
      img: IMG.news_ocean,
      d: "08",
      m: "Jun",
      t: "World Ocean Day",
      c: "Event"
    }];
    return /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        background: "var(--surface-raised)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "1rem",
        flexWrap: "wrap",
        marginBottom: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "Latest happenings"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--text-section)",
        fontWeight: 500,
        marginTop: "0.8rem"
      }
    }, "News & Events")), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => onNavigate("gallery"),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 16
      })
    }, "View all news")), /*#__PURE__*/React.createElement("div", {
      className: "cards-4",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--space-6)"
      }
    }, items.map((n, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: n.t,
      delay: i * 80,
      style: {
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("article", {
      onMouseEnter: e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
        const im = e.currentTarget.querySelector("img");
        if (im) im.style.transform = "scale(1.06)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        const im = e.currentTarget.querySelector("img");
        if (im) im.style.transform = "scale(1)";
      },
      style: {
        background: "var(--surface-card)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-md)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(Img, {
      src: n.img,
      alt: n.t,
      style: {
        height: 170
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 12,
        left: 12,
        background: "var(--surface-card)",
        borderRadius: "var(--radius-sm)",
        padding: "0.35rem 0.6rem",
        textAlign: "center",
        boxShadow: "var(--shadow-sm)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: "1.15rem",
        lineHeight: 1,
        color: "var(--maroon-800)"
      }
    }, n.d), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-sans)",
        fontSize: "0.62rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "var(--text-muted)"
      }
    }, n.m))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "1.1rem 1.2rem 1.3rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      style: {
        alignSelf: "flex-start"
      }
    }, n.c), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "1.05rem",
        fontWeight: 600,
        lineHeight: 1.3
      }
    }, n.t), /*#__PURE__*/React.createElement("a", {
      style: {
        marginTop: "auto",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: "0.85rem",
        color: "var(--maroon-700)",
        cursor: "pointer",
        display: "inline-flex",
        gap: "0.3rem",
        alignItems: "center"
      }
    }, "Read more ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 14
    })))))))));
  }

  /* ---------- ADMISSIONS CTA ---------- */
  function AdmissionsCTA({
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "var(--section-y) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "container container--wide"
    }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
      className: "cta-band",
      style: {
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-2xl)",
        background: "linear-gradient(120deg, var(--maroon-800), var(--maroon-950))",
        padding: "clamp(2.5rem, 5vw, 4.5rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-12)",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/crest-cream.png",
      alt: "",
      style: {
        position: "absolute",
        right: "-40px",
        bottom: "-60px",
        height: "150%",
        opacity: 0.06
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: "32ch"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      dot: true,
      style: {
        background: "rgba(248,240,220,0.16)",
        color: "var(--gold-300)",
        marginBottom: "1.2rem"
      }
    }, "Admissions Open 2026-27"), /*#__PURE__*/React.createElement("h2", {
      style: {
        color: "var(--cream-50)",
        fontWeight: 500,
        fontSize: "clamp(1.9rem, 1.3rem + 2.4vw, 3rem)",
        lineHeight: 1.08
      }
    }, "Begin your child's journey with us"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "var(--font-sans)",
        color: "var(--maroon-100)",
        fontSize: "1.05rem",
        marginTop: "1rem",
        lineHeight: 1.6
      }
    }, "A warm, guided admissions experience \u2014 enquire today and book a visit to our campus.")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        minWidth: 240
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "accent",
      fullWidth: true,
      onClick: () => onNavigate("admissions"),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 18
      })
    }, "Apply Now"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "inverse",
      fullWidth: true,
      onClick: () => onNavigate("contact"),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar-check",
        size: 18
      })
    }, "Book a Campus Visit"))))));
  }
  window.HomeParts2 = {
    Timeline,
    Principal,
    Testimonials,
    News,
    AdmissionsCTA
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeParts2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/shared.jsx
try { (() => {
/* ============================================================
   Shared site chrome for the SGV website UI kit.
   Header, footer, sticky quick-actions, image helper, icons.
   Exposes everything on window for sibling babel scripts.
   ============================================================ */
const {
  useState,
  useEffect,
  useRef
} = React;
const DS = window.SriGujaratiVidyalayaDesignSystem_89aa2a;
const {
  Button,
  Badge
} = DS;
const NAV = [{
  id: "home",
  label: "Home"
}, {
  id: "about",
  label: "Heritage"
}, {
  id: "academics",
  label: "Academics"
}, {
  id: "admissions",
  label: "Admissions"
}, {
  id: "gallery",
  label: "Campus"
}, {
  id: "contact",
  label: "Contact"
}];

/* Real school photography (hotlinked from the live site; Img falls back gracefully) */
const IMG = {
  campus: "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/gujarati-school.jpg",
  a1: "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/progrm.jpg",
  a2: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
  faculty: "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/Faculty_.jpg",
  program: "https://www.srigujaratividhyalaya.com/wp-content/themes/gujarati/images/progrm.jpg",
  principal: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/vimala-jayaraj.jpg",
  n1: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/n1.jpg",
  n2: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/n2.jpg",
  news_plusone: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2024/06/plusone-555x555.jpeg",
  news1: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/05/news1-555x472.jpg",
  news_mla: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/1-31-555x472.jpg",
  news_yoga: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/4-13-555x472.jpg",
  news_ocean: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/3-18-555x472.jpg",
  news_env: "https://www.srigujaratividhyalaya.com/wp-content/uploads/2023/07/2-21-555x472.jpg"
};

/* ---- Resilient image with graceful maroon fallback ---- */
function Img({
  src,
  alt = "",
  style,
  className,
  overlay
}) {
  const [err, setErr] = useState(false);
  if (err || !src) {
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      style: {
        ...style,
        background: "linear-gradient(135deg, var(--maroon-600), var(--maroon-900))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/crest-cream.png",
      alt: "",
      style: {
        height: "44%",
        opacity: 0.32
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: "relative",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    onError: () => setErr(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block"
    }
  }), overlay && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: overlay
    }
  }));
}
function Icon({
  name,
  weight = "regular",
  size = 20,
  style
}) {
  const cls = weight === "fill" ? "ph-fill" : weight === "bold" ? "ph-bold" : "ph";
  return /*#__PURE__*/React.createElement("i", {
    className: `${cls} ph-${name}`,
    style: {
      fontSize: size,
      lineHeight: 1,
      ...style
    },
    "aria-hidden": "true"
  });
}

/* ---- Sticky top utility + main navigation ---- */
function SiteHeader({
  current,
  onNavigate
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(top > 20);
      const max = (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight;
      setProgress(max > 0 ? Math.min(top / max, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--maroon-900)",
      color: "var(--cream-100)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container container--wide",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 38,
      fontFamily: "var(--font-sans)",
      fontSize: "0.78rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "var(--gold-300)",
      fontStyle: "italic",
      fontFamily: "var(--font-serif)"
    }
  }, "\u0935\u093F\u0926\u094D\u092F\u093E \u0935\u093F\u0928\u092F\u0947\u0928 \u0936\u094B\u092D\u0924\u0947"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "1.4rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "tel:04952365215",
    style: {
      color: "var(--cream-100)",
      display: "inline-flex",
      gap: "0.4rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 14
  }), " 0495 236 5215"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "0.4rem",
      alignItems: "center",
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), " Mananchira, Kozhikode")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: scrolled ? "rgba(252,249,243,0.92)" : "var(--surface-card)",
      backdropFilter: scrolled ? "saturate(160%) blur(10px)" : "none",
      borderBottom: "1px solid var(--border-subtle)",
      boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      transition: "box-shadow var(--dur), background var(--dur)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container container--wide",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: scrolled ? 64 : 76,
      transition: "height var(--dur)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate("home"),
    style: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-lockup.png",
    alt: "Sri Gujarati Vidyalaya",
    style: {
      height: scrolled ? 34 : 40,
      transition: "height var(--dur)"
    }
  })), /*#__PURE__*/React.createElement("nav", {
    className: "desk-nav",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "0.2rem"
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    onClick: () => onNavigate(n.id),
    style: {
      position: "relative",
      cursor: "pointer",
      padding: "0.5rem 0.9rem",
      fontFamily: "var(--font-sans)",
      fontSize: "0.9rem",
      fontWeight: 600,
      color: current === n.id ? "var(--maroon-800)" : "var(--ink-700)"
    },
    onMouseEnter: e => {
      if (current !== n.id) e.currentTarget.style.color = "var(--maroon-700)";
    },
    onMouseLeave: e => {
      if (current !== n.id) e.currentTarget.style.color = "var(--ink-700)";
    }
  }, n.label, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "0.9rem",
      right: "0.9rem",
      bottom: "0.15rem",
      height: 2,
      borderRadius: 2,
      background: "var(--gold-500)",
      transform: current === n.id ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "desk-nav",
    style: {
      display: "flex",
      gap: "0.6rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    onClick: () => onNavigate("admissions")
  }, "Apply Now")), /*#__PURE__*/React.createElement("button", {
    className: "burger",
    onClick: () => setOpen(o => !o),
    "aria-label": "Menu",
    style: {
      display: "none",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "var(--maroon-800)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? "x" : "list",
    size: 28
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav",
    style: {
      borderTop: "1px solid var(--border-subtle)",
      padding: "0.5rem var(--gutter) 1rem",
      background: "var(--surface-card)"
    }
  }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.id,
    onClick: () => {
      onNavigate(n.id);
      setOpen(false);
    },
    style: {
      display: "block",
      padding: "0.85rem 0.5rem",
      borderBottom: "1px solid var(--border-subtle)",
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      color: current === n.id ? "var(--maroon-700)" : "var(--ink-800)",
      cursor: "pointer"
    }
  }, n.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1rem"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: () => {
      onNavigate("admissions");
      setOpen(false);
    }
  }, "Apply Now"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      background: "transparent",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      height: "100%",
      width: `${progress * 100}%`,
      background: "linear-gradient(90deg, var(--maroon-600), var(--gold-500))",
      transition: "width 80ms linear"
    }
  }))));
}

/* ---- Floating quick actions (Apply / Enquire / WhatsApp / Top) ---- */
function QuickActions({
  onNavigate
}) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop((window.scrollY || 0) > 700);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      right: "clamp(14px, 2vw, 28px)",
      bottom: "clamp(16px, 3vw, 32px)",
      zIndex: 700,
      display: "flex",
      flexDirection: "column",
      gap: "0.7rem",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: toTop,
    "aria-label": "Back to top",
    title: "Back to top",
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      border: "1px solid var(--border-strong)",
      background: "var(--surface-card)",
      color: "var(--maroon-800)",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "var(--shadow-md)",
      opacity: showTop ? 1 : 0,
      transform: showTop ? "translateY(0)" : "translateY(12px)",
      pointerEvents: showTop ? "auto" : "none",
      transition: "opacity var(--dur) var(--ease-out), transform var(--dur) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up",
    size: 20
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/914952365215",
    target: "_blank",
    rel: "noopener",
    title: "WhatsApp",
    style: {
      width: 54,
      height: 54,
      borderRadius: "50%",
      background: "#25D366",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp-logo",
    weight: "fill",
    size: 28
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("admissions"),
    title: "Admission Enquiry",
    style: {
      border: "none",
      cursor: "pointer",
      padding: "0.7rem 1.1rem",
      borderRadius: "var(--radius-pill)",
      background: "var(--brand)",
      color: "var(--cream-50)",
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: "0.85rem",
      boxShadow: "var(--shadow-brand)",
      display: "inline-flex",
      gap: "0.45rem",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "paper-plane-tilt",
    size: 16
  }), " Enquire"));
}

/* ---- Footer ---- */
function SiteFooter({
  onNavigate
}) {
  const col = (title, links) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.78rem",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--gold-400)",
      fontWeight: 700,
      marginBottom: "1rem"
    }
  }, title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.6rem"
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.label
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => l.to && onNavigate(l.to),
    style: {
      color: "var(--maroon-100)",
      fontFamily: "var(--font-sans)",
      fontSize: "0.9rem",
      cursor: "pointer",
      opacity: 0.85
    }
  }, l.label)))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--maroon-950)",
      color: "var(--cream-100)",
      paddingTop: "var(--space-20)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container container--wide ft-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
      gap: "var(--space-12)",
      paddingBottom: "var(--space-16)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-lockup-cream.png",
    alt: "SGV",
    style: {
      height: 46,
      marginBottom: "1.2rem"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "0.92rem",
      lineHeight: 1.7,
      color: "var(--maroon-100)",
      maxWidth: "34ch",
      opacity: 0.85
    }
  }, "A Kerala Government recognised, English-medium co-educational school nurturing the total development of every child since 1869."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.6rem",
      marginTop: "1.4rem"
    }
  }, ["facebook-logo", "instagram-logo", "youtube-logo"].map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    style: {
      width: 38,
      height: 38,
      borderRadius: "50%",
      border: "1px solid var(--border-on-dark)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--cream-100)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s,
    size: 18
  }))))), col("Explore", [{
    label: "Heritage",
    to: "about"
  }, {
    label: "Academics",
    to: "academics"
  }, {
    label: "Facilities",
    to: "academics"
  }, {
    label: "Campus & Gallery",
    to: "gallery"
  }]), col("Admissions", [{
    label: "Apply Now",
    to: "admissions"
  }, {
    label: "Fees",
    to: "admissions"
  }, {
    label: "Affiliation",
    to: "about"
  }, {
    label: "Careers",
    to: "contact"
  }]), col("Contact", [{
    label: "0495 236 5215"
  }, {
    label: "Beach Rd, Mananchira"
  }, {
    label: "Kozhikode, Kerala 673032"
  }])), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container container--wide",
    style: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "0.5rem",
      padding: "1.4rem 0",
      fontFamily: "var(--font-sans)",
      fontSize: "0.8rem",
      color: "var(--maroon-200)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Sri Gujarati Vidyalaya Higher Secondary School"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic",
      fontFamily: "var(--font-serif)",
      color: "var(--gold-300)"
    }
  }, "\u0935\u093F\u0926\u094D\u092F\u093E \u0935\u093F\u0928\u092F\u0947\u0928 \u0936\u094B\u092D\u0924\u0947"))));
}

/* ---- Reveal on scroll (fade + rise) ---- */
function Reveal({
  children,
  delay = 0,
  y = 24,
  style,
  as = "div"
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setShown(true);
      }
    };
    const inView = () => {
      const r = node.getBoundingClientRect();
      return r.height > 0 && r.top < (window.innerHeight || 0) - 40 && r.bottom > 0;
    };
    // Poll briefly after mount so above-the-fold content reveals even if the
    // first layout frame was transient (and never triggers a scroll event).
    let tries = 0;
    const poll = setInterval(() => {
      tries += 1;
      if (inView()) {
        reveal();
        clearInterval(poll);
      }
      if (tries > 12) clearInterval(poll);
    }, 110);
    // Observer handles below-the-fold content as it scrolls into view.
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      });
    }, {
      threshold: 0.12
    });
    io.observe(node);
    return () => {
      io.disconnect();
      clearInterval(poll);
    };
  }, []);
  const Tag = as;
  // Opacity stays 1 at all times — the entrance is transform-only so content
  // is never hidden if the document timeline is paused/throttled. The fade-like
  // rise plays in normal browsers; a stalled tab just shows content in place.
  return /*#__PURE__*/React.createElement(Tag, {
    ref: ref,
    style: shown ? {
      transform: "translateY(0)",
      animation: `revealUp 0.7s var(--ease-out) ${delay}ms both`,
      ...style
    } : {
      transform: `translateY(${y}px)`,
      ...style
    }
  }, children);
}

/* ---- Section heading with gold rule (local, dark-aware) ---- */
function Kicker({
  children,
  tone
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: tone === "inverse" ? {
      color: "var(--gold-400)"
    } : undefined
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 1.5,
      background: "currentColor",
      display: "inline-block"
    }
  }), children);
}

/* ---- Standard inner-page hero ---- */
function PageHero({
  eyebrow,
  title,
  lead,
  image,
  onNavigate,
  crumb
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      overflow: "hidden",
      background: "var(--maroon-900)"
    }
  }, image && /*#__PURE__*/React.createElement(Img, {
    src: image,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      opacity: 0.28
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/crest-cream.png",
    alt: "",
    style: {
      position: "absolute",
      right: "-30px",
      bottom: "-40px",
      height: "150%",
      opacity: 0.06
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "container container--wide",
    style: {
      position: "relative",
      paddingTop: "var(--space-16)",
      paddingBottom: "var(--space-12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
      fontFamily: "var(--font-sans)",
      fontSize: "0.82rem",
      color: "var(--maroon-200)",
      marginBottom: "1.2rem"
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate && onNavigate("home"),
    style: {
      color: "var(--maroon-200)",
      cursor: "pointer"
    }
  }, "Home"), /*#__PURE__*/React.createElement(Icon, {
    name: "caret-right",
    size: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--gold-300)"
    }
  }, crumb || title)), /*#__PURE__*/React.createElement(Kicker, {
    tone: "inverse"
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      color: "var(--cream-50)",
      fontWeight: 500,
      fontSize: "clamp(2.2rem, 1.5rem + 3vw, 3.6rem)",
      lineHeight: 1.05,
      margin: "1rem 0 0",
      maxWidth: "18ch",
      letterSpacing: "-0.02em"
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--cream-100)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-lead)",
      marginTop: "1.2rem",
      maxWidth: "52ch",
      lineHeight: 1.6,
      opacity: 0.92
    }
  }, lead)));
}
Object.assign(window, {
  Img,
  Icon,
  Reveal,
  Kicker,
  PageHero,
  SiteHeader,
  SiteFooter,
  QuickActions,
  NAV,
  IMG
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

})();
