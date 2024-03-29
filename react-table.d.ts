import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    isInherent?: boolean;
    isCheckbox?: boolean;
    isContextBtn?: boolean;
    fixedWidthPx?: number;
  }
}
