export type AnalyticsPayload = {
  component: string;
  action: string;
  analyticsId?: string;
  label?: string;
  value?: string | number | boolean;
  context?: Record<string, unknown>;
};

export type AnalyticsHandler = (eventName: string, payload: AnalyticsPayload) => void;

export const emitAnalytics = (
  handler: AnalyticsHandler | undefined,
  eventName: string,
  payload: AnalyticsPayload
) => {
  if (typeof handler === 'function') {
    handler(eventName, payload);
  }
};
