"use client";

import { Search, X } from "lucide-react";

export function SiteSearchField({
  id,
  value,
  onChange,
  onClear,
  placeholder,
  label,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="site-search">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search className="site-search__icon" aria-hidden />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className="site-search__input"
      />
      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="site-search__clear"
          aria-label="Zoekopdracht wissen"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
