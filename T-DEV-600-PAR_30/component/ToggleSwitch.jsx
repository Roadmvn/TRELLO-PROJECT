import React, { useState } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";

const ToggleSwitch = ({ label, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    onToggle(!isEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: "#7675770", true: "#65FFC4" }}
        thumbColor={isEnabled ? "#D1FFF8" : "#f4f3f4"}
        ios_backgroundColor={"#3e3e3e"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
  },
});

export default ToggleSwitch;
