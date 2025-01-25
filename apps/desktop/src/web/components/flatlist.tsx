import { ScrollArea } from "@radix-ui/themes";
import * as Array from "effect/Array";
import type React from "react";

type RenderItemProps<T> = {
  item: T;
  index: number;
};

type Props<T> = {
  data: T[];
  renderItem: (item: RenderItemProps<T>) => React.ReactNode;
  listHeaderComponent?: () => React.ReactNode;
  listFooterComponent?: () => React.ReactNode;
  listEmptyComponent?: () => React.ReactNode;
  scrollbars?: "horizontal" | "vertical" | "both";
  className?: string;
  containerStyle?: React.CSSProperties;
};

export default function Flatlist<T extends Record<string, unknown>>({
  data,
  listFooterComponent: ListFooterComponent,
  listHeaderComponent: ListHeaderComponent,
  listEmptyComponent: ListEmptyComponent,
  renderItem,
  scrollbars,
  className,
  containerStyle,
}: Props<T>) {
  if (Array.isEmptyArray(data)) {
    return <>{ListEmptyComponent ? <ListEmptyComponent /> : null}</>;
  }

  return (
    <div className={className}>
      {ListHeaderComponent && <ListHeaderComponent />}
      <ScrollArea
        style={{
          height: 300,
          ...containerStyle,
        }}
        scrollbars={scrollbars}
      >
        {data.map((item, index) => renderItem({ item, index }))}
      </ScrollArea>
      {ListFooterComponent && <ListFooterComponent />}
    </div>
  );
}
