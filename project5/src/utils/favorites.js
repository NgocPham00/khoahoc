const FAVORITES_KEY = "favorites_products";

export const getFavorites = () => {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
};

export const addFavorite = (product) => {
    const favorites = getFavorites();
    const exists = favorites.find((p) => p.id === product.id);
    if (!exists) {
        favorites.push(product);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
};

export const removeFavorite = (id) => {
    const favorites = getFavorites().filter((p) => p.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (id) => {
    const favorites = getFavorites();
    return favorites.some((p) => p.id === id);
};
