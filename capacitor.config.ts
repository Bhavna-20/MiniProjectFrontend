import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mudrantar.brightreturn',
  appName: 'BrightReturn',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
