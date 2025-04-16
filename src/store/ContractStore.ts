import { create } from 'zustand'
import { IContract } from '@/types/contract.types'

interface ContractStoreState {
	contracts: IContract[]
	contractsDefaultArray: IContract[]
	loading: boolean
	error: null
	setContracts: (contracts: IContract[]) => void
	saveDefaultContractsArray: (contracts: IContract[]) => void
	searchFilter: (searchValue: string) => void
}

export const useContractsStore = create<ContractStoreState>()(set => ({
	contracts: [],
	contractsDefaultArray: [],
	loading: false,
	error: null,
	setContracts: contracts => {
		set(() => ({
			contracts: contracts
		}))
	},
	saveDefaultContractsArray: contracts => {
		set(() => ({
			contractsDefaultArray: [...contracts]
		}))
	},
	searchFilter: searchValue => {
		set(state => {
			const filteredArray = state.contractsDefaultArray.filter(contract => {
				return contract.number.includes(searchValue)
			})
			return {
				contracts: filteredArray
			}
		})
	}
}))
