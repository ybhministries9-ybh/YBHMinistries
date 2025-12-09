type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function redact(obj: any) {
  try {
    if (!obj || typeof obj !== 'object') return obj;
    const redacted: any = Array.isArray(obj) ? [] : {};
    for (const k of Object.keys(obj)) {
      if (/password|token|secret|authorization|auth/i.test(k)) {
        redacted[k] = '[REDACTED]';
      } else if (typeof obj[k] === 'object' && obj[k] !== null) {
        redacted[k] = redact(obj[k]);
      } else {
        redacted[k] = obj[k];
      }
    }
    return redacted;
  } catch (e) {
    return '[REDACTED]';
  }
}

function sendToSink(level: LogLevel, message: string, meta?: any) {
  // If an external log sink is configured, send there. For now, this is a no-op
  // placeholder where you can integrate Sentry/Datadog/LogDNA.
  if (process.env.LOG_SINK === 'sentry' && typeof (globalThis as any).Sentry !== 'undefined') {
    try {
      const Sentry = (globalThis as any).Sentry;
      if (level === 'error') Sentry.captureException(meta || new Error(message));
      else Sentry.captureMessage(message, level);
    } catch (e) {
      // ignore
    }
  }
}

export const logger = {
  debug: (msg: string, meta?: any) => {
    if (process.env.NODE_ENV === 'production') return;
    console.debug(msg, redact(meta));
    sendToSink('debug', msg, redact(meta));
  },
  info: (msg: string, meta?: any) => {
    console.info(msg, redact(meta));
    sendToSink('info', msg, redact(meta));
  },
  warn: (msg: string, meta?: any) => {
    console.warn(msg, redact(meta));
    sendToSink('warn', msg, redact(meta));
  },
  error: (msg: string, meta?: any) => {
    // Always log errors but ensure meta is redacted
    console.error(msg, redact(meta));
    sendToSink('error', msg, redact(meta));
  },
};

export default logger;
