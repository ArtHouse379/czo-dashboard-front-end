import { BookUser, Gavel, KanbanSquare, LayoutDashboard, ReceiptText, Settings } from "lucide-react";
import { IMenuItem } from "./menu.interface";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export const MENU: IMenuItem[] = [
    {
        icon: LayoutDashboard,
        link: DASHBOARD_PAGES.HOME,
        name: 'Dashboard'
    },
    {
        icon: KanbanSquare,
        link: DASHBOARD_PAGES.TASKS,
        name: 'Tasks'
    },
    {
        icon: BookUser,
        link: DASHBOARD_PAGES.CUSTOMERS,
        name: 'Customers'
    },
    {
        icon: Gavel,
        link: DASHBOARD_PAGES.PROCUREMENTS,
        name: 'Procurements'
    },
    {
        icon: ReceiptText,
        link: DASHBOARD_PAGES.CONTRACTS,
        name: 'Contracts'
    },
    {
        icon: Settings,
        link: DASHBOARD_PAGES.SETTINGS,
        name: 'Settings'
    },
]