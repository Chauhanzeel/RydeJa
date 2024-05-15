declare module "react-native-config" {
  export interface NativeConfig {
    StripeUri?: `https://api.stripe.com`;
    LocationUri?: "https://nominatim.openstreetmap.org";
    BaseCustomerUri?: "https://api.kmt-studio.com/api/v1/customer";
    BaseOwnerUri?: "https://api.kmt-studio.com/api/v1/car-owner";
    BaseUserUri?: "https://api.kmt-studio.com/api/v1";
    BaseCommonUri?: "https://api.kmt-studio.com/api/v1/common";
    MeruceBaseUri?: "http://api.kmt-studio.com:3000/.well-known/mercure";
    STRIPE_PUBLIC_KEY?: "pk_test_51N3vAZDnhaqQ5swUPg5amVMPzv8R5pV8bXVlNGRvljC22W2svwEPMTENteXoZpriiWnszgqcTw0EnpEDPsffN28o00jlxQnecZ";
    STRIPE_SECRET_KEY?: "sk_test_51N3vAZDnhaqQ5swUbYA2qKCigf4mh3X7jlctYFBepunZ2knBgJ4MD5v6QMtTd02YFKagEPWGqzsZ6jItRdDmRFft00fKdEy4DK";
  }
  export const Config: NativeConfig;
  export default Config;
}
