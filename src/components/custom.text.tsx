import React from 'react';
import styled from 'styled-components/native';
import {TextProps} from 'react-native';
interface CustomTextProps extends TextProps {
  size: number;
  marL: number;
  marT: number;
  marR: number;
  top: number;
  left: string;
  width: string;
  right: number;
  marB: number;
  position: string;
  weight?: 'normal' | 'bold';
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontStyle?: 'normal' | 'italic';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through';
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
  textDecorationColor?: string;
  textShadowColor?: string;
  textShadowOffset?: {width: number; height: number};
  textShadowRadius?: number;
  letterSpacing?: number;
  lineHeight?: number;
  includeFontPadding?: boolean;
  fontFamily?: string;
  fontVariant?: ReadonlyArray<
    | 'small-caps'
    | 'oldstyle-nums'
    | 'lining-nums'
    | 'tabular-nums'
    | 'proportional-nums'
  >;
}

const CusT = styled.Text<CustomTextProps>`
  ${({size}) => size && `font-size: ${size}px`};
  ${({top}) => top && `top: ${top}px`};
  ${({width}) => width && `width: 100%`};
  ${({left}) => left && `right: ${left}`};
  ${({right}) => right && `right: ${right}px`};
  ${({position}) => position && `position: ${position}`};
  ${({marL}) => marL && `margin-left: ${marL}px`};
  ${({marT}) => marT && `margin-top: ${marT}px`};
  ${({marR}) => marR && `margin-right: ${marR}px`};
  ${({marB}) => marB && `margin-bottom: ${marB}px`};
  ${({weight}) => weight && `font-weight: ${weight}`};
  ${({color}) => color && `color: ${color}`};
  ${({textAlign}) => textAlign && `text-align: ${textAlign}`};
  ${({fontStyle}) => fontStyle && `font-style: ${fontStyle}`};
  ${({textDecorationLine}) =>
    textDecorationLine && `text-decoration-line: ${textDecorationLine}`};
  ${({textDecorationStyle}) =>
    textDecorationStyle && `text-decoration-style: ${textDecorationStyle}`};
  ${({textDecorationColor}) =>
    textDecorationColor && `text-decoration-color: ${textDecorationColor}`};
  ${({textShadowColor}) =>
    textShadowColor && `text-shadow-color: ${textShadowColor}`};
  ${({textShadowOffset}) =>
    textShadowOffset &&
    `text-shadow-offset: ${textShadowOffset.width}px ${textShadowOffset.height}px`};
  ${({textShadowRadius}) =>
    textShadowRadius && `text-shadow-radius: ${textShadowRadius}px`};
  ${({letterSpacing}) => letterSpacing && `letter-spacing: ${letterSpacing}px`};
  ${({lineHeight}) => lineHeight && `line-height: ${lineHeight}px`};
  ${({includeFontPadding}) =>
    includeFontPadding !== undefined &&
    `include-font-padding: ${includeFontPadding}`};
  ${({fontFamily}) => fontFamily && `font-family: ${fontFamily}`};
  ${({fontVariant}) => fontVariant && `font-variant: ${fontVariant.join(' ')}`};
`;
export default CusT;
