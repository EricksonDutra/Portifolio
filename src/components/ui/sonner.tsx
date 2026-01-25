import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";
import * as React from "react";

type SonnerProps = React.ComponentProps<typeof SonnerToaster>;

const Sonner = (props: SonnerProps) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as SonnerProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Sonner };
