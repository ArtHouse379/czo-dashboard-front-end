import { create } from 'zustand'
import { IProcurement } from '@/types/procurement.types'

interface ProcurementsStoreState {
	procurements: IProcurement[]
	procurementsDefaultArray: IProcurement[]
	loading: boolean
	error: string | null
	setProcurements: (procurements: IProcurement[]) => void
	saveDefaultArray: (procurements: IProcurement[]) => void
	sortProcurements: (sortType: keyof IProcurement) => void
	filterByManager: (managerId: string) => void
	searchFilter: (searchValue: string) => void
	resetProcurements: () => void
	clearProcurements: () => void
}

export const useProcurementsStore = create<ProcurementsStoreState>()(set => ({
	procurements: [],
	procurementsDefaultArray: [],
	loading: false,
	error: null,

	//* SET PROCUREMENTS ARRAY
	setProcurements: procurements => {
		set(() => ({
			procurements: procurements
		}))
	},
	//* MAKE PROCUREMENTS ARRAY DEFAULT COPY
	saveDefaultArray: procurements => {
		set(() => ({
			procurementsDefaultArray: [...procurements]
		}))
	},
	//* FILTER PROCUREMENTS BY MANAGER
	filterByManager: (managerId: string) => {
		set(state => ({
			procurements: state.procurements.filter(
				(procurement: IProcurement) => procurement.userId === managerId
			)
		}))
	},
	//* SORT PROCUREMENTS ARRAY
	sortProcurements: (sortType: keyof IProcurement) => {
		if (!sortType) return

		set(state => {
			const sortedProcurements = [...state.procurements].sort((a, b) => {
				if (sortType === 'expectedValue') {
					if (+a[sortType] < +b[sortType]) return 1
					if (+a[sortType] > +b[sortType]) return -1
					return 0
				} else {
					if (a[sortType] < b[sortType]) return 1
					if (a[sortType] > b[sortType]) return -1
					return 0
				}
			})
			return {
				procurements: sortedProcurements
			}
		})
	},
	//* SEARCH PROCUREMENTS ARRAY
	searchFilter: (searchValue: string) => {
		const normalizedSearch = searchValue.toLowerCase()
		set(state => ({
			procurements: state.procurementsDefaultArray.filter(procurement => {
				if (/\d/.test(normalizedSearch) || normalizedSearch.includes('ua')) {
					return procurement.prozorroId.toLowerCase().includes(normalizedSearch)
				}
				return procurement.product.toLowerCase().includes(normalizedSearch)
			})
		}))
	},
	//* RESET PROCUREMENTS ARRAY TO DEFAULT
	resetProcurements: () => {
		set(state => ({
			procurements: state.procurementsDefaultArray
		}))
	},
	//* CLEAR ALL PROCUREMENTS IN STORE
	clearProcurements: () => {
		set(state => ({
			procurements: [],
			loading: false,
			error: null
		}))
	}
}))
