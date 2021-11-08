import getLists from './getLists';
import getFeatures from './getFeatures';

export default id => {
    const match = getLists().find(list => list.id === id);
    if (!match) return null;

    // Clone the object
    const list = { ...match };

    // Load full features
    list.features = getFeatures().map(feature => ({
        ...feature,
        value: list.features.includes(feature.id) ? 1 : 0,
    })).sort((a, b) => {
        if (a.value !== b.value) return a.value ? -1 : 1;
        if (a.display !== b.display) return a.display > b.display ? -1 : 1;
        return a.name.localeCompare(b.name) ? -1 : 1;
    });

    return list;
};
