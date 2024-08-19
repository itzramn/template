import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabBackground = useThemeColor(
    {
      light: Colors.primary[100],
      dark: Colors.primary[500],
    },
    'background'
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors.primary[300],
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          elevation: 0,
          height: 60,
          borderColor: Colors.primary[300],
        },
        tabBarLabelStyle: {
          padding: 10,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? tabBackground : 'transparent',
                padding: 12,
                borderRadius: 15,
              }}
            >
              <TabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? tabBackground : 'transparent',
                padding: 12,
                borderRadius: 15,
              }}
            >
              <TabBarIcon
                name={focused ? 'code-slash' : 'code-slash-outline'}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? tabBackground : 'transparent',
                padding: 12,
                borderRadius: 15,
              }}
            >
              <TabBarIcon
                name={focused ? 'person' : 'person-outline'}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
