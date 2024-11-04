import {g as getFaviconForPageURL, a as assertNotReached, s as sanitizeInnerHtml, b as assert, I as I18nMixin, h as hasKeyModifiers, W as WindowProxy, c as getCss$4, E as EventTracker, N as NewTabPageProxy, d as skColorToRgba, H as HelpBubbleProxyImpl, e as debounceEnd, f as HelpBubbleController, i as HELP_BUBBLE_DISMISSED_EVENT, j as HELP_BUBBLE_TIMED_OUT_EVENT, k as HelpBubbleClosedReason, l as getCss$5, m as getCss$6, r as recordDuration, F as FocusOutlineManager, n as recordVoiceAction, A as Action, o as recordLoadDuration, p as hexColorToSkColor, C as Command, B as BrowserCommandProxy, q as getTrustedScriptURL} from "./shared.rollup.js";
export {t as CrAutoImgElement, J as VoiceError, y as checkTransparency, u as getTrustedHTML, z as isBMP, D as isPNG, G as isWebP, v as processFile, w as recordOccurence, x as recordPerdecage} from "./shared.rollup.js";
import {loadTimeData} from "chrome://resources/js/load_time_data.js";
import {html, PolymerElement, dedupingMixin} from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
export {DomIf} from "chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";
import {SideType, RenderType, PageHandler, PageCallbackRouter, SelectionLineState} from "chrome://resources/cr_components/searchbox/searchbox.mojom-webui.js";
import {mojo} from "chrome://resources/mojo/mojo/public/js/bindings.js";
import {TimeDeltaSpec} from "chrome://resources/mojo/mojo/public/mojom/base/time.mojom-webui.js";
import {addWebUiListener, removeWebUiListener} from "chrome://resources/js/cr.js";
import {css, html as html$1, nothing, CrLitElement} from "chrome://resources/lit/v3_0/lit.rollup.js";
import {DoodleShareChannel, DoodleImageType, IphFeature, NtpBackgroundImageSource, CustomizeChromeSection} from "./new_tab_page.mojom-webui.js";
import "./strings.m.js";
import {PageCallbackRouter as PageCallbackRouter$1, PageHandler as PageHandler$1} from "chrome://resources/cr_components/color_change_listener/color_change_listener.mojom-webui.js";
function getTemplate$5() {
    return html`<!--_html_template_start_--><style>:host{--cr-realbox-icon-border-radius:8px;align-items:center;display:flex;flex-shrink:0;justify-content:center;width:32px}:host([expanded-state-icons-chrome-refresh]:not([in-side-panel_])){--cr-realbox-icon-border-radius:4px}#container{align-items:center;aspect-ratio:1/1;border-radius:var(--cr-realbox-icon-border-radius);display:flex;justify-content:center;overflow:hidden;position:relative;width:100%}:host-context(cr-searchbox-match[has-image]):host(:not([is-weather-answer])) #container{background-color:var(--color-realbox-results-icon-container-background,var(--container-bg-color))}:host-context(cr-searchbox-match[is-rich-suggestion]:not([has-image])):host(:not([has-icon-container-background])) #container{background-color:var(--google-blue-600);border-radius:50%;height:24px;width:24px}:host([has-icon-container-background]:not([in-searchbox])) #container{background-color:var(--color-realbox-answer-icon-background)}:host([is-weather-answer]:not([in-searchbox])) #container{background-color:var(--color-realbox-results-background)}#image{display:none;height:100%;object-fit:contain;width:100%}:host-context(cr-searchbox-match[has-image]) #image{display:initial}:host([is-answer]) #image{max-height:24px;max-width:24px}#imageOverlay{display:none}:host-context(cr-searchbox-match[is-entity-suggestion][has-image]) #imageOverlay{background:#000;display:block;inset:0;opacity:.05;position:absolute}#icon{-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;-webkit-mask-size:16px;background-color:var(--color-realbox-search-icon-background);background-position:center center;background-repeat:no-repeat;background-size:16px;height:24px;width:24px}:host-context(cr-searchbox-match[has-image]) #icon{display:none}:host-context(cr-searchbox-match[is-rich-suggestion]) #icon{background-color:#fff}:host([in-searchbox][background-image*='//resources/cr_components/omnibox/icons/google_g.svg']) #icon{background-size:24px}:host([in-searchbox]) #icon{-webkit-mask-size:var(--cr-realbox-icon-size-in-searchbox);background-size:var(--cr-realbox-icon-size-in-searchbox)}:host([has-icon-container-background]:not([in-searchbox])) #icon{background-color:var(--color-realbox-answer-icon-foreground)}:host(:not([in-searchbox])[in-side-panel_]) #container{background-color:#f1f3f4;border-radius:4000px}:host-context([dark-mode]):host(:not([in-searchbox])[in-side-panel_]) #container{background-color:#303134}</style>
<div id="container" style="--container-bg-color:[[containerBgColor_(match.imageDominantColor, imageLoading_) ]]">
  <img id="image" src="[[imageSrc_]]" on-load="onImageLoad_">
  <div id="imageOverlay"></div>
  
  <div id="icon" style$="[[iconStyle_]]"></div>
</div>
<!--_html_template_end_-->`
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const CALCULATOR = "search-calculator-answer";
const DOCUMENT_MATCH_TYPE = "document";
const HISTORY_CLUSTER_MATCH_TYPE = "history-cluster";
const PEDAL = "pedal";
class SearchboxIconElement extends PolymerElement {
    static get is() {
        return "cr-searchbox-icon"
    }
    static get template() {
        return getTemplate$5()
    }
    static get properties() {
        return {
            backgroundImage: {
                type: String,
                computed: `computeBackgroundImage_(match.*)`,
                reflectToAttribute: true
            },
            defaultIcon: {
                type: String,
                value: ""
            },
            expandedStateIconsChromeRefresh: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxCr23ExpandedStateIcons"),
                reflectToAttribute: true
            },
            hasIconContainerBackground: {
                type: Boolean,
                computed: `computeHasIconContainerBackground_(match.*, isWeatherAnswer)`,
                reflectToAttribute: true
            },
            inSearchbox: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            isAnswer: {
                type: Boolean,
                computed: `computeIsAnswer_(match)`,
                reflectToAttribute: true
            },
            isWeatherAnswer: {
                type: Boolean,
                computed: `computeIsWeatherAnswer_(match)`,
                reflectToAttribute: true
            },
            maskImage: {
                type: String,
                computed: `computeMaskImage_(match)`,
                reflectToAttribute: true
            },
            match: {
                type: Object
            },
            iconStyle_: {
                type: String,
                computed: `computeIconStyle_(backgroundImage, maskImage)`
            },
            imageSrc_: {
                type: String,
                computed: `computeImageSrc_(match.imageUrl, match)`,
                observer: "onImageSrcChanged_"
            },
            imageLoading_: {
                type: Boolean,
                value: false
            },
            inSidePanel_: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("searchboxInSidePanel"),
                reflectToAttribute: true
            }
        }
    }
    computeBackgroundImage_() {
        if (this.match && !this.match.isSearchType) {
            if (this.match.type !== DOCUMENT_MATCH_TYPE && this.match.type !== HISTORY_CLUSTER_MATCH_TYPE && this.match.type !== PEDAL) {
                return getFaviconForPageURL(this.match.destinationUrl.url, false, "", 16, true)
            }
            if (this.match.type === DOCUMENT_MATCH_TYPE || this.match.type === PEDAL) {
                return `url(${this.match.iconUrl})`
            }
        }
        if (this.defaultIcon === "//resources/cr_components/searchbox/icons/google_g.svg") {
            return `url(${this.defaultIcon})`
        }
        return ""
    }
    computeIsAnswer_() {
        return this.match && !!this.match.answer
    }
    computeIsWeatherAnswer_() {
        return this.match?.isWeatherAnswerSuggestion || false
    }
    computeMaskImage_() {
        if (this.match && (!this.match.isRichSuggestion || !this.inSearchbox)) {
            return `url(${this.match.iconUrl})`
        } else {
            return `url(${this.defaultIcon})`
        }
    }
    computeIconStyle_() {
        if (this.expandedStateIconsChromeRefresh) {
            if (this.showBackgroundImage_()) {
                return `background-image: ${this.backgroundImage};` + `background-color: transparent;`
            } else {
                return `-webkit-mask-image: ${this.maskImage};`
            }
        }
        if (this.backgroundImage) {
            return `background-image: ${this.backgroundImage};` + `background-color: transparent;`
        } else {
            return `-webkit-mask-image: ${this.maskImage};`
        }
    }
    showBackgroundImage_() {
        const imageUrl = this.backgroundImage;
        if (!imageUrl) {
            return false
        }
        const themedIcons = ["calendar", "drive_docs", "drive_folder", "drive_form", "drive_image", "drive_logo", "drive_pdf", "drive_sheets", "drive_slides", "drive_video", "google_g", "note", "sites"];
        for (const icon of themedIcons) {
            if (imageUrl === "url(//resources/cr_components/searchbox/icons/" + icon + ".svg)") {
                return true
            }
        }
        return false
    }
    computeImageSrc_() {
        const imageUrl = this.match?.imageUrl;
        if (!imageUrl) {
            return ""
        }
        if (imageUrl.startsWith("data:image/")) {
            return imageUrl
        }
        return `//image?staticEncode=true&encodeType=webp&url=${imageUrl}`
    }
    containerBgColor_(imageDominantColor, imageLoading) {
        return imageLoading && imageDominantColor ? `${imageDominantColor}40` : "transparent"
    }
    onImageSrcChanged_() {
        this.imageLoading_ = !!this.imageSrc_
    }
    onImageLoad_() {
        this.imageLoading_ = false
    }
    computeHasIconContainerBackground_() {
        if (this.expandedStateIconsChromeRefresh && this.match) {
            return this.match.type === PEDAL || this.match.type === HISTORY_CLUSTER_MATCH_TYPE || this.match.type === CALCULATOR || !!this.match.answer && !this.isWeatherAnswer
        }
        return false
    }
}
customElements.define(SearchboxIconElement.is, SearchboxIconElement);
function getTemplate$4() {
    return html`<!--_html_template_start_--><style import="cr-shared-style">:host{--action-height:32px;border:solid 1px var(--google-grey-400);border-radius:calc(var(--action-height)/ 2);display:flex;height:var(--action-height);min-width:0;outline:0;padding-inline-end:16px;padding-inline-start:12px}:host-context([expanded-state-layout-chrome-refresh]){--action-height:28px;border:solid 1px var(--color-realbox-results-action-chip);border-radius:8px;padding-inline-end:8px;padding-inline-start:8px}.contents{align-items:center;display:flex;min-width:0}#action-icon{flex-shrink:0;height:var(--cr-icon-size);width:var(--cr-icon-size)}:host-context([expanded-state-layout-chrome-refresh]) #action-icon{-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;-webkit-mask-size:15px;background-color:var(--color-realbox-results-action-chip-icon);background-position:center center;background-repeat:no-repeat;height:16px;width:16px}#text{overflow:hidden;padding-inline-start:8px;text-overflow:ellipsis;white-space:nowrap}:host(:hover){background-color:var(--color-realbox-results-button-hover)}:host-context(.focus-outline-visible):host(:focus){border:solid 1px transparent;box-shadow:inset 0 0 0 2px var(--google-blue-600)}:host-context([expanded-state-layout-chrome-refresh]):host(:focus){margin:2px;margin-inline-end:2px;border:solid 1px var(--color-realbox-results-action-chip);box-shadow:none}</style>
<div class="contents" title="[[tooltip_]]">
  <div id="action-icon" style$="-webkit-mask-image: url([[action.iconUrl]])" hidden="[[!showCr23ActionIcon_()]]"></div>
  <img id="action-icon" src$="[[action.iconUrl]]" hidden="[[showCr23ActionIcon_()]]">
  <div id="text" inner-h-t-m-l="[[hintHtml_]]"></div>
</div>

<!--_html_template_end_-->`
}
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function decodeString16(str) {
    return str ? str.data.map((ch => String.fromCodePoint(ch))).join("") : ""
}
function mojoString16(str) {
    const array = new Array(str.length);
    for (let i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i)
    }
    return {
        data: array
    }
}
function mojoTimeTicks(timeTicks) {
    return {
        internalValue: BigInt(Math.floor(timeTicks * 1e3))
    }
}
function sideTypeToClass(sideType) {
    switch (sideType) {
    case SideType.kDefaultPrimary:
        return "primary-side";
    case SideType.kSecondary:
        return "secondary-side";
    default:
        assertNotReached("Unexpected side type")
    }
}
function renderTypeToClass(renderType) {
    switch (renderType) {
    case RenderType.kDefaultVertical:
        return "vertical";
    case RenderType.kHorizontal:
        return "horizontal";
    case RenderType.kGrid:
        return "grid";
    default:
        assertNotReached("Unexpected render type")
    }
}
// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class SearchboxActionElement extends PolymerElement {
    static get is() {
        return "cr-searchbox-action"
    }
    static get template() {
        return getTemplate$4()
    }
    static get properties() {
        return {
            action: {
                type: Object
            },
            actionIndex: {
                type: Number,
                value: -1
            },
            matchIndex: {
                type: Number,
                value: -1
            },
            ariaLabel: {
                type: String,
                computed: `computeAriaLabel_(action)`,
                reflectToAttribute: true
            },
            hintHtml_: {
                type: String,
                computed: `computeHintHtml_(action)`
            },
            tooltip_: {
                type: String,
                computed: `computeTooltip_(action)`
            }
        }
    }
    ready() {
        super.ready();
        this.addEventListener("click", (event => this.onActionClick_(event)));
        this.addEventListener("keydown", (event => this.onActionKeyDown_(event)));
        this.addEventListener("mousedown", (event => this.onActionMouseDown_(event)))
    }
    onActionClick_(e) {
        this.dispatchEvent(new CustomEvent("execute-action",{
            bubbles: true,
            composed: true,
            detail: {
                event: e,
                actionIndex: this.actionIndex
            }
        }));
        e.preventDefault();
        e.stopPropagation()
    }
    onActionKeyDown_(e) {
        if (e.key && (e.key === "Enter" || e.key === " ")) {
            this.onActionClick_(e)
        }
    }
    onActionMouseDown_(e) {
        if (loadTimeData.getBoolean("realboxCr23ExpandedStateLayout")) {
            e.preventDefault()
        }
    }
    showCr23ActionIcon_() {
        return loadTimeData.getBoolean("realboxCr23ExpandedStateLayout")
    }
    computeAriaLabel_() {
        if (this.action.a11yLabel) {
            return decodeString16(this.action.a11yLabel)
        }
        return ""
    }
    computeHintHtml_() {
        if (this.action.hint) {
            return sanitizeInnerHtml(decodeString16(this.action.hint))
        }
        return window.trustedTypes.emptyHTML
    }
    computeTooltip_() {
        if (this.action.suggestionContents) {
            return decodeString16(this.action.suggestionContents)
        }
        return ""
    }
}
customElements.define(SearchboxActionElement.is, SearchboxActionElement);
const styleMod = document.createElement("dom-module");
styleMod.appendChild(html`
  <template>
    <style>
.action-icon{--cr-icon-button-active-background-color:var(--color-new-tab-page-active-background);--cr-icon-button-fill-color:var(--color-realbox-results-icon);--cr-icon-button-focus-outline-color:var(--color-realbox-results-icon-focused-outline);--cr-icon-button-hover-background-color:var(--color-realbox-results-button-hover);--cr-icon-button-icon-size:16px;--cr-icon-button-margin-end:0;--cr-icon-button-margin-start:0;--cr-icon-button-size:24px}
    </style>
  </template>
`.content);
styleMod.register("searchbox-dropdown-shared-style");
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
({
    $: mojo.internal.Enum()
});
var NavigationPredictor;
(function(NavigationPredictor) {
    NavigationPredictor[NavigationPredictor["MIN_VALUE"] = 1] = "MIN_VALUE";
    NavigationPredictor[NavigationPredictor["MAX_VALUE"] = 3] = "MAX_VALUE";
    NavigationPredictor[NavigationPredictor["kMouseDown"] = 1] = "kMouseDown";
    NavigationPredictor[NavigationPredictor["kUpOrDownArrowButton"] = 2] = "kUpOrDownArrowButton";
    NavigationPredictor[NavigationPredictor["kTouchDown"] = 3] = "kTouchDown"
}
)(NavigationPredictor || (NavigationPredictor = {}));
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$8 = null;
class SearchboxBrowserProxy {
    static getInstance() {
        return instance$8 || (instance$8 = new SearchboxBrowserProxy)
    }
    static setInstance(newInstance) {
        instance$8 = newInstance
    }
    constructor() {
        this.handler = PageHandler.getRemote();
        this.callbackRouter = new PageCallbackRouter;
        this.handler.setPage(this.callbackRouter.$.bindNewPipeAndPassRemote())
    }
}
function getTemplate$3() {
    return html`<!--_html_template_start_--><style include="cr-hidden-style cr-icons searchbox-dropdown-shared-style">:host{display:block;outline:0}#action{margin-inline-end:8px}:host-context([expanded-state-layout-chrome-refresh]) #action{margin-inline-end:2px}#actions-focus-border{overflow:hidden}#actions-focus-border:focus-within,#actions-focus-border:focus-within:has(#action:active){outline:2px solid var(--color-realbox-results-action-chip-focus-outline);border-radius:10px;margin-inline-start:-2px}#actions-focus-border:has(#action:active){outline:0}.container{align-items:center;cursor:default;display:flex;overflow:hidden;padding-bottom:6px;padding-inline-end:16px;padding-inline-start:12px;padding-top:6px;position:relative}.container+.container{flex-direction:row;margin-inline-start:40px;padding-top:0;padding-bottom:12px}:host([has-outset-action-focus-ring]:not([realbox-consistent-row-height])) .container{height:38px;padding-top:3px;padding-bottom:3px}:host([realbox-consistent-row-height]) .container{height:38px;padding-top:5px;padding-bottom:5px}:host-context([chrome-refresh-hover-shape]) .container:not(.actions){margin-inline-end:16px;border-top-right-radius:24px;border-bottom-right-radius:24px}:host-context([chrome-refresh-hover-shape]):host-context([has-secondary-side]):host-context([can-show-secondary-side]) .container:not(.actions){margin-inline-end:0}:host-context([chrome-refresh-hover-shape]) .container:not(.actions):hover,:host-context([chrome-refresh-hover-shape]):host(:is(:focus-visible,[selected])) .container:not(.actions){background-color:var(--color-realbox-results-background-hovered)}.actions.container{align-self:center;flex-grow:1;flex-shrink:0;padding-bottom:0;padding-inline-end:0;padding-inline-start:0;padding-top:0;display:none}:host-context(.vertical) .actions.container{display:flex}:host([has-action]) .actions.container{padding-inline-end:8px;padding-inline-start:8px}#contents,#description{overflow:hidden;text-overflow:ellipsis}#ellipsis{inset-inline-end:0;position:absolute}:host([show-thumbnail]) #ellipsis{position:relative}#focus-indicator{background-color:var(--color-realbox-results-focus-indicator);border-radius:3px;display:none;height:100%;margin-inline-start:-15px;position:absolute;width:6px}:host-context([expanded-state-layout-chrome-refresh]) #focus-indicator{width:7px}:host-context(.vertical):host(:is(:focus-visible,[selected]:not(:focus-within))) #focus-indicator:not(.selected-within){display:block}#prefix{opacity:0}#separator{white-space:pre}#tail-suggest-prefix{position:relative}#text-container{align-items:center;display:flex;flex-grow:0;overflow:hidden;padding-inline-end:8px;padding-inline-start:8px;white-space:nowrap}:host([has-action]) #text-container{padding-inline-end:4px}:host([is-rich-suggestion]) #text-container{align-items:flex-start;flex-direction:column}:host([is-rich-suggestion]) #separator{display:none}:host([is-rich-suggestion]) #contents,:host([is-rich-suggestion]) #description{width:100%}:host([is-rich-suggestion]) #description{font-size:.875em}.match{font-weight:var(--cr-realbox-match-font-weight,600)}#contents span:not(.match),#ellipsis{color:var(--color-realbox-results-typed-prefix,--color-realbox-results-foreground)}:host-context([has-empty-input]) #contents span,:host-context([has-empty-input]) #ellipsis{color:var(--color-realbox-results-foreground)}#description,.dim{color:var(--color-realbox-results-foreground-dimmed)}:host-context(cr-searchbox-match:-webkit-any(:focus-within,[selected])) .dim,:host-context(cr-searchbox-match:-webkit-any(:focus-within,[selected])):host([is-entity-suggestion]) #description{color:var(--color-realbox-results-dim-selected)}#description:has(.url),.url{color:var(--color-realbox-results-url)}:host-context(cr-searchbox-match:-webkit-any(:focus-within,[selected])) .url{color:var(--color-realbox-results-url-selected)}#remove{--cr-icon-button-fill-color:var(--color-realbox-results-icon-selected);display:none;margin-inline-end:1px}:host-context(.vertical) .container:hover #remove,:host-context(cr-searchbox-match:-webkit-any(:focus-within,[selected])):host-context(.vertical) #remove{display:inline-flex}.selected{box-shadow:inset 0 0 0 2px var(--color-realbox-results-icon-focused-outline)}:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]),:host-context([chrome-refresh-hover-shape]):host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) .container{border-radius:16px}:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) .container{box-sizing:border-box;flex-direction:column;margin-inline-end:0;padding:6px;padding-block-end:16px;width:102px;height:auto}:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) .focus-indicator{display:none}:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) #icon{--cr-realbox-icon-border-radius:12px;--color-realbox-results-icon-container-background:transparent;height:90px;margin-block-end:8px;width:90px}:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) #text-container{padding:0;white-space:normal;width:100%}:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) #contents,:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) #description{-webkit-box-orient:vertical;-webkit-line-clamp:2;display:-webkit-box;font-weight:400;overflow:hidden}:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) #contents{font-size:13px;line-height:20px;margin-block-end:4px}:host-context(.secondary-side):host-context(.horizontal):host([is-entity-suggestion][has-image]) #description{font-size:12px;line-height:16px}</style>
<div class="container" aria-hidden="true">
  <div id="focus-indicator"></div>
  <cr-searchbox-icon id="icon" match="[[match]]"></cr-searchbox-icon>
  <div id="text-container">
    <span id="tail-suggest-prefix" hidden$="[[!tailSuggestPrefix_]]">
      <span id="prefix">[[tailSuggestPrefix_]]</span>
      
      <span id="ellipsis">...&nbsp</span>
    </span>
    
    <span id="ellipsis" hidden$="[[!showThumbnail]]">...&nbsp</span>
    <span id="contents" inner-h-t-m-l="[[contentsHtml_]]"></span>
    <span id="separator" class="dim">[[separatorText_]]</span>
    <span id="description" inner-h-t-m-l="[[descriptionHtml_]]"></span>
  </div>
  <div class="actions container" aria-hidden="true">
    <template is="dom-repeat" items="[[match.actions]]">
      <template is="dom-if" if="[[expandedStateIconsChromeRefresh]]">
        <div id="actions-focus-border">
          <cr-searchbox-action id="action" action="[[item]]" action-index="[[actionIndex_(item)]]" on-execute-action="onExecuteAction_" tabindex="1">
          </cr-searchbox-action>
        </div>
      </template>
      <template is="dom-if" if="[[!expandedStateIconsChromeRefresh]]">
        <cr-searchbox-action id="action" action="[[item]]" action-index="[[actionIndex_(item)]]" on-execute-action="onExecuteAction_" tabindex="1">
        </cr-searchbox-action>
      </template>
    </template>
  </div>
  <cr-icon-button id="remove" class="action-icon icon-clear" aria-label="[[removeButtonAriaLabel_]]" on-click="onRemoveButtonClick_" on-mousedown="onRemoveButtonMouseDown_" title="[[removeButtonTitle_]]" hidden$="[[!match.supportsDeletion]]" tabindex="2">
  </cr-icon-button>
</div>
<!--_html_template_end_-->`
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var AcMatchClassificationStyle;
(function(AcMatchClassificationStyle) {
    AcMatchClassificationStyle[AcMatchClassificationStyle["NONE"] = 0] = "NONE";
    AcMatchClassificationStyle[AcMatchClassificationStyle["URL"] = 1] = "URL";
    AcMatchClassificationStyle[AcMatchClassificationStyle["MATCH"] = 2] = "MATCH";
    AcMatchClassificationStyle[AcMatchClassificationStyle["DIM"] = 4] = "DIM"
}
)(AcMatchClassificationStyle || (AcMatchClassificationStyle = {}));
const ENTITY_MATCH_TYPE = "search-suggest-entity";
class SearchboxMatchElement extends PolymerElement {
    static get is() {
        return "cr-searchbox-match"
    }
    static get template() {
        return getTemplate$3()
    }
    static get properties() {
        return {
            ariaLabel: {
                type: String,
                computed: `computeAriaLabel_(match.a11yLabel)`,
                reflectToAttribute: true
            },
            expandedStateIconsChromeRefresh: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxCr23ExpandedStateLayout")
            },
            hasAction: {
                type: Boolean,
                computed: `computeHasAction_(match.actions)`,
                reflectToAttribute: true
            },
            hasOutsetActionFocusRing: {
                type: Boolean,
                computed: `computeHasOutsetActionFocusRing_(hasAction)`,
                reflectToAttribute: true
            },
            hasImage: {
                type: Boolean,
                computed: `computeHasImage_(match)`,
                reflectToAttribute: true
            },
            isEntitySuggestion: {
                type: Boolean,
                computed: `computeIsEntitySuggestion_(match)`,
                reflectToAttribute: true
            },
            isRichSuggestion: {
                type: Boolean,
                computed: `computeIsRichSuggestion_(match)`,
                reflectToAttribute: true
            },
            match: Object,
            matchIndex: {
                type: Number,
                value: -1
            },
            realboxConsistentRowHeight: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxCr23ConsistentRowHeight"),
                reflectToAttribute: true
            },
            renderType: {
                type: String,
                reflectToAttribute: true
            },
            showThumbnail: {
                type: Boolean,
                reflectToAttribute: true
            },
            sideType: Number,
            contentsHtml_: {
                type: String,
                computed: `computeContentsHtml_(match)`
            },
            descriptionHtml_: {
                type: String,
                computed: `computeDescriptionHtml_(match)`
            },
            removeButtonAriaLabel_: {
                type: String,
                computed: `computeRemoveButtonAriaLabel_(match.removeButtonA11yLabel)`
            },
            removeButtonTitle_: {
                type: String,
                value: () => loadTimeData.getString("removeSuggestion")
            },
            separatorText_: {
                type: String,
                computed: `computeSeparatorText_(match)`
            },
            tailSuggestPrefix_: {
                type: String,
                computed: `computeTailSuggestPrefix_(match)`
            }
        }
    }
    constructor() {
        super();
        this.pageHandler_ = SearchboxBrowserProxy.getInstance().handler
    }
    ready() {
        super.ready();
        this.addEventListener("click", (event => this.onMatchClick_(event)));
        this.addEventListener("focusin", ( () => this.onMatchFocusin_()));
        this.addEventListener("mousedown", ( () => this.onMatchMouseDown_()))
    }
    onExecuteAction_(e) {
        const event = e.detail.event;
        this.pageHandler_.executeAction(this.matchIndex, e.detail.actionIndex, this.match.destinationUrl, mojoTimeTicks(Date.now()), event.button || 0, event.altKey, event.ctrlKey, event.metaKey, event.shiftKey)
    }
    onMatchClick_(e) {
        if (e.button > 1) {
            return
        }
        e.preventDefault();
        e.stopPropagation();
        this.pageHandler_.openAutocompleteMatch(this.matchIndex, this.match.destinationUrl, true, e.button || 0, e.altKey, e.ctrlKey, e.metaKey, e.shiftKey);
        this.dispatchEvent(new CustomEvent("match-click",{
            bubbles: true,
            composed: true
        }))
    }
    onMatchFocusin_() {
        this.dispatchEvent(new CustomEvent("match-focusin",{
            bubbles: true,
            composed: true,
            detail: this.matchIndex
        }))
    }
    onMatchMouseDown_() {
        this.pageHandler_.onNavigationLikely(this.matchIndex, this.match.destinationUrl, NavigationPredictor.kMouseDown)
    }
    onRemoveButtonClick_(e) {
        if (e.button !== 0) {
            return
        }
        e.preventDefault();
        e.stopPropagation();
        this.pageHandler_.deleteAutocompleteMatch(this.matchIndex, this.match.destinationUrl)
    }
    onRemoveButtonMouseDown_(e) {
        e.preventDefault()
    }
    actionIndex_(action) {
        return this.match?.actions?.indexOf(action) ?? -1
    }
    computeAriaLabel_() {
        if (!this.match) {
            return ""
        }
        return decodeString16(this.match.a11yLabel)
    }
    sanitizeInnerHtml_(html) {
        return sanitizeInnerHtml(html, {
            attrs: ["class"]
        })
    }
    computeContentsHtml_() {
        if (!this.match) {
            return window.trustedTypes.emptyHTML
        }
        const match = this.match;
        const matchContents = match.answer ? match.answer.firstLine : match.contents;
        return match.swapContentsAndDescription ? this.sanitizeInnerHtml_(this.renderTextWithClassifications_(decodeString16(match.description), match.descriptionClass).innerHTML) : this.sanitizeInnerHtml_(this.renderTextWithClassifications_(decodeString16(matchContents), match.contentsClass).innerHTML)
    }
    computeDescriptionHtml_() {
        if (!this.match) {
            return window.trustedTypes.emptyHTML
        }
        const match = this.match;
        if (match.answer) {
            return this.sanitizeInnerHtml_(decodeString16(match.answer.secondLine))
        }
        return match.swapContentsAndDescription ? this.sanitizeInnerHtml_(this.renderTextWithClassifications_(decodeString16(match.contents), match.contentsClass).innerHTML) : this.sanitizeInnerHtml_(this.renderTextWithClassifications_(decodeString16(match.description), match.descriptionClass).innerHTML)
    }
    computeHasAction_() {
        return this.match?.actions?.length > 0
    }
    computeHasOutsetActionFocusRing_() {
        return this.expandedStateIconsChromeRefresh && this.hasAction
    }
    computeTailSuggestPrefix_() {
        if (!this.match || !this.match.tailSuggestCommonPrefix) {
            return ""
        }
        const prefix = decodeString16(this.match.tailSuggestCommonPrefix);
        if (prefix.slice(-1) === " ") {
            return prefix.slice(0, -1) + " "
        }
        return prefix
    }
    computeHasImage_() {
        return this.match && !!this.match.imageUrl
    }
    computeIsEntitySuggestion_() {
        return this.match && this.match.type === ENTITY_MATCH_TYPE
    }
    computeIsRichSuggestion_() {
        return this.match && this.match.isRichSuggestion
    }
    computeRemoveButtonAriaLabel_() {
        if (!this.match) {
            return ""
        }
        return decodeString16(this.match.removeButtonA11yLabel)
    }
    computeSeparatorText_() {
        return this.match && decodeString16(this.match.description) ? loadTimeData.getString("realboxSeparator") : ""
    }
    convertClassificationStyleToCssClasses_(style) {
        const classes = [];
        if (style & AcMatchClassificationStyle.DIM) {
            classes.push("dim")
        }
        if (style & AcMatchClassificationStyle.MATCH) {
            classes.push("match")
        }
        if (style & AcMatchClassificationStyle.URL) {
            classes.push("url")
        }
        return classes
    }
    createSpanWithClasses_(text, classes) {
        const span = document.createElement("span");
        if (classes.length) {
            span.classList.add(...classes)
        }
        span.textContent = text;
        return span
    }
    renderTextWithClassifications_(text, classifications) {
        return classifications.map(( ({offset: offset, style: style}, index) => {
            const next = classifications[index + 1] || {
                offset: text.length
            };
            const subText = text.substring(offset, next.offset);
            const classes = this.convertClassificationStyleToCssClasses_(style);
            return this.createSpanWithClasses_(subText, classes)
        }
        )).reduce(( (container, currentElement) => {
            container.appendChild(currentElement);
            return container
        }
        ), document.createElement("span"))
    }
    updateSelection(selection) {
        this.$["focus-indicator"].classList.toggle("selected-within", selection.state !== SelectionLineState.kNormal && selection.line === this.matchIndex);
        this.$.remove.classList.toggle("selected", selection.state === SelectionLineState.kFocusedButtonRemoveSuggestion && selection.line === this.matchIndex);
        [...this.shadowRoot.querySelectorAll("cr-searchbox-action")].forEach(( (action, index) => {
            action.classList.toggle("selected", selection.state === SelectionLineState.kFocusedButtonAction && selection.actionIndex === index && selection.line === this.matchIndex)
        }
        ))
    }
}
customElements.define(SearchboxMatchElement.is, SearchboxMatchElement);
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class PageMetricsHostPendingReceiver {
    handle;
    constructor(handle) {
        this.handle = mojo.internal.interfaceSupport.getEndpointForReceiver(handle)
    }
    bindInBrowser(scope="context") {
        mojo.internal.interfaceSupport.bind(this.handle, "metrics_reporter.mojom.PageMetricsHost", scope)
    }
}
class PageMetricsHostRemote {
    proxy;
    $;
    onConnectionError;
    constructor(handle) {
        this.proxy = new mojo.internal.interfaceSupport.InterfaceRemoteBase(PageMetricsHostPendingReceiver,handle);
        this.$ = new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);
        this.onConnectionError = this.proxy.getConnectionErrorEventRouter()
    }
    onPageRemoteCreated(page) {
        this.proxy.sendMessage(977989980, PageMetricsHost_OnPageRemoteCreated_ParamsSpec.$, null, [page])
    }
    onGetMark(name) {
        return this.proxy.sendMessage(645454336, PageMetricsHost_OnGetMark_ParamsSpec.$, PageMetricsHost_OnGetMark_ResponseParamsSpec.$, [name])
    }
    onClearMark(name) {
        this.proxy.sendMessage(1370609582, PageMetricsHost_OnClearMark_ParamsSpec.$, null, [name])
    }
    onUmaReportTime(name, time) {
        this.proxy.sendMessage(1695981149, PageMetricsHost_OnUmaReportTime_ParamsSpec.$, null, [name, time])
    }
}
class PageMetricsHost {
    static get $interfaceName() {
        return "metrics_reporter.mojom.PageMetricsHost"
    }
    static getRemote() {
        let remote = new PageMetricsHostRemote;
        remote.$.bindNewPipeAndPassReceiver().bindInBrowser();
        return remote
    }
}
class PageMetricsPendingReceiver {
    handle;
    constructor(handle) {
        this.handle = mojo.internal.interfaceSupport.getEndpointForReceiver(handle)
    }
    bindInBrowser(scope="context") {
        mojo.internal.interfaceSupport.bind(this.handle, "metrics_reporter.mojom.PageMetrics", scope)
    }
}
class PageMetricsRemote {
    proxy;
    $;
    onConnectionError;
    constructor(handle) {
        this.proxy = new mojo.internal.interfaceSupport.InterfaceRemoteBase(PageMetricsPendingReceiver,handle);
        this.$ = new mojo.internal.interfaceSupport.InterfaceRemoteBaseWrapper(this.proxy);
        this.onConnectionError = this.proxy.getConnectionErrorEventRouter()
    }
    onGetMark(name) {
        return this.proxy.sendMessage(659484507, PageMetrics_OnGetMark_ParamsSpec.$, PageMetrics_OnGetMark_ResponseParamsSpec.$, [name])
    }
    onClearMark(name) {
        this.proxy.sendMessage(431844568, PageMetrics_OnClearMark_ParamsSpec.$, null, [name])
    }
}
class PageMetricsCallbackRouter {
    helper_internal_;
    $;
    router_;
    onGetMark;
    onClearMark;
    onConnectionError;
    constructor() {
        this.helper_internal_ = new mojo.internal.interfaceSupport.InterfaceReceiverHelperInternal(PageMetricsRemote);
        this.$ = new mojo.internal.interfaceSupport.InterfaceReceiverHelper(this.helper_internal_);
        this.router_ = new mojo.internal.interfaceSupport.CallbackRouter;
        this.onGetMark = new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(659484507, PageMetrics_OnGetMark_ParamsSpec.$, PageMetrics_OnGetMark_ResponseParamsSpec.$, this.onGetMark.createReceiverHandler(true));
        this.onClearMark = new mojo.internal.interfaceSupport.InterfaceCallbackReceiver(this.router_);
        this.helper_internal_.registerHandler(431844568, PageMetrics_OnClearMark_ParamsSpec.$, null, this.onClearMark.createReceiverHandler(false));
        this.onConnectionError = this.helper_internal_.getConnectionErrorEventRouter()
    }
    removeListener(id) {
        return this.router_.removeListener(id)
    }
}
const PageMetricsHost_OnPageRemoteCreated_ParamsSpec = {
    $: {}
};
const PageMetricsHost_OnGetMark_ParamsSpec = {
    $: {}
};
const PageMetricsHost_OnGetMark_ResponseParamsSpec = {
    $: {}
};
const PageMetricsHost_OnClearMark_ParamsSpec = {
    $: {}
};
const PageMetricsHost_OnUmaReportTime_ParamsSpec = {
    $: {}
};
const PageMetrics_OnGetMark_ParamsSpec = {
    $: {}
};
const PageMetrics_OnGetMark_ResponseParamsSpec = {
    $: {}
};
const PageMetrics_OnClearMark_ParamsSpec = {
    $: {}
};
mojo.internal.Struct(PageMetricsHost_OnPageRemoteCreated_ParamsSpec.$, "PageMetricsHost_OnPageRemoteCreated_Params", [mojo.internal.StructField("page", 0, 0, mojo.internal.InterfaceProxy(PageMetricsRemote), null, false, 0)], [[0, 16]]);
mojo.internal.Struct(PageMetricsHost_OnGetMark_ParamsSpec.$, "PageMetricsHost_OnGetMark_Params", [mojo.internal.StructField("name", 0, 0, mojo.internal.String, null, false, 0)], [[0, 16]]);
mojo.internal.Struct(PageMetricsHost_OnGetMark_ResponseParamsSpec.$, "PageMetricsHost_OnGetMark_ResponseParams", [mojo.internal.StructField("markedTime", 0, 0, TimeDeltaSpec.$, null, true, 0)], [[0, 16]]);
mojo.internal.Struct(PageMetricsHost_OnClearMark_ParamsSpec.$, "PageMetricsHost_OnClearMark_Params", [mojo.internal.StructField("name", 0, 0, mojo.internal.String, null, false, 0)], [[0, 16]]);
mojo.internal.Struct(PageMetricsHost_OnUmaReportTime_ParamsSpec.$, "PageMetricsHost_OnUmaReportTime_Params", [mojo.internal.StructField("name", 0, 0, mojo.internal.String, null, false, 0), mojo.internal.StructField("time", 8, 0, TimeDeltaSpec.$, null, false, 0)], [[0, 24]]);
mojo.internal.Struct(PageMetrics_OnGetMark_ParamsSpec.$, "PageMetrics_OnGetMark_Params", [mojo.internal.StructField("name", 0, 0, mojo.internal.String, null, false, 0)], [[0, 16]]);
mojo.internal.Struct(PageMetrics_OnGetMark_ResponseParamsSpec.$, "PageMetrics_OnGetMark_ResponseParams", [mojo.internal.StructField("markedTime", 0, 0, TimeDeltaSpec.$, null, true, 0)], [[0, 16]]);
mojo.internal.Struct(PageMetrics_OnClearMark_ParamsSpec.$, "PageMetrics_OnClearMark_Params", [mojo.internal.StructField("name", 0, 0, mojo.internal.String, null, false, 0)], [[0, 16]]);
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class BrowserProxyImpl {
    callbackRouter;
    host;
    constructor() {
        this.callbackRouter = new PageMetricsCallbackRouter;
        this.host = PageMetricsHost.getRemote();
        this.host.onPageRemoteCreated(this.callbackRouter.$.bindNewPipeAndPassRemote())
    }
    getMark(name) {
        return this.host.onGetMark(name)
    }
    clearMark(name) {
        this.host.onClearMark(name)
    }
    umaReportTime(name, time) {
        this.host.onUmaReportTime(name, time)
    }
    now() {
        return chrome.timeTicks.nowInMicroseconds()
    }
    getCallbackRouter() {
        return this.callbackRouter
    }
    static getInstance() {
        return instance$7 || (instance$7 = new BrowserProxyImpl)
    }
    static setInstance(obj) {
        instance$7 = obj
    }
}
let instance$7 = null;
// Copyright 2022 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function timeFromMojo(delta) {
    return delta.microseconds
}
function timeToMojo(mark) {
    return {
        microseconds: mark
    }
}
class MetricsReporterImpl {
    marks_ = new Map;
    browserProxy_ = BrowserProxyImpl.getInstance();
    constructor() {
        const callbackRouter = this.browserProxy_.getCallbackRouter();
        callbackRouter.onGetMark.addListener((name => ({
            markedTime: this.marks_.has(name) ? timeToMojo(this.marks_.get(name)) : null
        })));
        callbackRouter.onClearMark.addListener((name => this.marks_.delete(name)))
    }
    static getInstance() {
        return instance$6 || (instance$6 = new MetricsReporterImpl)
    }
    static setInstanceForTest(newInstance) {
        instance$6 = newInstance
    }
    mark(name) {
        this.marks_.set(name, this.browserProxy_.now())
    }
    async measure(startMark, endMark) {
        let endTime;
        if (endMark) {
            const entry = this.marks_.get(endMark);
            assert(entry, `Mark "${endMark}" does not exist locally.`);
            endTime = entry
        } else {
            endTime = this.browserProxy_.now()
        }
        let startTime;
        if (this.marks_.has(startMark)) {
            startTime = this.marks_.get(startMark)
        } else {
            const remoteStartTime = await this.browserProxy_.getMark(startMark);
            assert(remoteStartTime.markedTime, `Mark "${startMark}" does not exist locally or remotely.`);
            startTime = timeFromMojo(remoteStartTime.markedTime)
        }
        return endTime - startTime
    }
    async hasMark(name) {
        if (this.marks_.has(name)) {
            return true
        }
        const remoteMark = await this.browserProxy_.getMark(name);
        return remoteMark !== null && remoteMark.markedTime !== null
    }
    hasLocalMark(name) {
        return this.marks_.has(name)
    }
    clearMark(name) {
        this.marks_.delete(name);
        this.browserProxy_.clearMark(name)
    }
    umaReportTime(histogram, time) {
        this.browserProxy_.umaReportTime(histogram, timeToMojo(time))
    }
}
let instance$6 = null;
function getTemplate$2() {
    return html`<!--_html_template_start_--><style include="cr-icons searchbox-dropdown-shared-style">:host{user-select:none}#content{background-color:var(--color-realbox-results-background);border-radius:calc(.5 * var(--cr-realbox-height));box-shadow:var(--cr-realbox-shadow);display:flex;gap:16px;margin-bottom:8px;overflow:hidden;padding-bottom:18px;padding-top:var(--cr-realbox-height)}:host([expanded-state-layout-chrome-refresh]) #content{padding-bottom:8px}@media (forced-colors:active){#content{border:1px solid ActiveBorder}}.matches{display:contents}cr-searchbox-match{color:var(--color-realbox-results-foreground)}.header{align-items:center;box-sizing:border-box;cursor:pointer;display:flex;font-size:inherit;font-weight:inherit;height:44px;margin-block-end:0;margin-block-start:0;outline:0;padding-bottom:6px;padding-inline-end:16px;padding-inline-start:12px;padding-top:6px}.header .text{color:var(--color-realbox-results-foreground-dimmed);font-size:.875em;font-weight:500;overflow:hidden;padding-inline-end:1px;text-overflow:ellipsis;white-space:nowrap}.header cr-icon-button{top:1px}.header:focus-within:not(:focus) cr-icon-button{--cr-icon-button-fill-color:var(--color-realbox-results-icon-selected)}:host(:not([chrome-refresh-hover-shape])) cr-searchbox-match:-webkit-any(:hover,:focus-within,[selected]){background-color:var(--color-realbox-results-background-hovered)}@media (forced-colors:active){cr-searchbox-match:-webkit-any(:hover,:focus-within,[selected]){background-color:Highlight}}.primary-side{flex:1;min-width:0}.secondary-side{display:var(--cr-realbox-secondary-side-display,none);min-width:0;padding-block-end:8px;padding-inline-end:16px;width:314px}.secondary-side .header{padding-inline-end:0;padding-inline-start:0}.secondary-side .matches{display:block}.secondary-side .matches.horizontal{display:flex;gap:4px}</style>
<div id="content">
  <template is="dom-repeat" items="[[sideTypes_(showSecondarySide_)]]" as="sideType">
    <div class$="[[sideTypeClass_(sideType)]]">
      <template is="dom-repeat" items="[[groupIdsForSideType_(sideType, result.matches.*)]]" as="groupId">
        <template is="dom-if" if="[[hasHeaderForGroup_(groupId)]]">
          
          <h3 class="header" data-id$="[[groupId]]" tabindex="-1" on-focusin="onHeaderFocusin_" on-click="onHeaderClick_" on-mousedown="onHeaderMousedown_" aria-hidden="true">
            <span class="text">[[headerForGroup_(groupId)]]</span>
            <cr-icon-button class$="action-icon [[toggleButtonIconForGroup_(groupId, hiddenGroupIds_.*)]]" title="[[toggleButtonTitleForGroup_(groupId, hiddenGroupIds_.*)]]" aria-label$="[[toggleButtonA11yLabelForGroup_(groupId, hiddenGroupIds_.*)]]">
            </cr-icon-button>
          </h3>
        </template>
        <div class$="matches [[renderTypeClassForGroup_(groupId)]]">
          <template is="dom-repeat" items="[[matchesForGroup_(groupId, result.matches.*, hiddenGroupIds_.*)]]" as="match" on-dom-change="onResultRepaint_">
            <cr-searchbox-match tabindex="0" role="option" match="[[match]]" match-index="[[matchIndex_(match)]]" side-type="[[sideType]]" selected$="[[isSelected_(match, selectedMatchIndex)]]" show-thumbnail="[[showThumbnail]]">
            </cr-searchbox-match>
          </template>
        </div>
      </template>
    </div>
  </template>
</div>
<!--_html_template_end_-->`
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const remainder = (lhs, rhs) => (lhs % rhs + rhs) % rhs;
const CHAR_TYPED_TO_PAINT = "Realbox.CharTypedToRepaintLatency.ToPaint";
const RESULT_CHANGED_TO_PAINT = "Realbox.ResultChangedToRepaintLatency.ToPaint";
class SearchboxDropdownElement extends PolymerElement {
    static get is() {
        return "cr-searchbox-dropdown"
    }
    static get template() {
        return getTemplate$2()
    }
    static get properties() {
        return {
            canShowSecondarySide: {
                type: Boolean,
                value: false
            },
            chromeRefreshHoverShape: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxCr23HoverFillShape"),
                reflectToAttribute: true
            },
            expandedStateLayoutChromeRefresh: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxCr23ExpandedStateLayout"),
                reflectToAttribute: true
            },
            hadSecondarySide: {
                type: Boolean,
                value: false,
                notify: true
            },
            hasSecondarySide: {
                type: Boolean,
                computed: `computeHasSecondarySide_(result)`,
                notify: true,
                reflectToAttribute: true
            },
            hasEmptyInput: {
                type: Boolean,
                reflectToAttribute: true,
                computed: `computeHasEmptyInput_(result)`
            },
            result: {
                type: Object
            },
            selectedMatchIndex: {
                type: Number,
                value: -1,
                notify: true
            },
            showSecondarySide_: {
                type: Boolean,
                value: false,
                computed: "computeShowSecondarySide_(" + "canShowSecondarySide, result.matches.*, hiddenGroupIds_.*)"
            },
            showThumbnail: {
                type: Boolean,
                value: false
            },
            hiddenGroupIds_: {
                type: Array,
                computed: `computeHiddenGroupIds_(result)`
            },
            selectableMatchElements_: {
                type: Array,
                value: () => []
            }
        }
    }
    constructor() {
        super();
        this.resizeObserver_ = null;
        this.pageHandler_ = SearchboxBrowserProxy.getInstance().handler
    }
    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver_ = new ResizeObserver((entries => this.pageHandler_.popupElementSizeChanged({
            width: entries[0].contentRect.width,
            height: entries[0].contentRect.height
        })));
        this.resizeObserver_.observe(this.$.content)
    }
    disconnectedCallback() {
        if (this.resizeObserver_) {
            this.resizeObserver_.disconnect()
        }
        super.disconnectedCallback()
    }
    get selectableMatchElements() {
        return this.selectableMatchElements_.filter((matchEl => matchEl.sideType === SideType.kDefaultPrimary || this.showSecondarySide_))
    }
    unselect() {
        this.selectedMatchIndex = -1
    }
    focusSelected() {
        this.selectableMatchElements[this.selectedMatchIndex]?.focus()
    }
    selectFirst() {
        this.selectedMatchIndex = 0
    }
    selectIndex(index) {
        this.selectedMatchIndex = index
    }
    updateSelection(oldSelection, selection) {
        if (selection.state === SelectionLineState.kFocusedButtonHeader) {
            this.unselect();
            return
        }
        if (oldSelection.line !== selection.line) {
            this.selectableMatchElements[this.selectedMatchIndex]?.updateSelection(selection)
        }
        this.selectIndex(selection.line);
        this.selectableMatchElements[this.selectedMatchIndex]?.updateSelection(selection)
    }
    selectPrevious() {
        const previous = Math.max(this.selectedMatchIndex, 0) - 1;
        this.selectedMatchIndex = remainder(previous, this.selectableMatchElements.length)
    }
    selectLast() {
        this.selectedMatchIndex = this.selectableMatchElements.length - 1
    }
    selectNext() {
        const next = this.selectedMatchIndex + 1;
        this.selectedMatchIndex = remainder(next, this.selectableMatchElements.length)
    }
    onHeaderClick_(e) {
        const groupId = Number.parseInt(e.currentTarget.dataset["id"], 10);
        this.pageHandler_.toggleSuggestionGroupIdVisibility(groupId);
        const index = this.hiddenGroupIds_.indexOf(groupId);
        if (index === -1) {
            this.push("hiddenGroupIds_", groupId)
        } else {
            this.splice("hiddenGroupIds_", index, 1)
        }
    }
    onHeaderFocusin_() {
        this.dispatchEvent(new CustomEvent("header-focusin",{
            bubbles: true,
            composed: true
        }))
    }
    onHeaderMousedown_(e) {
        e.preventDefault()
    }
    onResultRepaint_() {
        if (loadTimeData.getBoolean("reportMetrics")) {
            const metricsReporter = MetricsReporterImpl.getInstance();
            metricsReporter.measure("CharTyped").then((duration => {
                metricsReporter.umaReportTime(CHAR_TYPED_TO_PAINT, duration)
            }
            )).then(( () => {
                metricsReporter.clearMark("CharTyped")
            }
            )).catch(( () => {}
            ));
            metricsReporter.measure("ResultChanged").then((duration => {
                metricsReporter.umaReportTime(RESULT_CHANGED_TO_PAINT, duration)
            }
            )).then(( () => {
                metricsReporter.clearMark("ResultChanged")
            }
            )).catch(( () => {}
            ))
        }
        this.selectableMatchElements_ = [...this.shadowRoot.querySelectorAll("cr-searchbox-match")]
    }
    sideTypeClass_(side) {
        return sideTypeToClass(side)
    }
    renderTypeClassForGroup_(groupId) {
        return renderTypeToClass(this.result?.suggestionGroupsMap[groupId]?.renderType ?? RenderType.kDefaultVertical)
    }
    computeHasSecondarySide_() {
        const hasSecondarySide = !!this.groupIdsForSideType_(SideType.kSecondary).length;
        if (!this.hadSecondarySide) {
            this.hadSecondarySide = hasSecondarySide
        }
        return hasSecondarySide
    }
    computeHasEmptyInput_() {
        return this.result && decodeString16(this.result.input) === ""
    }
    computeHiddenGroupIds_() {
        return Object.keys(this.result?.suggestionGroupsMap ?? {}).map((groupId => Number.parseInt(groupId, 10))).filter((groupId => this.result.suggestionGroupsMap[groupId].hidden))
    }
    isSelected_(match) {
        return this.matchIndex_(match) === this.selectedMatchIndex
    }
    groupIdsForSideType_(side) {
        return [...new Set(this.result?.matches?.map((match => match.suggestionGroupId)).filter((groupId => this.sideTypeForGroup_(groupId) === side)))]
    }
    groupIsHidden_(groupId) {
        return this.hiddenGroupIds_.indexOf(groupId) !== -1
    }
    hasHeaderForGroup_(groupId) {
        return !!this.headerForGroup_(groupId)
    }
    headerForGroup_(groupId) {
        return this.result?.suggestionGroupsMap[groupId] ? decodeString16(this.result.suggestionGroupsMap[groupId].header) : ""
    }
    matchIndex_(match) {
        return this.result?.matches?.indexOf(match) ?? -1
    }
    matchesForGroup_(groupId) {
        return this.groupIsHidden_(groupId) ? [] : (this.result?.matches ?? []).filter((match => match.suggestionGroupId === groupId))
    }
    sideTypes_() {
        return this.showSecondarySide_ ? [SideType.kDefaultPrimary, SideType.kSecondary] : [SideType.kDefaultPrimary]
    }
    sideTypeForGroup_(groupId) {
        return this.result?.suggestionGroupsMap[groupId]?.sideType ?? SideType.kDefaultPrimary
    }
    toggleButtonA11yLabelForGroup_(groupId) {
        if (!this.hasHeaderForGroup_(groupId)) {
            return ""
        }
        return !this.groupIsHidden_(groupId) ? decodeString16(this.result.suggestionGroupsMap[groupId].hideGroupA11yLabel) : decodeString16(this.result.suggestionGroupsMap[groupId].showGroupA11yLabel)
    }
    toggleButtonIconForGroup_(groupId) {
        if (loadTimeData.getBoolean("realboxCr23ExpandedStateIcons")) {
            return this.groupIsHidden_(groupId) ? "icon-arrow-drop-down-cr23" : "icon-arrow-drop-up-cr23"
        }
        return this.groupIsHidden_(groupId) ? "icon-expand-more" : "icon-expand-less"
    }
    toggleButtonTitleForGroup_(groupId) {
        return loadTimeData.getString(this.groupIsHidden_(groupId) ? "showSuggestions" : "hideSuggestions")
    }
    computeShowSecondarySide_() {
        if (!this.canShowSecondarySide) {
            return false
        }
        if (!this.hiddenGroupIds_) {
            return true
        }
        const primaryGroupIds = this.groupIdsForSideType_(SideType.kDefaultPrimary);
        return primaryGroupIds.some((groupId => this.matchesForGroup_(groupId).length > 0))
    }
}
customElements.define(SearchboxDropdownElement.is, SearchboxDropdownElement);
function getTemplate$1() {
    return html`<!--_html_template_start_--><style include="cr-icons">:host{align-items:center;display:flex;flex-shrink:0;justify-content:center;outline:0}#container{align-items:center;aspect-ratio:1/1;border-radius:12px;display:flex;justify-content:center;overflow:hidden;position:relative;width:48px;height:40px}#image{display:initial;height:100%;object-fit:cover;width:100%}.overlay{position:absolute;justify-content:center;align-items:center;background-color:#0000000D;display:flex;width:100%;height:100%}:host(:focus-visible) .overlay,:host(:hover) .overlay{background-color:#4285F466}#remove{display:none}:host(:focus-visible) #remove,:host(:hover) #remove{display:flex}:host(:focus-visible) #container{border:solid 3px #4285f4;box-sizing:border-box}#remove{margin-inline-start:0;margin-inline-end:0;--cr-icon-button-fill-color:white;background-color:transparent}</style>
<div id="container" aria-hidden="true">
  <img id="image" src="[[thumbnailUrl_]]">
  <div class="overlay">
    <cr-icon-button id="remove" class="action-icon icon-clear" on-click="onRemoveButtonClick_">
    </cr-icon-button>
  </div>
</div>
<!--_html_template_end_-->`
}
// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const ThumbnailElementBase = I18nMixin(PolymerElement);
class SearchboxThumbnailElement extends ThumbnailElementBase {
    static get is() {
        return "cr-searchbox-thumbnail"
    }
    static get template() {
        return getTemplate$1()
    }
    static get properties() {
        return {
            thumbnailUrl_: {
                type: String
            }
        }
    }
    onRemoveButtonClick_(e) {
        this.dispatchEvent(new CustomEvent("remove-thumbnail-click",{
            bubbles: true,
            composed: true
        }));
        e.preventDefault()
    }
}
customElements.define(SearchboxThumbnailElement.is, SearchboxThumbnailElement);
// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const WebUiListenerMixin = dedupingMixin((superClass => {
    class WebUiListenerMixin extends superClass {
        constructor() {
            super(...arguments);
            this.webUiListeners_ = []
        }
        addWebUiListener(eventName, callback) {
            this.webUiListeners_.push(addWebUiListener(eventName, callback))
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            while (this.webUiListeners_.length > 0) {
                removeWebUiListener(this.webUiListeners_.pop())
            }
        }
    }
    return WebUiListenerMixin
}
));
function getTemplate() {
    return html`<!--_html_template_start_--><style include="cr-icons">:host{--cr-realbox-shadow:0 1px 6px 0 var(--color-realbox-shadow);--cr-realbox-width:var(--cr-realbox-min-width);--cr-realbox-border-radius:calc(0.5 * var(--cr-realbox-height));--cr-realbox-icon-width:26px;--cr-realbox-inner-icon-margin:8px;--cr-realbox-voice-icon-offset:16px;--cr-realbox-voice-search-button-width:0px;border-radius:var(--cr-realbox-border-radius);box-shadow:var(--cr-realbox-shadow);font-size:16px;height:var(--cr-realbox-height);width:var(--cr-realbox-width)}:host([in-side-panel_]:not([dropdown-is-visible])){--cr-realbox-shadow:none}:host([show-thumbnail]){--cr-realbox-thumbnail-icon-offset:50px}:host([realbox-chrome-refresh-theming][dropdown-is-visible]){--cr-realbox-shadow:0 0 12px 4px var(--color-realbox-shadow)}:host([realbox-chrome-refresh-theming]:not([realbox-steady-state-shadow]):not([dropdown-is-visible])){--cr-realbox-shadow:none}:host-context([realbox-width-behavior_=revert]):host([can-show-secondary-side]:not([dropdown-is-visible])){--cr-realbox-width:var(--cr-realbox-min-width)}:host([can-show-secondary-side][has-secondary-side]){--cr-realbox-secondary-side-display:block}:host([is-dark]){--cr-realbox-shadow:0 2px 6px 0 var(--color-realbox-shadow)}:host([realbox-voice-search-enabled_]){--cr-realbox-voice-search-button-width:var(--cr-realbox-icon-width)}:host([realbox-lens-search-enabled_]){--cr-realbox-voice-icon-offset:53px}@media (forced-colors:active){:host{border:1px solid ActiveBorder}}:host([dropdown-is-visible]){box-shadow:none}:host([match-searchbox]){box-shadow:none}:host([match-searchbox]:not([dropdown-is-visible]):hover){border:1px solid transparent;box-shadow:var(--cr-realbox-shadow)}:host([match-searchbox]:not([is-dark]):not([dropdown-is-visible]):not(:hover)){border:1px solid var(--color-realbox-border)}#inputWrapper{height:100%;position:relative}input{background-color:var(--color-realbox-background);border:none;border-radius:var(--cr-realbox-border-radius);color:var(--color-realbox-foreground);font-family:inherit;font-size:inherit;height:100%;outline:0;padding-inline-end:calc(var(--cr-realbox-voice-icon-offset) + var(--cr-realbox-voice-search-button-width) + var(--cr-realbox-inner-icon-margin));padding-inline-start:calc(52px + var(--cr-realbox-thumbnail-icon-offset,0px));position:relative;width:100%}:host-context([is-back-arrow-visible]) input{padding-inline-start:calc(22px + var(--cr-realbox-thumbnail-icon-offset,0px))}:host([realbox-chrome-refresh-theming]) input::selection{background-color:var(--color-realbox-selection-background);color:var(--color-realbox-selection-foreground)}input::-webkit-search-decoration,input::-webkit-search-results-button,input::-webkit-search-results-decoration{display:none}input::-webkit-search-cancel-button{appearance:none;margin:0}input::placeholder{color:var(--color-realbox-placeholder)}input:focus::placeholder{visibility:hidden}:host([dropdown-is-visible]) input,input:focus{background-color:var(--color-realbox-results-background)}:host([in-side-panel_]:not([dropdown-is-visible])) input:focus{background-color:#f1f3f4}:host-context([dark-mode]):host([in-side-panel_]:not([dropdown-is-visible])) input:focus{background-color:#303134}:host([realbox-chrome-refresh-theming]:not([realbox-steady-state-shadow]):not([dropdown-is-visible])) input{background-color:var(--color-realbox-background)}:host([realbox-chrome-refresh-theming]:not([realbox-steady-state-shadow]):not([dropdown-is-visible])) input:hover,input:hover{background-color:var(--color-realbox-background-hovered)}cr-searchbox-icon{height:100%;left:var(--cr-realbox-icon-left-position);position:absolute;top:var(--cr-realbox-icon-top-position);pointer-events:none}:host-context([is-back-arrow-visible]) #icon{display:none}:host-context([dir=rtl]) cr-searchbox-icon{left:unset;right:12px}.realbox-icon-button{background-color:transparent;background-position:center;background-repeat:no-repeat;background-size:21px 21px;border:none;border-radius:2px;cursor:pointer;height:100%;outline:0;padding:0;pointer-events:auto;position:absolute;right:16px;width:var(--cr-realbox-icon-width)}:host([realbox-chrome-refresh-theming]) .realbox-icon-button{position:static}.realbox-icon-button-container{border-radius:2px;height:100%;position:absolute;right:16px;top:var(--cr-realbox-icon-top-position);z-index:100}.realbox-icon-button-container.voice{right:var(--cr-realbox-voice-icon-offset)}:host-context(.focus-outline-visible) .realbox-icon-button-container:focus-within{box-shadow:var(--ntp-focus-shadow)}:host(:not([realbox-chrome-refresh-theming])) #voiceSearchButton{background-image:url(//resources/cr_components/searchbox/icons/mic.svg)}:host(:not([realbox-chrome-refresh-theming])) #lensSearchButton{background-image:url(//resources/cr_components/searchbox/icons/camera.svg)}:host([realbox-chrome-refresh-theming]:not([color-source-is-baseline])) #lensSearchButton,:host([realbox-chrome-refresh-theming]:not([color-source-is-baseline])) #voiceSearchButton{-webkit-mask-position:center;-webkit-mask-repeat:no-repeat;-webkit-mask-size:21px 21px;background-color:var(--color-realbox-lens-voice-icon-background)}:host([realbox-chrome-refresh-theming]:not([color-source-is-baseline])) #voiceSearchButton{-webkit-mask-image:url(//resources/cr_components/searchbox/icons/mic.svg)}:host([realbox-chrome-refresh-theming][color-source-is-baseline]) #voiceSearchButton{background-image:url(//resources/cr_components/searchbox/icons/mic.svg)}:host([realbox-chrome-refresh-theming]:not([color-source-is-baseline])) #lensSearchButton{-webkit-mask-image:url(//resources/cr_components/searchbox/icons/camera.svg)}:host([realbox-chrome-refresh-theming][color-source-is-baseline]) #lensSearchButton{background-image:url(//resources/cr_components/searchbox/icons/camera.svg)}:host([realbox-lens-search-enabled_]):host-context([dir=rtl]) #voiceSearchButton{left:var(--cr-realbox-voice-icon-offset);right:unset}:host([realbox-lens-search-enabled_]) #voiceSearchButton{right:var(--cr-realbox-voice-icon-offset)}:host-context([dir=rtl]) .realbox-icon-button{left:16px;right:unset}:host-context([dir=rtl]) .realbox-icon-button-container{left:16px;right:unset}:host([realbox-lens-search-enabled_]):host-context([dir=rtl]) .realbox-icon-button-container.voice{left:var(--cr-realbox-voice-icon-offset);right:unset}:host-context(.focus-outline-visible) .realbox-icon-button:focus{box-shadow:var(--ntp-focus-shadow)}:-webkit-any(input,cr-searchbox-icon,.realbox-icon-button){z-index:100}cr-searchbox-dropdown{left:0;position:absolute;right:0;top:0;z-index:99}.truncate{overflow:hidden;text-overflow:ellipsis}#thumbnailContainer{align-content:center;inset-block-start:var(--cr-realbox-icon-top-position);inset-inline-start:48px;height:100%;outline:0;position:absolute;z-index:101}:host-context([is-back-arrow-visible]) #thumbnailContainer{inset-inline-start:16px}</style>
<div id="inputWrapper" on-focusout="onInputWrapperFocusout_" on-keydown="onInputWrapperKeydown_">
  <input id="input" class="truncate" type="search" autocomplete="off" spellcheck="false" aria-live="[[inputAriaLive_]]" role="combobox" aria-expanded="[[dropdownIsVisible]]" aria-controls="matches" placeholder="[[placeholderText_]]" on-copy="onInputCutCopy_" on-cut="onInputCutCopy_" on-focus="onInputFocus_" on-input="onInputInput_" on-keydown="onInputKeydown_" on-keyup="onInputKeyup_" on-mousedown="onInputMouseDown_" on-paste="onInputPaste_">
  
  <cr-searchbox-icon id="icon" match="[[selectedMatch_]]" default-icon="[[realboxIcon_]]" in-searchbox>
  </cr-searchbox-icon>
  <template is="dom-if" if="[[showThumbnail]]">
    <div id="thumbnailContainer">
      
      <cr-searchbox-thumbnail id="thumbnail" thumbnail-url_="[[thumbnailUrl_]]" on-remove-thumbnail-click="onRemoveThumbnailClick_" role="button" aria-label="[[i18n('searchboxThumbnailLabel')]]" tabindex="1">
      </cr-searchbox-thumbnail>
    </div>
  </template>
  <template is="dom-if" if="[[realboxChromeRefreshTheming]]">
    <template is="dom-if" if="[[realboxVoiceSearchEnabled_]]">
      <div class="realbox-icon-button-container voice">
        <button id="voiceSearchButton" class="realbox-icon-button" on-click="onVoiceSearchClick_" title="[[i18n('voiceSearchButtonLabel')]]">
        </button>
      </div>
    </template>
    <template is="dom-if" if="[[realboxLensSearchEnabled_]]">
      <div class="realbox-icon-button-container lens">
          <button id="lensSearchButton" class="realbox-icon-button" on-click="onLensSearchClick_" title="[[i18n('lensSearchButtonLabel')]]">
          </button>
      </div>
    </template>
  </template>
  <template is="dom-if" if="[[!realboxChromeRefreshTheming]]">
    <template is="dom-if" if="[[realboxVoiceSearchEnabled_]]">
      <button id="voiceSearchButton" class="realbox-icon-button" on-click="onVoiceSearchClick_" title="[[i18n('voiceSearchButtonLabel')]]">
      </button>
    </template>
    <template is="dom-if" if="[[realboxLensSearchEnabled_]]">
      <button id="lensSearchButton" class="realbox-icon-button" on-click="onLensSearchClick_" title="[[i18n('lensSearchButtonLabel')]]">
      </button>
    </template>
  </template>
  <cr-searchbox-dropdown id="matches" role="listbox" result="[[result_]]" selected-match-index="{{selectedMatchIndex_}}" can-show-secondary-side="[[canShowSecondarySide]]" had-secondary-side="{{hadSecondarySide}}" has-secondary-side="{{hasSecondarySide}}" on-match-focusin="onMatchFocusin_" on-header-focusin="onHeaderFocusin_" on-match-click="onMatchClick_" hidden$="[[!dropdownIsVisible]]" show-thumbnail="[[showThumbnail]]">
  </cr-searchbox-dropdown>
</div>
<!--_html_template_end_-->`
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const SearchboxElementBase = I18nMixin(WebUiListenerMixin(PolymerElement));
class SearchboxElement extends SearchboxElementBase {
    static get is() {
        return "cr-searchbox"
    }
    static get template() {
        return getTemplate()
    }
    static get properties() {
        return {
            canShowSecondarySide: {
                type: Boolean,
                reflectToAttribute: true
            },
            colorSourceIsBaseline: {
                type: Boolean,
                reflectToAttribute: true
            },
            dropdownIsVisible: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            hadSecondarySide: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true
            },
            hasSecondarySide: {
                type: Boolean,
                reflectToAttribute: true
            },
            isDark: {
                type: Boolean,
                reflectToAttribute: true
            },
            matchSearchbox: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxMatchSearchboxTheme"),
                reflectToAttribute: true
            },
            realboxLensSearchEnabled: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxLensSearch"),
                reflectToAttribute: true
            },
            realboxChromeRefreshTheming: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxCr23Theming"),
                reflectToAttribute: true
            },
            realboxSteadyStateShadow: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxCr23SteadyStateShadow"),
                reflectToAttribute: true
            },
            inSidePanel_: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("searchboxInSidePanel"),
                reflectToAttribute: true
            },
            isDeletingInput_: {
                type: Boolean,
                value: false
            },
            lastIgnoredEnterEvent_: {
                type: Object,
                value: null
            },
            lastInput_: {
                type: Object,
                value: {
                    text: "",
                    inline: ""
                }
            },
            lastQueriedInput_: {
                type: String,
                value: null
            },
            pastedInInput_: {
                type: Boolean,
                value: false
            },
            placeholderText_: {
                type: String,
                computed: `computePlaceholderText_(showThumbnail)`
            },
            realboxIcon_: {
                type: String,
                value: () => loadTimeData.getString("realboxDefaultIcon")
            },
            realboxVoiceSearchEnabled_: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxVoiceSearch"),
                reflectToAttribute: true
            },
            realboxLensSearchEnabled_: {
                type: Boolean,
                value: () => loadTimeData.getBoolean("realboxLensSearch"),
                reflectToAttribute: true
            },
            result_: {
                type: Object
            },
            selectedMatch_: {
                type: Object,
                computed: `computeSelectedMatch_(result_, selectedMatchIndex_)`
            },
            selectedMatchIndex_: {
                type: Number,
                value: -1
            },
            showThumbnail: {
                type: Boolean,
                computed: `computeShowThumbnail_(thumbnailUrl_)`,
                reflectToAttribute: true
            },
            thumbnailUrl_: {
                type: String,
                value: ""
            },
            inputAriaLive_: {
                type: String,
                computed: `computeInputAriaLive_(selectedMatch_)`
            }
        }
    }
    constructor() {
        performance.mark("realbox-creation-start");
        super();
        this.autocompleteResultChangedListenerId_ = null;
        this.inputTextChangedListenerId_ = null;
        this.thumbnailChangedListenerId_ = null;
        this.pageHandler_ = SearchboxBrowserProxy.getInstance().handler;
        this.callbackRouter_ = SearchboxBrowserProxy.getInstance().callbackRouter
    }
    computeInputAriaLive_() {
        return this.selectedMatch_ ? "off" : "polite"
    }
    connectedCallback() {
        super.connectedCallback();
        this.autocompleteResultChangedListenerId_ = this.callbackRouter_.autocompleteResultChanged.addListener(this.onAutocompleteResultChanged_.bind(this));
        this.inputTextChangedListenerId_ = this.callbackRouter_.setInputText.addListener(this.onSetInputText_.bind(this));
        this.thumbnailChangedListenerId_ = this.callbackRouter_.setThumbnail.addListener(this.onSetThumbnail_.bind(this))
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        assert(this.autocompleteResultChangedListenerId_);
        this.callbackRouter_.removeListener(this.autocompleteResultChangedListenerId_);
        assert(this.inputTextChangedListenerId_);
        this.callbackRouter_.removeListener(this.inputTextChangedListenerId_);
        assert(this.thumbnailChangedListenerId_);
        this.callbackRouter_.removeListener(this.thumbnailChangedListenerId_)
    }
    ready() {
        super.ready();
        performance.measure("realbox-creation", "realbox-creation-start")
    }
    onAutocompleteResultChanged_(result) {
        if (this.lastQueriedInput_ === null || this.lastQueriedInput_.trimStart() !== decodeString16(result.input)) {
            return
        }
        this.result_ = result;
        const hasMatches = result?.matches?.length > 0;
        const hasPrimaryMatches = result?.matches?.some((match => {
            const sideType = result.suggestionGroupsMap[match.suggestionGroupId]?.sideType || SideType.kDefaultPrimary;
            return sideType === SideType.kDefaultPrimary
        }
        ));
        this.dropdownIsVisible = hasPrimaryMatches;
        this.$.input.focus();
        const firstMatch = hasMatches ? this.result_.matches[0] : null;
        if (firstMatch && firstMatch.allowedToBeDefaultMatch) {
            this.$.matches.selectFirst();
            this.updateInput_({
                text: this.lastQueriedInput_,
                inline: decodeString16(firstMatch.inlineAutocompletion) || ""
            });
            if (this.lastIgnoredEnterEvent_) {
                this.navigateToMatch_(0, this.lastIgnoredEnterEvent_);
                this.lastIgnoredEnterEvent_ = null
            }
        } else if (hasMatches && this.selectedMatchIndex_ !== -1 && this.selectedMatchIndex_ < this.result_.matches.length) {
            this.$.matches.selectIndex(this.selectedMatchIndex_);
            this.updateInput_({
                text: decodeString16(this.selectedMatch_.fillIntoEdit),
                inline: "",
                moveCursorToEnd: true
            })
        } else {
            this.$.matches.unselect();
            this.updateInput_({
                inline: ""
            })
        }
    }
    onSetInputText_(inputText) {
        this.updateInput_({
            text: inputText,
            inline: ""
        })
    }
    onSetThumbnail_(thumbnailUrl) {
        this.thumbnailUrl_ = thumbnailUrl
    }
    onHeaderFocusin_() {
        assert(this.lastQueriedInput_ === "");
        this.$.matches.unselect();
        this.updateInput_({
            text: "",
            inline: ""
        })
    }
    onInputCutCopy_(e) {
        if (!this.$.input.value || this.$.input.selectionStart !== 0 || this.$.input.selectionEnd !== this.$.input.value.length || !this.result_ || this.result_.matches.length === 0) {
            return
        }
        if (this.selectedMatch_ && !this.selectedMatch_.isSearchType) {
            e.clipboardData.setData("text/plain", this.selectedMatch_.destinationUrl.url);
            e.preventDefault();
            if (e.type === "cut") {
                this.updateInput_({
                    text: "",
                    inline: ""
                });
                this.clearAutocompleteMatches_()
            }
        }
    }
    onInputFocus_() {
        this.pageHandler_.onFocusChanged(true)
    }
    onInputInput_(e) {
        const inputValue = this.$.input.value;
        const lastInputValue = this.lastInput_.text + this.lastInput_.inline;
        if (lastInputValue === inputValue) {
            return
        }
        this.updateInput_({
            text: inputValue,
            inline: ""
        });
        if (loadTimeData.getBoolean("reportMetrics")) {
            const charTyped = !this.isDeletingInput_ && !!inputValue.trim();
            const metricsReporter = MetricsReporterImpl.getInstance();
            if (charTyped) {
                if (!metricsReporter.hasLocalMark("CharTyped")) {
                    metricsReporter.mark("CharTyped")
                }
            } else {
                metricsReporter.clearMark("CharTyped")
            }
        }
        if (inputValue.trim()) {
            this.queryAutocomplete_(inputValue, e.isComposing)
        } else {
            this.clearAutocompleteMatches_()
        }
        this.pastedInInput_ = false
    }
    onInputKeydown_(e) {
        if (!this.lastInput_.inline) {
            return
        }
        const inputValue = this.$.input.value;
        const inputSelection = inputValue.substring(this.$.input.selectionStart, this.$.input.selectionEnd);
        const lastInputValue = this.lastInput_.text + this.lastInput_.inline;
        if (inputSelection === this.lastInput_.inline && inputValue === lastInputValue && this.lastInput_.inline[0].toLocaleLowerCase() === e.key.toLocaleLowerCase()) {
            const text = this.lastInput_.text + e.key;
            assert(text);
            this.updateInput_({
                text: text,
                inline: this.lastInput_.inline.substr(1)
            });
            if (loadTimeData.getBoolean("reportMetrics")) {
                const metricsReporter = MetricsReporterImpl.getInstance();
                if (!metricsReporter.hasLocalMark("CharTyped")) {
                    metricsReporter.mark("CharTyped")
                }
            }
            this.queryAutocomplete_(this.lastInput_.text);
            e.preventDefault()
        }
    }
    onInputKeyup_(e) {
        if (e.key !== "Tab") {
            return
        }
        if (!this.dropdownIsVisible) {
            if (!this.$.input.value) {
                this.queryAutocomplete_("")
            } else if (this.showThumbnail) {
                this.queryAutocomplete_(this.$.input.value)
            }
        }
    }
    onInputMouseDown_(e) {
        if (e.button !== 0) {
            return
        }
        if (this.dropdownIsVisible) {
            return
        }
        this.queryAutocomplete_(this.$.input.value)
    }
    onInputPaste_() {
        this.pastedInInput_ = true
    }
    onInputWrapperFocusout_(e) {
        if (!this.$.inputWrapper.contains(e.relatedTarget)) {
            if (this.lastQueriedInput_ === "") {
                this.updateInput_({
                    text: "",
                    inline: ""
                });
                this.clearAutocompleteMatches_()
            } else {
                this.dropdownIsVisible = false;
                this.pageHandler_.stopAutocomplete(false)
            }
            this.pageHandler_.onFocusChanged(false)
        }
    }
    onInputWrapperKeydown_(e) {
        const KEYDOWN_HANDLED_KEYS = ["ArrowDown", "ArrowUp", "Backspace", "Delete", "Enter", "Escape", "PageDown", "PageUp", "Tab"];
        if (!KEYDOWN_HANDLED_KEYS.includes(e.key)) {
            return
        }
        if (e.defaultPrevented) {
            return
        }
        if (this.showThumbnail) {
            const thumbnail = this.shadowRoot.querySelector("cr-searchbox-thumbnail");
            if (thumbnail === this.shadowRoot.activeElement) {
                if (e.key === "Backspace" || e.key === "Enter") {
                    this.thumbnailUrl_ = "";
                    this.$.input.focus();
                    this.clearAutocompleteMatches_();
                    this.pageHandler_.onThumbnailRemoved();
                    const inputValue = this.$.input.value;
                    this.queryAutocomplete_(inputValue);
                    e.preventDefault()
                } else if (e.key === "Tab" && !e.shiftKey) {
                    this.$.input.focus();
                    e.preventDefault()
                } else if (this.dropdownIsVisible && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
                    this.$.input.focus()
                }
            } else if (this.$.input.selectionStart === 0 && this.$.input.selectionEnd === 0 && this.$.input === this.shadowRoot.activeElement && (e.key === "Backspace" || e.key === "Tab" && e.shiftKey)) {
                thumbnail?.focus();
                e.preventDefault()
            }
        }
        if (e.key === "Backspace" || e.key === "Tab") {
            return
        }
        if (!this.dropdownIsVisible) {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                const inputValue = this.$.input.value;
                if (inputValue.trim() || !inputValue) {
                    this.queryAutocomplete_(inputValue)
                }
                e.preventDefault();
                return
            }
        }
        if (!this.result_ || this.result_.matches.length === 0) {
            return
        }
        if (e.key === "Delete") {
            if (e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
                if (this.selectedMatch_ && this.selectedMatch_.supportsDeletion) {
                    this.pageHandler_.deleteAutocompleteMatch(this.selectedMatchIndex_, this.selectedMatch_.destinationUrl);
                    e.preventDefault()
                }
            }
            return
        }
        if (e.isComposing) {
            return
        }
        if (e.key === "Enter") {
            const array = [this.$.matches, this.$.input];
            if (array.includes(e.target)) {
                if (this.lastQueriedInput_ !== null && this.lastQueriedInput_.trimStart() === decodeString16(this.result_.input)) {
                    if (this.selectedMatch_) {
                        this.navigateToMatch_(this.selectedMatchIndex_, e)
                    }
                } else {
                    this.lastIgnoredEnterEvent_ = e;
                    e.preventDefault()
                }
            }
            return
        }
        if (hasKeyModifiers(e)) {
            return
        }
        if (e.key === "Escape" && this.selectedMatchIndex_ <= 0) {
            this.updateInput_({
                text: "",
                inline: ""
            });
            this.clearAutocompleteMatches_();
            e.preventDefault();
            return
        }
        if (e.key === "ArrowDown") {
            this.$.matches.selectNext();
            this.pageHandler_.onNavigationLikely(this.selectedMatchIndex_, this.selectedMatch_.destinationUrl, NavigationPredictor.kUpOrDownArrowButton)
        } else if (e.key === "ArrowUp") {
            this.$.matches.selectPrevious();
            this.pageHandler_.onNavigationLikely(this.selectedMatchIndex_, this.selectedMatch_.destinationUrl, NavigationPredictor.kUpOrDownArrowButton)
        } else if (e.key === "Escape" || e.key === "PageUp") {
            this.$.matches.selectFirst()
        } else if (e.key === "PageDown") {
            this.$.matches.selectLast()
        }
        e.preventDefault();
        if (this.shadowRoot.activeElement === this.$.matches) {
            this.$.matches.focusSelected()
        }
        const newFill = decodeString16(this.selectedMatch_.fillIntoEdit);
        const newInline = this.selectedMatchIndex_ === 0 && this.selectedMatch_.allowedToBeDefaultMatch ? decodeString16(this.selectedMatch_.inlineAutocompletion) : "";
        const newFillEnd = newFill.length - newInline.length;
        const text = newFill.substr(0, newFillEnd);
        assert(text);
        this.updateInput_({
            text: text,
            inline: newInline,
            moveCursorToEnd: newInline.length === 0
        })
    }
    onMatchFocusin_(e) {
        this.$.matches.selectIndex(e.detail);
        this.updateInput_({
            text: decodeString16(this.selectedMatch_.fillIntoEdit),
            inline: "",
            moveCursorToEnd: true
        })
    }
    onMatchClick_() {
        this.clearAutocompleteMatches_()
    }
    onVoiceSearchClick_() {
        this.dispatchEvent(new Event("open-voice-search"))
    }
    onLensSearchClick_() {
        this.dropdownIsVisible = false;
        this.dispatchEvent(new Event("open-lens-search"))
    }
    onRemoveThumbnailClick_() {
        this.thumbnailUrl_ = "";
        this.$.input.focus();
        this.clearAutocompleteMatches_();
        this.pageHandler_.onThumbnailRemoved();
        const inputValue = this.$.input.value;
        this.queryAutocomplete_(inputValue)
    }
    computeSelectedMatch_() {
        if (!this.result_ || !this.result_.matches) {
            return null
        }
        return this.result_.matches[this.selectedMatchIndex_] || null
    }
    computeShowThumbnail_() {
        return !!this.thumbnailUrl_
    }
    computePlaceholderText_() {
        return this.showThumbnail ? this.i18n("searchBoxHintMultimodal") : this.i18n("searchBoxHint")
    }
    clearAutocompleteMatches_() {
        this.dropdownIsVisible = false;
        this.result_ = null;
        this.$.matches.unselect();
        this.pageHandler_.stopAutocomplete(true);
        this.lastQueriedInput_ = null
    }
    navigateToMatch_(matchIndex, e) {
        assert(matchIndex >= 0);
        const match = this.result_.matches[matchIndex];
        assert(match);
        this.pageHandler_.openAutocompleteMatch(matchIndex, match.destinationUrl, this.dropdownIsVisible, e.button || 0, e.altKey, e.ctrlKey, e.metaKey, e.shiftKey);
        this.updateInput_({
            text: decodeString16(this.selectedMatch_.fillIntoEdit),
            inline: "",
            moveCursorToEnd: true
        });
        this.clearAutocompleteMatches_();
        e.preventDefault()
    }
    queryAutocomplete_(input, preventInlineAutocomplete=false) {
        this.lastQueriedInput_ = input;
        const caretNotAtEnd = this.$.input.selectionStart !== input.length;
        preventInlineAutocomplete = preventInlineAutocomplete || this.isDeletingInput_ || this.pastedInInput_ || caretNotAtEnd;
        this.pageHandler_.queryAutocomplete(mojoString16(input), preventInlineAutocomplete)
    }
    updateInput_(update) {
        const newInput = Object.assign({}, this.lastInput_, update);
        const newInputValue = newInput.text + newInput.inline;
        const lastInputValue = this.lastInput_.text + this.lastInput_.inline;
        const inlineDiffers = newInput.inline !== this.lastInput_.inline;
        const preserveSelection = !inlineDiffers && !update.moveCursorToEnd;
        let needsSelectionUpdate = !preserveSelection;
        const oldSelectionStart = this.$.input.selectionStart;
        const oldSelectionEnd = this.$.input.selectionEnd;
        if (newInputValue !== this.$.input.value) {
            this.$.input.value = newInputValue;
            needsSelectionUpdate = true
        }
        if (newInputValue.trim() && needsSelectionUpdate) {
            this.$.input.selectionStart = preserveSelection ? oldSelectionStart : update.moveCursorToEnd ? newInputValue.length : newInput.text.length;
            this.$.input.selectionEnd = preserveSelection ? oldSelectionEnd : newInputValue.length
        }
        this.isDeletingInput_ = lastInputValue.length > newInputValue.length && lastInputValue.startsWith(newInputValue);
        this.lastInput_ = newInput
    }
}
customElements.define(SearchboxElement.is, SearchboxElement);
let instance$5 = null;
function getCss$3() {
    return instance$5 || (instance$5 = [...[], css`:host(:not([hidden])){display:block}#iframe{border:none;border-radius:inherit;display:block;height:inherit;max-height:inherit;max-width:inherit;width:inherit}`])
}
function getHtml$3() {
    return html$1`<!--_html_template_start_-->
<iframe id="iframe" .src="${this.getSrc_()}" .allow="${this.allow || nothing}">
</iframe>
<!--_html_template_end_-->`
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
function $$(element, selector) {
    return element.shadowRoot.querySelector(selector)
}
function strictQuery(root, selector, type) {
    const element = root.querySelector(selector);
    assert(element && element instanceof type);
    return element
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class IframeElement extends CrLitElement {
    static get is() {
        return "ntp-iframe"
    }
    static get styles() {
        return getCss$3()
    }
    render() {
        return getHtml$3.bind(this)()
    }
    static get properties() {
        return {
            allow: {
                reflect: true,
                type: String
            },
            src: {
                reflect: true,
                type: String
            }
        }
    }
    postMessage(message) {
        assert(this.shadowRoot);
        WindowProxy.getInstance().postMessage(strictQuery(this.shadowRoot, "#iframe", HTMLIFrameElement), message, new URL(this.src).origin)
    }
    getSrc_() {
        return WindowProxy.getInstance().createIframeSrc(this.src)
    }
}
customElements.define(IframeElement.is, IframeElement);
let instance$4 = null;
function getCss$2() {
    return instance$4 || (instance$4 = [...[], css`#dialog::part(dialog){max-width:300px}#buttons{display:flex;flex-direction:row;justify-content:center;margin-bottom:28px;margin-top:20px}#buttons cr-button{background-position:center;background-repeat:no-repeat;background-size:cover;border:none;height:48px;min-width:48px;width:48px}#buttons cr-button:hover{opacity:.8}#buttons>:not(:last-child){margin-inline-end:12px}#facebookButton{background-image:url(icons/facebook.svg)}#twitterButton{background-image:url(icons/twitter.svg)}#emailButton{background-image:url(icons/mail.svg)}#url{--cr-input-error-display:none}#copyButton{--cr-icon-image:url(icons/copy.svg);margin-inline-start:2px}`])
}
function getHtml$2() {
    return html$1`<!--_html_template_start_--><cr-dialog id="dialog" show-on-attach>
  <div id="title" slot="title">${this.title}</div>
  <div slot="body">
    <div id="buttons">
      <cr-button id="facebookButton" title="Facebook" @click="${this.onFacebookClick_}">
      </cr-button>
      <cr-button id="twitterButton" title="Twitter" @click="${this.onTwitterClick_}">
      </cr-button>
      <cr-button id="emailButton" title="电子邮件" @click="${this.onEmailClick_}">
      </cr-button>
    </div>
    <cr-input readonly="readonly" label="涂鸦链接" id="url" .value="${this.url.url}">
      <cr-icon-button id="copyButton" slot="suffix" title="复制链接" @click="${this.onCopyClick_}">
      </cr-icon-button>
    </cr-input>
  </div>
  <div slot="button-container">
    <cr-button id="doneButton" class="action-button" @click="${this.onCloseClick_}">
      完成
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const FACEBOOK_APP_ID = 738026486351791;
class DoodleShareDialogElement extends CrLitElement {
    constructor() {
        super(...arguments);
        this.url = {
            url: ""
        }
    }
    static get is() {
        return "ntp-doodle-share-dialog"
    }
    static get styles() {
        return getCss$2()
    }
    render() {
        return getHtml$2.bind(this)()
    }
    static get properties() {
        return {
            title: {
                type: String
            },
            url: {
                type: Object
            }
        }
    }
    onFacebookClick_() {
        const url = "https://www.facebook.com/dialog/share" + `?app_id=${FACEBOOK_APP_ID}` + `&href=${encodeURIComponent(this.url.url)}` + `&hashtag=${encodeURIComponent("#GoogleDoodle")}`;
        WindowProxy.getInstance().open(url);
        this.notifyShare_(DoodleShareChannel.kFacebook)
    }
    onTwitterClick_() {
        const url = "https://twitter.com/intent/tweet" + `?text=${encodeURIComponent(`${this.title}\n${this.url.url}`)}`;
        WindowProxy.getInstance().open(url);
        this.notifyShare_(DoodleShareChannel.kTwitter)
    }
    onEmailClick_() {
        const url = `mailto:?subject=${encodeURIComponent(this.title)}` + `&body=${encodeURIComponent(this.url.url)}`;
        WindowProxy.getInstance().navigate(url);
        this.notifyShare_(DoodleShareChannel.kEmail)
    }
    onCopyClick_() {
        this.$.url.select();
        navigator.clipboard.writeText(this.url.url);
        this.notifyShare_(DoodleShareChannel.kLinkCopy)
    }
    onCloseClick_() {
        this.$.dialog.close()
    }
    notifyShare_(channel) {
        this.fire("share", channel)
    }
}
customElements.define(DoodleShareDialogElement.is, DoodleShareDialogElement);
let instance$3 = null;
function getCss$1() {
    return instance$3 || (instance$3 = [...[getCss$4()], css`:host{--ntp-logo-height:200px;display:flex;flex-direction:column;flex-shrink:0;justify-content:flex-end;min-height:var(--ntp-logo-height)}:host([reduced-logo-space-enabled_]){--ntp-logo-height:168px}:host([doodle-boxed_]){justify-content:flex-end}#logo{forced-color-adjust:none;height:92px;width:272px}:host([single-colored]) #logo{-webkit-mask-image:url(icons/google_logo.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-size:100%;background-color:var(--ntp-logo-color)}:host(:not([single-colored])) #logo{background-image:url(icons/google_logo.svg)}#imageDoodle{cursor:pointer;outline:0}#imageDoodle[tabindex='-1']{cursor:auto}:host([doodle-boxed_]) #imageDoodle{background-color:var(--ntp-logo-box-color);border-radius:20px;padding:16px 24px}:host-context(.focus-outline-visible) #imageDoodle:focus{box-shadow:0 0 0 2px rgba(var(--google-blue-600-rgb),.4)}#imageContainer{display:flex;height:fit-content;position:relative;width:fit-content}#image{max-height:var(--ntp-logo-height);max-width:100%}:host([doodle-boxed_]) #image{max-height:160px}:host([doodle-boxed_][reduced-logo-space-enabled_]) #image{max-height:128px}#animation{height:100%;pointer-events:none;position:absolute;width:100%}#doodle{position:relative}#shareButton{background-color:var(--color-new-tab-page-doodle-share-button-background,none);border:none;height:32px;min-width:32px;padding:0;position:absolute;width:32px;bottom:0}:host-context([dir=ltr]) #shareButton{right:-40px}:host-context([dir=rtl]) #shareButton{left:-40px}#shareButtonIcon{width:18px;height:18px;margin:7px;vertical-align:bottom;mask-image:url(chrome://new-tab-page/icons/share_unfilled.svg);background-color:var(--color-new-tab-page-doodle-share-button-icon,none)}#iframe{border:none;height:var(--height,var(--ntp-logo-height));transition-duration:var(--duration,100ms);transition-property:height,width;width:var(--width,100%)}#iframe:not([expanded]){max-height:var(--ntp-logo-height)}`])
}
function getHtml$1() {
    return html$1`<!--_html_template_start_-->${this.showLogo_ ? html$1`
  <div id="logo"></div>
` : ""}
${this.showDoodle_ ? html$1`
  <div id="doodle" title="${this.doodle_.description}">
    <div id="imageDoodle" ?hidden="${!this.imageDoodle_}" tabindex="${this.imageDoodleTabIndex_}" @click="${this.onImageClick_}" @keydown="${this.onImageKeydown_}">
      <div id="imageContainer">
        
        <img id="image" src="${this.imageUrl_}" @load="${this.onImageLoad_}">
        <ntp-iframe id="animation" src="${this.animationUrl_}" ?hidden="${!this.showAnimation_}">
        </ntp-iframe>
      </div>
      <cr-button id="shareButton" title="分享涂鸦" @click="${this.onShareButtonClick_}">
        <div id="shareButtonIcon"></div>
      </cr-button>
    </div>
    ${this.iframeUrl_ ? html$1`
      <ntp-iframe id="iframe" src="${this.iframeUrl_}" ?expanded="${this.expanded_}" allow="autoplay; clipboard-write">
      </ntp-iframe>
    ` : ""}
  </div>
` : ""}
${this.showShareDialog_ ? html$1`
  <ntp-doodle-share-dialog .title="${this.doodle_.description}" .url="${this.doodle_.image.shareUrl}" @close="${this.onShareDialogClose_}" @share="${this.onShare_}">
  </ntp-doodle-share-dialog>
` : ""}
<!--_html_template_end_-->`
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class LogoElement extends CrLitElement {
    static get is() {
        return "ntp-logo"
    }
    static get styles() {
        return getCss$1()
    }
    render() {
        return getHtml$1.bind(this)()
    }
    static get properties() {
        return {
            singleColored: {
                reflect: true,
                type: Boolean
            },
            dark: {
                type: Boolean
            },
            backgroundColor: {
                type: Object
            },
            loaded_: {
                type: Boolean
            },
            doodle_: {
                type: Object
            },
            imageDoodle_: {
                type: Object
            },
            showLogo_: {
                type: Boolean
            },
            showDoodle_: {
                type: Boolean
            },
            doodleBoxed_: {
                reflect: true,
                type: Boolean
            },
            imageUrl_: {
                type: String
            },
            showAnimation_: {
                type: Boolean
            },
            animationUrl_: {
                type: String
            },
            iframeUrl_: {
                type: String
            },
            duration_: {
                type: String
            },
            height_: {
                type: String
            },
            width_: {
                type: String
            },
            expanded_: {
                type: Boolean
            },
            showShareDialog_: {
                type: Boolean
            },
            imageDoodleTabIndex_: {
                type: Number
            },
            reducedLogoSpaceEnabled_: {
                type: Boolean,
                reflect: true
            }
        }
    }
    constructor() {
        performance.mark("logo-creation-start");
        super();
        this.singleColored = false;
        this.showAnimation_ = false;
        this.reducedLogoSpaceEnabled_ = loadTimeData.getBoolean("reducedLogoSpaceEnabled");
        this.eventTracker_ = new EventTracker;
        this.imageClickParams_ = null;
        this.interactionLogUrl_ = null;
        this.shareId_ = null;
        this.pageHandler_ = NewTabPageProxy.getInstance().handler;
        this.pageHandler_.getDoodle().then(( ({doodle: doodle}) => {
            this.doodle_ = doodle;
            this.loaded_ = true;
            if (this.doodle_ && this.doodle_.interactive) {
                this.width_ = `${this.doodle_.interactive.width}px`;
                this.height_ = `${this.doodle_.interactive.height}px`
            }
        }
        ))
    }
    connectedCallback() {
        super.connectedCallback();
        this.eventTracker_.add(window, "message", ( ({data: data}) => {
            if (data["cmd"] === "resizeDoodle") {
                assert(data.duration);
                this.duration_ = data.duration;
                assert(data.height);
                this.height_ = data.height;
                assert(data.width);
                this.width_ = data.width;
                this.expanded_ = true
            } else if (data["cmd"] === "sendMode") {
                this.sendMode_()
            }
        }
        ));
        this.sendMode_()
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.eventTracker_.removeAll()
    }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        this.imageDoodle_ = this.computeImageDoodle_();
        this.imageUrl_ = this.computeImageUrl_();
        this.animationUrl_ = this.computeAnimationUrl_();
        this.showDoodle_ = this.computeShowDoodle_();
        this.iframeUrl_ = this.computeIframeUrl_();
        this.showLogo_ = this.computeShowLogo_();
        this.doodleBoxed_ = this.computeDoodleBoxed_();
        this.imageDoodleTabIndex_ = this.computeImageDoodleTabIndex_()
    }
    firstUpdated() {
        performance.measure("logo-creation", "logo-creation-start")
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has("dark")) {
            this.onDarkChange_()
        }
        const changedPrivateProperties = changedProperties;
        if (changedPrivateProperties.has("duration_") || changedPrivateProperties.has("height_") || changedPrivateProperties.has("width_")) {
            this.onDurationHeightWidthChange_()
        }
        if (changedPrivateProperties.has("imageDoodle_")) {
            this.onImageDoodleChange_()
        }
    }
    onImageDoodleChange_() {
        if (this.imageDoodle_) {
            this.style.setProperty("--ntp-logo-box-color", skColorToRgba(this.imageDoodle_.backgroundColor))
        } else {
            this.style.removeProperty("--ntp-logo-box-color")
        }
        this.showAnimation_ = false;
        this.imageClickParams_ = null;
        this.interactionLogUrl_ = null;
        this.shareId_ = null
    }
    computeImageDoodle_() {
        return this.doodle_ && this.doodle_.image && (this.dark ? this.doodle_.image.dark : this.doodle_.image.light) || null
    }
    computeShowLogo_() {
        return !!this.loaded_ && !this.showDoodle_
    }
    computeShowDoodle_() {
        return !!this.imageDoodle_ || !!this.doodle_ && !!this.doodle_.interactive && window.navigator.onLine
    }
    computeDoodleBoxed_() {
        return !this.backgroundColor || !!this.imageDoodle_ && this.imageDoodle_.backgroundColor.value !== this.backgroundColor.value
    }
    onImageClick_() {
        if ($$(this, "#imageDoodle").tabIndex < 0) {
            return
        }
        if (this.isCtaImageShown_()) {
            this.showAnimation_ = true;
            this.pageHandler_.onDoodleImageClicked(DoodleImageType.kCta, this.interactionLogUrl_);
            this.logImageRendered_(DoodleImageType.kAnimation, this.imageDoodle_.animationImpressionLogUrl);
            if (!this.doodle_.image.onClickUrl) {
                $$(this, "#imageDoodle").blur()
            }
            return
        }
        assert(this.doodle_.image.onClickUrl);
        this.pageHandler_.onDoodleImageClicked(this.showAnimation_ ? DoodleImageType.kAnimation : DoodleImageType.kStatic, null);
        const onClickUrl = new URL(this.doodle_.image.onClickUrl.url);
        if (this.imageClickParams_) {
            for (const param of new URLSearchParams(this.imageClickParams_)) {
                onClickUrl.searchParams.append(param[0], param[1])
            }
        }
        WindowProxy.getInstance().open(onClickUrl.toString())
    }
    onImageLoad_() {
        this.logImageRendered_(this.isCtaImageShown_() ? DoodleImageType.kCta : DoodleImageType.kStatic, this.imageDoodle_.imageImpressionLogUrl)
    }
    async logImageRendered_(type, logUrl) {
        const {imageClickParams: imageClickParams, interactionLogUrl: interactionLogUrl, shareId: shareId} = await this.pageHandler_.onDoodleImageRendered(type, WindowProxy.getInstance().now(), logUrl);
        this.imageClickParams_ = imageClickParams;
        this.interactionLogUrl_ = interactionLogUrl;
        this.shareId_ = shareId
    }
    onImageKeydown_(e) {
        if ([" ", "Enter"].includes(e.key)) {
            this.onImageClick_()
        }
    }
    onShare_(e) {
        const doodleId = new URL(this.doodle_.image.onClickUrl.url).searchParams.get("ct");
        if (!doodleId) {
            return
        }
        this.pageHandler_.onDoodleShared(e.detail, doodleId, this.shareId_)
    }
    isCtaImageShown_() {
        return !this.showAnimation_ && !!this.imageDoodle_ && !!this.imageDoodle_.animationUrl
    }
    sendMode_() {
        const iframe = $$(this, "#iframe");
        if (this.dark === undefined || !iframe) {
            return
        }
        iframe.postMessage({
            cmd: "changeMode",
            dark: this.dark
        })
    }
    onDarkChange_() {
        this.sendMode_()
    }
    computeImageUrl_() {
        return this.imageDoodle_ ? this.imageDoodle_.imageUrl.url : ""
    }
    computeAnimationUrl_() {
        return this.imageDoodle_ && this.imageDoodle_.animationUrl ? `chrome-untrusted://new-tab-page/image?${this.imageDoodle_.animationUrl.url}` : ""
    }
    computeIframeUrl_() {
        if (this.doodle_ && this.doodle_.interactive) {
            const url = new URL(this.doodle_.interactive.url.url);
            url.searchParams.append("theme_messages", "0");
            return url.href
        } else {
            return ""
        }
    }
    onShareButtonClick_(e) {
        e.stopPropagation();
        this.showShareDialog_ = true
    }
    onShareDialogClose_() {
        this.showShareDialog_ = false
    }
    onDurationHeightWidthChange_() {
        this.style.setProperty("--duration", this.duration_);
        this.style.setProperty("--height", this.height_);
        this.style.setProperty("--width", this.width_)
    }
    computeImageDoodleTabIndex_() {
        return this.doodle_ && this.doodle_.image && (this.isCtaImageShown_() || this.doodle_.image.onClickUrl) ? 0 : -1
    }
}
customElements.define(LogoElement.is, LogoElement);
// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
let instance$2 = null;
class BrowserProxy {
    callbackRouter;
    constructor() {
        this.callbackRouter = new PageCallbackRouter$1;
        const pageHandlerRemote = PageHandler$1.getRemote();
        pageHandlerRemote.setPage(this.callbackRouter.$.bindNewPipeAndPassRemote())
    }
    static getInstance() {
        return instance$2 || (instance$2 = new BrowserProxy)
    }
    static setInstance(newInstance) {
        instance$2 = newInstance
    }
}
// Copyright 2021 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const COLORS_CSS_SELECTOR = "link[href*='//theme/colors.css']";
let documentInstance = null;
class ColorChangeUpdater {
    listenerId_ = null;
    root_;
    constructor(root) {
        assert(documentInstance === null || root !== document);
        this.root_ = root
    }
    start() {
        if (this.listenerId_ !== null) {
            return
        }
        this.listenerId_ = BrowserProxy.getInstance().callbackRouter.onColorProviderChanged.addListener(this.onColorProviderChanged.bind(this))
    }
    async onColorProviderChanged() {
        await this.refreshColorsCss()
    }
    async refreshColorsCss() {
        const colorCssNode = this.root_.querySelector(COLORS_CSS_SELECTOR);
        if (!colorCssNode) {
            return false
        }
        const href = colorCssNode.getAttribute("href");
        if (!href) {
            return false
        }
        const hrefURL = new URL(href,location.href);
        const params = new URLSearchParams(hrefURL.search);
        params.set("version", (new Date).getTime().toString());
        const newHref = `${hrefURL.origin}${hrefURL.pathname}?${params.toString()}`;
        const newColorsCssLink = document.createElement("link");
        newColorsCssLink.setAttribute("href", newHref);
        newColorsCssLink.rel = "stylesheet";
        newColorsCssLink.type = "text/css";
        const newColorsLoaded = new Promise((resolve => {
            newColorsCssLink.onload = resolve
        }
        ));
        if (this.root_ === document) {
            document.getElementsByTagName("body")[0].appendChild(newColorsCssLink)
        } else {
            this.root_.appendChild(newColorsCssLink)
        }
        await newColorsLoaded;
        const oldColorCssNode = document.querySelector(COLORS_CSS_SELECTOR);
        if (oldColorCssNode) {
            oldColorCssNode.remove()
        }
        return true
    }
    static forDocument() {
        return documentInstance || (documentInstance = new ColorChangeUpdater(document))
    }
}
// Copyright 2024 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const HelpBubbleMixinLit = superClass => {
    class HelpBubbleMixinLit extends superClass {
        constructor(...args) {
            super(...args);
            this.helpBubbleControllerById_ = new Map;
            this.helpBubbleListenerIds_ = [];
            this.helpBubbleFixedAnchorObserver_ = null;
            this.helpBubbleResizeObserver_ = null;
            this.helpBubbleDismissedEventTracker_ = new EventTracker;
            this.debouncedAnchorMayHaveChangedCallback_ = null;
            this.helpBubbleHandler_ = HelpBubbleProxyImpl.getInstance().getHandler();
            this.helpBubbleCallbackRouter_ = HelpBubbleProxyImpl.getInstance().getCallbackRouter()
        }
        connectedCallback() {
            super.connectedCallback();
            const router = this.helpBubbleCallbackRouter_;
            this.helpBubbleListenerIds_.push(router.showHelpBubble.addListener(this.onShowHelpBubble_.bind(this)), router.toggleFocusForAccessibility.addListener(this.onToggleHelpBubbleFocusForAccessibility_.bind(this)), router.hideHelpBubble.addListener(this.onHideHelpBubble_.bind(this)), router.externalHelpBubbleUpdated.addListener(this.onExternalHelpBubbleUpdated_.bind(this)));
            const isVisible = element => {
                const rect = element.getBoundingClientRect();
                return rect.height > 0 && rect.width > 0
            }
            ;
            this.debouncedAnchorMayHaveChangedCallback_ = debounceEnd(this.onAnchorBoundsMayHaveChanged_.bind(this), 50);
            this.helpBubbleResizeObserver_ = new ResizeObserver((entries => entries.forEach(( ({target: target}) => {
                if (target === document.body) {
                    if (this.debouncedAnchorMayHaveChangedCallback_) {
                        this.debouncedAnchorMayHaveChangedCallback_()
                    }
                } else {
                    this.onAnchorVisibilityChanged_(target, isVisible(target))
                }
            }
            ))));
            this.helpBubbleFixedAnchorObserver_ = new IntersectionObserver((entries => entries.forEach(( ({target: target, isIntersecting: isIntersecting}) => this.onAnchorVisibilityChanged_(target, isIntersecting)))),{
                root: null
            });
            document.addEventListener("scroll", this.debouncedAnchorMayHaveChangedCallback_, {
                passive: true
            });
            this.helpBubbleResizeObserver_.observe(document.body);
            this.controllers.forEach((ctrl => this.observeControllerAnchor_(ctrl)))
        }
        get controllers() {
            return Array.from(this.helpBubbleControllerById_.values())
        }
        disconnectedCallback() {
            super.disconnectedCallback();
            for (const listenerId of this.helpBubbleListenerIds_) {
                this.helpBubbleCallbackRouter_.removeListener(listenerId)
            }
            this.helpBubbleListenerIds_ = [];
            assert(this.helpBubbleResizeObserver_);
            this.helpBubbleResizeObserver_.disconnect();
            this.helpBubbleResizeObserver_ = null;
            assert(this.helpBubbleFixedAnchorObserver_);
            this.helpBubbleFixedAnchorObserver_.disconnect();
            this.helpBubbleFixedAnchorObserver_ = null;
            this.helpBubbleDismissedEventTracker_.removeAll();
            this.helpBubbleControllerById_.clear();
            if (this.debouncedAnchorMayHaveChangedCallback_) {
                document.removeEventListener("scroll", this.debouncedAnchorMayHaveChangedCallback_);
                this.debouncedAnchorMayHaveChangedCallback_ = null
            }
        }
        registerHelpBubble(nativeId, trackable, options={}) {
            if (this.helpBubbleControllerById_.has(nativeId)) {
                const ctrl = this.helpBubbleControllerById_.get(nativeId);
                if (ctrl && ctrl.isBubbleShowing()) {
                    return null
                }
                this.unregisterHelpBubble(nativeId)
            }
            const controller = new HelpBubbleController(nativeId,this.shadowRoot);
            controller.track(trackable, parseOptions(options));
            this.helpBubbleControllerById_.set(nativeId, controller);
            if (this.helpBubbleResizeObserver_) {
                this.observeControllerAnchor_(controller)
            }
            return controller
        }
        unregisterHelpBubble(nativeId) {
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            if (ctrl && ctrl.hasAnchor()) {
                this.onAnchorVisibilityChanged_(ctrl.getAnchor(), false);
                this.unobserveControllerAnchor_(ctrl)
            }
            this.helpBubbleControllerById_.delete(nativeId)
        }
        observeControllerAnchor_(controller) {
            const anchor = controller.getAnchor();
            assert(anchor, "Help bubble does not have anchor");
            if (controller.isAnchorFixed()) {
                assert(this.helpBubbleFixedAnchorObserver_);
                this.helpBubbleFixedAnchorObserver_.observe(anchor)
            } else {
                assert(this.helpBubbleResizeObserver_);
                this.helpBubbleResizeObserver_.observe(anchor)
            }
        }
        unobserveControllerAnchor_(controller) {
            const anchor = controller.getAnchor();
            assert(anchor, "Help bubble does not have anchor");
            if (controller.isAnchorFixed()) {
                assert(this.helpBubbleFixedAnchorObserver_);
                this.helpBubbleFixedAnchorObserver_.unobserve(anchor)
            } else {
                assert(this.helpBubbleResizeObserver_);
                this.helpBubbleResizeObserver_.unobserve(anchor)
            }
        }
        isHelpBubbleShowing() {
            return this.controllers.some((ctrl => ctrl.isBubbleShowing()))
        }
        isHelpBubbleShowingForTesting(id) {
            const ctrls = this.controllers.filter(this.filterMatchingIdForTesting_(id));
            return !!ctrls[0]
        }
        getHelpBubbleForTesting(id) {
            const ctrls = this.controllers.filter(this.filterMatchingIdForTesting_(id));
            return ctrls[0] ? ctrls[0].getBubble() : null
        }
        filterMatchingIdForTesting_(anchorId) {
            return ctrl => ctrl.isBubbleShowing() && ctrl.getAnchor() !== null && ctrl.getAnchor().id === anchorId
        }
        getSortedAnchorStatusesForTesting() {
            return this.controllers.sort(( (a, b) => a.getNativeId().localeCompare(b.getNativeId()))).map((ctrl => [ctrl.getNativeId(), ctrl.hasAnchor()]))
        }
        canShowHelpBubble(controller) {
            if (!this.helpBubbleControllerById_.has(controller.getNativeId())) {
                return false
            }
            if (!controller.canShowBubble()) {
                return false
            }
            const anchor = controller.getAnchor();
            const anchorIsUsed = this.controllers.some((otherCtrl => otherCtrl.isBubbleShowing() && otherCtrl.getAnchor() === anchor));
            return !anchorIsUsed
        }
        showHelpBubble(controller, params) {
            assert(this.canShowHelpBubble(controller), "Can't show help bubble");
            const bubble = controller.createBubble(params);
            this.helpBubbleDismissedEventTracker_.add(bubble, HELP_BUBBLE_DISMISSED_EVENT, this.onHelpBubbleDismissed_.bind(this));
            this.helpBubbleDismissedEventTracker_.add(bubble, HELP_BUBBLE_TIMED_OUT_EVENT, this.onHelpBubbleTimedOut_.bind(this));
            controller.show()
        }
        hideHelpBubble(nativeId) {
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            if (!ctrl || !ctrl.hasBubble()) {
                return false
            }
            this.helpBubbleDismissedEventTracker_.remove(ctrl.getBubble(), HELP_BUBBLE_DISMISSED_EVENT);
            this.helpBubbleDismissedEventTracker_.remove(ctrl.getBubble(), HELP_BUBBLE_TIMED_OUT_EVENT);
            ctrl.hide();
            return true
        }
        notifyHelpBubbleAnchorActivated(nativeId) {
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            if (!ctrl || !ctrl.isBubbleShowing()) {
                return false
            }
            this.helpBubbleHandler_.helpBubbleAnchorActivated(nativeId);
            return true
        }
        notifyHelpBubbleAnchorCustomEvent(nativeId, customEvent) {
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            if (!ctrl || !ctrl.isBubbleShowing()) {
                return false
            }
            this.helpBubbleHandler_.helpBubbleAnchorCustomEvent(nativeId, customEvent);
            return true
        }
        onAnchorVisibilityChanged_(target, isVisible) {
            const nativeId = target.dataset["nativeId"];
            assert(nativeId);
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            const hidden = this.hideHelpBubble(nativeId);
            if (hidden) {
                this.helpBubbleHandler_.helpBubbleClosed(nativeId, HelpBubbleClosedReason.kPageChanged)
            }
            const bounds = isVisible ? this.getElementBounds_(target) : {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            if (!ctrl || ctrl.updateAnchorVisibility(isVisible, bounds)) {
                this.helpBubbleHandler_.helpBubbleAnchorVisibilityChanged(nativeId, isVisible, bounds)
            }
        }
        onAnchorBoundsMayHaveChanged_() {
            for (const ctrl of this.controllers) {
                if (ctrl.hasAnchor() && ctrl.getAnchorVisibility()) {
                    const bounds = this.getElementBounds_(ctrl.getAnchor());
                    if (ctrl.updateAnchorVisibility(true, bounds)) {
                        this.helpBubbleHandler_.helpBubbleAnchorVisibilityChanged(ctrl.getNativeId(), true, bounds)
                    }
                }
            }
        }
        getElementBounds_(element) {
            const rect = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            const bounds = element.getBoundingClientRect();
            rect.x = bounds.x;
            rect.y = bounds.y;
            rect.width = bounds.width;
            rect.height = bounds.height;
            const nativeId = element.dataset["nativeId"];
            if (!nativeId) {
                return rect
            }
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            if (ctrl) {
                const padding = ctrl.getPadding();
                rect.x -= padding.left;
                rect.y -= padding.top;
                rect.width += padding.left + padding.right;
                rect.height += padding.top + padding.bottom
            }
            return rect
        }
        onShowHelpBubble_(params) {
            if (!this.helpBubbleControllerById_.has(params.nativeIdentifier)) {
                return
            }
            const ctrl = this.helpBubbleControllerById_.get(params.nativeIdentifier);
            this.showHelpBubble(ctrl, params)
        }
        onToggleHelpBubbleFocusForAccessibility_(nativeId) {
            if (!this.helpBubbleControllerById_.has(nativeId)) {
                return
            }
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            if (ctrl) {
                const anchor = ctrl.getAnchor();
                if (anchor) {
                    anchor.focus()
                }
            }
        }
        onHideHelpBubble_(nativeId) {
            this.hideHelpBubble(nativeId)
        }
        onExternalHelpBubbleUpdated_(nativeId, shown) {
            if (!this.helpBubbleControllerById_.has(nativeId)) {
                return
            }
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            ctrl.updateExternalShowingStatus(shown)
        }
        onHelpBubbleDismissed_(e) {
            const nativeId = e.detail.nativeId;
            assert(nativeId);
            const hidden = this.hideHelpBubble(nativeId);
            assert(hidden);
            if (nativeId) {
                if (e.detail.fromActionButton) {
                    this.helpBubbleHandler_.helpBubbleButtonPressed(nativeId, e.detail.buttonIndex)
                } else {
                    this.helpBubbleHandler_.helpBubbleClosed(nativeId, HelpBubbleClosedReason.kDismissedByUser)
                }
            }
        }
        onHelpBubbleTimedOut_(e) {
            const nativeId = e.detail.nativeId;
            const ctrl = this.helpBubbleControllerById_.get(nativeId);
            assert(ctrl);
            const hidden = this.hideHelpBubble(nativeId);
            assert(hidden);
            if (nativeId) {
                this.helpBubbleHandler_.helpBubbleClosed(nativeId, HelpBubbleClosedReason.kTimedOut)
            }
        }
    }
    return HelpBubbleMixinLit
}
;
function parseOptions(options) {
    const padding = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
    padding.top = clampPadding(options.anchorPaddingTop);
    padding.left = clampPadding(options.anchorPaddingLeft);
    padding.bottom = clampPadding(options.anchorPaddingBottom);
    padding.right = clampPadding(options.anchorPaddingRight);
    return {
        padding: padding,
        fixed: !!options.fixed
    }
}
function clampPadding(n=0) {
    return Math.max(0, Math.min(20, n))
}
let instance$1 = null;
function getCss() {
    return instance$1 || (instance$1 = [...[getCss$5(), getCss$6()], css`:host{--cr-focus-outline-color:var(--color-new-tab-page-focus-ring);--cr-realbox-height:44px;--cr-realbox-icon-left-position:12px;--cr-realbox-icon-size-in-searchbox:20px;--cr-realbox-icon-top-position:0;--cr-realbox-min-width:var(--ntp-search-box-width);--ntp-theme-text-shadow:none;--ntp-one-google-bar-height:56px;--ntp-search-box-width:337px;--ntp-menu-shadow:var(--color-new-tab-page-menu-inner-shadow) 0 1px 2px 0,var(--color-new-tab-page-menu-outer-shadow) 0 2px 6px 2px;--ntp-module-width:var(--ntp-search-box-width);--ntp-module-layout-width:var(--ntp-search-box-width);--ntp-module-border-radius:5px;--ntp-protected-icon-background-color:transparent;--ntp-protected-icon-background-color-hovered:rgba(255, 255, 255, .1)}:host([realbox-can-show-secondary-side][realbox-had-secondary-side]),:host([realbox-can-show-secondary-side][realbox-width-behavior_=wide]){--ntp-search-box-width:746px}@media (min-width:560px){:host{--ntp-search-box-width:449px}}@media (min-width:672px){:host{--ntp-search-box-width:561px}}:host([realbox-is-tall_]){--cr-realbox-height:48px}@media (min-width:804px){:host([wide-modules-enabled_]){--ntp-module-layout-width:768px;--ntp-module-width:768px}}cr-most-visited{--add-shortcut-background-color:var(--color-new-tab-page-add-shortcut-background);--add-shortcut-foreground-color:var(--color-new-tab-page-add-shortcut-foreground)}:host([modules-redesigned-enabled_]){--ntp-module-border-radius:16px;--ntp-module-item-border-radius:12px;--ntp-module-layout-width:360px;--ntp-module-width:360px}:host([show-background-image_]){--ntp-theme-text-shadow:0.5px 0.5px 1px rgba(0, 0, 0, 0.5),0px 0px 2px rgba(0, 0, 0, 0.2),0px 0px 10px rgba(0, 0, 0, 0.1);--ntp-protected-icon-background-color:rgba(0, 0, 0, .6);--ntp-protected-icon-background-color-hovered:rgba(0, 0, 0, .7)}#oneGoogleBarScrim{background:linear-gradient(rgba(0,0,0,.25) 0,rgba(0,0,0,.12) 45%,rgba(0,0,0,.05) 65%,transparent 100%);height:80px;position:absolute;top:0;width:100%}#oneGoogleBarScrim[fixed]{position:fixed}#oneGoogleBar{height:100%;position:absolute;top:0;width:100%}#content{align-items:center;display:flex;flex-direction:column;height:calc(100vh - var(--ntp-one-google-bar-height));min-width:fit-content;padding-top:var(--ntp-one-google-bar-height);position:relative;z-index:1}#logo{margin-bottom:38px;z-index:1}#realboxContainer{display:inherit;margin-bottom:16px;position:relative}ntp-modules{flex-shrink:0;width:var(--ntp-module-layout-width)}#modules:not([hidden]){animation:.3s ease-in-out fade-in-animation}@keyframes fade-in-animation{0%{opacity:0}100%{opacity:1}}ntp-middle-slot-promo{max-width:var(--ntp-search-box-width)}cr-searchbox{visibility:hidden}cr-searchbox[shown]{visibility:visible}cr-most-visited{--cr-menu-shadow:var(--ntp-menu-shadow);--most-visited-focus-shadow:var(--ntp-focus-shadow);--most-visited-text-color:var(--color-new-tab-page-most-visited-foreground);--most-visited-text-shadow:var(--ntp-theme-text-shadow)}ntp-middle-slot-promo:not([hidden])~#modules{margin-top:16px}#customizeButtons{display:flex;flex-wrap:wrap;gap:8px;bottom:16px;position:fixed}#wallpaperSearchButton{--cr-hover-background-color:var(--color-new-tab-page-wallpaper-search-button-background-hovered);--cr-button-text-color:var(--color-new-tab-page-wallpaper-search-button-foreground);--cr-button-background-color:var(--color-new-tab-page-wallpaper-search-button-background)}#customizeButton{--cr-hover-background-color:var(--color-new-tab-page-button-background-hovered);--cr-button-text-color:var(--color-new-tab-page-button-foreground);--cr-button-background-color:var(--color-new-tab-page-button-background)}:host([show-background-image_]) #customizeButton,:host([show-background-image_]) #wallpaperSearchButton{--cr-hover-background-color:var(--ntp-protected-icon-background-color-hovered);--cr-button-text-color:white;--cr-button-background-color:var(--ntp-protected-icon-background-color)}#customizeButton:has(help-bubble){z-index:1001}:host-context([dir=ltr]) #customizeButtons{right:16px}:host-context([dir=rtl]) #customizeButtons{left:16px}.customize-button{--cr-button-height:32px;border:none;border-radius:calc(.5 * var(--cr-button-height));box-shadow:0 3px 6px rgba(0,0,0,.16),0 1px 2px rgba(0,0,0,.23);font-weight:400;min-width:32px;padding-inline-end:16px;padding-inline-start:16px}:host([show-background-image_]) #customizeButton,:host([show-wallpaper-search_]) #wallpaperSearchButton,:host([wallpaper-search-button-enabled_]) #customizeButton{box-shadow:none;padding-inline-end:0;padding-inline-start:8px}:host-context(.focus-outline-visible) .customize-button:focus{box-shadow:var(--ntp-focus-shadow)}.customize-icon{--cr-icon-button-margin-start:0;--cr-icon-color:var(--cr-button-text-color);--cr-icon-ripple-margin:0;--cr-icon-ripple-size:16px;--cr-icon-size:100%}#wallpaperSearchIcon{--cr-icon-image:url(icons/sparkle.svg)}#customizeIcon{--cr-icon-image:url(icons/icon_pencil.svg)}@media (max-width:550px){.customize-button{padding-inline-end:0;padding-inline-start:8px}.customize-text{display:none}}@media (max-width:1110px){:host([modules-redesigned-enabled_][modules-shown-to-user]) .customize-text{display:none}:host([modules-redesigned-enabled_][modules-shown-to-user]) .customize-button{padding-inline-end:0;padding-inline-start:8px}}@media (max-width:970px){:host([modules-shown-to-user]) .customize-button{padding-inline-end:0;padding-inline-start:8px}:host([modules-shown-to-user]) .customize-text{display:none}}:host([wallpaper-search-button-animation-enabled_]) #wallpaperSearchButton{animation:750ms forwards grow-container,.5s forwards .3s color-text;color:transparent;opacity:0;transform-origin:right}@keyframes grow-container{from{opacity:0;transform:scale(.8)}to{opacity:100%;transform:scale(1)}}@keyframes color-text{from{color:transparent}to{color:var(--cr-button-text-color)}}:host([wallpaper-search-button-animation-enabled_]) #wallpaperSearchIcon{animation:2.5s 350ms spin-icon}@keyframes spin-icon{from{transform:rotate(0)}to{transform:rotate(720deg)}}#themeAttribution{align-self:flex-start;bottom:16px;color:var(--color-new-tab-page-secondary-foreground);margin-inline-start:16px;position:fixed}#backgroundImageAttribution{border-radius:8px;bottom:16px;color:var(--color-new-tab-page-attribution-foreground);line-height:20px;max-width:50vw;padding:8px;position:fixed;z-index:-1;background-color:var(--ntp-protected-icon-background-color);text-shadow:none}#backgroundImageAttribution:hover{background-color:var(--ntp-protected-icon-background-color-hovered);background:rgba(var(--google-grey-900-rgb),.1)}:host-context([dir=ltr]) #backgroundImageAttribution{left:16px}:host-context([dir=rtl]) #backgroundImageAttribution{right:16px}#backgroundImageAttribution1Container{align-items:center;display:flex;flex-direction:row}#linkIcon{-webkit-mask-image:url(icons/link.svg);-webkit-mask-repeat:no-repeat;-webkit-mask-size:100%;background-color:var(--color-new-tab-page-attribution-foreground);height:16px;margin-inline-end:8px;width:16px}#backgroundImageAttribution1,#backgroundImageAttribution2{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#backgroundImageAttribution1{font-size:.875rem}#backgroundImageAttribution2{font-size:.75rem}#contentBottomSpacer{flex-shrink:0;height:32px;width:1px}svg{position:fixed}ntp-lens-upload-dialog{left:0;position:absolute;right:0;top:0;z-index:101}#webstoreToast{padding:16px}`])
}
function getHtml() {
    return html$1`<!--_html_template_start_--><div id="content">
  ${this.lazyRender_ && this.oneGoogleBarEnabled_ ? html$1`
    <div id="oneGoogleBarScrim" ?hidden="${!this.showBackgroundImage_}" ?fixed="${this.scrolledToTop_}"></div>
    <ntp-iframe id="oneGoogleBar" src="${this.oneGoogleBarIframePath_}" ?hidden="${!this.oneGoogleBarLoaded_}" allow="camera ${this.oneGoogleBarIframeOrigin_}; display-capture ${this.oneGoogleBarIframeOrigin_}"> 
    </ntp-iframe>
  ` : ""}
  
  <ntp-logo id="logo" ?single-colored="${this.singleColoredLogo_}" .dark="${this.isThemeDark_()}" .backgroundColor="${this.backgroundColor_}" ?hidden="${!this.logoEnabled_}">
  </ntp-logo>
  <div id="realboxContainer">
    <cr-searchbox id="realbox" ?is-dark="${this.isThemeDark_()}" ?color-source-is-baseline="${this.colorSourceIsBaseline}" @open-lens-search="${this.onOpenLensSearch_}" @open-voice-search="${this.onOpenVoiceSearch_}" ?shown="${this.realboxShown_}" ?had-secondary-side="${this.realboxHadSecondarySide}" @had-secondary-side-changed="${this.onRealboxHadSecondarySideChanged_}" ?can-show-secondary-side="${this.realboxCanShowSecondarySide}">
    </cr-searchbox>
    ${this.showLensUploadDialog_ ? html$1`
      <ntp-lens-upload-dialog id="lensUploadDialog" @close-lens-search="${this.onCloseLensSearch_}">
      </ntp-lens-upload-dialog>
    ` : ""}
  </div>
  ${this.lazyRender_ ? html$1`
    <cr-toast id="webstoreToast" duration="10000" hidden>
      <div>您可在 Chrome 应用商店中找到较旧的色彩</div>
      <cr-button @click="${this.onWebstoreToastButtonClick_}">
        查找主题
      </cr-button>
    </cr-toast>
  ` : ""}
  ${this.lazyRender_ ? html$1`
    ${this.shortcutsEnabled_ ? html$1`
      <cr-most-visited id="mostVisited" .theme="${this.theme_?.mostVisited || null}" ?single-row="${this.singleRowShortcutsEnabled_}" reflow-on-overflow>
      </cr-most-visited>
    ` : ""}
    ${this.middleSlotPromoEnabled_ ? html$1`
      <ntp-middle-slot-promo @ntp-middle-slot-promo-loaded="${this.onMiddleSlotPromoLoaded_}" ?hidden="${!this.promoAndModulesLoaded_}">
      </ntp-middle-slot-promo>
    ` : ""}
    ${this.modulesEnabled_ ? html$1`
      ${!this.modulesRedesignedEnabled_ ? html$1`
        <ntp-modules id="modules" ?modules-shown-to-user="${this.modulesShownToUser}" @modules-shown-to-user-changed="${this.onModulesShownToUserChanged_}" @customize-module="${this.onCustomizeModule_}" @modules-loaded="${this.onModulesLoaded_}" ?hidden="${!this.promoAndModulesLoaded_}">
        </ntp-modules>
      ` : html$1`
        <ntp-modules-v2 id="modules" ?modules-shown-to-user="${this.modulesShownToUser}" @modules-shown-to-user-changed="${this.onModulesShownToUserChanged_}" @customize-module="${this.onCustomizeModule_}" @modules-loaded="${this.onModulesLoaded_}" ?hidden="${!this.promoAndModulesLoaded_}">
        </ntp-modules-v2>
      `}
    ` : ""}
    <a id="backgroundImageAttribution" href="${this.backgroundImageAttributionUrl_}" ?hidden="${!this.backgroundImageAttribution1_}">
      <div id="backgroundImageAttribution1Container">
        <div id="linkIcon" ?hidden="${!this.backgroundImageAttributionUrl_}"></div>
        <div id="backgroundImageAttribution1">
          ${this.backgroundImageAttribution1_}
        </div>
      </div>
      <div id="backgroundImageAttribution2" ?hidden="${!this.backgroundImageAttribution2_}">
        ${this.backgroundImageAttribution2_}
      </div>
    </a>
    <div id="customizeButtons">
      ${this.wallpaperSearchButtonEnabled_ ? html$1`
        <cr-button id="wallpaperSearchButton" class="customize-button" @click="${this.onWallpaperSearchClick_}" title="利用 AI 自定义此页面" aria-pressed="${this.showWallpaperSearch_}">
          <div id="wallpaperSearchIcon" class="customize-icon cr-icon" slot="prefix-icon"></div>
          <div id="wallpaperSearchText" class="customize-text" ?hidden="${this.showWallpaperSearch_}">
            利用 AI 创建主题
          </div>
        </cr-button>
      ` : ""}
      <cr-button id="customizeButton" class="customize-button" @click="${this.onCustomizeClick_}" title="自定义此页" aria-pressed="${this.showCustomize_}">
        <div id="customizeIcon" class="customize-icon cr-icon" slot="prefix-icon"></div>
        <div id="customizeText" class="customize-text" ?hidden="${!this.showCustomizeChromeText_}">
          自定义 Chrome
        </div>
      </cr-button>
    </div>
    ${this.showThemeAttribution_() ? html$1`
      <div id="themeAttribution">
        <div>主题背景创建者：</div>
        <img src="${this.theme_.backgroundImage.attributionUrl.url}">
      </div>
    ` : ""}
  ` : ""}
  <div id="contentBottomSpacer"></div>
</div>
${this.showVoiceSearchOverlay_ ? html$1`
  <ntp-voice-search-overlay @close="${this.onVoiceSearchOverlayClose_}">
  </ntp-voice-search-overlay>
` : ""}
<svg>
  <defs>
    <clipPath id="oneGoogleBarClipPath">
      
      <rect x="0" y="0" width="1" height="1"></rect>
    </clipPath>
  </defs>
</svg>
<!--_html_template_end_-->`
}
// Copyright 2016 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class PromiseResolver {
    resolve_ = () => {}
    ;
    reject_ = () => {}
    ;
    isFulfilled_ = false;
    promise_;
    constructor() {
        this.promise_ = new Promise(( (resolve, reject) => {
            this.resolve_ = resolution => {
                resolve(resolution);
                this.isFulfilled_ = true
            }
            ;
            this.reject_ = reason => {
                reject(reason);
                this.isFulfilled_ = true
            }
        }
        ))
    }
    get isFulfilled() {
        return this.isFulfilled_
    }
    get promise() {
        return this.promise_
    }
    get resolve() {
        return this.resolve_
    }
    get reject() {
        return this.reject_
    }
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
class LoadTimeResolver {
    constructor(url) {
        this.resolver_ = new PromiseResolver;
        this.eventTracker_ = new EventTracker;
        this.eventTracker_.add(window, "message", ( ({data: data}) => {
            if (data.frameType === "background-image" && data.messageType === "loaded" && url === data.url) {
                this.resolve_(data.time)
            }
        }
        ))
    }
    get promise() {
        return this.resolver_.promise
    }
    reject() {
        this.resolver_.reject();
        this.eventTracker_.removeAll()
    }
    resolve_(loadTime) {
        this.resolver_.resolve(loadTime);
        this.eventTracker_.removeAll()
    }
}
let instance = null;
class BackgroundManager {
    static getInstance() {
        return instance || (instance = new BackgroundManager)
    }
    static setInstance(newInstance) {
        instance = newInstance
    }
    constructor() {
        this.loadTimeResolver_ = null;
        this.backgroundImage_ = strictQuery(document.body, "#backgroundImage", HTMLIFrameElement);
        this.url_ = this.backgroundImage_.src
    }
    setShowBackgroundImage(show) {
        document.body.toggleAttribute("show-background-image", show)
    }
    setBackgroundColor(color) {
        document.body.style.backgroundColor = skColorToRgba(color)
    }
    setBackgroundImage(image) {
        const url = new URL("chrome-untrusted://new-tab-page/custom_background_image");
        url.searchParams.append("url", image.url.url);
        if (image.url2x) {
            url.searchParams.append("url2x", image.url2x.url)
        }
        if (image.size) {
            url.searchParams.append("size", image.size)
        }
        if (image.repeatX) {
            url.searchParams.append("repeatX", image.repeatX)
        }
        if (image.repeatY) {
            url.searchParams.append("repeatY", image.repeatY)
        }
        if (image.positionX) {
            url.searchParams.append("positionX", image.positionX)
        }
        if (image.positionY) {
            url.searchParams.append("positionY", image.positionY)
        }
        if (url.href === this.url_) {
            return
        }
        if (this.loadTimeResolver_) {
            this.loadTimeResolver_.reject();
            this.loadTimeResolver_ = null
        }
        this.backgroundImage_.contentWindow.location.replace(url.href);
        this.url_ = url.href
    }
    getBackgroundImageLoadTime() {
        if (!this.loadTimeResolver_) {
            this.loadTimeResolver_ = new LoadTimeResolver(this.backgroundImage_.src);
            WindowProxy.getInstance().postMessage(this.backgroundImage_, "sendLoadTime", "chrome-untrusted://new-tab-page")
        }
        return this.loadTimeResolver_.promise
    }
}
// Copyright 2020 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var CustomizeDialogPage;
(function(CustomizeDialogPage) {
    CustomizeDialogPage["BACKGROUNDS"] = "backgrounds";
    CustomizeDialogPage["SHORTCUTS"] = "shortcuts";
    CustomizeDialogPage["MODULES"] = "modules";
    CustomizeDialogPage["THEMES"] = "themes";
    CustomizeDialogPage["WALLPAPER_SEARCH"] = "wallpaper_search"
}
)(CustomizeDialogPage || (CustomizeDialogPage = {}));
// Copyright 2019 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var NtpElement;
(function(NtpElement) {
    NtpElement[NtpElement["OTHER"] = 0] = "OTHER";
    NtpElement[NtpElement["BACKGROUND"] = 1] = "BACKGROUND";
    NtpElement[NtpElement["ONE_GOOGLE_BAR"] = 2] = "ONE_GOOGLE_BAR";
    NtpElement[NtpElement["LOGO"] = 3] = "LOGO";
    NtpElement[NtpElement["REALBOX"] = 4] = "REALBOX";
    NtpElement[NtpElement["MOST_VISITED"] = 5] = "MOST_VISITED";
    NtpElement[NtpElement["MIDDLE_SLOT_PROMO"] = 6] = "MIDDLE_SLOT_PROMO";
    NtpElement[NtpElement["MODULE"] = 7] = "MODULE";
    NtpElement[NtpElement["CUSTOMIZE"] = 8] = "CUSTOMIZE";
    NtpElement[NtpElement["CUSTOMIZE_BUTTON"] = 9] = "CUSTOMIZE_BUTTON";
    NtpElement[NtpElement["CUSTOMIZE_DIALOG"] = 10] = "CUSTOMIZE_DIALOG";
    NtpElement[NtpElement["WALLPAPER_SEARCH_BUTTON"] = 11] = "WALLPAPER_SEARCH_BUTTON";
    NtpElement[NtpElement["MAX_VALUE"] = 11] = "MAX_VALUE"
}
)(NtpElement || (NtpElement = {}));
var NtpCustomizeChromeEntryPoint;
(function(NtpCustomizeChromeEntryPoint) {
    NtpCustomizeChromeEntryPoint[NtpCustomizeChromeEntryPoint["CUSTOMIZE_BUTTON"] = 0] = "CUSTOMIZE_BUTTON";
    NtpCustomizeChromeEntryPoint[NtpCustomizeChromeEntryPoint["MODULE"] = 1] = "MODULE";
    NtpCustomizeChromeEntryPoint[NtpCustomizeChromeEntryPoint["URL"] = 2] = "URL";
    NtpCustomizeChromeEntryPoint[NtpCustomizeChromeEntryPoint["WALLPAPER_SEARCH_BUTTON"] = 3] = "WALLPAPER_SEARCH_BUTTON";
    NtpCustomizeChromeEntryPoint[NtpCustomizeChromeEntryPoint["MAX_VALUE"] = 3] = "MAX_VALUE"
}
)(NtpCustomizeChromeEntryPoint || (NtpCustomizeChromeEntryPoint = {}));
const CUSTOMIZE_URL_PARAM = "customize";
const OGB_IFRAME_ORIGIN = "chrome-untrusted://new-tab-page";
const CUSTOMIZE_CHROME_BUTTON_ELEMENT_ID = "NewTabPageUI::kCustomizeChromeButtonElementId";
const realboxCanShowSecondarySideMediaQueryList = window.matchMedia("(min-width: 900px)");
function recordClick(element) {
    chrome.metricsPrivate.recordEnumerationValue("NewTabPage.Click", element, NtpElement.MAX_VALUE + 1)
}
function recordCustomizeChromeOpen(element) {
    chrome.metricsPrivate.recordEnumerationValue("NewTabPage.CustomizeChromeOpened", element, NtpCustomizeChromeEntryPoint.MAX_VALUE + 1)
}
function ensureLazyLoaded() {
    const script = document.createElement("script");
    script.type = "module";
    script.src = getTrustedScriptURL`./lazy_load.js`;
    document.body.appendChild(script)
}
const AppElementBase = HelpBubbleMixinLit(CrLitElement);
class AppElement extends AppElementBase {
    static get is() {
        return "ntp-app"
    }
    static get styles() {
        return getCss()
    }
    render() {
        return getHtml.bind(this)()
    }
    static get properties() {
        return {
            oneGoogleBarIframeOrigin_: {
                type: String
            },
            oneGoogleBarIframePath_: {
                type: String
            },
            oneGoogleBarLoaded_: {
                type: Boolean
            },
            theme_: {
                type: Object
            },
            showCustomize_: {
                type: Boolean
            },
            showCustomizeChromeText_: {
                type: Boolean
            },
            showWallpaperSearch_: {
                type: Boolean,
                reflect: true
            },
            selectedCustomizeDialogPage_: {
                type: String
            },
            showVoiceSearchOverlay_: {
                type: Boolean
            },
            showBackgroundImage_: {
                reflect: true,
                type: Boolean
            },
            backgroundImageAttribution1_: {
                type: String
            },
            backgroundImageAttribution2_: {
                type: String
            },
            backgroundImageAttributionUrl_: {
                type: String
            },
            backgroundColor_: {
                type: Object
            },
            colorSourceIsBaseline: {
                type: Boolean
            },
            logoColor_: {
                type: String
            },
            singleColoredLogo_: {
                type: Boolean
            },
            realboxCanShowSecondarySide: {
                type: Boolean,
                reflect: true
            },
            realboxHadSecondarySide: {
                type: Boolean,
                reflect: true,
                notify: true
            },
            realboxIsTall_: {
                type: Boolean,
                reflect: true
            },
            realboxShown_: {
                type: Boolean
            },
            realboxWidthBehavior_: {
                type: String,
                reflect: true
            },
            logoEnabled_: {
                type: Boolean
            },
            oneGoogleBarEnabled_: {
                type: Boolean
            },
            shortcutsEnabled_: {
                type: Boolean
            },
            singleRowShortcutsEnabled_: {
                type: Boolean
            },
            middleSlotPromoEnabled_: {
                type: Boolean
            },
            modulesEnabled_: {
                type: Boolean
            },
            modulesRedesignedEnabled_: {
                type: Boolean,
                reflect: true
            },
            wideModulesEnabled_: {
                type: Boolean,
                reflect: true
            },
            middleSlotPromoLoaded_: {
                type: Boolean
            },
            modulesLoaded_: {
                type: Boolean
            },
            modulesShownToUser: {
                type: Boolean,
                reflect: true
            },
            promoAndModulesLoaded_: {
                type: Boolean
            },
            showLensUploadDialog_: {
                type: Boolean
            },
            lazyRender_: {
                type: Boolean
            },
            scrolledToTop_: {
                type: Boolean
            },
            wallpaperSearchButtonAnimationEnabled_: {
                type: Boolean,
                reflect: true
            },
            wallpaperSearchButtonEnabled_: {
                type: Boolean,
                reflect: true
            }
        }
    }
    constructor() {
        performance.mark("app-creation-start");
        super();
        this.oneGoogleBarIframeOrigin_ = OGB_IFRAME_ORIGIN;
        this.showWallpaperSearch_ = false;
        this.showVoiceSearchOverlay_ = false;
        this.logoColor_ = null;
        this.realboxIsTall_ = loadTimeData.getBoolean("realboxIsTall");
        this.realboxWidthBehavior_ = loadTimeData.getString("realboxWidthBehavior");
        this.showLensUploadDialog_ = false;
        this.logoEnabled_ = loadTimeData.getBoolean("logoEnabled");
        this.oneGoogleBarEnabled_ = loadTimeData.getBoolean("oneGoogleBarEnabled");
        this.shortcutsEnabled_ = loadTimeData.getBoolean("shortcutsEnabled");
        this.singleRowShortcutsEnabled_ = loadTimeData.getBoolean("singleRowShortcutsEnabled");
        this.middleSlotPromoEnabled_ = loadTimeData.getBoolean("middleSlotPromoEnabled");
        this.modulesEnabled_ = loadTimeData.getBoolean("modulesEnabled");
        this.modulesRedesignedEnabled_ = loadTimeData.getBoolean("modulesRedesignedEnabled");
        this.wideModulesEnabled_ = loadTimeData.getBoolean("wideModulesEnabled");
        this.middleSlotPromoLoaded_ = false;
        this.modulesLoaded_ = false;
        this.promoAndModulesLoaded_ = false;
        this.scrolledToTop_ = document.documentElement.scrollTop <= 0;
        this.wallpaperSearchButtonAnimationEnabled_ = loadTimeData.getBoolean("wallpaperSearchButtonAnimationEnabled");
        this.wallpaperSearchButtonEnabled_ = loadTimeData.getBoolean("wallpaperSearchButtonEnabled");
        this.setThemeListenerId_ = null;
        this.setCustomizeChromeSidePanelVisibilityListener_ = null;
        this.setWallpaperSearchButtonVisibilityListener_ = null;
        this.eventTracker_ = new EventTracker;
        this.backgroundImageLoadStart_ = 0;
        this.showWebstoreToastListenerId_ = null;
        this.callbackRouter_ = NewTabPageProxy.getInstance().callbackRouter;
        this.pageHandler_ = NewTabPageProxy.getInstance().handler;
        this.backgroundManager_ = BackgroundManager.getInstance();
        this.shouldPrintPerformance_ = new URLSearchParams(location.search).has("print_perf");
        this.oneGoogleBarIframePath_ = ( () => {
            const params = new URLSearchParams;
            params.set("paramsencoded", btoa(window.location.search.replace(/^[?]/, "&")));
            return `${OGB_IFRAME_ORIGIN}/one-google-bar?${params}`
        }
        )();
        this.showCustomize_ = WindowProxy.getInstance().url.searchParams.has(CUSTOMIZE_URL_PARAM);
        this.selectedCustomizeDialogPage_ = WindowProxy.getInstance().url.searchParams.get(CUSTOMIZE_URL_PARAM);
        this.realboxCanShowSecondarySide = realboxCanShowSecondarySideMediaQueryList.matches;
        this.backgroundImageLoadStartEpoch_ = performance.timeOrigin;
        chrome.metricsPrivate.recordValue({
            metricName: "NewTabPage.Height",
            type: chrome.metricsPrivate.MetricTypeType.HISTOGRAM_LINEAR,
            min: 1,
            max: 1e3,
            buckets: 200
        }, Math.floor(window.innerHeight));
        chrome.metricsPrivate.recordValue({
            metricName: "NewTabPage.Width",
            type: chrome.metricsPrivate.MetricTypeType.HISTOGRAM_LINEAR,
            min: 1,
            max: 1920,
            buckets: 384
        }, Math.floor(window.innerWidth));
        ColorChangeUpdater.forDocument().start()
    }
    connectedCallback() {
        super.connectedCallback();
        realboxCanShowSecondarySideMediaQueryList.addEventListener("change", this.onRealboxCanShowSecondarySideChanged_.bind(this));
        this.setThemeListenerId_ = this.callbackRouter_.setTheme.addListener((theme => {
            if (!this.theme_) {
                this.onThemeLoaded_(theme)
            }
            performance.measure("theme-set");
            this.theme_ = theme
        }
        ));
        this.setCustomizeChromeSidePanelVisibilityListener_ = this.callbackRouter_.setCustomizeChromeSidePanelVisibility.addListener((visible => {
            this.showCustomize_ = visible;
            if (!visible) {
                this.showWallpaperSearch_ = false
            }
        }
        ));
        this.showWebstoreToastListenerId_ = this.callbackRouter_.showWebstoreToast.addListener(( () => {
            if (this.showCustomize_) {
                const toast = $$(this, "#webstoreToast");
                if (toast) {
                    toast.hidden = false;
                    toast.show()
                }
            }
        }
        ));
        this.setWallpaperSearchButtonVisibilityListener_ = this.callbackRouter_.setWallpaperSearchButtonVisibility.addListener((visible => {
            if (!visible) {
                this.wallpaperSearchButtonEnabled_ = visible
            }
        }
        ));
        if (this.showCustomize_) {
            this.setCustomizeChromeSidePanelVisible_(this.showCustomize_);
            recordCustomizeChromeOpen(NtpCustomizeChromeEntryPoint.URL)
        }
        this.eventTracker_.add(window, "message", (event => {
            const data = event.data;
            if (typeof data !== "object") {
                return
            }
            if ("frameType"in data && data.frameType === "one-google-bar") {
                this.handleOneGoogleBarMessage_(event)
            }
        }
        ));
        this.eventTracker_.add(window, "keydown", this.onWindowKeydown_.bind(this));
        this.eventTracker_.add(window, "click", this.onWindowClick_.bind(this), true);
        this.eventTracker_.add(document, "scroll", ( () => {
            this.scrolledToTop_ = document.documentElement.scrollTop <= 0
        }
        ));
        if (loadTimeData.getString("backgroundImageUrl")) {
            this.backgroundManager_.getBackgroundImageLoadTime().then((time => {
                const duration = time - this.backgroundImageLoadStartEpoch_;
                recordDuration("NewTabPage.Images.ShownTime.BackgroundImage", duration);
                if (this.shouldPrintPerformance_) {
                    this.printPerformanceDatum_("background-image-load", this.backgroundImageLoadStart_, duration);
                    this.printPerformanceDatum_("background-image-loaded", this.backgroundImageLoadStart_ + duration)
                }
            }
            ), ( () => {}
            ))
        }
        FocusOutlineManager.forDocument(document)
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        realboxCanShowSecondarySideMediaQueryList.removeEventListener("change", this.onRealboxCanShowSecondarySideChanged_.bind(this));
        this.callbackRouter_.removeListener(this.setThemeListenerId_);
        this.callbackRouter_.removeListener(this.setCustomizeChromeSidePanelVisibilityListener_);
        this.callbackRouter_.removeListener(this.showWebstoreToastListenerId_);
        this.callbackRouter_.removeListener(this.setWallpaperSearchButtonVisibilityListener_);
        this.eventTracker_.removeAll()
    }
    firstUpdated() {
        this.pageHandler_.onAppRendered(WindowProxy.getInstance().now());
        WindowProxy.getInstance().waitForLazyRender().then(( () => {
            ensureLazyLoaded();
            this.lazyRender_ = true
        }
        ));
        this.printPerformance_();
        performance.measure("app-creation", "app-creation-start")
    }
    willUpdate(changedProperties) {
        super.willUpdate(changedProperties);
        const changedPrivateProperties = changedProperties;
        if (changedPrivateProperties.has("theme_")) {
            this.showBackgroundImage_ = this.computeShowBackgroundImage_();
            this.backgroundImageAttribution1_ = this.computeBackgroundImageAttribution1_();
            this.backgroundImageAttribution2_ = this.computeBackgroundImageAttribution2_();
            this.backgroundImageAttributionUrl_ = this.computeBackgroundImageAttributionUrl_();
            this.colorSourceIsBaseline = this.computeColorSourceIsBaseline();
            this.logoColor_ = this.computeLogoColor_();
            this.singleColoredLogo_ = this.computeSingleColoredLogo_()
        }
        this.backgroundColor_ = this.computeBackgroundColor_();
        this.realboxShown_ = this.computeRealboxShown_();
        this.promoAndModulesLoaded_ = this.computePromoAndModulesLoaded_();
        this.showCustomizeChromeText_ = this.computeShowCustomizeChromeText_()
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const changedPrivateProperties = changedProperties;
        if (changedPrivateProperties.has("lazyRender_") && this.lazyRender_) {
            this.onLazyRendered_()
        }
        if (changedPrivateProperties.has("theme_")) {
            this.onThemeChange_()
        }
        if (changedPrivateProperties.has("logoColor_")) {
            this.style.setProperty("--ntp-logo-color", this.rgbaOrInherit_(this.logoColor_))
        }
        if (changedPrivateProperties.has("showBackgroundImage_")) {
            this.onShowBackgroundImageChange_()
        }
        if (changedPrivateProperties.has("promoAndModulesLoaded_")) {
            this.onPromoAndModulesLoadedChange_()
        }
        if (changedPrivateProperties.has("oneGoogleBarLoaded_") || changedPrivateProperties.has("theme_")) {
            this.updateOneGoogleBarAppearance_()
        }
    }
    updateOneGoogleBarAppearance_() {
        if (this.oneGoogleBarLoaded_) {
            const isNtpDarkTheme = this.theme_ && (!!this.theme_.backgroundImage || this.theme_.isDark);
            $$(this, "#oneGoogleBar").postMessage({
                type: "updateAppearance",
                applyLightTheme: isNtpDarkTheme
            })
        }
    }
    computeShowCustomizeChromeText_() {
        if (this.wallpaperSearchButtonEnabled_) {
            return false
        }
        return !this.showBackgroundImage_
    }
    computeBackgroundImageAttribution1_() {
        return this.theme_ && this.theme_.backgroundImageAttribution1 || ""
    }
    computeBackgroundImageAttribution2_() {
        return this.theme_ && this.theme_.backgroundImageAttribution2 || ""
    }
    computeBackgroundImageAttributionUrl_() {
        return this.theme_ && this.theme_.backgroundImageAttributionUrl ? this.theme_.backgroundImageAttributionUrl.url : ""
    }
    computeRealboxShown_() {
        return !!this.theme_ && !this.showLensUploadDialog_
    }
    computePromoAndModulesLoaded_() {
        return (!loadTimeData.getBoolean("middleSlotPromoEnabled") || this.middleSlotPromoLoaded_) && (!loadTimeData.getBoolean("modulesEnabled") || this.modulesLoaded_)
    }
    onRealboxCanShowSecondarySideChanged_(e) {
        this.realboxCanShowSecondarySide = e.matches
    }
    async onLazyRendered_() {
        document.documentElement.setAttribute("lazy-loaded", String(true));
        this.registerHelpBubble(CUSTOMIZE_CHROME_BUTTON_ELEMENT_ID, "#customizeButton", {
            fixed: true
        });
        this.pageHandler_.maybeShowFeaturePromo(IphFeature.kCustomizeChrome);
        if (this.wallpaperSearchButtonEnabled_) {
            this.pageHandler_.incrementWallpaperSearchButtonShownCount()
        }
    }
    onOpenVoiceSearch_() {
        this.showVoiceSearchOverlay_ = true;
        recordVoiceAction(Action.ACTIVATE_SEARCH_BOX)
    }
    onOpenLensSearch_() {
        this.showLensUploadDialog_ = true
    }
    onCloseLensSearch_() {
        this.showLensUploadDialog_ = false
    }
    onCustomizeClick_() {
        this.selectedCustomizeDialogPage_ = null;
        this.setCustomizeChromeSidePanelVisible_(!this.showCustomize_);
        if (!this.showCustomize_) {
            this.pageHandler_.incrementCustomizeChromeButtonOpenCount();
            recordCustomizeChromeOpen(NtpCustomizeChromeEntryPoint.CUSTOMIZE_BUTTON)
        }
    }
    onWallpaperSearchClick_() {
        if (this.showCustomize_ && this.showWallpaperSearch_) {
            this.selectedCustomizeDialogPage_ = null;
            this.setCustomizeChromeSidePanelVisible_(!this.showCustomize_);
            return
        }
        this.selectedCustomizeDialogPage_ = CustomizeDialogPage.WALLPAPER_SEARCH;
        this.showWallpaperSearch_ = true;
        this.setCustomizeChromeSidePanelVisible_(this.showWallpaperSearch_);
        if (!this.showCustomize_) {
            this.pageHandler_.incrementCustomizeChromeButtonOpenCount();
            recordCustomizeChromeOpen(NtpCustomizeChromeEntryPoint.WALLPAPER_SEARCH_BUTTON)
        }
    }
    onVoiceSearchOverlayClose_() {
        this.showVoiceSearchOverlay_ = false
    }
    onWindowKeydown_(e) {
        let ctrlKeyPressed = e.ctrlKey;
        if (ctrlKeyPressed && e.code === "Period" && e.shiftKey) {
            this.showVoiceSearchOverlay_ = true;
            recordVoiceAction(Action.ACTIVATE_KEYBOARD)
        }
    }
    rgbaOrInherit_(skColor) {
        return skColor ? skColorToRgba(skColor) : "inherit"
    }
    computeShowBackgroundImage_() {
        return !!this.theme_ && !!this.theme_.backgroundImage
    }
    onShowBackgroundImageChange_() {
        this.backgroundManager_.setShowBackgroundImage(this.showBackgroundImage_)
    }
    onThemeChange_() {
        if (this.theme_) {
            this.backgroundManager_.setBackgroundColor(this.theme_.backgroundColor);
            this.style.setProperty("--color-new-tab-page-attribution-foreground", this.rgbaOrInherit_(this.theme_.textColor));
            this.style.setProperty("--color-new-tab-page-most-visited-foreground", this.rgbaOrInherit_(this.theme_.textColor))
        }
        this.updateBackgroundImagePath_()
    }
    onThemeLoaded_(theme) {
        chrome.metricsPrivate.recordSparseValueWithPersistentHash("NewTabPage.Collections.IdOnLoad", theme.backgroundImageCollectionId ?? "");
        if (!theme.backgroundImage || !theme.backgroundImage.imageSource) {
            chrome.metricsPrivate.recordEnumerationValue("NewTabPage.BackgroundImageSource", NtpBackgroundImageSource.kNoImage, NtpBackgroundImageSource.MAX_VALUE + 1);
            return
        } else {
            chrome.metricsPrivate.recordEnumerationValue("NewTabPage.BackgroundImageSource", theme.backgroundImage.imageSource, NtpBackgroundImageSource.MAX_VALUE + 1)
        }
        if (theme.backgroundImage.imageSource === NtpBackgroundImageSource.kWallpaperSearch || theme.backgroundImage.imageSource === NtpBackgroundImageSource.kWallpaperSearchInspiration) {
            this.wallpaperSearchButtonAnimationEnabled_ = false
        }
    }
    onPromoAndModulesLoadedChange_() {
        if (this.promoAndModulesLoaded_ && loadTimeData.getBoolean("modulesEnabled")) {
            recordLoadDuration("NewTabPage.Modules.ShownTime", WindowProxy.getInstance().now())
        }
    }
    updateBackgroundImagePath_() {
        const backgroundImage = this.theme_ && this.theme_.backgroundImage;
        if (backgroundImage) {
            this.backgroundManager_.setBackgroundImage(backgroundImage)
        }
    }
    computeBackgroundColor_() {
        if (this.showBackgroundImage_ || !this.theme_) {
            return null
        }
        return this.theme_.backgroundColor
    }
    computeColorSourceIsBaseline() {
        return !!this.theme_ && this.theme_.isBaseline
    }
    computeLogoColor_() {
        if (!this.theme_) {
            return null
        }
        return this.theme_.logoColor || (this.theme_.isDark ? hexColorToSkColor("#ffffff") : null)
    }
    computeSingleColoredLogo_() {
        return !!this.theme_ && (!!this.theme_.logoColor || this.theme_.isDark)
    }
    canShowPromoWithBrowserCommand_(messageData, commandSource, commandOrigin) {
        const commandId = Object.values(Command).includes(messageData.commandId) ? messageData.commandId : Command.kUnknownCommand;
        BrowserCommandProxy.getInstance().handler.canExecuteCommand(commandId).then(( ({canExecute: canExecute}) => {
            const response = {
                messageType: messageData.messageType,
                [messageData.commandId]: canExecute
            };
            commandSource.postMessage(response, commandOrigin)
        }
        ))
    }
    executePromoBrowserCommand_(commandData, commandSource, commandOrigin) {
        const commandId = Object.values(Command).includes(commandData.commandId) ? commandData.commandId : Command.kUnknownCommand;
        BrowserCommandProxy.getInstance().handler.executeCommand(commandId, commandData.clickInfo).then(( ({commandExecuted: commandExecuted}) => {
            commandSource.postMessage(commandExecuted, commandOrigin)
        }
        ))
    }
    handleOneGoogleBarMessage_(event) {
        const data = event.data;
        if (data.messageType === "loaded") {
            const oneGoogleBar = $$(this, "#oneGoogleBar");
            oneGoogleBar.style.clipPath = "url(#oneGoogleBarClipPath)";
            oneGoogleBar.style.zIndex = "1000";
            this.oneGoogleBarLoaded_ = true;
            this.pageHandler_.onOneGoogleBarRendered(WindowProxy.getInstance().now())
        } else if (data.messageType === "overlaysUpdated") {
            this.$.oneGoogleBarClipPath.querySelectorAll("rect").forEach((el => {
                el.remove()
            }
            ));
            const overlayRects = data.data;
            overlayRects.forEach(( ({x: x, y: y, width: width, height: height}) => {
                const rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rectElement.setAttribute("x", `${x - 8}`);
                rectElement.setAttribute("y", `${y - 8}`);
                rectElement.setAttribute("width", `${width + 16}`);
                rectElement.setAttribute("height", `${height + 16}`);
                this.$.oneGoogleBarClipPath.appendChild(rectElement)
            }
            ))
        } else if (data.messageType === "can-show-promo-with-browser-command") {
            this.canShowPromoWithBrowserCommand_(data, event.source, event.origin)
        } else if (data.messageType === "execute-browser-command") {
            this.executePromoBrowserCommand_(data.data, event.source, event.origin)
        } else if (data.messageType === "click") {
            recordClick(NtpElement.ONE_GOOGLE_BAR)
        }
    }
    onMiddleSlotPromoLoaded_() {
        this.middleSlotPromoLoaded_ = true
    }
    onModulesLoaded_() {
        this.modulesLoaded_ = true
    }
    onCustomizeModule_() {
        this.showCustomize_ = true;
        this.selectedCustomizeDialogPage_ = CustomizeDialogPage.MODULES;
        recordCustomizeChromeOpen(NtpCustomizeChromeEntryPoint.MODULE);
        this.setCustomizeChromeSidePanelVisible_(this.showCustomize_)
    }
    setCustomizeChromeSidePanelVisible_(visible) {
        let section = CustomizeChromeSection.kUnspecified;
        switch (this.selectedCustomizeDialogPage_) {
        case CustomizeDialogPage.BACKGROUNDS:
        case CustomizeDialogPage.THEMES:
            section = CustomizeChromeSection.kAppearance;
            break;
        case CustomizeDialogPage.SHORTCUTS:
            section = CustomizeChromeSection.kShortcuts;
            break;
        case CustomizeDialogPage.MODULES:
            section = CustomizeChromeSection.kModules;
            break;
        case CustomizeDialogPage.WALLPAPER_SEARCH:
            section = CustomizeChromeSection.kWallpaperSearch;
            break
        }
        this.pageHandler_.setCustomizeChromeSidePanelVisible(visible, section)
    }
    printPerformanceDatum_(name, time, auxTime=0) {
        if (!this.shouldPrintPerformance_) {
            return
        }
        console.info(!auxTime ? `${name}: ${time}` : `${name}: ${time} (${auxTime})`)
    }
    printPerformance_() {
        if (!this.shouldPrintPerformance_) {
            return
        }
        const entryTypes = ["paint", "measure"];
        const log = entry => {
            this.printPerformanceDatum_(entry.name, entry.duration ? entry.duration : entry.startTime, entry.duration && entry.startTime ? entry.startTime : 0)
        }
        ;
        const observer = new PerformanceObserver((list => {
            list.getEntries().forEach((entry => {
                log(entry)
            }
            ))
        }
        ));
        observer.observe({
            entryTypes: entryTypes
        });
        performance.getEntries().forEach((entry => {
            if (!entryTypes.includes(entry.entryType)) {
                return
            }
            log(entry)
        }
        ))
    }
    onWebstoreToastButtonClick_() {
        window.location.assign(`https://chrome.google.com/webstore/category/collection/chrome_color_themes?hl=${window.navigator.language}`)
    }
    onWindowClick_(e) {
        if (e.composedPath() && e.composedPath()[0] === $$(this, "#content")) {
            recordClick(NtpElement.BACKGROUND);
            return
        }
        for (const target of e.composedPath()) {
            switch (target) {
            case $$(this, "ntp-logo"):
                recordClick(NtpElement.LOGO);
                return;
            case $$(this, "cr-searchbox"):
                recordClick(NtpElement.REALBOX);
                return;
            case $$(this, "cr-most-visited"):
                recordClick(NtpElement.MOST_VISITED);
                return;
            case $$(this, "ntp-middle-slot-promo"):
                recordClick(NtpElement.MIDDLE_SLOT_PROMO);
                return;
            case $$(this, "#modules"):
                recordClick(NtpElement.MODULE);
                return;
            case $$(this, "#customizeButton"):
                recordClick(NtpElement.CUSTOMIZE_BUTTON);
                return;
            case $$(this, "#wallpaperSearchButton"):
                recordClick(NtpElement.WALLPAPER_SEARCH_BUTTON);
                return
            }
        }
        recordClick(NtpElement.OTHER)
    }
    isThemeDark_() {
        return !!this.theme_ && this.theme_.isDark
    }
    showThemeAttribution_() {
        return !!this.theme_?.backgroundImage?.attributionUrl
    }
    onRealboxHadSecondarySideChanged_(e) {
        this.realboxHadSecondarySide = e.detail.value
    }
    onModulesShownToUserChanged_(e) {
        this.modulesShownToUser = e.detail.value
    }
}
customElements.define(AppElement.is, AppElement);
export {$$, AppElement, BackgroundManager, BrowserCommandProxy, BrowserProxyImpl, CUSTOMIZE_CHROME_BUTTON_ELEMENT_ID, CustomizeDialogPage, DoodleShareDialogElement, IframeElement, LogoElement, MetricsReporterImpl, NewTabPageProxy, NtpCustomizeChromeEntryPoint, NtpElement, SearchboxBrowserProxy, SearchboxElement, SearchboxIconElement, SearchboxMatchElement, Action as VoiceAction, WindowProxy, recordDuration, recordLoadDuration};
