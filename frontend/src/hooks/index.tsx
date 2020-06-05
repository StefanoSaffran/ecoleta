import React from 'react';

import { ThemeProvider } from './theme';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider>
    <ToastProvider>{children}</ToastProvider>
  </ThemeProvider>
);

export default AppProvider;
