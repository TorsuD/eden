"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggler from "./ui/theme-toggler";
import { RiPlantFill } from "react-icons/ri";
import { IconType } from "react-icons/lib";
import { TbFlowerFilled } from "react-icons/tb";
import { LuFlower2 } from "react-icons/lu";
import { GiSpotedFlower } from "react-icons/gi";
import Image from "next/image";
import { MenuIcon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import KeyboardCommand from "./KeyboardCommand";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import { Button } from "./ui/button";

const components: {
  title: string;
  href: string;
  icon: IconType;
  description: string;
}[] = [
  {
    title: "Indoor Plants",
    href: "/indoor-plants",
    icon: RiPlantFill,
    description:
      "Plants that thrive indoors with minimal sunlight, helping to purify air and enhance interior spaces.",
  },
  {
    title: "Outdoor Plants",
    href: "/outdoor-plants",
    icon: TbFlowerFilled,
    description:
      "Hardy plants suited for gardens, balconies, and outdoor landscapes, able to withstand natural weather conditions.",
  },
  {
    title: "Flowers",
    href: "/flowers",
    icon: LuFlower2,
    description:
      "Beautiful blooming plants known for their vibrant colors, fragrance, and decorative appeal.",
  },
  {
    title: "Succulents",
    href: "/succulents",
    icon: GiSpotedFlower,
    description:
      "Low-maintenance plants that store water in their leaves, ideal for dry environments and indoor décor.",
  },
];

export default function Navbar() {
  const isMobile = useIsMobile();
  const { user, logout } = useAuth();
  const { items, fetchCart, removeItem, itemCount, total } = useCartStore();

  // Fetch cart from DB when user is available
  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  return (
    <nav className="flex fixed w-full z-50 bg-none items-center justify-between px-6 py-3 backdrop-blur-lg">
      {/* LOGO HERE */}
      <Link
        href={"/home"}
        className="text-center text-2xl text-green-600 font-bold"
      >
        eden<span className="text-black font-black">.</span>
      </Link>

      {/* SEARCH FUNCTIONALITY */}
      <KeyboardCommand />

      {/* NAVIGATION SECTION */}
      <NavigationMenu viewport={isMobile} className="hidden text-sm lg:block">
        <NavigationMenuList className="flex-wrap">
          {/* SHOP */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent ">
              Shop
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="from-green/50 to-green-700 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                      href="/"
                    >
                      <div className="mb-2 text-lg text-white font-medium sm:mt-4">
                        Plants & Flowers
                      </div>
                      <p className="text-white font-black text-sm leading-tight">
                        Get freshly picked plants and flowers, straight from
                        nature.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Featured Collection">
                  Our most loved plants, carefully selected for every space.
                </ListItem>
                <ListItem href="/docs/installation" title="Special Offers">
                  Seasonal deals on fresh plants and elegant blooms.
                </ListItem>
                <ListItem href="care-guides" title="Care & Tips">
                  Expert advice to keep your plants thriving year-round.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* PLANT TYPES */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent ">
              Plant Types
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 sm:w-100 md:w-125 md:grid-cols-2 lg:w-150">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    className="flex items-center gap-2"
                  >
                    <component.icon className="text-green-500" />
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* MORE */}
          <NavigationMenuItem className="hidden md:block ">
            <NavigationMenuTrigger className="bg-transparent ">
              More
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-75 gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">
                        About{" "}
                        <span className="text-green-500 font-bold">Eden</span>
                      </div>
                      <div className="text-muted-foreground">
                        Dive more into Eden.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Contact</div>
                      <div className="text-muted-foreground">
                        Reach out to us
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* USER SIDE */}
      <div className="flex items-center gap-6">
        {/*  */}
        <p className="text-muted-foreground flex items-center gap-1 text-sm">
          Use{" "}
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-lg">⌘</span>K
          </kbd>
          <span>to search</span>
        </p>

        {/* THEME TOGGLER */}
        <div className="hidden lg:block">
          <ThemeToggler />
        </div>

        {/* CART */}
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger className="flex items-center gap-2">
              <p className="text-sm">
                CART <span className="text-green-500 font-black">|</span>{" "}
                <span className="font-black">{itemCount()}</span>
              </p>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <div>Cart</div>
                  <div className="text-gray-400 text-sm font-medium">
                    {itemCount()} {itemCount() === 1 ? "item" : "items"}
                  </div>
                </SheetTitle>
              </SheetHeader>

              {items.length === 0 ? (
                <div className="flex items-center justify-center flex-1">
                  <div className="text-center p-4">
                    <div className="flex items-center justify-center">
                      <Image
                        src={"/cart.png"}
                        width={100}
                        height={100}
                        className="h-40 w-40 object-contain"
                        alt="cart"
                      />
                    </div>
                    <p className="font-bold text-lg">
                      No <span className="text-green-500">items</span> in cart.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Oops! Looks like you haven&apos;t added anything yet. Time
                      to treat yourself.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* CART ITEMS */}
                  <div className="flex-1 overflow-y-auto space-y-4 py-4 px-4">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3 border-b pb-4"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-lg object-contain bg-muted"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                          <p className="text-sm font-bold text-green-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* TOTAL + CHECKOUT */}
                  <div className="border-t pt-4 space-y-3 px-4 py-6">
                    <div className="flex justify-between font-semibold text-sm">
                      <span>Total</span>
                      <span className="text-green-600">
                        ${total().toFixed(2)}
                      </span>
                    </div>
                    <Link href="/checkout" className="block">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Checkout
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* USER */}
        <div className="font-bold hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {user && (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link href="/orders">My Orders</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="text-red-500 cursor-pointer focus:text-red-500"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* MOBILE VIEW */}
        <div className="lg:hidden block">
          <Sheet>
            <SheetTrigger className="flex items-center gap-2">
              <MenuIcon />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex flex-col  gap-3">
                  <div>Menu</div>
                </SheetTitle>
              </SheetHeader>

              <ul className="p-4 space-y-4">
                <li>
                  <Link href={"/shop"}>Shop</Link>
                </li>
                <li>
                  <Link href={"/plant-types"}>Plant Types</Link>
                </li>
                <li>
                  {" "}
                  <Link href={"/about"}>About Eden</Link>
                </li>
                <li>
                  <Link href={"/contact"}>Contact Us</Link>
                </li>
                <li>
                  <Link href={"/blogs"}>Blogs</Link>
                </li>
                <li>
                  <ThemeToggler />
                </li>
              </ul>

              <SheetFooter className="text-gray-400 font-bold">
                Eden 2026. All rights reserved
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
