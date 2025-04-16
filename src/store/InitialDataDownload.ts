import { useEffect } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { useContractsStore } from './ContractStore'
import { useCustomersStore } from './CustomerStore'
import { useProcurementsStore } from './ProcurementStore'
import { useUsersStore } from './UserStore'
import { useContracts } from '@/app/dashboard/contracts/hooks/useContracts'
import { useCustomers } from '@/app/dashboard/customers/hooks/useCustomers'
import { useProcurements } from '@/app/dashboard/procurements/hooks/useProcurements'

export function useInitialDataDownload() {
	const procurementsData = useProcurements()
	const contractsData = useContracts()
	const customersData = useCustomers()
	const usersData = useUsers()

	const { setProcurements, saveDefaultArray } = useProcurementsStore()
	const { setContracts, saveDefaultContractsArray } = useContractsStore()
	const { setCustomers, saveDefaultCustomersArray } = useCustomersStore()
	const { setUsers, saveDefaultUsersArray } = useUsersStore()

	useEffect(() => {
		if (procurementsData.isSuccess && procurementsData.data) {
			setProcurements(procurementsData.data)
			saveDefaultArray(procurementsData.data)
		}
		if (contractsData.isSuccess && contractsData.data) {
			setContracts(contractsData.data)
			saveDefaultContractsArray(contractsData.data)
		}
		if (customersData.isSuccess && customersData.data) {
			setCustomers(customersData.data)
			saveDefaultCustomersArray(customersData.data)
		}
		if (usersData.isSuccess && usersData.data) {
			setUsers(usersData.data)
			saveDefaultUsersArray(usersData.data)
		}
	}, [procurementsData.isSuccess])
}
