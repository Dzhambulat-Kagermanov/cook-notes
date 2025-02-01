import { FC, MouseEventHandler } from 'react'
import { cn } from '@/lib'
import { TChildren, TClassName } from '@/types/shared'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { hideModal, modalsStates, TModalSlug } from '@/store/modals'
import cls from './index.module.css'

interface Props extends TClassName, TChildren {
	slug: TModalSlug
	handleClose?: MouseEventHandler
}
const UiModal: FC<Props> = ({ className, children, slug, handleClose }) => {
	const dispatch = useAppDispatch()
	const modalsNode = document.querySelector('#modals')
	const modalProps = useAppSelector(modalsStates)[slug]
	const handleModalClose: MouseEventHandler = e => {
		dispatch(hideModal({ slug }))
		handleClose && handleClose(e)
	}
	return (
		<>
			{!modalProps ||
				(modalProps.state &&
					modalsNode &&
					createPortal(
						<section
							className={cn(cls.wrapper, [className])}
							onClick={handleModalClose}
						>
							<div
								onClick={e => {
									e.stopPropagation()
								}}
								className={cls.content}
							>
								{children}
							</div>
						</section>,
						modalsNode
					))}
		</>
	)
}

export { UiModal }
