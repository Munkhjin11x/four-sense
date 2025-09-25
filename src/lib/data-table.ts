import { type Column } from '@tanstack/react-table';

interface GetCommonPinningStylesProps<TData> {
  column: Column<TData>;
}

export const getCommonPinningStyles = <TData>(
  props: GetCommonPinningStylesProps<TData>
): React.CSSProperties => {
  const { column } = props;
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-5px 0 5px -5px hsl(var(--border)) inset'
      : isFirstRightPinnedColumn
        ? '5px 0 5px -5px hsl(var(--border)) inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? 'sticky' : 'relative',
    background: isPinned ? 'hsl(var(--background))' : undefined,
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0
  };
};
