import { Mixpanel } from "mixpanel-react-native";

const trackAutomaticEvents = false;
const nativeMode = false;

if (!process.env.EXPO_PUBLIC_MIXPANEL_TOKEN) {
  throw new Error("Mixpanel token is not defined in environment variables");
}
const mixpanel = new Mixpanel(
    process.env.EXPO_PUBLIC_MIXPANEL_TOKEN,
    trackAutomaticEvents,
    nativeMode,
);

export default mixpanel;
