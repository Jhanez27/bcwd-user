"use client";
import { useState } from "react"
import { TicketFormValues } from "../utils/ticketSchema"
import { getCurrentUser } from "@/supabase/user"
import { createTicket } from "@/supabase/tickets"

export const useTicketsAction = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const createTicketAction = async (data: TicketFormValues) => {
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const currentUser = await getCurrentUser()
            const ticket = await createTicket(data, currentUser.consumer_id)
            setSuccess(true)
            return ticket
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        createTicketAction,
        loading,
        error,
        success
    }
}