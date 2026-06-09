"use client";

import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import { getCountryCallingCode } from "react-phone-number-input";
import { CheckIcon, ChevronsUpDown, AlertCircle } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type PhoneNumberValue = RPNInput.Value;

export type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value?: RPNInput.Value) => void;
    error?: string | null;
  };

// ── Emoji flag from ISO country code ─────────────────────────────────────────
// Much cleaner than SVG flags — renders natively in every modern browser.
function toFlagEmoji(code: string): string {
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397))
    .join("");
}

// ── Root component ────────────────────────────────────────────────────────────
const PhoneInput = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, error, style, ...props }, ref) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          // One cohesive input row — no internal rounding on the seam
          "flex items-stretch w-full h-10 overflow-hidden",
          "rounded-lg border",
          error
            ? "border-red-500 focus-within:border-red-500"
            : "border-[rgb(var(--border-subtle))] focus-within:border-[rgb(var(--border-default))]",
          "bg-[rgb(var(--bg-surface-2))] transition-colors duration-150",
          className
        )}
        style={style}
      >
        <RPNInput.default
          ref={ref}
          className="flex w-full"
          flagComponent={FlagDisplay}
          countrySelectComponent={CountrySelect}
          inputComponent={NumberInput}
          defaultCountry="IN"
          international
          onChange={(value) => onChange?.(value)}
          {...props}
        />
      </div>

      {error && (
        <p className="flex items-center gap-1 mt-1.5 text-xs" style={{ color: "#EF4444" }}>
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});
PhoneInput.displayName = "PhoneInput";

// ── Number input ─────────────────────────────────────────────────────────────
const NumberInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex-1 h-full bg-transparent px-3 text-sm outline-none",
      "text-[rgb(var(--text-primary))] placeholder:text-[rgb(var(--text-muted))]",
      className
    )}
    {...props}
  />
));
NumberInput.displayName = "NumberInput";

// ── Country selector ─────────────────────────────────────────────────────────
type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  onChange: (value: RPNInput.Country) => void;
  options: CountrySelectOption[];
};

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => onChange(country),
    [onChange]
  );

  const callingCode = value ? `+${getCountryCallingCode(value)}` : "";

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        disabled={disabled}
        className={cn(
          "flex items-center gap-1.5 h-full px-3 flex-shrink-0",
          "border-r border-[rgb(var(--border-subtle))]",
          "text-[rgb(var(--text-primary))]",
          "hover:bg-[rgb(var(--bg-surface-3))] transition-colors duration-150",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {/* Emoji flag */}
        <span className="text-base leading-none select-none">
          {value ? toFlagEmoji(value) : "🌐"}
        </span>
        {/* Calling code */}
        <span className="text-xs font-medium tabular-nums" style={{ color: "rgb(var(--text-muted))" }}>
          {callingCode}
        </span>
        <ChevronsUpDown className="h-3 w-3 flex-shrink-0" style={{ color: "rgb(var(--text-muted))" }} />
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[280px]" align="start">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search country…" />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.value)
                .map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-base leading-none select-none">
                      {toFlagEmoji(option.value)}
                    </span>
                    <span className="text-sm flex-1 truncate">{option.label}</span>
                    <span className="text-xs tabular-nums" style={{ color: "rgb(var(--text-muted))" }}>
                      +{getCountryCallingCode(option.value)}
                    </span>
                    <CheckIcon
                      className={cn(
                        "ml-1 h-3.5 w-3.5 flex-shrink-0",
                        option.value === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// ── Flag display (used inside the input row by RPNInput, not shown separately) ─
const FlagDisplay = (_props: RPNInput.FlagProps) => null;
FlagDisplay.displayName = "FlagDisplay";

export { PhoneInput };
