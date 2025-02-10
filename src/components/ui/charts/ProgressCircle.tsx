import Progress from 'rsuite/Progress'
import 'rsuite/Progress/styles/index.css'

export default function ProgressCircle() {
	return (
		<div className='w-64'>
			<Progress.Circle
				percent={0}
				status='active'
			/>
		</div>
	)
}
