// Type declarations for Google Identity Services
// https://developers.google.com/identity/gsi/web/guides/load-sdk

// Google OAuth response types (defined here to avoid import issues)
export interface GoogleCredentialResponse {
  credential?: string;
}

export interface GoogleCodeResponse {
  code?: string;
}

declare global {
  interface Window {
    google: GoogleGlobal;
  }
}

export interface GoogleGlobal {
  accounts: GoogleAccounts;
}

export interface GoogleAccounts {
  id: GoogleId;
  oauth2: GoogleOAuth2;
}

export interface GoogleId {
  initialize: (config: GoogleIdConfiguration) => void;
  renderButton: (element: HTMLElement, options: GoogleIdRenderOptions) => void;
  prompt: () => void;
  revoke: (hint: string, callback: (response: GoogleIdRevocationResponse) => void) => void;
}

export interface GoogleIdConfiguration {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  use_fedcm?: boolean;
  itp_support?: boolean;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  context?: 'signin' | 'signup' | 'use';
  state_cookie_domain?: string;
  state_uri?: string;
  ux_mode?: 'popup' | 'redirect';
  redirect_uri?: string;
  native_callback?: string;
  nonce?: string;
  hosted_domain?: string;
  intermediate_iframe_endpoint?: string;
  log_level?: 'debug' | 'info' | 'warning' | 'error';
}

export interface GoogleIdRenderOptions {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin' | 'signup_with' | 'continue_with' | 'sign_up_with';
  shape?: 'rectangular' | 'pill' | 'circle';
  logo_alignment?: 'left' | 'center';
  width?: string;
  height?: string;
}

export interface GoogleIdRevocationResponse {
  successful: boolean;
  error?: string;
}

export interface GoogleOAuth2 {
  initCodeClient: (config: GoogleOAuth2CodeClientConfig) => GoogleOAuth2CodeClient;
  initTokenClient: (config: GoogleOAuth2TokenClientConfig) => GoogleOAuth2TokenClient;
}

export interface GoogleOAuth2CodeClientConfig {
  client_id: string;
  scope: string;
  ux_mode: 'popup' | 'redirect';
  callback: (response: GoogleCodeResponse) => void;
  redirect_uri?: string;
  state_uri?: string;
  nonce?: string;
}

export interface GoogleOAuth2TokenClientConfig {
  client_id: string;
  scope: string;
  callback: (response: GoogleTokenResponse) => void;
  ux_mode?: 'popup' | 'redirect';
  redirect_uri?: string;
  state_cookie_domain?: string;
  state_uri?: string;
  nonce?: string;
}

export interface GoogleOAuth2CodeClient {
  requestCode: () => void;
}

export interface GoogleOAuth2TokenClient {
  requestAccessToken: (options?: { prompt?: string }) => void;
}

export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token?: string;
  id_token?: string;
}
