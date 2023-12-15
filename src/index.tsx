import { NativeModules, Platform } from 'react-native';
import type {IEvent, IKlaviyo} from "./Klaviyo";

const LINKING_ERROR =
  `The package 'klaviyo-react-native-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const KlaviyoReactNativeSdk = NativeModules.KlaviyoReactNativeSdk
  ? NativeModules.KlaviyoReactNativeSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return KlaviyoReactNativeSdk.multiply(a, b);
}

export const Klaviyo: IKlaviyo = {
  createEvent(event: IEvent): void {
    KlaviyoReactNativeSdk.createEvent(event)
  }

}

export * from "./Klaviyo";
