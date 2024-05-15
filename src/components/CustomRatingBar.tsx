// React Native Custom Star Rating Bar
// https://aboutreact.com/react-native-custom-star-rating-bar/

// import React in our code
import React, { memo, useState } from "react";

// import all the components we are going to use
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

interface CustomRatingBarProps {
  startingValue: any;
  size: any;
  totalStar: any;
  readonly?: boolean;
  editable?: boolean;
  onSubmit?: (item: any) => void;
  starsMargin?: any;
}

const CustomRatingBar: React.FC<CustomRatingBarProps> = ({
  startingValue,
  size,
  totalStar,
  readonly,
  editable,
  onSubmit,
  starsMargin = 1,
}) => {
  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(parseInt(startingValue));
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const onComplete = (item: any) => {
    setDefaultRating(item);
    onSubmit(item);
  };
  const maxRatingArray = maxRating.slice(
    0,
    totalStar == "NaN" ? 0 : parseInt(totalStar)
  );
  return (
    <View style={styles.customRatingBarStyle}>
      {maxRatingArray.map((item, key) => {
        return (
          <TouchableOpacity
            disabled={readonly}
            activeOpacity={0.7}
            key={item}
            onPress={() => onComplete(item)}
          >
            {editable ? (
              <Image
                style={[
                  styles.starImageStyle,
                  { width: size, height: size, margin: starsMargin },
                ]}
                source={
                  item <= defaultRating
                    ? require("../assets/Images/StarSelect.png")
                    : require("../assets/Images/StarSelect.png")
                }
              />
            ) : (
              <Image
                style={[
                  styles.starImageStyle,
                  { width: size, height: size, margin: starsMargin },
                ]}
                source={
                  item <= defaultRating
                    ? require("../assets/Images/StarSelect.png")
                    : require("../assets/Images/StarUnSelect.png")
                }
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomRatingBar;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  starImageStyle: {
    resizeMode: "cover",
    margin: 1,
  },
});
