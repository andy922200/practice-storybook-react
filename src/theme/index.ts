export enum Theme {
  primary = 'primary',
  secondary = 'secondary',
  error = 'error',
  disabled = 'disabled',
}

const defaultTheme: Record<string, string> = {
  primary: '#0d6efd',
  secondary: '#6610f2',
  error: '#dc3545',
  disabled: '#6c757d',
}

export default defaultTheme
