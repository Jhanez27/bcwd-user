import { useEffect, useState } from "react"
import { Billing } from "../type"
import { getCurrentUser } from "@/supabase/user"
import { getBillings, getPaginatedBillings } from "@/supabase/bills"

const ITEMS_PER_PAGE = 10

export const useBills = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE)
    const [hasNextPage, setHasNextPage] = useState(false)
    const [billings, setBillings] = useState<Billing[]>([])

    useEffect(() => {
        const fetchBillings = async () => {
            const currentUser = await getCurrentUser();
            const billing = await getPaginatedBillings(currentUser.consumer_id, currentPage, itemsPerPage) as Billing[];
            setBillings(billing);
            setTotalItems(billing.length);
            setTotalPages(Math.ceil(billing.length / itemsPerPage));
            setHasNextPage(currentPage < Math.ceil(billing.length / itemsPerPage));
        }
        fetchBillings();
    }, []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return {
        billings,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        hasNextPage,
        handlePageChange
    }
}