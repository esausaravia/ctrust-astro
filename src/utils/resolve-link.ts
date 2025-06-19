

export default function resolveLink(page: string) {

    return import.meta.env.BASE_URL === '/'
        ? page
        : (import.meta.env.BASE_URL+page).replace('//','/');
}