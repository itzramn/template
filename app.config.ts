export default {
  expo: {
    name: 'template',
    slug: 'template',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.dwit.template',
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      permissions: [
        'android.permission.USE_BIOMETRIC',
        'android.permission.USE_FINGERPRINT',
      ],
      package: 'com.dwit.template',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-local-authentication',
        {
          faceIDPermission: 'Allow ${PRODUCT_NAME} to use Face ID.',
        },
      ],
      [
        'expo-font',
        {
          fonts: [
            'assets/fonts/Inter_18pt-Light.ttf',
            'assets/fonts/Inter_18pt-Medium.ttf',
            'assets/fonts/Inter_18pt-Regular.ttf',
            'assets/fonts/Inter_18pt-SemiBold.ttf',
            'assets/fonts/Inter_18pt-Bold.ttf',
            'assets/fonts/Nunito-Light.ttf',
            'assets/fonts/Nunito-Medium.ttf',
            'assets/fonts/Nunito-Regular.ttf',
            'assets/fonts/Nunito-SemiBold.ttf',
            'assets/fonts/Nunito-Bold.ttf',
            'assets/fonts/Quicksand-Light.ttf',
            'assets/fonts/Quicksand-Medium.ttf',
            'assets/fonts/Quicksand-Regular.ttf',
            'assets/fonts/Quicksand-SemiBold.ttf',
            'assets/fonts/Quicksand-Bold.ttf',
          ],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: 'ddf08889-669d-4bd7-9b42-74cc8afc9775',
      },
    },
  },
};
