type Props = {
  style?: object;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  accessibilityLabel?: string;
  testID?: string;
};

export const MyImage = ({
  style,
  resizeMode,
  accessibilityLabel,
  testID,
}: Props) => {
  return (
    <Image
      source={source}
      style={style}
      resizeMode={resizeMode}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    />
  );
};
