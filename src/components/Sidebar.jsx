"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { PanelLeft, Shield, Lock, Search, Wifi, FileCheck, Bug, Newspaper, Smartphone, StickyNote, Globe, ShieldAlert, AlertOctagon, ShieldCheck } from "lucide-react"
import { useLocation, Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

const SidebarProvider = React.forwardRef((props, ref) => {
  const {
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...rest
  } = props

  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
          ref={ref}
          {...rest}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Shield
  },
  {
    title: "Tools",
    href: "/dashboard/tools",
    icon: ShieldCheck,
    children: [
      {
        title: "Password Analyzer",
        href: "/dashboard/tools/password-analyzer",
        icon: Lock
      },
      {
        title: "Password Generator",
        href: "/dashboard/tools/password-generator",
        icon: Lock
      },
      {
        title: "Data Breach Scanner",
        href: "/dashboard/tools/data-breach-scanner",
        icon: Search
      },
      {
        title: "Phishing Detector",
        href: "/dashboard/tools/phishing-detector",
        icon: AlertOctagon
      },
      {
        title: "Network Scanner",
        href: "/dashboard/tools/network-scanner",
        icon: Wifi
      },
      {
        title: "Encryption Tool",
        href: "/dashboard/tools/encryption-tool",
        icon: Lock
      },
      {
        title: "File Integrity Checker",
        href: "/dashboard/tools/file-integrity-checker",
        icon: FileCheck
      },
      {
        title: "Vulnerability Assessment",
        href: "/dashboard/tools/vulnerability-assessment",
        icon: Bug
      },
      {
        title: "Security News",
        href: "/dashboard/tools/security-news",
        icon: Newspaper
      },
      {
        title: "Two-Factor Manager",
        href: "/dashboard/tools/two-factor-manager",
        icon: Smartphone
      },
      {
        title: "Secure Notes",
        href: "/dashboard/tools/secure-notes",
        icon: StickyNote
      },
      {
        title: "VPN Manager",
        href: "/dashboard/tools/vpn-manager",
        icon: Globe
      },
      {
        title: "Firewall Tool",
        href: "/dashboard/tools/firewall-tool",
        icon: ShieldAlert
      },
      {
        title: "Malware Scanner",
        href: "/dashboard/tools/malware-scanner",
        icon: AlertOctagon
      },
      {
        title: "Security Audit",
        href: "/dashboard/tools/security-audit",
        icon: ShieldCheck
      }
    ]
  }
]

function Sidebar() {
  const location = useLocation()
  const { isMobile, openMobile, setOpenMobile } = useSidebar()

  const renderNavItem = (item) => {
    const isActive = location.pathname === item.href
    const Icon = item.icon

    return (
      <Tooltip key={item.href}>
        <TooltipTrigger asChild>
          <Link
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
              isActive && "bg-accent"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{item.title}</TooltipContent>
      </Tooltip>
    )
  }

  const renderNavItems = () => {
    return navigationItems.map((item) => (
      <div key={item.href} className="space-y-1">
        {renderNavItem(item)}
        {item.children && (
          <div className="ml-4 space-y-1">
            {item.children.map((child) => renderNavItem(child))}
          </div>
        )}
      </div>
    ))
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          }}
          side="left"
        >
          <div className="flex h-full w-full flex-col">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {renderNavItems()}
              </nav>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="group peer md:block text-sidebar-foreground">
      <div className="fixed top-0 z-30 flex h-svh w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            {renderNavItems()}
          </nav>
        </div>
      </div>
    </div>
  )
}
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef((props, ref) => {
  const { toggleSidebar } = useSidebar()
  const { className, onClick, ...rest } = props // Destructure className and onClick

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...rest}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef((props, ref) => {
  const { toggleSidebar } = useSidebar()
  const { className, ...rest } = props // Destructure className

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute z-20 hidden h-svh cursor-pointer items-center justify-center bg-transparent text-sidebar-foreground transition-[width] duration-200 ease-linear group-data-[collapsible=icon]:flex",
        "group-data-[side=left]:left-0 group-data-[side=right]:right-0",
        "w-[--sidebar-width-icon] group-data-[collapsible=offcanvas]:w-0",
        "group-data-[collapsible=offcanvas]:group-data-[side=left]:-left-[--sidebar-width-icon]",
        "group-data-[collapsible=offcanvas]:group-data-[side=right]:-right-[--sidebar-width-icon]",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...rest}
    >
      <PanelLeft className="size-4" />
    </button>
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <main
      ref={ref}
      data-sidebar="inset"
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...rest}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...rest}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...rest}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...rest}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...rest}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...rest}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...rest}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef((props, ref) => {
  const { asChild, className, children, ...rest } = props // Destructure asChild, className, children
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef((props, ref) => {
  const { asChild, className, showOnHover, ...rest } = props // Destructure asChild, className, showOnHover
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...rest}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props // Destructure className and children
  return (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...rest}
    >
      {children}
    </div>
  )
})
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...rest}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef((props, ref) => {
  const { className, ...rest } = props // Destructure className
  return (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...rest}
    />
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef((props, ref) => {
  const { asChild, isActive, variant, size, tooltip, className, children, ...rest } = props;
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();

  // Filter out props that shouldn't be passed to the DOM element
  // isActive is handled by className, so it's removed from direct props
  // asChild is consumed by Comp, so it's not passed to filteredProps explicitly
  const filteredProps = { ...rest };

  const button = (
    <Comp
      ref={ref}
      data-sidebar="menu-button"
      data-size={size}
      className={cn(
        sidebarMenuButtonVariants({ variant, size }),
        className,
        isActive && "data-[active=true]" // This applies data-active attribute via class for styling
      )}
      {...filteredProps} // Only valid DOM props are spread here
    >
      {children}
    </Comp>
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    const tooltipProps = { children: tooltip };
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltipProps}
        />
      </Tooltip>
    );
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        {button}
      </TooltipTrigger>
      <TooltipContent
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef((props, ref) => {
  const { asChild, showOnHover, className, ...rest } = props; // Destructure asChild, showOnHover, className
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...rest}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef((props, ref) => {
  const { className, ...rest } = props; // Destructure className
  return (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...rest}
    />
  );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef((props, ref) => {
  const { showIcon, className, ...rest } = props; // Destructure showIcon and className
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("rounded-md h-8 flex gap-2 px-2 items-center", className)}
      {...rest}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width,
        }}
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef((props, ref) => {
  const { className, ...rest } = props; // Destructure className
  return (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...rest}
    />
  );
});
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef((props, ref) => {
  return <li ref={ref} {...props} />;
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef((props, ref) => {
  const { asChild, size, isActive, className, children, ...rest } = props;
  const Comp = asChild ? Slot : "a";

  // Filter out props that shouldn't be passed to the DOM element
  const filteredProps = { ...rest };

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        isActive && "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", // This applies data-active attribute via class for styling
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...filteredProps} // Only valid DOM props are spread here
    >
      {children}
    </Comp>
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export default Sidebar
