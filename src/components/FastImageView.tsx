import React from "react";
import FastImage from "react-native-fast-image";
import { SvgCssUri, SvgUri } from "react-native-svg";
import _ from "lodash";
interface FastImageViewProps {
  source?: any | object;
  style?: any | object;
  resizeMode?: "contain" | "cover" | "stretch" | "center";
}

const FastImageView: React.FC<FastImageViewProps> = ({
  source,
  style,
  resizeMode = "cover",
}) => {
  let data = { ...source, ...{ cache: FastImage.cacheControl.immutable } };

  return (
    <>
      {source &&
      _.get(source, "uri", null) &&
      _.get(source, "uri", null).endsWith(".svg") ? (
        <SvgCssUri
          width={style.width}
          height={style.height}
          uri={_.get(source, "uri", null)}
        />
      ) : (
        <FastImage style={style} source={data} resizeMode={resizeMode} />
      )}
    </>
  );
};

export default FastImageView;
