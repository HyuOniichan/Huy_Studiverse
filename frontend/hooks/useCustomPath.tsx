'use client'

import { useEffect, useState } from 'react'
import { sidebarLinks } from '@/utils/constant'
import { useToastContext } from '@/components/Toast/ToastContext'
import { usePathname } from 'next/navigation'

type pathType = {
    role: string[],
    url: string,
    api: string,
    label: string
}

const useCustomPath = () => {

    const currentPathname = usePathname();
    const [path, setPath] = useState<pathType | undefined>();
    const { addToast } = useToastContext();

    useEffect(() => {
        const currentView = sidebarLinks.find(e => e.url === currentPathname);
        if (currentView) {
            const { icon, ...currentV } = currentView;
            setPath(currentV);
        }
        else addToast('error', 'Cannot display current view');
    }, [currentPathname])

    return path;
}

export default useCustomPath