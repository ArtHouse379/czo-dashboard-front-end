class DASHBOARD {
    private root = '/i'

    HOME = this.root
    TASKS = `${this.root}/tasks`
    CUSTOMERS = `${this.root}/customers`
    PROCUREMENTS = `${this.root}/procurements`
    CONTRACTS = `${this.root}/contracts`
    SETTINGS = `${this.root}/settings`
}

export const DASHBOARD_PAGES = new DASHBOARD()