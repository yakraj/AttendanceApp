import React from 'react';
import Styled, {useTheme} from 'styled-components/native';
import {ViewStyle} from 'react-native';

import {TouchableNativeFeedback} from 'react-native';
import type {PropsWithChildren} from 'react';
type Variants = {
  border: string;
  jus: string;
  ali: string;
  padL: number;
  padR: number;
  padT: number;
  padB: number;
  marL: number;
  marR: number;
  marT: number;
  marB: number;
  borR: number;
  ofl: string;
  fdr: string;
  padd: number;
  marr: number;
  bcC: string;
  width: string;
  height: string;
  fwr: string;
  position: string;
  opacity: number;
  zindex: number;
  elev: number;
  aliS: string;
  jusS: string;
  Left: string;
  Right: string;
  Top: string;
  Bottom: string;
  MxHeight: string;
  display: string;
  transform: string;
};

const getVariant = ({
  border,
  jus,
  ali,
  padL,
  padR,
  padT,
  padB,
  marL,
  marR,
  marT,
  marB,
  borR,
  ofl,
  fdr,
  padd,
  marr,
  bcC,
  width,
  height,
  fwr,
  position,
  opacity,
  zindex,
  elev,
  aliS,
  jusS,
  Left,
  Right,
  Top,
  Bottom,
  MxHeight,
  display,
  transform,
}: Variants) => {
  return ` ${fdr && `flex-direction: ${fdr}`};
${border && `border: ${border}`};
${jus && `justify-content: ${jus}`};
${ali && `align-items: ${ali}`};
${padd && `padding: ${padd}px`};
${marL && `margin-left: ${marL}px`};
${marR && `margin-right: ${marR}px`};
${marT && `margin-top: ${marT}px`};
${marB && `margin-bottom: ${marB}px`};
${padL && `padding-left: ${padL}px`};
${padR && `padding-right: ${padR}px`};
${padT && `padding-top: ${padT}px`};
${padB && `padding-bottom: ${padB}px;`};
${marr && `margin: ${marr}px`};
${borR && `border-radius: ${borR}px`};
${ofl && ` overflow: ${ofl}`};
${bcC && `background-color: ${bcC}`};
${width && `width: ${width}`};
${height && `height: ${height}`};
${fwr && `flex-wrap: ${fwr}`};
${position && `position: ${position}`};
${zindex && `z-index: ${zindex}`};
${opacity && `opacity : ${opacity}`};
${Left && `left : ${Left}px`};
${Right && `right : ${Right}px`};
${Top && `top : ${Top}px`};
${Bottom && `bottom : ${Bottom}px`};
${elev && `elevation : ${elev}`};
${aliS && `align-self : ${aliS}`};
${jusS && `justify-self : ${jusS}`};
${MxHeight && `max-height : ${MxHeight}`};
${display && `display : ${display}`};
${transform && `transform : ${transform}`};

`;
};
interface CusViewProps {
  variant: ViewStyle;
}

const CusView = Styled.View<CusViewProps>`
  ${({variant}) => variant};
`;
type CompProps = PropsWithChildren<{
  border?: string;
  jus?: string;
  ali?: string;
  padL?: number;
  padR?: number;
  padT?: number;
  padB?: number;
  marL?: number;
  marR?: number;
  marT?: number;
  marB?: number;
  borR?: number;
  ofl?: string;
  fdr?: string;
  padd?: number;
  marr?: number;
  bcC?: string;
  width?: string;
  height?: string;
  fwr?: string;
  position?: string;
  opacity?: number;
  zindex?: number;
  elev?: number;
  aliS?: string;
  jusS?: string;
  Left?: string;
  Right?: string;
  Top?: string;
  Bottom?: string;
  MxHeight?: string;
  display?: string;
  transform?: string;
  onpress?: string;
  touchable?: boolean;
  tofl?: boolean;
  tblC: string;
}>;
export const CustView = ({
  border,
  jus,
  ali,
  padL,
  padR,
  padT,
  padB,
  marL,
  marR,
  marT,
  marB,
  borR,
  ofl,
  fdr,
  padd,
  marr,
  bcC,
  width,
  height,
  fwr,
  position,
  opacity,
  zindex,
  elev,
  aliS,
  jusS,
  Left,
  Right,
  Top,
  Bottom,
  MxHeight,
  display,
  transform,
  onpress,
  touchable,
  tofl,
  tblC,
  children,
}: CompProps) => {
  const variant = getVariant({
    border: border,
    jus: jus,
    ali: ali,
    padL: padL,
    padR: padR,
    padT: padT,
    padB: padB,
    marL: marL,
    marR: marR,
    marT: marT,
    marB: marB,
    borR: borR,
    ofl: ofl,
    fdr: fdr,
    padd: padd,
    marr: marr,
    bcC: bcC,
    width: width,
    height: height,
    fwr: fwr,
    position: position,
    opacity: opacity,
    zindex: zindex,
    elev: elev,
    aliS: aliS,
    jusS: jusS,
    Left: Left,
    Right: Right,
    Top: Top,
    Bottom: Bottom,
    MxHeight: MxHeight,
    display: display,
    transform: transform,
  });

  // return <></>;
  return touchable ? (
    <TouchableNativeFeedback
      // onPress={onpress}
      background={TouchableNativeFeedback.Ripple(tblC, tofl ? true : false)}>
      <CusView variant={variant}>{children}</CusView>
    </TouchableNativeFeedback>
  ) : (
    <CusView variant={variant}>{children}</CusView>
  );
};

CustView.defaultProps = {
  jus: 'flex-start',
  ali: 'center',
  tblC: 'grey',
};
