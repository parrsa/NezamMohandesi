export function filterMenuItems(menu: any[]) {
    return menu.map((item) => {
        return {
            ...item,
            children: item.children || [] 
        };
    }).filter(Boolean);
}