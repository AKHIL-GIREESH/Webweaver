/// <reference types="vitest" />
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthLayout from "../src/components/Auth/AuthLayout"
import React from "react"

// Helper to render with QueryClient + Router
const renderWithProviders = (ui: React.ReactNode) => {
    const queryClient = new QueryClient()
    return render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </QueryClientProvider>
    )
}

describe("AuthLayout", () => {
    it("renders login form when login is true", () => {
        renderWithProviders(<AuthLayout login={true} />)

        expect(screen.getByRole("button", { name: /login/i })).toBeDefined()
        expect(screen.getByPlaceholderText(/email/i)).toBeDefined()
        expect(screen.getByPlaceholderText(/password/i)).toBeDefined()
        expect(screen.queryByPlaceholderText(/username/i)).not.toBeDefined()
    })

    it("renders signup form when login is false", () => {
        renderWithProviders(<AuthLayout login={false} />)

        expect(screen.getByRole("button", { name: /sign up/i })).toBeDefined()
        expect(screen.getByPlaceholderText(/email/i)).toBeDefined()
        expect(screen.getByPlaceholderText(/password/i)).toBeDefined()
        expect(screen.getByPlaceholderText(/username/i)).toBeDefined()
    })
})
