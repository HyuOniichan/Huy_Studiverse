import React from 'react'
import ToastMessage from './ToastMessage'

type ToastBoxProps = {
    toasts: { id: string, type: string, message: string, duration: number }[];
}

const ToastBox: React.FC<ToastBoxProps> = ({ toasts }) => {
    return (
        <div className='fixed bottom-4 right-6 flex flex-col gap-2'>
            {toasts.map(toast => (
                <ToastMessage
                    key={toast.id}
                    type={toast.type}
                    id={toast.id}
                    message={toast.message} 
                    duration={toast.duration} 
                /> 
            ))}
        </div>
    )
}

export default ToastBox