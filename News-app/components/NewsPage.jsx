import React from "react";
import {View} from "react-native";
import { useState, useEffect } from "react";
import {Button,Card,Text} from "react-native-paper"
import { IconButton, MD3Colors } from 'react-native-paper';

const NewsPage = () => {
    const [save,setSave]=useState(0)
  return (
    <View>
    <Card>
    <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
    
    <IconButton icon='bookmark-check-outline' type = 'contained'
    onPress={() => console.log('Pressed')} /></View>
    <Card.Content>
      <Text variant="titleLarge">News-1</Text>
    </Card.Content>
    <Card.Content>
      <Text variant="bodyMedium">News Content</Text>
    </Card.Content>
    <Card.Actions>
      <Button>View</Button>
    </Card.Actions>
  </Card>
  </View>
  );
};

export default NewsPage;
