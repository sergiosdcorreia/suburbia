import { CSSProperties, ElementType, ReactElement, ReactNode } from "react";
import clsx from "clsx";

type BoundedProps<T extends ElementType = "section"> = {
  as?: T;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export function Bounded<T extends ElementType = "section">({
  as: Comp = "section" as T,
  className,
  children,
  ...restProps
}: BoundedProps<T>): ReactElement {
  const boundedClassNames = "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32";

  return (
    // @ts-expect-error to bypass the type error
    <Comp
      className={clsx(boundedClassNames,className)}
      {...restProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
