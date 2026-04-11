"use client"

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/supabase/user"
import { getPaginatedPayments } from "@/supabase/payment"
import { BillPayment, Payment } from "../type"

const ITEMS_PER_PAGE = 10

export const usePayment = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [payments, setPayments] = useState<BillPayment[]>([])

    useEffect(() => {
        const fetchPayments = async () => {
            const currentUser = await getCurrentUser();
            const payment = await getPaginatedPayments(currentUser.consumer_id, currentPage, itemsPerPage) as BillPayment[];
            setPayments(payment);
            setTotalItems(payment.length);
            setTotalPages(Math.ceil(payment.length / itemsPerPage));
            setHasNextPage(currentPage < Math.ceil(payment.length / itemsPerPage));
        }
        fetchPayments();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return {
        payments,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        hasNextPage,
        handlePageChange
    }
}