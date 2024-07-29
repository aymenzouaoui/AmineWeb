import { FuseNavigationItem } from '@fuse/components/navigation';
export const defaultNavigation: FuseNavigationItem[] = [
    {
        role:"admin",
        id: 'users',
        title: 'users',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/user'
    },

    {
        role:"user",

        id: 'application',
        title: 'Application Secret Key',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/project'
    },
    {
        role:"user",

        id: 'academy',
        title: 'Documontation',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/academyc'
    },
    // Include "Admin Credential List" item conditionally based on isAdmin
    {
        id: 'admin-credential-list',
        title: 'Admin Credential List',
        type: 'basic', // This type should be one of the allowed types
        icon: 'heroicons_outline:chart-pie',
        link: '/appd'
    }
]

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
