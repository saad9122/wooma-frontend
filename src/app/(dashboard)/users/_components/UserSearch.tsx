"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function UserSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchBy, setSearchBy] = React.useState<"id" | "phone_number">(
    searchParams.get("id")
      ? "id"
      : searchParams.get("phone_number")
      ? "phone_number"
      : "id"
  )
  const [search, setSearch] = React.useState(
    searchParams.get("id") ?? searchParams.get("phone_number") ?? ""
  )
  const [validationError, setValidationError] = React.useState<string>("")

  // UUID validation regex
  const isValidUUID = (uuid: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
  }

  // Phone number validation (supports various formats)
  const isValidPhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, "")
    
    // Check if it's between 10-15 digits (international standard)
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      return false
    }
    
    // More comprehensive regex for various phone formats
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[(]?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone.trim())
  }

  // Validate input based on search type
  const validateInput = (value: string, type: "id" | "phone_number"): string => {
    if (!value.trim()) {
      return `Please enter a ${type === "id" ? "UUID" : "phone number"}`
    }

    if (type === "id" && !isValidUUID(value.trim())) {
      return "Please enter a valid UUID (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"
    }

    if (type === "phone_number" && !isValidPhoneNumber(value.trim())) {
      return "Please enter a valid phone number (10-15 digits, may include +, -, (), spaces)"
    }

    return ""
  }

  // Handle input change with validation
  const handleInputChange = (value: string) => {
    setSearch(value)
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError("")
    }
  }

  // Handle search type change
  const handleSearchTypeChange = (value: "id" | "phone_number") => {
    setSearchBy(value)
    setSearch("") // Clear search when switching types
    setValidationError("") // Clear any validation errors
  }

  // ✅ Run search explicitly with validation
  const handleSearch = () => {
    const error = validateInput(search, searchBy)
    
    if (error) {
      setValidationError(error)
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    // remove old keys
    params.delete("id")
    params.delete("phone_number")

    if (search) {
      params.set(searchBy, search.trim())
      params.set("page", "1") // reset page on new search
    }

    router.push(`?${params.toString()}`)
  }

  // ✅ Cancel search
  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("id")
    params.delete("phone_number")
    params.delete("page")
    setSearch("")
    setValidationError("")
    router.push(`?${params.toString()}`)
  }

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <div className="flex gap-2 items-start">
        {/* Dropdown to choose ID or Phone */}
        <Select
          value={searchBy}
          onValueChange={handleSearchTypeChange}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Search by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">ID (UUID)</SelectItem>
            <SelectItem value="phone_number">Phone</SelectItem>
          </SelectContent>
        </Select>

        {/* Input for value */}
        <Input
          placeholder={
            searchBy === "id"
              ? "Enter UUID (e.g., 550e8400-e29b-41d4-a716-446655440000)"
              : "Enter phone number"
          }
          value={search}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className={validationError ? "border-red-500" : ""}
        />

        {/* Search button */}
        <Button onClick={handleSearch}>Search</Button>

        {/* Cancel button (only show when there's an active search) */}
        {search && (
          <Button variant="outline" onClick={handleClear}>
            Cancel
          </Button>
        )}
      </div>

      {/* Validation error message */}
      {validationError && (
        <div className="text-sm text-red-600 mt-1">
          {validationError}
        </div>
      )}
    </div>
  )
}