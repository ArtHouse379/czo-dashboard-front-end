import { create } from 'zustand'
import { ICustomer } from '@/types/customer.types'

interface CustomerStoreState {
	customers: ICustomer[]
	customersDefaultArray: ICustomer[]
	loading: boolean
	error: null | string
	setCustomers: (customers: ICustomer[]) => void
	saveDefaultCustomersArray: (customers: ICustomer[]) => void
	searchFilter: (searchValue: string) => void
}

export const useCustomersStore = create<CustomerStoreState>()(set => ({
	customers: [],
	customersDefaultArray: [],
	loading: false,
	error: null,
	setCustomers: customers => {
		set(() => ({
			customers: customers
		}))
	},
	saveDefaultCustomersArray: customers => {
		set(() => ({
			customersDefaultArray: [...customers]
		}))
	},
	searchFilter: searchValue => {
		set(state => {
			const filteredCustomers = state.customersDefaultArray.filter(customer => {
				return customer.name.toLowerCase().includes(searchValue.toLowerCase())
			})
			return { customers: filteredCustomers }
		})
	}
}))
