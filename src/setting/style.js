/* @flow */

import {pool} from "../util/pool"
import {guid} from "../util/guid"
import {intern$1} from "../util/intern"

/*::
import type {GUID} from "../util/guid"
import type {Pool} from "../util/pool"
*/

const ID = Symbol('ID@virtual-dom-pool/settings/style');

/*::
export type Value =
  | string
  | number
  | boolean

export type Style =
  { alignContent?: Value
  , alignItems?: Value
  , alignSelf?: Value
  , alignmentBaseline?: Value
  , all?: Value
  , alt?: Value
  , animation?: Value
  , animationDelay?: Value
  , animationDirection?: Value
  , animationDuration?: Value
  , animationFillMode?: Value
  , animationIterationCount?: Value
  , animationName?: Value
  , animationPlayState?: Value
  , animationTimingFunction?: Value
  , appleTrailingWord?: Value
  , background?: Value
  , backgroundAttachment?: Value
  , backgroundBlendMode?: Value
  , backgroundClip?: Value
  , backgroundColor?: Value
  , backgroundImage?: Value
  , backgroundOrigin?: Value
  , backgroundPosition?: Value
  , backgroundPositionX?: Value
  , backgroundPositionY?: Value
  , backgroundRepeat?: Value
  , backgroundRepeatX?: Value
  , backgroundRepeatY?: Value
  , backgroundSize?: Value
  , baselineShift?: Value
  , border?: Value
  , borderBottom?: Value
  , borderBottomColor?: Value
  , borderBottomLeftRadius?: Value
  , borderBottomRightRadius?: Value
  , borderBottomStyle?: Value
  , borderBottomWidth?: Value
  , borderCollapse?: Value
  , borderColor?: Value
  , borderImage?: Value
  , borderImageOutset?: Value
  , borderImageRepeat?: Value
  , borderImageSlice?: Value
  , borderImageSource?: Value
  , borderImageWidth?: Value
  , borderLeft?: Value
  , borderLeftColor?: Value
  , borderLeftStyle?: Value
  , borderLeftWidth?: Value
  , borderRadius?: Value
  , borderRight?: Value
  , borderRightColor?: Value
  , borderRightStyle?: Value
  , borderRightWidth?: Value
  , borderSpacing?: Value
  , borderStyle?: Value
  , borderTop?: Value
  , borderTopColor?: Value
  , borderTopLeftRadius?: Value
  , borderTopRightRadius?: Value
  , borderTopStyle?: Value
  , borderTopWidth?: Value
  , borderWidth?: Value
  , bottom?: Value
  , boxShadow?: Value
  , boxSizing?: Value
  , bufferedRendering?: Value
  , captionSide?: Value
  , clear?: Value
  , clip?: Value
  , clipPath?: Value
  , clipRule?: Value
  , color?: Value
  , colorInterpolation?: Value
  , colorInterpolationFilters?: Value
  , colorProfile?: Value
  , colorRendering?: Value
  , columnCount?: Value
  , columnFill?: Value
  , columnGap?: Value
  , columnProgression?: Value
  , columnRule?: Value
  , columnRuleColor?: Value
  , columnRuleStyle?: Value
  , columnRuleWidth?: Value
  , columnSpan?: Value
  , columnWidth?: Value
  , columns?: Value
  , content?: Value
  , counterIncrement?: Value
  , counterReset?: Value
  , cursor?: Value
  , cx?: Value
  , cy?: Value
  , direction?: Value
  , display?: Value
  , dominantBaseline?: Value
  , emptyCells?: Value
  , enableBackground?: Value
  , fill?: Value
  , fillOpacity?: Value
  , fillRule?: Value
  , filter?: Value
  , flex?: Value
  , flexBasis?: Value
  , flexDirection?: Value
  , flexFlow?: Value
  , flexGrow?: Value
  , flexShrink?: Value
  , flexWrap?: Value
  , float?: Value
  , floodColor?: Value
  , floodOpacity?: Value
  , font?: Value
  , fontFamily?: Value
  , fontFeatureSettings?: Value
  , fontSize?: Value
  , fontStretch?: Value
  , fontStyle?: Value
  , fontSynthesis?: Value
  , fontVariant?: Value
  , fontVariantAlternates?: Value
  , fontVariantCaps?: Value
  , fontVariantEastAsian?: Value
  , fontVariantLigatures?: Value
  , fontVariantNumeric?: Value
  , fontVariantPosition?: Value
  , fontWeight?: Value
  , glyphOrientationHorizontal?: Value
  , glyphOrientationVertical?: Value
  , height?: Value
  , imageRendering?: Value
  , isolation?: Value
  , justifyContent?: Value
  , justifyItems?: Value
  , justifySelf?: Value
  , kerning?: Value
  , left?: Value
  , letterSpacing?: Value
  , lightingColor?: Value
  , lineHeight?: Value
  , listStyle?: Value
  , listStyleImage?: Value
  , listStylePosition?: Value
  , listStyleType?: Value
  , margin?: Value
  , marginBottom?: Value
  , marginLeft?: Value
  , marginRight?: Value
  , marginTop?: Value
  , marker?: Value
  , markerEnd?: Value
  , markerMid?: Value
  , markerStart?: Value
  , mask?: Value
  , maskType?: Value
  , maxHeight?: Value
  , maxWidth?: Value
  , minHeight?: Value
  , minWidth?: Value
  , mixBlendMode?: Value
  , objectFit?: Value
  , opacity?: Value
  , order?: Value
  , orphans?: Value
  , outline?: Value
  , outlineColor?: Value
  , outlineOffset?: Value
  , outlineStyle?: Value
  , outlineWidth?: Value
  , overflow?: Value
  , overflowWrap?: Value
  , overflowX?: Value
  , overflowY?: Value
  , padding?: Value
  , paddingBottom?: Value
  , paddingLeft?: Value
  , paddingRight?: Value
  , paddingTop?: Value
  , page?: Value
  , pageBreakAfter?: Value
  , pageBreakBefore?: Value
  , pageBreakInside?: Value
  , paintOrder?: Value
  , perspective?: Value
  , perspectiveOrigin?: Value
  , perspectiveOriginX?: Value
  , perspectiveOriginY?: Value
  , pointerEvents?: Value
  , position?: Value
  , quotes?: Value
  , r?: Value
  , resize?: Value
  , right?: Value
  , rx?: Value
  , ry?: Value
  , shapeRendering?: Value
  , size?: Value
  , speak?: Value
  , src?: Value
  , stopColor?: Value
  , stopOpacity?: Value
  , stroke?: Value
  , strokeDasharray?: Value
  , strokeDashoffset?: Value
  , strokeLinecap?: Value
  , strokeLinejoin?: Value
  , strokeMiterlimit?: Value
  , strokeOpacity?: Value
  , strokeWidth?: Value
  , tabSize?: Value
  , tableLayout?: Value
  , textAlign?: Value
  , textAnchor?: Value
  , textDecoration?: Value
  , textIndent?: Value
  , textLineThrough?: Value
  , textLineThroughColor?: Value
  , textLineThroughMode?: Value
  , textLineThroughStyle?: Value
  , textLineThroughWidth?: Value
  , textOverflow?: Value
  , textOverline?: Value
  , textOverlineColor?: Value
  , textOverlineMode?: Value
  , textOverlineStyle?: Value
  , textOverlineWidth?: Value
  , textRendering?: Value
  , textShadow?: Value
  , textTransform?: Value
  , textUnderline?: Value
  , textUnderlineColor?: Value
  , textUnderlineMode?: Value
  , textUnderlineStyle?: Value
  , textUnderlineWidth?: Value
  , top?: Value
  , transform?: Value
  , transformOrigin?: Value
  , transformOriginX?: Value
  , transformOriginY?: Value
  , transformOriginZ?: Value
  , transformStyle?: Value
  , transition?: Value
  , transitionDelay?: Value
  , transitionDuration?: Value
  , transitionProperty?: Value
  , transitionTimingFunction?: Value
  , unicodeBidi?: Value
  , unicodeRange?: Value
  , vectorEffect?: Value
  , verticalAlign?: Value
  , visibility?: Value
  , webkitAnimation?: Value
  , webkitAnimationDelay?: Value
  , webkitAnimationDirection?: Value
  , webkitAnimationDuration?: Value
  , webkitAnimationFillMode?: Value
  , webkitAnimationIterationCount?: Value
  , webkitAnimationName?: Value
  , webkitAnimationPlayState?: Value
  , webkitAnimationTimingFunction?: Value
  , webkitAppearance?: Value
  , webkitAspectRatio?: Value
  , webkitBackdropFilter?: Value
  , webkitBackfaceVisibility?: Value
  , webkitBackgroundClip?: Value
  , webkitBackgroundComposite?: Value
  , webkitBackgroundOrigin?: Value
  , webkitBackgroundSize?: Value
  , webkitBorderAfter?: Value
  , webkitBorderAfterColor?: Value
  , webkitBorderAfterStyle?: Value
  , webkitBorderAfterWidth?: Value
  , webkitBorderBefore?: Value
  , webkitBorderBeforeColor?: Value
  , webkitBorderBeforeStyle?: Value
  , webkitBorderBeforeWidth?: Value
  , webkitBorderEnd?: Value
  , webkitBorderEndColor?: Value
  , webkitBorderEndStyle?: Value
  , webkitBorderEndWidth?: Value
  , webkitBorderFit?: Value
  , webkitBorderHorizontalSpacing?: Value
  , webkitBorderImage?: Value
  , webkitBorderRadius?: Value
  , webkitBorderStart?: Value
  , webkitBorderStartColor?: Value
  , webkitBorderStartStyle?: Value
  , webkitBorderStartWidth?: Value
  , webkitBorderVerticalSpacing?: Value
  , webkitBoxAlign?: Value
  , webkitBoxDecorationBreak?: Value
  , webkitBoxDirection?: Value
  , webkitBoxFlex?: Value
  , webkitBoxFlexGroup?: Value
  , webkitBoxLines?: Value
  , webkitBoxOrdinalGroup?: Value
  , webkitBoxOrient?: Value
  , webkitBoxPack?: Value
  , webkitBoxReflect?: Value
  , webkitBoxShadow?: Value
  , webkitClipPath?: Value
  , webkitColorCorrection?: Value
  , webkitColumnAxis?: Value
  , webkitColumnBreakAfter?: Value
  , webkitColumnBreakBefore?: Value
  , webkitColumnBreakInside?: Value
  , webkitCursorVisibility?: Value
  , webkitDashboardRegion?: Value
  , webkitFlowFrom?: Value
  , webkitFlowInto?: Value
  , webkitFontKerning?: Value
  , webkitFontSizeDelta?: Value
  , webkitFontSmoothing?: Value
  , webkitHyphenateCharacter?: Value
  , webkitHyphenateLimitAfter?: Value
  , webkitHyphenateLimitBefore?: Value
  , webkitHyphenateLimitLines?: Value
  , webkitHyphens?: Value
  , webkitInitialLetter?: Value
  , webkitLineAlign?: Value
  , webkitLineBoxContain?: Value
  , webkitLineBreak?: Value
  , webkitLineClamp?: Value
  , webkitLineGrid?: Value
  , webkitLineSnap?: Value
  , webkitLocale?: Value
  , webkitLogicalHeight?: Value
  , webkitLogicalWidth?: Value
  , webkitMarginAfter?: Value
  , webkitMarginAfterCollapse?: Value
  , webkitMarginBefore?: Value
  , webkitMarginBeforeCollapse?: Value
  , webkitMarginBottomCollapse?: Value
  , webkitMarginCollapse?: Value
  , webkitMarginEnd?: Value
  , webkitMarginStart?: Value
  , webkitMarginTopCollapse?: Value
  , webkitMarquee?: Value
  , webkitMarqueeDirection?: Value
  , webkitMarqueeIncrement?: Value
  , webkitMarqueeRepetition?: Value
  , webkitMarqueeSpeed?: Value
  , webkitMarqueeStyle?: Value
  , webkitMask?: Value
  , webkitMaskBoxImage?: Value
  , webkitMaskBoxImageOutset?: Value
  , webkitMaskBoxImageRepeat?: Value
  , webkitMaskBoxImageSlice?: Value
  , webkitMaskBoxImageSource?: Value
  , webkitMaskBoxImageWidth?: Value
  , webkitMaskClip?: Value
  , webkitMaskComposite?: Value
  , webkitMaskImage?: Value
  , webkitMaskOrigin?: Value
  , webkitMaskPosition?: Value
  , webkitMaskPositionX?: Value
  , webkitMaskPositionY?: Value
  , webkitMaskRepeat?: Value
  , webkitMaskRepeatX?: Value
  , webkitMaskRepeatY?: Value
  , webkitMaskSize?: Value
  , webkitMaskSourceType?: Value
  , webkitMaxLogicalHeight?: Value
  , webkitMaxLogicalWidth?: Value
  , webkitMinLogicalHeight?: Value
  , webkitMinLogicalWidth?: Value
  , webkitNbspMode?: Value
  , webkitPaddingAfter?: Value
  , webkitPaddingBefore?: Value
  , webkitPaddingEnd?: Value
  , webkitPaddingStart?: Value
  , webkitPrintColorAdjust?: Value
  , webkitRegionBreakAfter?: Value
  , webkitRegionBreakBefore?: Value
  , webkitRegionBreakInside?: Value
  , webkitRegionFragment?: Value
  , webkitRtlOrdering?: Value
  , webkitRubyPosition?: Value
  , webkitScrollSnapCoordinate?: Value
  , webkitScrollSnapDestination?: Value
  , webkitScrollSnapPointsX?: Value
  , webkitScrollSnapPointsY?: Value
  , webkitScrollSnapType?: Value
  , webkitShapeImageThreshold?: Value
  , webkitShapeMargin?: Value
  , webkitShapeOutside?: Value
  , webkitSvgShadow?: Value
  , webkitTextCombine?: Value
  , webkitTextDecoration?: Value
  , webkitTextDecorationColor?: Value
  , webkitTextDecorationLine?: Value
  , webkitTextDecorationSkip?: Value
  , webkitTextDecorationStyle?: Value
  , webkitTextDecorationsInEffect?: Value
  , webkitTextEmphasis?: Value
  , webkitTextEmphasisColor?: Value
  , webkitTextEmphasisPosition?: Value
  , webkitTextEmphasisStyle?: Value
  , webkitTextFillColor?: Value
  , webkitTextOrientation?: Value
  , webkitTextSecurity?: Value
  , webkitTextStroke?: Value
  , webkitTextStrokeColor?: Value
  , webkitTextStrokeWidth?: Value
  , webkitTextUnderlinePosition?: Value
  , webkitTransformStyle?: Value
  , webkitTransition?: Value
  , webkitTransitionDelay?: Value
  , webkitTransitionDuration?: Value
  , webkitTransitionProperty?: Value
  , webkitTransitionTimingFunction?: Value
  , webkitUserDrag?: Value
  , webkitUserModify?: Value
  , webkitUserSelect?: Value
  , webkitWritingMode?: Value
  , whiteSpace?: Value
  , widows?: Value
  , width?: Value
  , willChange?: Value
  , wordBreak?: Value
  , wordSpacing?: Value
  , wordWrap?: Value
  , writingMode?: Value
  , x?: Value
  , y?: Value
  , zIndex?: Value
  , zoom?: Value
  , length?: Value
  , MozAppearance?: Value
  , backfaceVisibility?: Value
  , MozBinding?: Value
  , blockSize?: Value
  , borderBlockEnd?: Value
  , borderBlockEndColor?: Value
  , borderBlockEndStyle?: Value
  , borderBlockEndWidth?: Value
  , borderBlockStart?: Value
  , borderBlockStartColor?: Value
  , borderBlockStartStyle?: Value
  , borderBlockStartWidth?: Value
  , MozBorderBottomColors?: Value
  , borderInlineEnd?: Value
  , borderInlineEndColor?: Value
  , borderInlineEndStyle?: Value
  , borderInlineEndWidth?: Value
  , borderInlineStart?: Value
  , borderInlineStartColor?: Value
  , borderInlineStartStyle?: Value
  , borderInlineStartWidth?: Value
  , MozBorderLeftColors?: Value
  , MozBorderRightColors?: Value
  , MozBorderTopColors?: Value
  , MozBoxAlign?: Value
  , boxDecorationBreak?: Value
  , MozBoxDirection?: Value
  , MozBoxFlex?: Value
  , MozBoxOrdinalGroup?: Value
  , MozBoxOrient?: Value
  , MozBoxPack?: Value
  , colorAdjust?: Value
  , MozColumnCount?: Value
  , MozColumnFill?: Value
  , MozColumnGap?: Value
  , MozColumnRule?: Value
  , MozColumnRuleColor?: Value
  , MozColumnRuleStyle?: Value
  , MozColumnRuleWidth?: Value
  , MozColumnWidth?: Value
  , MozColumns?: Value
  , cssFloat?: Value
  , MozFloatEdge?: Value
  , fontKerning?: Value
  , fontLanguageOverride?: Value
  , fontSizeAdjust?: Value
  , MozForceBrokenImageIcon?: Value
  , grid?: Value
  , gridArea?: Value
  , gridAutoColumns?: Value
  , gridAutoFlow?: Value
  , gridAutoRows?: Value
  , gridColumn?: Value
  , gridColumnEnd?: Value
  , gridColumnGap?: Value
  , gridColumnStart?: Value
  , gridGap?: Value
  , gridRow?: Value
  , gridRowEnd?: Value
  , gridRowGap?: Value
  , gridRowStart?: Value
  , gridTemplate?: Value
  , gridTemplateAreas?: Value
  , gridTemplateColumns?: Value
  , gridTemplateRows?: Value
  , hyphens?: Value
  , imageOrientation?: Value
  , MozImageRegion?: Value
  , imeMode?: Value
  , inlineSize?: Value
  , marginBlockEnd?: Value
  , marginBlockStart?: Value
  , marginInlineEnd?: Value
  , marginInlineStart?: Value
  , markerOffset?: Value
  , maxBlockSize?: Value
  , maxInlineSize?: Value
  , minBlockSize?: Value
  , minInlineSize?: Value
  , objectPosition?: Value
  , offsetBlockEnd?: Value
  , offsetBlockStart?: Value
  , offsetInlineEnd?: Value
  , offsetInlineStart?: Value
  , MozOrient?: Value
  , MozOsxFontSmoothing?: Value
  , MozOutlineRadius?: Value
  , MozOutlineRadiusBottomleft?: Value
  , MozOutlineRadiusBottomright?: Value
  , MozOutlineRadiusTopleft?: Value
  , MozOutlineRadiusTopright?: Value
  , paddingBlockEnd?: Value
  , paddingBlockStart?: Value
  , paddingInlineEnd?: Value
  , paddingInlineStart?: Value
  , rubyAlign?: Value
  , rubyPosition?: Value
  , scrollBehavior?: Value
  , scrollSnapCoordinate?: Value
  , scrollSnapDestination?: Value
  , scrollSnapPointsX?: Value
  , scrollSnapPointsY?: Value
  , scrollSnapType?: Value
  , scrollSnapTypeX?: Value
  , scrollSnapTypeY?: Value
  , MozStackSizing?: Value
  , MozTabSize?: Value
  , MozTextAlignLast?: Value
  , textCombineUpright?: Value
  , textDecorationColor?: Value
  , textDecorationLine?: Value
  , textDecorationStyle?: Value
  , textEmphasis?: Value
  , textEmphasisColor?: Value
  , textEmphasisPosition?: Value
  , textEmphasisStyle?: Value
  , WebkitTextFillColor?: Value
  , textOrientation?: Value
  , MozTextSizeAdjust?: Value
  , WebkitTextStroke?: Value
  , WebkitTextStrokeColor?: Value
  , WebkitTextStrokeWidth?: Value
  , MozTransform?: Value
  , transformBox?: Value
  , MozUserFocus?: Value
  , MozUserInput?: Value
  , MozUserModify?: Value
  , MozUserSelect?: Value
  , MozWindowDragging?: Value
  , MozTransformOrigin?: Value
  , MozPerspectiveOrigin?: Value
  , MozPerspective?: Value
  , MozTransformStyle?: Value
  , MozBackfaceVisibility?: Value
  , MozBorderImage?: Value
  , MozTransition?: Value
  , MozTransitionDelay?: Value
  , MozTransitionDuration?: Value
  , MozTransitionProperty?: Value
  , MozTransitionTimingFunction?: Value
  , MozAnimation?: Value
  , MozAnimationDelay?: Value
  , MozAnimationDirection?: Value
  , MozAnimationDuration?: Value
  , MozAnimationFillMode?: Value
  , MozAnimationIterationCount?: Value
  , MozAnimationName?: Value
  , MozAnimationPlayState?: Value
  , MozAnimationTimingFunction?: Value
  , MozBoxSizing?: Value
  , MozFontFeatureSettings?: Value
  , MozFontLanguageOverride?: Value
  , MozPaddingEnd?: Value
  , MozPaddingStart?: Value
  , MozMarginEnd?: Value
  , MozMarginStart?: Value
  , MozBorderEnd?: Value
  , MozBorderEndColor?: Value
  , MozBorderEndStyle?: Value
  , MozBorderEndWidth?: Value
  , MozBorderStart?: Value
  , MozBorderStartColor?: Value
  , MozBorderStartStyle?: Value
  , MozBorderStartWidth?: Value
  , MozHyphens?: Value
  , WebkitAnimation?: Value
  , WebkitAnimationDelay?: Value
  , WebkitAnimationDirection?: Value
  , WebkitAnimationDuration?: Value
  , WebkitAnimationFillMode?: Value
  , WebkitAnimationIterationCount?: Value
  , WebkitAnimationName?: Value
  , WebkitAnimationPlayState?: Value
  , WebkitAnimationTimingFunction?: Value
  , WebkitFilter?: Value
  , webkitFilter?: Value
  , WebkitTextSizeAdjust?: Value
  , webkitTextSizeAdjust?: Value
  , WebkitTransform?: Value
  , webkitTransform?: Value
  , WebkitTransformOrigin?: Value
  , webkitTransformOrigin?: Value
  , WebkitTransformStyle?: Value
  , WebkitBackfaceVisibility?: Value
  , WebkitPerspective?: Value
  , webkitPerspective?: Value
  , WebkitPerspectiveOrigin?: Value
  , webkitPerspectiveOrigin?: Value
  , WebkitTransition?: Value
  , WebkitTransitionDelay?: Value
  , WebkitTransitionDuration?: Value
  , WebkitTransitionProperty?: Value
  , WebkitTransitionTimingFunction?: Value
  , WebkitBorderRadius?: Value
  , WebkitBorderTopLeftRadius?: Value
  , webkitBorderTopLeftRadius?: Value
  , WebkitBorderTopRightRadius?: Value
  , webkitBorderTopRightRadius?: Value
  , WebkitBorderBottomLeftRadius?: Value
  , webkitBorderBottomLeftRadius?: Value
  , WebkitBorderBottomRightRadius?: Value
  , webkitBorderBottomRightRadius?: Value
  , WebkitBackgroundClip?: Value
  , WebkitBackgroundOrigin?: Value
  , WebkitBackgroundSize?: Value
  , WebkitBorderImage?: Value
  , WebkitBoxShadow?: Value
  , WebkitBoxSizing?: Value
  , webkitBoxSizing?: Value
  , WebkitBoxFlex?: Value
  , WebkitBoxOrdinalGroup?: Value
  , WebkitBoxOrient?: Value
  , WebkitBoxDirection?: Value
  , WebkitBoxAlign?: Value
  , WebkitBoxPack?: Value
  , WebkitUserSelect?: Value
  , [key:string]: Value
  }
*/

const guidFor =
  (style/*:Object*/)/*:string*/ =>
  ( style[ID] ||
    (style[ID] = `${guid()}`)
  )

const hash =
  (style/*:?Style*/)/*:string*/ =>
  ( style == null
  ? ""
  : `+${guidFor(style)}`
  )

const cache/*:Pool<string, Style>*/ = pool()

export class StyleProperty {
  /*::
  guid: GUID;
  style: Style;
  static create: (style:Style) => StyleProperty;
  */
  constructor(
    guid/*:GUID*/
  , style/*:Style*/
  ) {
    this.guid = guid
    this.style = style
  }
}
StyleProperty.create = intern$1
( StyleProperty
, guidFor
, pool()
)

export const unstyled/*:Style*/ = Object.create(null, {[ID]: {value: `${guid()}`}})

export const style = /*::<BaseStyle:Style, Style2:?Style, Style3:?Style, Style4:?Style, Style5:?Style, Style6:?Style, Style7:?Style, Style8:?Style, Style9:?Style>*/
  ( base/*:BaseStyle*/
  , style2/*:Style2*/
  , style3/*:Style3*/
  , style4/*:Style4*/
  , style5/*:Style5*/
  , style6/*:Style6*/
  , style7/*:Style7*/
  , style8/*:Style8*/
  , style9/*:Style9*/
  )/*:Style*/ => {
    const key = `${guidFor(base)}${hash(style2)}${hash(style3)}${hash(style4)}${hash(style5)}${hash(style6)}${hash(style7)}${hash(style8)}${hash(style9)}`
    const cached = cache.get(key)
    if (cached == null) {
      let style = null
      let index = 2
      while (index <= 9) {
        const extension =
          ( index === 2
          ? style2
          : index === 3
          ? style3
          : index === 4
          ? style4
          : index === 5
          ? style5
          : index === 6
          ? style6
          : index === 7
          ? style7
          : index === 8
          ? style8
          : style9
          )

        index ++

        if (extension != null) {
          style =
            ( style == null
            ? Object.assign({}, base, extension)
            : Object.assign(style, extension)
            )
        }
      }

      if (style == null) {
        cache.set(guidFor(base), base)
        return StyleProperty.create(base)
      }
      else {
        cache.set(key, style)
        return StyleProperty.create(style)
      }
    }
    else {
      return StyleProperty.create(cached)
    }
  }
