'use client'

import { useEffect, useState } from 'react'
import { dbCrudLinks, sidebarLinks } from '@/utils/constant'
import { useToastContext } from '@/components/Toast/ToastContext'
import { usePathname } from 'next/navigation'

type pathType = {
    role: string[],
    url: string,
    api: string | (() => Promise<any>),
    label: string
}

const useCustomPath = () => {

    const currentPathname = usePathname();
    const [path, setPath] = useState<pathType>();
    const { addToast } = useToastContext();

    useEffect(() => {
        const currentView = sidebarLinks.find(e => e.url === currentPathname);
        if (currentView) {
            const { icon, ...currentV } = currentView;
            setPath(currentV);
        } else {
            const crudView = dbCrudLinks.find(e => e.url === currentPathname); 
            if (crudView) {
                setPath(crudView); 
            } else addToast('error', 'Cannot display current view');
        }
    }, [currentPathname])

    return path;
}

export default useCustomPath