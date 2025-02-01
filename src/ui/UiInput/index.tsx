import { FC, InputHTMLAttributes, memo } from 'react'
import cls from './index.module.css'
import { cn } from '@/lib'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}
const UiInput: FC<Props> = memo(({ className, label, ...inpProps }) => {
	return (
		<label className={cn(cls.wrapper, [className])}>
			{label && <h2 className={cls.label_text}>{label}</h2>}
			<input {...inpProps} />
		</label>
	)
})

export { UiInput }
